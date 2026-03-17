"use client";

import { useState } from "react";
import { Link } from "@/i18n/routing";
import { createClient } from "@/lib/supabase/client";
import { useTranslations } from "next-intl";

export default function LoginPage() {
  const t = useTranslations("Login");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ text: "", type: "" });
  const supabase = createClient();

  const handleMagicLink = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      setMessage({ text: t("errEmail"), type: "error" });
      return;
    }

    setLoading(true);
    setMessage({ text: "", type: "" });

    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        // En un caso real podrías redireccionar a una URL de callback específica
        emailRedirectTo: `${window.location.origin}/auth/callback`,
      },
    });

    if (error) {
      setMessage({ text: error.message, type: "error" });
    } else {
      setMessage({ text: t("successMagic"), type: "success" });
    }
    setLoading(false);
  };

  const handleGoogleLogin = async () => {
    setLoading(true);
    setMessage({ text: "", type: "" });
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });

    if (error) {
      setMessage({ text: error.message, type: "error" });
      setLoading(false);
    }
    // Si no hay error, redigirá a Google
  };

  return (
    <div className="d-flex align-center" style={{ minHeight: "70vh", justifyContent: "center" }}>
      <div className="glass-card" style={{ maxWidth: "450px", width: "100%", padding: "3rem 2rem", margin: "0 auto" }}>
        <div className="text-center mb-4">
          <Link href="/" className="d-flex justify-center align-center mb-2">
             <span style={{ fontSize: "2rem", fontWeight: 800 }}>
                Summary<span className="text-gradient">Vox</span>
              </span>
          </Link>
          <h2>{t("title")}</h2>
          <p style={{ color: "var(--text-secondary)" }}>{t("subtitle")}</p>
        </div>

        {message.text && (
          <div className="mb-2" style={{ 
            padding: "0.75rem", 
            borderRadius: "var(--radius-sm)", 
            backgroundColor: message.type === "error" ? "rgba(255, 100, 100, 0.1)" : "rgba(0, 168, 150, 0.1)",
            border: `1px solid ${message.type === "error" ? "rgba(255, 100, 100, 0.3)" : "rgba(0, 168, 150, 0.3)"}`,
            color: message.type === "error" ? "#ff6b81" : "var(--brand-primary-light)",
            fontSize: "0.9rem",
            textAlign: "center"
          }}>
            {message.text}
          </div>
        )}

        <button 
          onClick={handleGoogleLogin} 
          className="btn btn-outline d-flex align-center justify-center gap-2 mb-4" 
          style={{ width: "100%", backgroundColor: "white", color: "#333", border: "none", justifyContent: "center" }}
          disabled={loading}
        >
          {/* Simple Google SVG Icon */}
          <svg width="18" height="18" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48">
            <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
            <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
            <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
            <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
          </svg>
          {t("btnGoogle")}
        </button>

        <div className="d-flex align-center gap-2 mb-4" style={{ color: "var(--text-secondary)", fontSize: "0.9rem" }}>
          <div style={{ flex: 1, height: "1px", backgroundColor: "var(--surface-border)" }}></div>
          <span>{t("or")}</span>
          <div style={{ flex: 1, height: "1px", backgroundColor: "var(--surface-border)" }}></div>
        </div>

        <form onSubmit={handleMagicLink} className="mb-4">
          <div className="mb-2">
            <label htmlFor="email" style={{ display: "block", marginBottom: "0.5rem", fontSize: "0.9rem", color: "var(--text-secondary)" }}>
              {t("emailLabel")}
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={t("emailPlace")}
              required
              style={{
                width: "100%",
                padding: "0.75rem 1rem",
                borderRadius: "var(--radius-md)",
                border: "1px solid var(--surface-border)",
                backgroundColor: "rgba(0,0,0,0.2)",
                color: "var(--text-primary)",
                fontFamily: "var(--font-main)",
                fontSize: "1rem",
                outline: "none",
                transition: "border-color var(--transition-fast)"
              }}
              onFocus={(e) => e.target.style.borderColor = "var(--brand-primary)"}
              onBlur={(e) => e.target.style.borderColor = "var(--surface-border)"}
            />
          </div>
          <button 
            type="submit" 
            className="btn btn-primary" 
            style={{ width: "100%" }}
            disabled={loading}
          >
            {loading ? t("loading") : t("btnSubmit")}
          </button>
        </form>
        
        <p className="text-center mt-4" style={{ color: "var(--text-secondary)", fontSize: "0.85rem" }}>
          {t("termsP1")} <Link href="/terms" style={{ textDecoration: "underline" }}>{t("termsLink")}</Link> {t("termsP2")} <Link href="/privacy" style={{ textDecoration: "underline" }}>{t("privacyLink")}</Link>.
        </p>
      </div>
    </div>
  );
}
