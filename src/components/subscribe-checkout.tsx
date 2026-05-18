"use client";

import { useState } from "react";
import { LogoutButton } from "@/components/logout-button";
import { getStoredPriceKey } from "@/components/price-key-capture";

interface SubscribeCheckoutProps {
  userName: string;
}

export function SubscribeCheckout({ userName }: SubscribeCheckoutProps) {
  const [loading, setLoading] = useState(false);

  async function handleCheckout() {
    setLoading(true);
    try {
      const priceKey = getStoredPriceKey(); // null if nothing stored
      const res = await fetch("/api/stripe/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ priceKey }),
      });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        alert("Error al iniciar el proceso de pago. Intenta de nuevo.");
        setLoading(false);
      }
    } catch {
      alert("Error de red. Intenta de nuevo.");
      setLoading(false);
    }
  }

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
              href="mailto:info@summaryvox.com?subject=Solicitud plan básico"
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
              <span className="subscribe-plan-amount">$29.99</span>
              <span className="subscribe-plan-period">/mes</span>
            </div>
            <ul className="subscribe-plan-features">
              <li>✓ Acceso ilimitado a todos los resúmenes</li>
              <li>✓ Audios de alta calidad</li>
              <li>✓ PDFs descargables</li>
              <li>✓ Nuevos títulos cada semana</li>
              <li>✓ <strong>24 horas de prueba GRATIS</strong></li>
            </ul>
            <button
              onClick={handleCheckout}
              disabled={loading}
              className="btn btn-primary subscribe-plan-btn"
              style={{ cursor: loading ? "not-allowed" : "pointer", opacity: loading ? 0.7 : 1 }}
            >
              {loading ? "Redirigiendo a Stripe..." : "Iniciar Prueba de 24hs"}
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="subscribe-footer">
          <p>
            ¿Tenés un código de acceso?{" "}
            <a href="mailto:info@summaryvox.com?subject=Tengo un código de acceso" style={{ color: "var(--brand-primary-light)", textDecoration: "underline" }}>
              Contactanos a info@summaryvox.com
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
