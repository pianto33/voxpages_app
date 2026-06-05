import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Preguntas Frecuentes | VoxPages',
  description: 'Respuestas a las consultas más habituales sobre VoxPages.',
};

export default function FAQPage() {
  return (
    <div className="container" style={{ padding: '4rem 1rem', maxWidth: '800px', margin: '0 auto' }}>
      <Link href="/" className="btn btn-outline mb-4" style={{ display: 'inline-block' }}>
        ← Volver al inicio
      </Link>
      
      <div className="text-center mb-4">
        <h1 style={{ fontSize: '2.5rem', color: 'var(--text-primary)' }}>
          Preguntas <span className="text-gradient">Frecuentes</span>
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', marginTop: '1rem' }}>
          Encuentra rápidamente respuestas a las dudas más comunes sobre nuestro servicio.
        </p>
      </div>

      <div className="faq-container" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', marginTop: '3rem' }}>
        
        {/* Question 1 */}
        <div className="glass-card" style={{ padding: '2rem', borderLeft: '4px solid var(--brand-primary)' }}>
          <h3 className="mb-2" style={{ color: 'var(--brand-primary-light)', fontSize: '1.3rem' }}>
            ¿A qué tengo acceso con mi suscripción?
          </h3>
          <p style={{ color: 'var(--text-secondary)', lineHeight: '1.7' }}>
            Tu acceso dependerá del plan que poseas. Con el <strong>Plan Gratuito</strong> puedes explorar la plataforma y acceder a un catálogo muy limitado de contenidos con funciones básicas. 
            Con la <strong>Suscripción Premium</strong>, desbloqueas el acceso ilimitado a todos nuestros resúmenes de libros (tanto en formado Audio de alta calidad como en PDF), 
            tienes habilitadas todas las funciones de reproducción avanzadas y cuentas con la posibilidad de <strong>descargar todo el catálogo</strong> para consumirlo sin conexión a internet.
          </p>
        </div>

        {/* Question 2 */}
        <div className="glass-card" style={{ padding: '2rem', borderLeft: '4px solid var(--brand-accent)' }}>
          <h3 className="mb-2" style={{ color: 'var(--brand-accent-light)', fontSize: '1.3rem' }}>
            ¿Cómo me suscribo?
          </h3>
          <p style={{ color: 'var(--text-secondary)', lineHeight: '1.7' }}>
            Suscribirse es muy sencillo. Primero debes crear una cuenta gratuita haciendo clic en el botón <strong>"Ingresar"</strong> (puedes usar tu correo o tu cuenta de Google). 
            Una vez dentro de la plataforma, ve a la sección de planes o a la configuración de tu cuenta y selecciona <strong>"Iniciar Prueba de 24hs"</strong> para el plan Premium.
            Te pediremos un método de pago, pero recuerda que <strong>no se te cobrará nada</strong> durante el primer día.
          </p>
        </div>

        {/* Question 3 */}
        <div className="glass-card" style={{ padding: '2rem', borderLeft: '4px solid var(--brand-primary)' }}>
          <h3 className="mb-2" style={{ color: 'var(--brand-primary-light)', fontSize: '1.3rem' }}>
            ¿Cómo me desuscribo?
          </h3>
          <p style={{ color: 'var(--text-secondary)', lineHeight: '1.7' }}>
            Puedes cancelar tu suscripción en cualquier momento y sin compromisos. 
            Dirígete a la opción <strong>"Quiero desuscribirme"</strong> en el menú superior (o haz clic en el enlace al pie de nuestra página). 
            Solo necesitarás ingresar tu correo electrónico y seguir los pasos indicados en pantalla. Al confirmar, detendrás inmediatamente los resúmenes y todos los cobros futuros automáticos. 
            Si cancelas dentro del período de prueba (primeras 24hs), el costo será absolutamente nulo.
          </p>
        </div>

        {/* Question 4 */}
        <div className="glass-card" style={{ padding: '2rem', borderLeft: '4px solid var(--brand-accent)' }}>
          <h3 className="mb-2" style={{ color: 'var(--brand-accent-light)', fontSize: '1.3rem' }}>
            ¿Tengo alguna suscripción activa?
          </h3>
          <p style={{ color: 'var(--text-secondary)', lineHeight: '1.7' }}>
            Para cerciorarte del estado de tu facturación, simplemente <Link href="/login" style={{ color: 'var(--brand-primary)', textDecoration: 'underline' }}>inicia sesión en tu cuenta</Link>. 
            Una vez dentro, dirígete a la sección de <strong>"Mi Perfil"</strong> o <strong>"Suscripción"</strong>. Allí podrás ver claramente si estás en un Plan Gratuito, si te encuentras transitando el período de prueba Premium de 24 horas, 
            o si tienes una membresía Premium activa y cuándo será la fecha de tu próximo cobro.
          </p>
        </div>

        {/* Question 5 */}
        <div className="glass-card" style={{ padding: '2rem', borderLeft: '4px solid var(--brand-primary)' }}>
          <h3 className="mb-2" style={{ color: 'var(--brand-primary-light)', fontSize: '1.3rem' }}>
            No sé con qué mail me suscribí
          </h3>
          <p style={{ color: 'var(--text-secondary)', lineHeight: '1.7' }}>
            ¡No te preocupes! La forma más rápida de averiguarlo es revisar las bandejas de entrada de todos tus correos electrónicos (incluyendo las carpetas de Spam o Promociones) 
            buscando la palabra <strong>"VoxPages"</strong>. 
            También intenta iniciar sesión con la opción "Continuar con Google". Si sigues sin poder ubicar la cuenta desde la cual te están cobrando, 
            escríbenos a <strong>help@support.voxpages.com</strong> con los últimos 4 dígitos de tu tarjeta y la fecha aproximada del cargo para que podamos localizar tu cuenta de inmediato.
          </p>
        </div>

      </div>
      
      <div className="text-center mt-4" style={{ paddingTop: '3rem' }}>
        <p style={{ color: 'var(--text-secondary)' }}>
          ¿Tienes alguna otra duda que no fue respondida aquí?
        </p>
        <a href="mailto:help@support.voxpages.com" className="btn btn-outline mt-2" style={{ display: 'inline-block' }}>
          Contáctanos por correo
        </a>
      </div>
    </div>
  );
}
