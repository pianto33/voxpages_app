import { Link } from '@/i18n/routing';
import { getTranslations } from 'next-intl/server';

export default async function SubscriptionPolicyPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'SubPolicy' });

  return (
    <div className="container" style={{ padding: '4rem 1rem', maxWidth: '800px', margin: '0 auto' }}>
      <Link href="/" className="btn btn-outline mb-4" style={{ display: 'inline-block' }}>
        {t('back')}
      </Link>
      
      <h1 className="mb-4" style={{ fontSize: '2.5rem', color: 'var(--brand-primary)' }}>{t('title')}</h1>

      <div className="content-section" style={{ display: 'flex', flexDirection: 'column', gap: '2rem', textAlign: 'justify' }}>
        <p style={{ fontSize: "1.1rem", color: "var(--text-secondary)" }}>
          {t('intro')}
        </p>
        
        <section>
          <h2 className="mb-2">{t('s1Title')}</h2>
          <p>{t('s1Text')}</p>
        </section>

        <section>
          <h2 className="mb-2">{t('s2Title')}</h2>
          <p>{t('s2Text')}</p>
        </section>

        <section>
          <h2 className="mb-2">{t('s3Title')}</h2>
          <p>{t('s3Text')}</p>
        </section>

        <section>
          <h2 className="mb-2">{t('s4Title')}</h2>
          <p>{t('s4Text')}</p>
        </section>

        <section>
          <h2 className="mb-2">{t('s5Title')}</h2>
          <p>{t('s5Text')}</p>
        </section>
      </div>
    </div>
  );
}
