import { Link } from "@/i18n/routing";
import { getTranslations } from "next-intl/server";
import { CancelForm } from "@/components/cancel-form";

export default async function CancelPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Cancel" });

  return (
    <div className="container" style={{ padding: "4rem 1rem", maxWidth: "600px", margin: "0 auto", textAlign: "center" }}>
      <div className="glass-card mb-4" style={{ padding: "3rem 2rem" }}>
        <h1 className="mb-2" style={{ fontSize: "2.5rem", color: "var(--brand-primary)" }}>{t("title")}</h1>
        <p className="mb-4" style={{ color: "var(--text-secondary)", fontSize: "1.1rem" }}>
          {t("desc1")}
        </p>

        <p className="mb-4" style={{ color: "var(--text)" }}>
          {t("desc2")}
        </p>

        <CancelForm t={t} />
      </div>

      <p style={{ fontSize: "0.9rem", color: "var(--text-secondary)" }}>
        {t("support1")} <br />
        {t("support2")}<a href="mailto:support@summaryvox.com" style={{ textDecoration: "underline" }}>support@summaryvox.com</a>
      </p>
    </div>
  );
}
