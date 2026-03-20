"use client";

import { useState } from "react";
import { Link } from "@/i18n/routing";

interface CancelFormProps {
  t: (key: string) => string;
}

export function CancelForm({ t }: CancelFormProps) {
  const [email, setEmail] = useState("");
  const [state, setState] = useState<"idle" | "loading" | "success" | "not_found" | "error">("idle");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim()) return;
    setState("loading");

    try {
      const res = await fetch("/api/stripe/cancel", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim() }),
      });
      const data = await res.json();

      if (!res.ok) {
        setState("error");
        return;
      }

      setState(data.found ? "success" : "not_found");
    } catch {
      setState("error");
    }
  }

  if (state === "success") {
    return (
      <div style={{ textAlign: "center", padding: "1rem 0" }}>
        <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>✅</div>
        <h2 style={{ color: "var(--brand-primary)", marginBottom: "0.75rem" }}>
          {t("cancelSuccess")}
        </h2>
        <p style={{ color: "var(--text-secondary)", marginBottom: "2rem" }}>
          {t("cancelSuccessDesc")}
        </p>
        <Link href="/" className="btn btn-outline" style={{ padding: "0.9rem 2rem" }}>
          {t("btnHome")}
        </Link>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="d-flex justify-center gap-2"
      style={{ flexDirection: "column", maxWidth: "300px", margin: "0 auto" }}
    >
      <input
        type="email"
        placeholder={t("emailPlaceholder")}
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        disabled={state === "loading"}
        className="mb-2"
        style={{
          padding: "0.8rem 1rem",
          borderRadius: "var(--radius-md)",
          border: "1px solid var(--surface-border)",
          backgroundColor: "rgba(0,0,0,0.2)",
          color: "var(--text-primary)",
          outline: "none",
          fontFamily: "var(--font-main)",
        }}
      />

      {/* Not found message */}
      {state === "not_found" && (
        <p style={{
          color: "#f87171",
          fontSize: "0.875rem",
          textAlign: "center",
          marginBottom: "0.5rem",
          padding: "0.6rem 0.8rem",
          backgroundColor: "rgba(248,113,113,0.1)",
          borderRadius: "var(--radius-sm)",
          border: "1px solid rgba(248,113,113,0.3)",
        }}>
          {t("notFound")}
        </p>
      )}

      {/* Generic error */}
      {state === "error" && (
        <p style={{ color: "#f87171", fontSize: "0.875rem", textAlign: "center", marginBottom: "0.5rem" }}>
          {t("errorGeneric")}
        </p>
      )}

      <button
        type="submit"
        disabled={state === "loading"}
        className="btn btn-primary"
        style={{ width: "100%", padding: "1rem", cursor: state === "loading" ? "not-allowed" : "pointer", opacity: state === "loading" ? 0.7 : 1 }}
      >
        {state === "loading" ? t("cancelling") : t("btnLogin")}
      </button>
      <Link href="/" className="btn btn-outline mt-2" style={{ width: "100%", padding: "1rem" }}>
        {t("btnHome")}
      </Link>
    </form>
  );
}
