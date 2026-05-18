import { Link } from '@/i18n/routing';
import { getTranslations } from 'next-intl/server';

export default async function TermsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Terms' });

  const listStyle: React.CSSProperties = {
    listStyleType: 'disc',
    paddingLeft: '2rem',
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem',
    marginTop: '1rem',
  };

  return (
    <div className="container" style={{ padding: '4rem 1rem', maxWidth: '820px', margin: '0 auto' }}>
      <Link href="/" className="btn btn-outline mb-4" style={{ display: 'inline-block' }}>
        {t('back')}
      </Link>

      <h1 className="mb-4" style={{ fontSize: '2.5rem', color: 'var(--brand-primary)' }}>{t('title')}</h1>

      <div className="content-section" style={{ display: 'flex', flexDirection: 'column', gap: '2rem', textAlign: 'justify' }}>
        <section>
          <h2 className="mb-2">{t('s1Title')}</h2>
          <p>{t('s1Text')}</p>
        </section>

        <section>
          <h2 className="mb-2">{t('s2Title')}</h2>
          <p>{t('s2Text')}</p>
          <ul style={listStyle}>
            <li>{t('s2Li1')}</li>
            <li>{t('s2Li2')}</li>
            <li>{t('s2Li3')}</li>
            <li>{t('s2Li4')}</li>
          </ul>
        </section>

        <section>
          <h2 className="mb-2">{t('s3Title')}</h2>
          <p>{t('s3Text')}</p>
          <ul style={listStyle}>
            <li>{t('s3Li1')}</li>
            <li>{t('s3Li2')}</li>
            <li>{t('s3Li3')}</li>
            <li>{t('s3Li4')}</li>
          </ul>
          <h3 className="mt-4 mb-2" style={{ fontSize: '1.15rem' }}>{t('s3_1Title')}</h3>
          <p>{t('s3_1Text')}</p>
          <h3 className="mt-4 mb-2" style={{ fontSize: '1.15rem' }}>{t('s3_2Title')}</h3>
          <p>{t('s3_2Text')}</p>
        </section>

        <section>
          <h2 className="mb-2">{t('s4Title')}</h2>
          <h3 className="mt-2 mb-2" style={{ fontSize: '1.15rem' }}>{t('s4_1Title')}</h3>
          <ul style={listStyle}>
            <li>{t('s4_1Li1')}</li>
            <li>{t('s4_1Li2')}</li>
            <li>{t('s4_1Li3')}</li>
          </ul>
          <h3 className="mt-4 mb-2" style={{ fontSize: '1.15rem' }}>{t('s4_2Title')}</h3>
          <ul style={listStyle}>
            <li>{t('s4_2Li1')}</li>
            <li>{t('s4_2Li2')}</li>
            <li>{t('s4_2Li3')}</li>
            <li>{t('s4_2Li4')}</li>
            <li>{t('s4_2Li5')}</li>
          </ul>
        </section>

        <section>
          <h2 className="mb-2">{t('s5Title')}</h2>
          <ul style={listStyle}>
            <li>{t('s5Li1')}</li>
            <li>{t('s5Li2')}</li>
            <li>{t('s5Li3')}</li>
            <li>{t('s5Li4')}</li>
            <li>{t('s5Li5')}</li>
          </ul>
        </section>

        <section>
          <h2 className="mb-2" style={{ color: 'var(--brand-accent)' }}>{t('s6Title')}</h2>
          <p>{t('s6Text')}</p>
          <ul style={listStyle}>
            <li dangerouslySetInnerHTML={{ __html: t.raw('s6Li1') }} />
            <li dangerouslySetInnerHTML={{ __html: t.raw('s6Li2') }} />
            <li dangerouslySetInnerHTML={{ __html: t.raw('s6Li3') }} />
            <li dangerouslySetInnerHTML={{ __html: t.raw('s6Li4') }} />
            <li dangerouslySetInnerHTML={{ __html: t.raw('s6Li5') }} />
          </ul>
        </section>

        <section style={{
          padding: '1.5rem',
          border: '1px solid var(--surface-border)',
          borderRadius: 'var(--radius-md)',
          backgroundColor: 'rgba(0,0,0,0.15)',
        }}>
          <h2 className="mb-2" style={{ color: 'var(--brand-accent)' }}>{t('s7Title')}</h2>
          <p>{t('s7Text')}</p>
        </section>

        <section>
          <h2 className="mb-2">{t('s8Title')}</h2>
          <p>{t('s8Text')}</p>
          <ul style={listStyle}>
            <li dangerouslySetInnerHTML={{ __html: t.raw('s8Li1') }} />
            <li dangerouslySetInnerHTML={{ __html: t.raw('s8Li2') }} />
            <li dangerouslySetInnerHTML={{ __html: t.raw('s8Li3') }} />
          </ul>
          <p style={{ marginTop: '1rem', color: 'var(--text-secondary)' }}>{t('s8Note')}</p>
        </section>

        <section>
          <h2 className="mb-2">{t('s9Title')}</h2>
          <p>{t('s9Text')}</p>
          <p style={{ marginTop: '1rem', color: 'var(--text-secondary)' }}>{t('s9Note')}</p>
        </section>

        <section>
          <h2 className="mb-2">{t('s10Title')}</h2>
          <p>{t('s10Text')}</p>
          <ul style={listStyle}>
            <li>{t('s10Li1')}</li>
            <li>{t('s10Li2')}</li>
            <li>{t('s10Li3')}</li>
            <li>{t('s10Li4')}</li>
            <li>{t('s10Li5')}</li>
            <li>{t('s10Li6')}</li>
          </ul>
        </section>

        <section>
          <h2 className="mb-2">{t('s11Title')}</h2>
          <ul style={listStyle}>
            <li>{t('s11Li1')}</li>
            <li>{t('s11Li2')}</li>
            <li>{t('s11Li3')}</li>
            <li>{t('s11Li4')}</li>
          </ul>
        </section>

        <section>
          <h2 className="mb-2">{t('s12Title')}</h2>
          <p dangerouslySetInnerHTML={{ __html: t.raw('s12Text') }} />
        </section>

        <section>
          <h2 className="mb-2">{t('s13Title')}</h2>
          <p>{t('s13Text')}</p>
        </section>

        <section>
          <h2 className="mb-2">{t('s14Title')}</h2>
          <p>{t('s14Text')}</p>
        </section>

        <section>
          <h2 className="mb-2">{t('s15Title')}</h2>
          <p>{t('s15Text')}</p>
        </section>

        <section>
          <h2 className="mb-2">{t('s16Title')}</h2>
          <p>{t('s16Text')}</p>
        </section>

        <section>
          <h2 className="mb-2">{t('s17Title')}</h2>
          <p dangerouslySetInnerHTML={{ __html: t.raw('s17Text') }} />
        </section>
      </div>
    </div>
  );
}
