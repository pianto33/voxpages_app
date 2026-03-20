import "./globals.css";
import { Link } from "@/i18n/routing";
import { ReactNode } from "react";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations } from "next-intl/server";
import { createClient } from "@/lib/supabase/server";
import { LogoutButton } from "@/components/logout-button";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Layout" });
  return {
    title: t("title"),
    description: t("description"),
  };
}

export default async function RootLayout({ 
  children, 
  params 
}: { 
  children: ReactNode, 
  params: Promise<{ locale: string }> 
}) {
  const { locale } = await params;
  const messages = await getMessages();
  const t = await getTranslations({ locale, namespace: "Layout" });

  let user = null;
  try {
    const supabase = await createClient();
    const { data } = await supabase.auth.getUser();
    user = data.user;
  } catch {
    // If Supabase is unreachable, render layout as logged-out
  }

  return (
    <html lang={locale}>
      <body>
        <NextIntlClientProvider messages={messages}>
          <nav className="navbar">
            <div className="container navbar-content">
              <Link href={user ? "/home" : "/"} className="logo d-flex align-center gap-2">
                <img src="/logo-text.png" alt="SummaryVox Logo" height="40" style={{ objectFit: 'contain' }} />
              </Link>
              <div className="nav-links">
                <Link href="/cancel" className="nav-link" style={{ color: "var(--brand-accent)", fontWeight: "bold" }}>{t("nav.unsubscribe")}</Link>
                {!user && <Link href="/#features" className="nav-link">{t("nav.features")}</Link>}
                {!user && <Link href="/#pricing" className="nav-link">{t("nav.pricing")}</Link>}
                
                {user ? (
                  <div className="d-flex gap-2">
                    <Link href="/home" className="btn btn-outline" style={{ padding: "0.5rem 1rem", fontSize: "0.9rem", color: "var(--brand-primary-light)", borderColor: "var(--brand-primary-light)" }}>
                      Mi Biblioteca
                    </Link>
                    <LogoutButton />
                  </div>
                ) : (
                  <Link href="/login" className="btn btn-outline" style={{ padding: "0.5rem 1rem", fontSize: "0.9rem" }}>
                    {t("nav.login")}
                  </Link>
                )}
            </div>
          </div>
        </nav>

        <main className="main-content container">
          {children}
        </main>

          <footer className="footer">
          <div className="container footer-content">
            <div className="footer-col" style={{ flex: 1, minWidth: "250px" }}>
              <h4>SummaryVox</h4>
              <p style={{ color: "var(--text-secondary)", fontSize: "0.9rem" }}>
                {t("footer.description")}
              </p>
            </div>
            <div className="footer-col">
              <h4>{t("footer.product")}</h4>
              <Link href="/">{t("footer.home")}</Link>
              <Link href="/#pricing">{t("footer.plans")}</Link>
            </div>
            <div className="footer-col">
              <h4>{t("footer.legal")}</h4>
              <Link href="/terms">{t("footer.terms")}</Link>
              <Link href="/privacy">{t("footer.privacy")}</Link>
              <Link href="/subscription-policy">{t("footer.subscriptionPolicy")}</Link>
            </div>
            <div className="footer-col">
              <h4>{t("footer.support")}</h4>
              <Link href="/cancel" style={{ color: "var(--brand-accent)" }}>{t("footer.cancelSubscription")}</Link>
              <Link href="/faq">{t("footer.faq")}</Link>
              <Link href="mailto:support@summaryvox.com">soporte@summaryvox.com</Link>
            </div>
          </div>
          <div className="container" style={{ marginTop: "3rem", paddingTop: "2rem", borderTop: "1px solid var(--surface-border)", textAlign: "center", color: "var(--text-secondary)", fontSize: "0.85rem" }}>
            &copy; {new Date().getFullYear()} SummaryVox. {t("footer.rights")}
          </div>
        </footer>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
