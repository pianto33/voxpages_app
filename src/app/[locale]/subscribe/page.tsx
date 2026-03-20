import { Link } from "@/i18n/routing";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { LogoutButton } from "@/components/logout-button";

export default async function SubscribePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;

  // Must be logged in to see this page
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  // If they already have a subscription, send them to the library
  const { data: sub } = await supabase
    .from("subscriptions")
    .select("status, current_period_end")
    .eq("user_id", user.id)
    .single();

  const isActive =
    sub &&
    (sub.status === "active" || sub.status === "trialing") &&
    (!sub.current_period_end || new Date(sub.current_period_end) > new Date());

  if (isActive) redirect(`/${locale}/home`);

  const userName = user.email?.split("@")[0] || "there";

  return (
    <div className="subscribe-page">
      <div className="subscribe-container">
        {/* Header */}
        <div className="subscribe-header">
          <span className="subscribe-badge">Solo queda un paso</span>
          <h1 className="subscribe-title">
            Hola, <span className="text-gradient">{userName}</span> 👋
          </h1>
          <p className="subscribe-subtitle">
            Tu cuenta está activa, pero aún no tienes acceso a la biblioteca.
            Elige un plan para comenzar hoy.
          </p>
        </div>

        {/* Plans */}
        <div className="subscribe-plans">
          {/* Free Plan */}
          <div className="subscribe-plan">
            <h3 className="subscribe-plan-title">Básico</h3>
            <div className="subscribe-plan-price">
              <span className="subscribe-plan-amount">Gratis</span>
            </div>
            <ul className="subscribe-plan-features">
              <li>✓ Acceso a 3 resúmenes gratuitos por mes</li>
              <li>✓ Formato PDF</li>
              <li>✗ Audios ilimitados</li>
              <li>✗ Categorías premium</li>
            </ul>
            <a
              href="mailto:support@summaryvox.com?subject=Solicitud plan básico"
              className="btn btn-outline subscribe-plan-btn"
            >
              Empezar gratis
            </a>
          </div>

          {/* Premium Plan */}
          <div className="subscribe-plan subscribe-plan-featured">
            <div className="subscribe-plan-tag">Recomendado</div>
            <h3 className="subscribe-plan-title text-gradient">Premium</h3>
            <div className="subscribe-plan-price">
              <span className="subscribe-plan-amount">$9</span>
              <span className="subscribe-plan-period">/mes</span>
            </div>
            <ul className="subscribe-plan-features">
              <li>✓ Acceso ilimitado a todos los resúmenes</li>
              <li>✓ Audios de alta calidad</li>
              <li>✓ PDFs descargables</li>
              <li>✓ Nuevos títulos cada semana</li>
            </ul>
            <a
              href="mailto:support@summaryvox.com?subject=Quiero suscribirme al plan Premium"
              className="btn btn-primary subscribe-plan-btn"
            >
              Suscribirme ahora
            </a>
          </div>
        </div>

        {/* Footer */}
        <div className="subscribe-footer">
          <p>
            ¿Tenés un código de acceso?{" "}
            <a href="mailto:support@summaryvox.com?subject=Tengo un código de acceso" style={{ color: "var(--brand-primary-light)", textDecoration: "underline" }}>
              Contactá soporte
            </a>
          </p>
          <p style={{ marginTop: "0.5rem" }}>
            <LogoutButton />
          </p>
        </div>
      </div>
    </div>
  );
}
