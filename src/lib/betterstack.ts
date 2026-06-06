/**
 * Better Stack (Logtail) — voxpages-app
 * https://betterstack.com/docs/logs/ingesting-data/http/logs/
 */

const APP_NAME = "voxpages-app";

class BetterStackService {
  get sourceToken() {
    return process.env.BETTERSTACK_SOURCE_TOKEN;
  }

  get ingestingHost() {
    return process.env.BETTERSTACK_INGESTING_HOST || "in.logs.betterstack.com";
  }

  get endpoint() {
    return `https://${this.ingestingHost}`;
  }

  isEnabled() {
    return Boolean(this.sourceToken);
  }

  async sendLog(
    level: "debug" | "info" | "warn" | "error" | "fatal",
    message: string,
    metadata?: Record<string, unknown>
  ) {
    if (!this.sourceToken) return;

    try {
      const body = {
        dt: new Date().toISOString().replace("T", " ").replace(/\.\d{3}Z$/, " UTC"),
        level,
        message,
        app: APP_NAME,
        environment: process.env.VERCEL_ENV || process.env.NODE_ENV || "development",
        ...metadata,
      };

      const response = await fetch(this.endpoint, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${this.sourceToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        const text = await response.text();
        process.stderr.write(`[BetterStack] Failed ${response.status}: ${text}\n`);
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      process.stderr.write(`[BetterStack] Error: ${message}\n`);
    }
  }

  info(message: string, metadata?: Record<string, unknown>) {
    return this.sendLog("info", message, metadata);
  }

  warn(message: string, metadata?: Record<string, unknown>) {
    return this.sendLog("warn", message, metadata);
  }

  error(message: string, metadata?: Record<string, unknown>) {
    return this.sendLog("error", message, metadata);
  }
}

export const betterStack = new BetterStackService();

let consoleMirrorEnabled = false;

/** Mirror console.log/warn/error to Better Stack (call once at process entry). */
export function enableBetterStackConsoleMirror() {
  if (consoleMirrorEnabled || !betterStack.isEnabled()) return;
  consoleMirrorEnabled = true;

  const originalLog = console.log;
  const originalWarn = console.warn;
  const originalError = console.error;

  const formatArgs = (args: unknown[]) =>
    args.map((arg) => (typeof arg === "object" ? JSON.stringify(arg) : String(arg))).join(" ");

  console.log = (...args: unknown[]) => {
    originalLog(...args);
    void betterStack.info(formatArgs(args));
  };

  console.warn = (...args: unknown[]) => {
    originalWarn(...args);
    void betterStack.warn(formatArgs(args));
  };

  console.error = (...args: unknown[]) => {
    originalError(...args);
    void betterStack.error(formatArgs(args));
  };
}
