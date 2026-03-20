import { Link } from "@/i18n/routing";
import { getTranslations } from "next-intl/server";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export default async function Home({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;

  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (user) {
    redirect(`/${locale}/home`);
  }

  const t = await getTranslations({ locale, namespace: "Landing" });

  return (
    <>
      {/* Hero Section */}
      <section className="hero text-center mb-4 mt-4" style={{ padding: "4rem 0" }}>
        <h1 style={{ fontSize: "3.5rem", marginBottom: "1.5rem" }}>
          {t('hero.title1')} <br />
          <span className="text-gradient">{t('hero.title2')}</span>
        </h1>
        <p style={{ fontSize: "1.25rem", color: "var(--text-secondary)", maxWidth: "600px", margin: "0 auto 2.5rem" }}>
          {t('hero.subtitle')}
        </p>
        <div className="d-flex justify-center gap-2" style={{ justifyContent: "center" }}>
          <Link href="/login" className="btn btn-primary">
            {t('hero.btnPrimary')}
          </Link>
          <Link href="/#features" className="btn btn-outline">
            {t('hero.btnSecondary')}
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="mb-4" style={{ padding: "4rem 0" }}>
        <h2 className="text-center mb-4" style={{ fontSize: "2.5rem" }}>{t('features.title')}</h2>
        <div className="d-flex gap-4" style={{ flexWrap: "wrap", justifyContent: "center" }}>
          <div className="glass-card" style={{ flex: "1 1 300px", minWidth: "280px" }}>
            <h3 className="mb-1" style={{ color: "var(--brand-primary-light)" }}>{t('features.f1Title')}</h3>
            <p style={{ color: "var(--text-secondary)" }}>{t('features.f1Desc')}</p>
          </div>
          <div className="glass-card" style={{ flex: "1 1 300px", minWidth: "280px" }}>
            <h3 className="mb-1" style={{ color: "var(--brand-accent-light)" }}>{t('features.f2Title')}</h3>
            <p style={{ color: "var(--text-secondary)" }}>{t('features.f2Desc')}</p>
          </div>
          <div className="glass-card" style={{ flex: "1 1 300px", minWidth: "280px" }}>
            <h3 className="mb-1" style={{ color: "var(--brand-primary-light)" }}>{t('features.f3Title')}</h3>
            <p style={{ color: "var(--text-secondary)" }}>{t('features.f3Desc')}</p>
          </div>
        </div>
      </section>

      {/* Engagement Section */}
      <section className="engagement-section text-center mb-4" style={{ padding: "5rem 2rem", background: "var(--gradient-main)", borderRadius: "24px", color: "white", boxShadow: "0 20px 40px rgba(0, 122, 110, 0.2)" }}>
        <h2 className="mb-2" style={{ fontSize: "2.5rem", color: "white" }}>{t('engagement.title')}</h2>
        <p style={{ fontSize: "1.2rem", maxWidth: "700px", margin: "0 auto 2rem", opacity: 0.9 }}>
          {t('engagement.description')}
        </p>
        <Link href="/login" className="btn btn-primary" style={{ background: "white", color: "var(--brand-primary)", border: "none", fontWeight: "bold", padding: "1rem 2rem", fontSize: "1.1rem" }}>
          {t('engagement.btn')}
        </Link>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="mb-4" style={{ padding: "4rem 0" }}>
        <h2 className="text-center mb-4" style={{ fontSize: "2.5rem" }}>{t('pricing.title')}</h2>
        <div className="d-flex gap-4" style={{ flexWrap: "wrap", justifyContent: "center" }}>
          <div className="glass-card text-center" style={{ flex: "1 1 300px", minWidth: "280px", maxWidth: "400px" }}>
            <h3 className="mb-1">{t('pricing.free.title')}</h3>
            <div className="mb-2">
              <span style={{ fontSize: "3rem", fontWeight: 800 }}>{t('pricing.free.price')}</span>
            </div>
            <ul style={{ listStyle: "none", padding: 0, marginBottom: "2rem", color: "var(--text-secondary)", textAlign: "left" }}>
              {t.raw('pricing.free.features').map((feature: string, idx: number) => (
                <li key={idx} className="mb-1">{feature}</li>
              ))}
            </ul>
            <Link href="/login" className="btn btn-outline" style={{ width: "100%" }}>{t('pricing.free.btn')}</Link>
          </div>
          <div className="glass-card text-center" style={{ flex: "1 1 300px", minWidth: "280px", maxWidth: "400px", borderColor: "var(--brand-primary)", boxShadow: "0 0 20px rgba(0, 122, 110, 0.2)", position: "relative" }}>
            <div style={{ position: "absolute", top: "-15px", right: "20px", background: "var(--gradient-main)", padding: "0.25rem 1rem", borderRadius: "20px", fontSize: "0.8rem", fontWeight: "bold" }}>{t('pricing.premium.tag')}</div>
            <h3 className="mb-1 text-gradient">{t('pricing.premium.title')}</h3>
            <div className="mb-2">
              <span style={{ fontSize: "2rem", fontWeight: 800 }}>{t('pricing.premium.price')}</span>
              <span style={{ color: "var(--text-secondary)", fontSize: "0.9rem" }}>{t('pricing.premium.period')}</span>
            </div>
            <ul style={{ listStyle: "none", padding: 0, marginBottom: "2rem", color: "var(--text-secondary)", textAlign: "left" }}>
              {t.raw('pricing.premium.features').map((feature: string, idx: number) => (
                <li key={idx} className="mb-1">{feature}</li>
              ))}
            </ul>
            <Link href="/login" className="btn btn-primary" style={{ width: "100%" }}>{t('pricing.premium.btn')}</Link>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="text-center glass-card" style={{ padding: "4rem 2rem", background: "rgba(0, 122, 110, 0.1)", borderColor: "rgba(0, 168, 150, 0.3)" }}>
        <h2 className="mb-2">{t('cta.title')}</h2>
        <p className="mb-4" style={{ color: "var(--text-secondary)" }}>{t('cta.description')}</p>
        <Link href="/login" className="btn btn-primary" style={{ fontSize: "1.2rem", padding: "1rem 2.5rem" }}>
          {t('cta.btn')}
        </Link>
      </section>
    </>
  );
}
