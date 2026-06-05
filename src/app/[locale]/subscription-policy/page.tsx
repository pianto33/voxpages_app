import { Link } from '@/i18n/routing';
import { getTranslations } from 'next-intl/server';

export default async function SubscriptionPolicyPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'SubPolicy' });

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

      <div className="d-flex gap-2 mb-4" style={{ flexWrap: 'wrap' }}>
        <Link href="/cancel" className="btn btn-primary" style={{ padding: '0.7rem 1.4rem' }}>
          {t('ctaUnsub')}
        </Link>
        <a
          href="mailto:help@support.voxpages.com?subject=Solicitud de reembolso"
          className="btn btn-outline"
          style={{ padding: '0.7rem 1.4rem' }}
        >
          {t('ctaRefund')}
        </a>
      </div>

      <div className="content-section" style={{ display: 'flex', flexDirection: 'column', gap: '2rem', textAlign: 'justify' }}>
        <p style={{ fontSize: '1.05rem', color: 'var(--text-secondary)' }}>{t('intro')}</p>

        <section>
          <h2 className="mb-2">{t('s1Title')}</h2>
          <p>{t('s1Text')}</p>
          <ul style={listStyle}>
            <li>{t('s1Li1')}</li>
            <li>{t('s1Li2')}</li>
            <li>{t('s1Li3')}</li>
            <li>{t('s1Li4')}</li>
            <li>{t('s1Li5')}</li>
          </ul>
        </section>

        <section>
          <h2 className="mb-2">{t('s2Title')}</h2>
          <h3 className="mt-2 mb-2" style={{ fontSize: '1.15rem' }}>{t('s2_1Title')}</h3>
          <p>{t('s2_1Text')}</p>
          <h3 className="mt-4 mb-2" style={{ fontSize: '1.15rem' }}>{t('s2_2Title')}</h3>
          <ul style={listStyle}>
            <li dangerouslySetInnerHTML={{ __html: t.raw('s2_2Li1') }} />
            <li dangerouslySetInnerHTML={{ __html: t.raw('s2_2Li2') }} />
            <li dangerouslySetInnerHTML={{ __html: t.raw('s2_2Li3') }} />
            <li dangerouslySetInnerHTML={{ __html: t.raw('s2_2Li4') }} />
            <li dangerouslySetInnerHTML={{ __html: t.raw('s2_2Li5') }} />
          </ul>
        </section>

        <section>
          <h2 className="mb-2" style={{ color: 'var(--brand-accent)' }}>{t('s3Title')}</h2>
          <p>{t('s3Text')}</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '1rem' }}>
            <div style={{
              padding: '1.25rem',
              border: '1px solid var(--surface-border)',
              borderRadius: 'var(--radius-md)',
              backgroundColor: 'rgba(0,0,0,0.15)',
            }}>
              <h3 className="mb-2" style={{ fontSize: '1.1rem' }}>{t('s3aTitle')}</h3>
              <p>{t('s3aText')}</p>
            </div>
            <div style={{
              padding: '1.25rem',
              border: '1px solid var(--surface-border)',
              borderRadius: 'var(--radius-md)',
              backgroundColor: 'rgba(0,0,0,0.15)',
            }}>
              <h3 className="mb-2" style={{ fontSize: '1.1rem' }}>{t('s3bTitle')}</h3>
              <p dangerouslySetInnerHTML={{ __html: t.raw('s3bText') }} />
            </div>
            <div style={{
              padding: '1.25rem',
              border: '1px solid var(--surface-border)',
              borderRadius: 'var(--radius-md)',
              backgroundColor: 'rgba(0,0,0,0.15)',
            }}>
              <h3 className="mb-2" style={{ fontSize: '1.1rem' }}>{t('s3cTitle')}</h3>
              <p>{t('s3cText')}</p>
            </div>
          </div>
          <p style={{ marginTop: '1.25rem', color: 'var(--text-secondary)', fontStyle: 'italic' }}>{t('s3Note')}</p>
        </section>

        <section>
          <h2 className="mb-2">{t('s4Title')}</h2>
          <ul style={listStyle}>
            <li>{t('s4Li1')}</li>
            <li>{t('s4Li2')}</li>
            <li>{t('s4Li3')}</li>
            <li>{t('s4Li4')}</li>
            <li>{t('s4Li5')}</li>
          </ul>
        </section>

        <section id="refunds" style={{
          padding: '1.5rem',
          border: '1px solid var(--surface-border)',
          borderRadius: 'var(--radius-md)',
          backgroundColor: 'rgba(0,0,0,0.15)',
        }}>
          <h2 className="mb-2" style={{ color: 'var(--brand-accent)' }}>{t('s5Title')}</h2>
          <p>{t('s5Text')}</p>
          <ul style={listStyle}>
            <li dangerouslySetInnerHTML={{ __html: t.raw('s5Li1') }} />
            <li dangerouslySetInnerHTML={{ __html: t.raw('s5Li2') }} />
            <li dangerouslySetInnerHTML={{ __html: t.raw('s5Li3') }} />
            <li dangerouslySetInnerHTML={{ __html: t.raw('s5Li4') }} />
          </ul>
        </section>

        <section>
          <h2 className="mb-2">{t('s6Title')}</h2>
          <ul style={listStyle}>
            <li>{t('s6Li1')}</li>
            <li>{t('s6Li2')}</li>
            <li>{t('s6Li3')}</li>
            <li>{t('s6Li4')}</li>
          </ul>
        </section>

        <section>
          <h2 className="mb-2">{t('s7Title')}</h2>
          <ul style={listStyle}>
            <li>{t('s7Li1')}</li>
            <li>{t('s7Li2')}</li>
            <li>{t('s7Li3')}</li>
          </ul>
        </section>

        <section>
          <h2 className="mb-2">{t('s8Title')}</h2>
          <p>{t('s8Text')}</p>
          <ul style={listStyle}>
            <li>{t('s8Li1')}</li>
            <li>{t('s8Li2')}</li>
            <li>{t('s8Li3')}</li>
            <li>{t('s8Li4')}</li>
          </ul>
        </section>

        <section>
          <h2 className="mb-2">{t('s9Title')}</h2>
          <p dangerouslySetInnerHTML={{ __html: t.raw('s9Text') }} />
        </section>
      </div>
    </div>
  );
}
