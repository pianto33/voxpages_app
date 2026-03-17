import { Link } from '@/i18n/routing';
import { getTranslations } from 'next-intl/server';

export default async function TermsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Terms' });

  return (
    <div className="container" style={{ padding: '4rem 1rem', maxWidth: '800px', margin: '0 auto' }}>
      <Link href="/" className="btn btn-outline mb-4" style={{ display: 'inline-block' }}>
        {t('back')}
      </Link>
      
      <h1 className="mb-4" style={{ fontSize: '2.5rem', color: 'var(--brand-primary)' }}>{t('title')}</h1>
      <p className="mb-4" style={{ color: 'var(--text-secondary)' }}>{t('updated')}{new Date().toLocaleDateString(locale)}</p>

      <div className="content-section" style={{ display: 'flex', flexDirection: 'column', gap: '2rem', textAlign: 'justify' }}>
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
          <p className="mb-2">{t('s3Text')}</p>
          <ul style={{ listStyleType: 'disc', paddingLeft: '2rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <li dangerouslySetInnerHTML={{ __html: t.raw('s3Li1') }} />
            <li dangerouslySetInnerHTML={{ __html: t.raw('s3Li2') }} />
          </ul>
        </section>

        <section>
          <h2 className="mb-2" style={{ color: 'var(--brand-accent)' }}>{t('s4Title')}</h2>
          <p className="mb-2">{t('s4Text')}</p>
          <ul style={{ listStyleType: 'disc', paddingLeft: '2rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <li dangerouslySetInnerHTML={{ __html: t.raw('s4Li1') }} />
            <li dangerouslySetInnerHTML={{ __html: t.raw('s4Li2') }} />
            <li dangerouslySetInnerHTML={{ __html: t.raw('s4Li3') }} />
            <li dangerouslySetInnerHTML={{ __html: t.raw('s4Li4') }} />
            <li dangerouslySetInnerHTML={{ __html: t.raw('s4Li5') }} />
          </ul>
        </section>

        <section>
          <h2 className="mb-2">{t('s5Title')}</h2>
          <p>{t('s5Text')}</p>
        </section>

        <section>
          <h2 className="mb-2">{t('s6Title')}</h2>
          <p>{t('s6Text')}</p>
        </section>

        <section>
          <h2 className="mb-2">{t('s7Title')}</h2>
          <p>{t('s7Text')}</p>
        </section>
      </div>
    </div>
  );
}
