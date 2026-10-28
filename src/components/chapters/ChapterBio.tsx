import React, { useState } from 'react';
import {
  PROFILE_INFO,
  LIFE_FOCUS_DATA,
  MILESTONES_LIST,
  CertificateImageItem,
} from '../../data/portfolioData';
import {
  BanyanIcon,
  SparklesIcon,
  DownloadIcon,
  ChevronRightIcon,
  CloseIcon,
} from '../icons/BotanicalIcons';

export const ChapterBio: React.FC = () => {
  const [showPhilosophy, setShowPhilosophy] = useState(false);
  // Maps milestone.title -> currently active certificate index (or undefined/null if collapsed)
  const [openCertificates, setOpenCertificates] = useState<Record<string, number | null>>({});
  // Optional full-size lightbox state when user clicks a certificate image to inspect closer
  const [lightboxCert, setLightboxCert] = useState<{
    milestoneTitle: string;
    cert: CertificateImageItem;
  } | null>(null);

  const toggleMilestoneCert = (milestoneTitle: string, index = 0) => {
    setOpenCertificates((prev) => {
      const current = prev[milestoneTitle];
      if (current !== undefined && current !== null) {
        return { ...prev, [milestoneTitle]: null };
      }
      return { ...prev, [milestoneTitle]: index };
    });
  };

  const selectMilestoneCertIndex = (milestoneTitle: string, index: number) => {
    setOpenCertificates((prev) => ({
      ...prev,
      [milestoneTitle]: index,
    }));
  };

  return (
    <div className="chapter-content">
      <header className="chapter-header">
        <span className="chapter-eyebrow">
          <BanyanIcon size={15} /> Island I · The Banyan Sanctuary
        </span>
        <h2 className="chapter-title">
          Autobiography &amp; Origins in the Living Sanctuary
        </h2>
        <p className="chapter-lead">
          {PROFILE_INFO.editorialQuote}
        </p>
      </header>

      {/* Split Grid: Narrative Autobiography + Student Specimen Card */}
      <div className="grid-bio-split" style={{ marginBottom: 'var(--space-8)' }}>
        <article className="botanical-card">
          <div className="card-content-body">
            <div className="badge-row">
              <span className="botanical-badge">Origin Narrative</span>
              <span className="botanical-badge warm">{PROFILE_INFO.location}</span>
            </div>
            <h3 style={{ fontSize: '1.45rem', marginTop: '0.25rem' }}>
              Rooted in Compassion, Guided by Observation
            </h3>
            {PROFILE_INFO.bioParagraphs.map((paragraph, idx) => (
              <p key={idx} style={{ color: 'var(--text-secondary)', fontSize: '0.96rem' }}>
                {paragraph}
              </p>
            ))}
          </div>

          <div className="card-content-footer">
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.75rem' }}>
              <button
                type="button"
                className="hint-switch-cta"
                onClick={() => setShowPhilosophy((prev) => !prev)}
              >
                <SparklesIcon size={14} />
                {showPhilosophy
                  ? 'Hide Guiding Engineering Philosophy'
                  : 'Reveal Guiding Engineering Philosophy'}
              </button>

              <a
                href={PROFILE_INFO.cvPdfPath}
                download="Charlone_Gianne_Cruz_CV.pdf"
                className="quick-jump-link"
              >
                <DownloadIcon size={14} /> Download Executive CV
              </a>
            </div>

            {showPhilosophy && (
              <blockquote
                style={{
                  marginTop: '0.5rem',
                  padding: '0.9rem 1.1rem',
                  borderLeft: '3px solid var(--accent-warm)',
                  background: 'var(--bg-secondary)',
                  borderRadius: '0 var(--radius-md) var(--radius-md) 0',
                  fontStyle: 'italic',
                  fontFamily: 'var(--font-serif)',
                  fontSize: '1.02rem',
                  color: 'var(--text-primary)',
                }}
              >
                &ldquo;{PROFILE_INFO.guidingPhilosophy}&rdquo;
              </blockquote>
            )}
          </div>
        </article>

        {/* Student Specimen Card (Strictly no Section F2 or Course Tags) */}
        <aside className="botanical-card">
          <div className="card-content-body">
            <div className="badge-row">
              <span className="botanical-badge">Field Specimen Dossier</span>
            </div>
            <h3 style={{ fontSize: '1.35rem', marginTop: '0.25rem' }}>
              {PROFILE_INFO.fullName}
            </h3>
            <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)' }}>
              {PROFILE_INFO.headline}
            </p>

            <div className="specimen-kv-list" style={{ marginTop: '0.75rem' }}>
              <div className="specimen-kv-row">
                <span className="specimen-kv-key">Institution</span>
                <span className="specimen-kv-val">{PROFILE_INFO.institutionShort}</span>
              </div>
              <div className="specimen-kv-row">
                <span className="specimen-kv-key">University</span>
                <span className="specimen-kv-val">{PROFILE_INFO.institution}</span>
              </div>
              <div className="specimen-kv-row">
                <span className="specimen-kv-key">Degree &amp; Standing</span>
                <span className="specimen-kv-val">{PROFILE_INFO.degree}</span>
              </div>
              <div className="specimen-kv-row">
                <span className="specimen-kv-key">Age</span>
                <span className="specimen-kv-val">{PROFILE_INFO.age} Years Old</span>
              </div>
              <div className="specimen-kv-row">
                <span className="specimen-kv-key">Primary Focus</span>
                <span className="specimen-kv-val">Applied ML &amp; Biomedical Telemetry</span>
              </div>
              <div className="specimen-kv-row" style={{ borderBottom: 'none' }}>
                <span className="specimen-kv-key">Base Coordinates</span>
                <span className="specimen-kv-val">{PROFILE_INFO.location}</span>
              </div>
            </div>
          </div>

          <div className="card-content-footer">
            <div className="badge-row">
              {PROFILE_INFO.passions.map((passion) => (
                <span key={passion} className="tech-pill">
                  {passion}
                </span>
              ))}
            </div>
          </div>
        </aside>
      </div>

      {/* Current Life Focus & Weekly Rhythm Distribution (35% / 30% / 15% / 15% / 5%) */}
      <section className="botanical-card" style={{ marginBottom: 'var(--space-8)' }}>
        <div className="card-content-body">
          <div className="badge-row">
            <span className="botanical-badge">Verified Rhythm</span>
            <span className="botanical-badge warm">100% Weekly Allocation</span>
          </div>
          <h3 style={{ fontSize: '1.4rem' }}>
            Current Life Focus &amp; Sanctuary Balance
          </h3>
          <p style={{ fontSize: '0.92rem', color: 'var(--text-secondary)' }}>
            A grounded look at how time is distributed across university studies,
            student leadership, caring for pet birds, tending plants, and personal
            life.
          </p>

          <div className="life-focus-chart-container" role="list" aria-label="Current Life Focus Distribution">
            {LIFE_FOCUS_DATA.map((item) => (
              <div key={item.pursuit} role="listitem" style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
                <div className="life-focus-row">
                  <span className="life-focus-label">{item.pursuit}</span>
                  <div className="life-focus-track" aria-hidden="true">
                    <div
                      className="life-focus-fill"
                      style={{ width: `${item.percentage}%` }}
                    />
                  </div>
                  <span className="life-focus-pct">{item.percentage}%</span>
                </div>
                <p className="life-focus-caption">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Verified Milestones & Certifications (Interactive Certificate Preview Grid) */}
      <section>
        <div style={{ marginBottom: 'var(--space-4)' }}>
          <span className="chapter-eyebrow">Verified Credentials</span>
          <h3 style={{ fontSize: '1.5rem', marginTop: '0.2rem' }}>
            Academic Honours, Competitions &amp; Certifications
          </h3>
          <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginTop: '0.25rem' }}>
            Click any milestone or certificate badge below to inspect the official verified certificate.
          </p>
        </div>

        <div className="grid-2col" style={{ alignItems: 'start' }}>
          {MILESTONES_LIST.map((milestone) => {
            const certificates = milestone.certificates ?? [];
            const activeCertIdx = openCertificates[milestone.title];
            const isOpen =
              activeCertIdx !== undefined &&
              activeCertIdx !== null &&
              certificates[activeCertIdx] !== undefined;
            const currentCert = isOpen ? certificates[activeCertIdx] : null;

            return (
              <article
                key={milestone.title}
                className="botanical-card"
                style={{
                  height: 'auto',
                  borderColor: isOpen ? 'var(--border-strong)' : undefined,
                }}
              >
                <div className="card-content-body">
                  <div className="badge-row" style={{ justifyContent: 'space-between' }}>
                    <span className="botanical-badge">{milestone.badge}</span>
                    <span className="tech-pill">{milestone.period}</span>
                  </div>
                  <h4 style={{ fontSize: '1.18rem', marginTop: '0.25rem' }}>
                    {milestone.title}
                  </h4>
                  <p style={{ fontSize: '0.84rem', fontWeight: 600, color: 'var(--accent-warm)' }}>
                    {milestone.organization}
                  </p>
                  <ul
                    style={{
                      paddingLeft: '1.15rem',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '0.35rem',
                      fontSize: '0.88rem',
                      color: 'var(--text-secondary)',
                    }}
                  >
                    {milestone.details.map((detailLine, idx) => (
                      <li key={idx}>{detailLine}</li>
                    ))}
                  </ul>
                </div>

                <div className="card-content-footer">
                  {/* Interactive Certificate Selector Pills + View Certificate Button */}
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      flexWrap: 'wrap',
                      gap: '0.5rem',
                    }}
                  >
                    <span
                      style={{
                        fontSize: '0.74rem',
                        fontWeight: 600,
                        letterSpacing: '0.04em',
                        color: 'var(--text-muted)',
                      }}
                    >
                      VERIFIED CREDENTIAL ({certificates.length}{' '}
                      {certificates.length === 1 ? 'CERTIFICATE' : 'CERTIFICATES'})
                    </span>

                    {certificates.length > 0 && (
                      <button
                        type="button"
                        className="hint-switch-cta"
                        onClick={() => toggleMilestoneCert(milestone.title, 0)}
                        aria-expanded={isOpen}
                      >
                        <span>
                          {isOpen
                            ? 'Hide Certificate'
                            : certificates.length > 1
                            ? `View Certificates (${certificates.length})`
                            : 'View Certificate'}
                        </span>
                        <span
                          style={{
                            display: 'inline-flex',
                            transition: 'transform 220ms ease',
                            transform: isOpen ? 'rotate(90deg)' : 'rotate(0deg)',
                          }}
                        >
                          <ChevronRightIcon size={14} />
                        </span>
                      </button>
                    )}
                  </div>

                  {/* Quick selector pills when multiple certificates exist */}
                  {certificates.length > 1 && (
                    <div className="badge-row" style={{ marginTop: '0.15rem' }}>
                      {certificates.map((cert, idx) => {
                        const isSelected = isOpen && activeCertIdx === idx;
                        return (
                          <button
                            key={cert.imageUrl}
                            type="button"
                            onClick={() => selectMilestoneCertIndex(milestone.title, idx)}
                            className={`filter-pill-btn ${isSelected ? 'active' : ''}`}
                            style={{
                              fontSize: '0.74rem',
                              padding: '0.28rem 0.68rem',
                            }}
                          >
                            {cert.label}
                          </button>
                        );
                      })}
                    </div>
                  )}

                  {/* Expandable Certificate Image Preview Panel */}
                  {isOpen && currentCert && (
                    <div
                      style={{
                        marginTop: '0.5rem',
                        padding: '0.85rem',
                        borderRadius: 'var(--radius-md)',
                        background: 'var(--bg-secondary)',
                        border: '1px solid var(--border-strong)',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '0.65rem',
                      }}
                    >
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          gap: '0.5rem',
                          flexWrap: 'wrap',
                        }}
                      >
                        <span
                          style={{
                            fontSize: '0.8rem',
                            fontWeight: 600,
                            color: 'var(--text-primary)',
                          }}
                        >
                          {currentCert.label}
                        </span>
                        <button
                          type="button"
                          className="quick-jump-link"
                          style={{ fontSize: '0.72rem', padding: '0.24rem 0.65rem' }}
                          onClick={() =>
                            setLightboxCert({
                              milestoneTitle: milestone.title,
                              cert: currentCert,
                            })
                          }
                        >
                          Enlarge Certificate
                        </button>
                      </div>

                      <button
                        type="button"
                        onClick={() =>
                          setLightboxCert({
                            milestoneTitle: milestone.title,
                            cert: currentCert,
                          })
                        }
                        style={{
                          display: 'block',
                          width: '100%',
                          padding: 0,
                          border: '1px solid var(--border-subtle)',
                          borderRadius: 'var(--radius-sm)',
                          overflow: 'hidden',
                          background: 'var(--bg-primary)',
                          cursor: 'zoom-in',
                        }}
                        title="Click to enlarge certificate"
                      >
                        <img
                          src={currentCert.imageUrl}
                          alt={currentCert.label}
                          loading="lazy"
                          style={{
                            display: 'block',
                            width: '100%',
                            maxHeight: '340px',
                            objectFit: 'contain',
                            background: 'var(--bg-primary)',
                          }}
                        />
                      </button>
                    </div>
                  )}
                </div>
              </article>
            );
          })}
        </div>
      </section>

      {/* Sleek Lightbox Overlay for Full-Resolution Certificate Inspection */}
      {lightboxCert && (
        <div
          className="flight-controls-overlay-backdrop"
          role="dialog"
          aria-modal="true"
          aria-label={lightboxCert.cert.label}
          onClick={() => setLightboxCert(null)}
          style={{ zIndex: 220 }}
        >
          <div
            className="flight-controls-guide-card"
            onClick={(e) => e.stopPropagation()}
            style={{
              width: 'min(860px, 94vw)',
              maxHeight: '90dvh',
              padding: '1.35rem 1.5rem',
              gap: '0.9rem',
              overflow: 'hidden',
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '1rem',
              }}
            >
              <div>
                <span className="chapter-eyebrow" style={{ fontSize: '0.68rem' }}>
                  {lightboxCert.milestoneTitle}
                </span>
                <h4 style={{ fontSize: '1.15rem', marginTop: '0.15rem' }}>
                  {lightboxCert.cert.label}
                </h4>
              </div>
              <button
                type="button"
                className="hud-icon-btn"
                onClick={() => setLightboxCert(null)}
                aria-label="Close certificate preview"
              >
                <CloseIcon size={16} />
              </button>
            </div>

            <div
              style={{
                overflow: 'auto',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--border-subtle)',
                background: 'var(--bg-primary)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '0.5rem',
              }}
            >
              <img
                src={lightboxCert.cert.imageUrl}
                alt={lightboxCert.cert.label}
                style={{
                  maxWidth: '100%',
                  maxHeight: '72dvh',
                  objectFit: 'contain',
                  borderRadius: 'var(--radius-sm)',
                }}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
