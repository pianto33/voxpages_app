import { Link } from '@/i18n/routing';
import { getTranslations } from 'next-intl/server';

export default async function PrivacyPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Privacy' });

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
        <p style={{ fontSize: '1.05rem', color: 'var(--text-secondary)' }}>{t('intro')}</p>

        <section>
          <h2 className="mb-2">{t('s1Title')}</h2>
          <p>{t('s1Text')}</p>
          <ul style={listStyle}>
            <li dangerouslySetInnerHTML={{ __html: t.raw('s1Li1') }} />
            <li dangerouslySetInnerHTML={{ __html: t.raw('s1Li2') }} />
            <li dangerouslySetInnerHTML={{ __html: t.raw('s1Li3') }} />
            <li dangerouslySetInnerHTML={{ __html: t.raw('s1Li4') }} />
          </ul>
        </section>

        <section>
          <h2 className="mb-2">{t('s2Title')}</h2>
          <p>{t('s2Text')}</p>
          <ul style={listStyle}>
            <li>{t('s2Li1')}</li>
            <li>{t('s2Li2')}</li>
            <li>{t('s2Li3')}</li>
            <li>{t('s2Li4')}</li>
            <li>{t('s2Li5')}</li>
          </ul>
        </section>

        <section>
          <h2 className="mb-2">{t('s3Title')}</h2>
          <p>{t('s3Text')}</p>
          <ul style={listStyle}>
            <li dangerouslySetInnerHTML={{ __html: t.raw('s3Li1') }} />
            <li dangerouslySetInnerHTML={{ __html: t.raw('s3Li2') }} />
            <li dangerouslySetInnerHTML={{ __html: t.raw('s3Li3') }} />
            <li dangerouslySetInnerHTML={{ __html: t.raw('s3Li4') }} />
          </ul>
        </section>

        <section>
          <h2 className="mb-2">{t('s4Title')}</h2>
          <p>{t('s4Text')}</p>
          <ul style={listStyle}>
            <li dangerouslySetInnerHTML={{ __html: t.raw('s4Li1') }} />
            <li dangerouslySetInnerHTML={{ __html: t.raw('s4Li2') }} />
            <li dangerouslySetInnerHTML={{ __html: t.raw('s4Li3') }} />
            <li dangerouslySetInnerHTML={{ __html: t.raw('s4Li4') }} />
            <li dangerouslySetInnerHTML={{ __html: t.raw('s4Li5') }} />
          </ul>
          <p style={{ marginTop: '1rem', color: 'var(--text-secondary)' }}>{t('s4Note')}</p>
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
          <ul style={listStyle}>
            <li dangerouslySetInnerHTML={{ __html: t.raw('s7Li1') }} />
            <li dangerouslySetInnerHTML={{ __html: t.raw('s7Li2') }} />
            <li dangerouslySetInnerHTML={{ __html: t.raw('s7Li3') }} />
            <li dangerouslySetInnerHTML={{ __html: t.raw('s7Li4') }} />
            <li dangerouslySetInnerHTML={{ __html: t.raw('s7Li5') }} />
            <li dangerouslySetInnerHTML={{ __html: t.raw('s7Li6') }} />
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
            <li>{t('s8Li5')}</li>
            <li>{t('s8Li6')}</li>
            <li>{t('s8Li7')}</li>
          </ul>
          <p style={{ marginTop: '1rem', color: 'var(--text-secondary)' }}>{t('s8Note')}</p>
        </section>

        <section>
          <h2 className="mb-2">{t('s9Title')}</h2>
          <p>{t('s9Text')}</p>
        </section>

        <section>
          <h2 className="mb-2">{t('s10Title')}</h2>
          <p dangerouslySetInnerHTML={{ __html: t.raw('s10Text') }} />
        </section>
      </div>
    </div>
  );
}
