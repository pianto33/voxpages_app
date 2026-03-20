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
        emailRedirectTo: `${window.location.origin}/auth/callback?next=/home`,
      },
    });

    if (error) {
      setMessage({ text: error.message, type: "error" });
    } else {
      setMessage({ text: t("successMagic"), type: "success" });
    }
    setLoading(false);
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
