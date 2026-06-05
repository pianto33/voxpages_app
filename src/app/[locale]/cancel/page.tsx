import { getTranslations } from "next-intl/server";
import { CancelForm } from "@/components/cancel-form";

export default async function CancelPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Cancel" });

  return (
    <div className="container" style={{ padding: "4rem 1rem", maxWidth: "640px", margin: "0 auto", textAlign: "center" }}>
      <div className="glass-card mb-4" style={{ padding: "3rem 2rem" }}>
        <h1 className="mb-2" style={{ fontSize: "2.5rem", color: "var(--brand-primary)" }}>{t("title")}</h1>
        <p className="mb-4" style={{ color: "var(--text-secondary)", fontSize: "1.05rem" }}>
          {t("desc1")}
        </p>

        <div
          style={{
            textAlign: "left",
            border: "1px solid var(--surface-border)",
            borderRadius: "var(--radius-md)",
            padding: "1.25rem 1.5rem",
            backgroundColor: "rgba(0,0,0,0.15)",
            marginBottom: "2rem",
          }}
        >
          <p style={{ fontWeight: 600, marginBottom: "0.75rem" }}>{t("reminderTitle")}</p>
          <ul style={{ listStyleType: "disc", paddingLeft: "1.5rem", display: "flex", flexDirection: "column", gap: "0.5rem" }}>
            <li dangerouslySetInnerHTML={{ __html: t.raw("li1") }} />
            <li dangerouslySetInnerHTML={{ __html: t.raw("li2") }} />
            <li dangerouslySetInnerHTML={{ __html: t.raw("li3") }} />
          </ul>
        </div>

        <p className="mb-4" style={{ color: "var(--text)" }}>
          {t("desc2")}
        </p>

        <CancelForm />
      </div>

      <p style={{ fontSize: "0.9rem", color: "var(--text-secondary)" }}>
        {t("support1")} <br />
        {t("support2")}
        <a href="mailto:help@voxpages.com" style={{ textDecoration: "underline" }}>help@voxpages.com</a>
      </p>
    </div>
  );
}
