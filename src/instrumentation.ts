export async function register() {
  if (process.env.NEXT_RUNTIME === "nodejs") {
    const { enableBetterStackConsoleMirror } = await import("./lib/betterstack");
    enableBetterStackConsoleMirror();
  }
}
