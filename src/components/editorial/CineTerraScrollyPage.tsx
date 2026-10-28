import React, { useEffect, useRef, useState, useMemo } from 'react';
import {
  PROFILE_INFO,
  LIFE_FOCUS_DATA,
  MILESTONES_LIST,
  SKILLS_INVENTORY,
  PROJECTS_LIST,
  MilestoneItem,
  CertificateImageItem,
} from '../../data/portfolioData';
import {
  CompassIcon,
  DownloadIcon,
  SparklesIcon,
  ExternalLinkIcon,
  ChevronRightIcon,
  CloseIcon,
} from '../icons/BotanicalIcons';

interface CineTerraScrollyPageProps {
  onSwitchTo3D: () => void;
}

interface ScenicChapterMeta {
  index: number;
  id: string;
  chapterTag: string;
  topicTitle: string;
  scenicPlace: string;
  alignment: 'center';
  backdropStyle: string;
}

const SCENIC_CHAPTERS: ScenicChapterMeta[] = [
  {
    index: 0,
    id: 'scenic-topic-0',
    chapterTag: 'Chapter 01 · Origin & Roots',
    topicTitle: 'Autobiography & Specimen',
    scenicPlace: 'The Ancient Banyan Sanctuary · Cebu Highlands',
    alignment: 'center',
    backdropStyle: `linear-gradient(135deg, rgba(21, 38, 28, 0.35), rgba(180, 83, 9, 0.18)), url('https://images.unsplash.com/photo-1511497584788-876760111969?auto=format&fit=crop&w=2000&q=85')`,
  },
  {
    index: 1,
    id: 'scenic-topic-1',
    chapterTag: 'Chapter 02 · Weekly Rhythm',
    topicTitle: 'Life Focus & Milestones',
    scenicPlace: 'Sunlit Botanical Terrace & Aviary Canopy',
    alignment: 'center',
    backdropStyle: `linear-gradient(135deg, rgba(27, 59, 43, 0.32), rgba(194, 125, 56, 0.22)), url('https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=2000&q=85')`,
  },
  {
    index: 2,
    id: 'scenic-topic-2',
    chapterTag: 'Chapter 03 · Capabilities',
    topicTitle: 'Technical Inventory',
    scenicPlace: 'The Astrolabe Observatory · Alpine Ridge',
    alignment: 'center',
    backdropStyle: `linear-gradient(135deg, rgba(15, 29, 21, 0.38), rgba(46, 90, 68, 0.25)), url('https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=2000&q=85')`,
  },
  {
    index: 3,
    id: 'scenic-topic-3',
    chapterTag: 'Chapter 04 · Engineering Canon',
    topicTitle: 'Top 10 Systems',
    scenicPlace: 'PAROLA Lighthouse Spire · Visayan Horizon',
    alignment: 'center',
    backdropStyle: `linear-gradient(135deg, rgba(15, 29, 21, 0.36), rgba(180, 83, 9, 0.22)), url('https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=2000&q=85')`,
  },
  {
    index: 4,
    id: 'scenic-topic-4',
    chapterTag: 'Chapter 05 · Direct Dispatch',
    topicTitle: 'Contact & Executive CV',
    scenicPlace: 'The Carrier Perch Pavilion · Golden Dusk',
    alignment: 'center',
    backdropStyle: `linear-gradient(135deg, rgba(24, 34, 28, 0.38), rgba(194, 125, 56, 0.25)), url('https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=2000&q=85')`,
  },
];

const FALLBACK_CERTIFICATES_BY_INDEX: Record<number, CertificateImageItem[]> = {
  0: [
    {
      label: 'Top 25 Regional Finalist Certificate',
      imageUrl: './certificates/psc-award-1.png',
    },
    {
      label: 'Best Logo Design Award Certificate',
      imageUrl: './certificates/psc-award-2.png',
    },
  ],
  1: [
    {
      label: 'Workshop 1: Human-Centered AI Design',
      imageUrl: './certificates/aifest-workshop-1.png',
    },
    {
      label: 'Workshop 2: Technical System Architecture',
      imageUrl: './certificates/aifest-workshop-2.png',
    },
    {
      label: 'Webinar 3: Agile Pitching & Venture Strategy',
      imageUrl: './certificates/aifest-webinar-3.png',
    },
  ],
  2: [
    {
      label: 'Cebu ICT Student Congress Certificate',
      imageUrl: './certificates/psite-congress-2026.png',
    },
  ],
  3: [
    {
      label: 'AI Ready ASEAN Official Certificate',
      imageUrl: './certificates/asean-ai-ready.png',
    },
  ],
};

function getMilestoneCertificates(
  milestone: MilestoneItem,
  idx: number
): CertificateImageItem[] {
  if (milestone.certificates && milestone.certificates.length > 0) {
    return milestone.certificates;
  }
  return FALLBACK_CERTIFICATES_BY_INDEX[idx] ?? [];
}

export const CineTerraScrollyPage: React.FC<CineTerraScrollyPageProps> = ({
  onSwitchTo3D,
}) => {
  const [activeChapterIndex, setActiveChapterIndex] = useState<number>(0);
  const [showPhilosophy, setShowPhilosophy] = useState<boolean>(false);
  const [selectedSkillDomain, setSelectedSkillDomain] =
    useState<string>('All Domains');
  const [selectedProjectCategory, setSelectedProjectCategory] =
    useState<string>('All Systems');

  // Collapsible state for Top 10 Systems (all collapsed by default so it's never overwhelming)
  const [expandedProjectIds, setExpandedProjectIds] = useState<string[]>([]);

  // Certificate Viewer state for Chapter 02 Verified Milestones
  const [selectedMilestoneIdx, setSelectedMilestoneIdx] = useState<
    number | null
  >(null);
  const [selectedCertTabIdx, setSelectedCertTabIdx] = useState<number>(0);
  const [isCertLightboxOpen, setIsCertLightboxOpen] = useState<boolean>(false);

  // Dispatch Form State
  const [senderName, setSenderName] = useState('');
  const [senderEmail, setSenderEmail] = useState('');
  const [topic, setTopic] = useState('Research & Biomedical AI Collaboration');
  const [message, setMessage] = useState('');
  const [submittedAt, setSubmittedAt] = useState<string | null>(null);

  const sectionRefs = useRef<(HTMLElement | null)[]>([]);

  // IntersectionObserver to track active chapter and cross-dissolve full-bleed scenery
  useEffect(() => {
    const sections = sectionRefs.current.filter(
      (el): el is HTMLElement => el !== null
    );
    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idxAttr = entry.target.getAttribute('data-chapter-index');
            if (idxAttr !== null) {
              const parsed = parseInt(idxAttr, 10);
              if (!Number.isNaN(parsed)) {
                setActiveChapterIndex(parsed);
              }
            }
          }
        });
      },
      {
        root: null,
        rootMargin: '-28% 0px -28% 0px',
        threshold: 0.08,
      }
    );

    sections.forEach((sec) => observer.observe(sec));

    return () => {
      observer.disconnect();
    };
  }, []);

  // Close certificate lightbox on Escape key
  useEffect(() => {
    if (!isCertLightboxOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsCertLightboxOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isCertLightboxOpen]);

  const jumpToChapter = (index: number) => {
    const target = sectionRefs.current[index];
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const skillDomains = useMemo(() => {
    const unique = Array.from(new Set(SKILLS_INVENTORY.map((s) => s.domain)));
    return ['All Domains', ...unique];
  }, []);

  const filteredSkills = useMemo(() => {
    if (selectedSkillDomain === 'All Domains') return SKILLS_INVENTORY;
    return SKILLS_INVENTORY.filter((s) => s.domain === selectedSkillDomain);
  }, [selectedSkillDomain]);

  const projectCategories = useMemo<string[]>(() => {
    const unique = Array.from(new Set(PROJECTS_LIST.map((p) => p.category)));
    return ['All Systems', ...unique];
  }, []);

  const filteredProjects = useMemo(() => {
    if (selectedProjectCategory === 'All Systems') return PROJECTS_LIST;
    return PROJECTS_LIST.filter((p) => p.category === selectedProjectCategory);
  }, [selectedProjectCategory]);

  const toggleProjectExpand = (projectId: string) => {
    setExpandedProjectIds((prev) =>
      prev.includes(projectId)
        ? prev.filter((id) => id !== projectId)
        : [...prev, projectId]
    );
  };

  const allFilteredExpanded =
    filteredProjects.length > 0 &&
    filteredProjects.every((p) => expandedProjectIds.includes(p.id));

  const handleToggleAllProjects = () => {
    if (allFilteredExpanded) {
      setExpandedProjectIds((prev) =>
        prev.filter((id) => !filteredProjects.some((p) => p.id === id))
      );
    } else {
      const next = new Set([
        ...expandedProjectIds,
        ...filteredProjects.map((p) => p.id),
      ]);
      setExpandedProjectIds(Array.from(next));
    }
  };

  const handleSelectMilestone = (idx: number, openModal = false) => {
    if (selectedMilestoneIdx === idx && !openModal) {
      setIsCertLightboxOpen(true);
      return;
    }
    setSelectedMilestoneIdx(idx);
    setSelectedCertTabIdx(0);
    if (openModal) {
      setIsCertLightboxOpen(true);
    }
  };

  const activeMilestone =
    selectedMilestoneIdx !== null
      ? MILESTONES_LIST[selectedMilestoneIdx]
      : null;
  const activeMilestoneCerts =
    selectedMilestoneIdx !== null && activeMilestone
      ? getMilestoneCertificates(activeMilestone, selectedMilestoneIdx)
      : [];
  const activeCertItem =
    activeMilestoneCerts[selectedCertTabIdx] ?? activeMilestoneCerts[0] ?? null;

  const handleDispatchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!senderName.trim() || !senderEmail.trim() || !message.trim()) return;
    setSubmittedAt(
      new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    );
  };

  return (
    <div className="scenery-page-wrapper">
      {/* 1. FIXED FULL-BLEED SCENERY CONTAINER (Cross-dissolves as user scrolls between topics) */}
      <div className="scenery-fixed-backdrop" aria-hidden="true">
        {SCENIC_CHAPTERS.map((chap) => {
          const isActive = chap.index === activeChapterIndex;
          return (
            <div
              key={chap.id}
              className={`stage-backdrop ${
                isActive ? 'stage-backdrop--active' : ''
              }`}
              style={{ backgroundImage: chap.backdropStyle }}
            />
          );
        })}
        <div className="stage-overlay stage-overlay--top" />
        <div className="stage-overlay stage-overlay--ambient" />
        <div className="stage-overlay stage-overlay--bottom" />
      </div>

      {/* 2. FLOATING CHAPTER PROGRESS DOCK (Right Side, CineTerra Style) */}
      <aside
        className="scenery-floating-dock"
        aria-label="Scenic Topics Progress"
      >
        <div className="scenery-dock-header">
          <span className="scenery-dock-label">SANCTUARY JOURNEY</span>
          <span className="scenery-dock-count">
            0{activeChapterIndex + 1} / 0{SCENIC_CHAPTERS.length}
          </span>
        </div>

        <nav className="scenery-dock-nav">
          {SCENIC_CHAPTERS.map((chap) => {
            const isActive = chap.index === activeChapterIndex;
            return (
              <button
                key={chap.id}
                type="button"
                className={`scenery-dock-dot ${
                  isActive ? 'scenery-dock-dot--active' : ''
                }`}
                onClick={() => jumpToChapter(chap.index)}
                title={`${chap.chapterTag}: ${chap.topicTitle}`}
              >
                <span className="scenery-dock-dot__bullet" />
                <span className="scenery-dock-dot__text">
                  <span className="scenery-dock-dot__topic">
                    {chap.topicTitle}
                  </span>
                  <span className="scenery-dock-dot__place">
                    {chap.scenicPlace.split('·')[0].trim()}
                  </span>
                </span>
              </button>
            );
          })}
        </nav>

        <button
          type="button"
          className="hint-switch-cta"
          style={{ justifyContent: 'center', width: '100%', padding: '0.5rem' }}
          onClick={onSwitchTo3D}
        >
          <CompassIcon size={14} />
          <span>Enter 3D Bird Flight</span>
        </button>
      </aside>

      {/* 3. SCROLL TRACK: 5 UNIFORMLY ALIGNED SCENIC CHAPTERS */}
      <main className="scenery-scroll-track">
        {/* ====================================================================
            TOPIC 01: AUTOBIOGRAPHY & STUDENT SPECIMEN DOSSIER
            ==================================================================== */}
        <section
          ref={(el) => {
            sectionRefs.current[0] = el;
          }}
          id="scenic-topic-0"
          data-chapter-index="0"
          className="scenery-scroll-section scenery-scroll-section--center"
          aria-label="Chapter 01: Autobiography and Origins"
        >
          <article className="scenery-story-card">
            <div className="scenery-card-badge-row">
              <span className="scenery-card-chapter-pill">
                {SCENIC_CHAPTERS[0].chapterTag}
              </span>
              <span className="scenery-card-place-pill">
                {PROFILE_INFO.institutionShort} · {PROFILE_INFO.degree}
              </span>
            </div>

            <h1 className="scenery-card-title">{PROFILE_INFO.fullName}</h1>
            <p className="scenery-card-subtitle">{PROFILE_INFO.headline}</p>

            <blockquote
              style={{
                padding: '0.85rem 1.15rem',
                borderLeft: '3px solid var(--accent-warm)',
                background: 'var(--bg-secondary)',
                borderRadius: '0 var(--radius-md) var(--radius-md) 0',
                fontFamily: 'var(--font-serif)',
                fontStyle: 'italic',
                fontSize: '1.04rem',
                color: 'var(--text-primary)',
              }}
            >
              &ldquo;{PROFILE_INFO.editorialQuote}&rdquo;
            </blockquote>

            <div className="grid-bio-split" style={{ marginTop: '0.25rem' }}>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.75rem',
                }}
              >
                {PROFILE_INFO.bioParagraphs.map((para, i) => (
                  <p
                    key={i}
                    style={{
                      fontSize: '0.94rem',
                      color: 'var(--text-secondary)',
                    }}
                  >
                    {para}
                  </p>
                ))}
              </div>

              <div
                style={{
                  padding: '1.25rem',
                  borderRadius: 'var(--radius-lg)',
                  background: 'var(--bg-secondary)',
                  border: '1px solid var(--border-subtle)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  gap: '1rem',
                }}
              >
                <div>
                  <span
                    className="botanical-badge"
                    style={{ marginBottom: '0.6rem' }}
                  >
                    Specimen Dossier
                  </span>
                  <div className="specimen-kv-list">
                    <div className="specimen-kv-row">
                      <span className="specimen-kv-key">University</span>
                      <span className="specimen-kv-val">
                        {PROFILE_INFO.institution}
                      </span>
                    </div>
                    <div className="specimen-kv-row">
                      <span className="specimen-kv-key">Degree</span>
                      <span className="specimen-kv-val">
                        {PROFILE_INFO.degree}
                      </span>
                    </div>
                    <div className="specimen-kv-row">
                      <span className="specimen-kv-key">Location</span>
                      <span className="specimen-kv-val">
                        {PROFILE_INFO.location}
                      </span>
                    </div>
                    <div
                      className="specimen-kv-row"
                      style={{ borderBottom: 'none' }}
                    >
                      <span className="specimen-kv-key">Sanctuary Focus</span>
                      <span className="specimen-kv-val">
                        Applied AI · Birds · Botany
                      </span>
                    </div>
                  </div>
                </div>

                <div className="badge-row">
                  {PROFILE_INFO.passions.map((p) => (
                    <span key={p} className="tech-pill">
                      {p}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                flexWrap: 'wrap',
              }}
            >
              <button
                type="button"
                className="primary-action-btn"
                onClick={() => jumpToChapter(3)}
              >
                <span>Explore Top 10 Systems</span>
              </button>

              <button
                type="button"
                className="quick-jump-link"
                onClick={() => setShowPhilosophy((prev) => !prev)}
              >
                <SparklesIcon size={14} />
                <span>
                  {showPhilosophy
                    ? 'Hide Guiding Philosophy'
                    : 'Reveal Guiding Philosophy'}
                </span>
              </button>

              <a
                href={PROFILE_INFO.cvPdfPath}
                download="Charlone_Gianne_Cruz_CV.pdf"
                className="quick-jump-link"
              >
                <DownloadIcon size={14} />
                <span>Download Executive CV</span>
              </a>
            </div>

            {showPhilosophy && (
              <p
                style={{
                  padding: '0.75rem 1rem',
                  borderRadius: 'var(--radius-md)',
                  background: 'var(--accent-soft)',
                  fontFamily: 'var(--font-serif)',
                  fontStyle: 'italic',
                  fontSize: '0.98rem',
                  color: 'var(--text-primary)',
                }}
              >
                &ldquo;{PROFILE_INFO.guidingPhilosophy}&rdquo;
              </p>
            )}

            <div
              className="scenery-card-scroll-hint"
              onClick={() => jumpToChapter(1)}
            >
              <span>
                Scroll to Chapter 02 · Weekly Rhythm &amp; Verified Milestones
              </span>
              <span>↓</span>
            </div>
          </article>
        </section>

        {/* ====================================================================
            TOPIC 02: CURRENT LIFE FOCUS (35/30/15/15/5) & VERIFIED MILESTONES
            ==================================================================== */}
        <section
          ref={(el) => {
            sectionRefs.current[1] = el;
          }}
          id="scenic-topic-1"
          data-chapter-index="1"
          className="scenery-scroll-section scenery-scroll-section--center"
          aria-label="Chapter 02: Current Life Focus and Milestones"
        >
          <article className="scenery-story-card">
            <div className="scenery-card-badge-row">
              <span className="scenery-card-chapter-pill">
                {SCENIC_CHAPTERS[1].chapterTag}
              </span>
              <span className="scenery-card-place-pill">
                {SCENIC_CHAPTERS[1].scenicPlace}
              </span>
            </div>

            <h2 className="scenery-card-title">
              Current Life Focus &amp; Verified Honours
            </h2>
            <p className="scenery-card-subtitle">
              Balancing computer science research at CIT-U with regional startup
              competitions, caring for pet birds, tending plants, and personal
              renewal. Select any milestone below to inspect its official
              certificate.
            </p>

            {/* Unclipped Life Focus Bar Chart */}
            <div
              style={{
                padding: '1.25rem 1.4rem',
                borderRadius: 'var(--radius-lg)',
                background: 'var(--surface-card)',
                border: '1px solid var(--border-subtle)',
              }}
            >
              <div
                className="life-focus-chart-container"
                role="list"
                aria-label="Current Life Focus Distribution"
              >
                {LIFE_FOCUS_DATA.map((item) => (
                  <div
                    key={item.pursuit}
                    role="listitem"
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '0.3rem',
                    }}
                  >
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

            {/* Clickable 2-Column Verified Milestones (Click to view Certificate Image) */}
            <div className="grid-2col">
              {MILESTONES_LIST.map((m, idx) => {
                const certs = getMilestoneCertificates(m, idx);
                const isSelected = selectedMilestoneIdx === idx;
                return (
                  <div
                    key={m.title}
                    role="button"
                    tabIndex={0}
                    aria-expanded={isSelected}
                    className={`botanical-card milestone-selectable-card ${
                      isSelected ? 'is-selected' : ''
                    }`}
                    style={{ padding: '1.15rem 1.25rem' }}
                    onClick={() => handleSelectMilestone(idx, false)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        handleSelectMilestone(idx, false);
                      }
                    }}
                  >
                    <div className="card-content-body">
                      <div
                        className="badge-row"
                        style={{ justifyContent: 'space-between' }}
                      >
                        <span className="botanical-badge">{m.badge}</span>
                        <span className="tech-pill">{m.period}</span>
                      </div>
                      <h3 style={{ fontSize: '1.08rem', marginTop: '0.15rem' }}>
                        {m.title}
                      </h3>
                      <p
                        style={{
                          fontSize: '0.8rem',
                          fontWeight: 600,
                          color: 'var(--accent-warm)',
                        }}
                      >
                        {m.organization}
                      </p>
                      <p
                        style={{
                          fontSize: '0.84rem',
                          color: 'var(--text-secondary)',
                        }}
                      >
                        {m.details[0]}
                      </p>
                    </div>

                    <div className="milestone-cert-cta-row">
                      <span className="milestone-cert-pill">
                        <SparklesIcon size={13} />
                        <span>
                          {isSelected
                            ? 'Viewing Certificate'
                            : certs.length > 1
                              ? `View Certificates (${certs.length})`
                              : 'View Certificate'}
                        </span>
                      </span>

                      <button
                        type="button"
                        className="quick-jump-link"
                        style={{
                          fontSize: '0.74rem',
                          padding: '0.24rem 0.65rem',
                        }}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleSelectMilestone(idx, true);
                        }}
                      >
                        <span>Full Image</span>
                        <ChevronRightIcon size={13} />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Interactive Inline Certificate Showcase Panel (appears when a milestone is clicked) */}
            {activeMilestone && activeCertItem && (
              <div
                className="certificate-inline-showcase"
                role="region"
                aria-label={`Certificate preview for ${activeMilestone.title}`}
              >
                <div className="certificate-showcase-header">
                  <div>
                    <div className="badge-row" style={{ marginBottom: '0.35rem' }}>
                      <span className="botanical-badge">
                        Official Credential Preview
                      </span>
                      <span className="botanical-badge warm">
                        {activeMilestone.period}
                      </span>
                    </div>
                    <h3 style={{ fontSize: '1.15rem', margin: 0 }}>
                      {activeMilestone.title}
                    </h3>
                    <p
                      style={{
                        fontSize: '0.84rem',
                        color: 'var(--text-secondary)',
                        marginTop: '0.15rem',
                      }}
                    >
                      {activeMilestone.organization} · {activeCertItem.label}
                    </p>
                  </div>

                  <div className="badge-row">
                    <button
                      type="button"
                      className="quick-jump-link"
                      onClick={() => setIsCertLightboxOpen(true)}
                    >
                      <span>Expand Full Screen</span>
                      <ExternalLinkIcon size={13} />
                    </button>
                    <button
                      type="button"
                      className="quick-jump-link"
                      onClick={() => setSelectedMilestoneIdx(null)}
                      aria-label="Close certificate preview"
                    >
                      <CloseIcon size={14} />
                      <span>Close</span>
                    </button>
                  </div>
                </div>

                {activeMilestoneCerts.length > 1 && (
                  <div
                    className="certificate-tabs-bar"
                    role="tablist"
                    aria-label="Select certificate image"
                  >
                    {activeMilestoneCerts.map((cert, cIdx) => (
                      <button
                        key={cert.imageUrl}
                        type="button"
                        role="tab"
                        aria-selected={selectedCertTabIdx === cIdx}
                        className={`certificate-tab-btn ${
                          selectedCertTabIdx === cIdx ? 'active' : ''
                        }`}
                        onClick={() => setSelectedCertTabIdx(cIdx)}
                      >
                        {cert.label}
                      </button>
                    ))}
                  </div>
                )}

                <div
                  className="certificate-image-frame"
                  onClick={() => setIsCertLightboxOpen(true)}
                  title="Click to inspect full-size certificate"
                >
                  <img
                    src={activeCertItem.imageUrl}
                    alt={`${activeMilestone.title} — ${activeCertItem.label}`}
                    className="certificate-image-el"
                    loading="lazy"
                  />
                </div>
              </div>
            )}

            <div
              className="scenery-card-scroll-hint"
              onClick={() => jumpToChapter(2)}
            >
              <span>
                Scroll to Chapter 03 · Technical Capabilities &amp; Full-Text
                Inventory
              </span>
              <span>↓</span>
            </div>
          </article>
        </section>

        {/* ====================================================================
            TOPIC 03: TECHNICAL CAPABILITIES & FULL-TEXT INVENTORY TABLE
            ==================================================================== */}
        <section
          ref={(el) => {
            sectionRefs.current[2] = el;
          }}
          id="scenic-topic-2"
          data-chapter-index="2"
          className="scenery-scroll-section scenery-scroll-section--center"
          aria-label="Chapter 03: Technical Synthesis and Inventory"
        >
          <article className="scenery-story-card">
            <div className="scenery-card-badge-row">
              <span className="scenery-card-chapter-pill">
                {SCENIC_CHAPTERS[2].chapterTag}
              </span>
              <span className="scenery-card-place-pill">
                {SCENIC_CHAPTERS[2].scenicPlace}
              </span>
            </div>

            <h2 className="scenery-card-title">
              Technical Synthesis &amp; Full-Text Inventory
            </h2>
            <p className="scenery-card-subtitle">
              Every machine learning model, computer vision pipeline, and web
              framework mapped directly to a verified project—with full
              multi-line readability and zero clipped cells.
            </p>

            {/* Domain Filter Bar */}
            <div
              className="filter-pill-bar"
              style={{ marginBottom: '0.25rem' }}
              role="tablist"
              aria-label="Filter skills by domain"
            >
              {skillDomains.map((domain) => (
                <button
                  key={domain}
                  type="button"
                  role="tab"
                  aria-selected={selectedSkillDomain === domain}
                  className={`filter-pill-btn ${
                    selectedSkillDomain === domain ? 'active' : ''
                  }`}
                  onClick={() => setSelectedSkillDomain(domain)}
                >
                  {domain}
                </button>
              ))}
            </div>

            {/* Full-Text Readable Table */}
            <div className="readable-table-wrapper">
              <table className="readable-inventory-table">
                <thead>
                  <tr>
                    <th className="table-col-domain">Domain</th>
                    <th className="table-col-skill">Skill / Technology</th>
                    <th className="table-col-app">
                      Real-World Application &amp; Verified Project Context
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredSkills.map((row, idx) => (
                    <tr key={`${row.domain}-${row.skill}-${idx}`}>
                      <td className="table-col-domain" data-label="Domain">
                        {row.domain}
                      </td>
                      <td
                        className="table-col-skill"
                        data-label="Skill / Technology"
                      >
                        {row.skill}
                      </td>
                      <td
                        className="table-col-app"
                        data-label="Real-World Application"
                      >
                        {row.application}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div
              className="scenery-card-scroll-hint"
              onClick={() => jumpToChapter(3)}
            >
              <span>Scroll to Chapter 04 · Top 10 Systems</span>
              <span>↓</span>
            </div>
          </article>
        </section>

        {/* ====================================================================
            TOPIC 04: TOP 10 SYSTEMS (COLLAPSIBLE / CLICK TO VIEW DETAILS)
            ==================================================================== */}
        <section
          ref={(el) => {
            sectionRefs.current[3] = el;
          }}
          id="scenic-topic-3"
          data-chapter-index="3"
          className="scenery-scroll-section scenery-scroll-section--center"
          aria-label="Chapter 04: Top 10 Systems"
        >
          <article className="scenery-story-card">
            <div className="scenery-card-badge-row">
              <span className="scenery-card-chapter-pill">
                {SCENIC_CHAPTERS[3].chapterTag}
              </span>
              <span className="scenery-card-place-pill">
                {SCENIC_CHAPTERS[3].scenicPlace}
              </span>
            </div>

            <h2 className="scenery-card-title">Top 10 Systems</h2>
            <p className="scenery-card-subtitle">
              From PAROLA&apos;s dual LightGBM marine catch pipelines and
              PhysioCGM nocturnal hypoglycemia detection to CineTerra and
              LantaWires. Click any system below to expand its architecture,
              role, and technical specifications.
            </p>

            {/* Category Filter Pills + Expand/Collapse All */}
            <div className="systems-toolbar-row">
              <div
                className="filter-pill-bar"
                style={{ marginBottom: 0 }}
                role="tablist"
                aria-label="Filter projects by category"
              >
                {projectCategories.map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    role="tab"
                    aria-selected={selectedProjectCategory === cat}
                    className={`filter-pill-btn ${
                      selectedProjectCategory === cat ? 'active' : ''
                    }`}
                    onClick={() => setSelectedProjectCategory(cat)}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              <button
                type="button"
                className="quick-jump-link"
                onClick={handleToggleAllProjects}
              >
                <span>
                  {allFilteredExpanded ? 'Collapse All' : 'Expand All'}
                </span>
                <span
                  style={{
                    display: 'inline-flex',
                    transition: 'transform 220ms ease',
                    transform: allFilteredExpanded
                      ? 'rotate(90deg)'
                      : 'rotate(0deg)',
                  }}
                >
                  <ChevronRightIcon size={14} />
                </span>
              </button>
            </div>

            {/* Collapsible Full-Width Stack of Top 10 Systems (Zero Dead Space) */}
            <div className="systems-collapsible-grid">
              {filteredProjects.map((project) => {
                const isExpanded = expandedProjectIds.includes(project.id);
                const rankBadge = `#${String(project.rank).padStart(2, '0')}`;

                return (
                  <article
                    key={project.id}
                    className={`collapsible-system-card ${
                      isExpanded ? 'is-expanded' : ''
                    }`}
                  >
                    <button
                      type="button"
                      className="collapsible-system-trigger"
                      aria-expanded={isExpanded}
                      onClick={() => toggleProjectExpand(project.id)}
                    >
                      <div className="collapsible-system-header-left">
                        <span className="botanical-badge">{rankBadge}</span>
                        <h3 className="collapsible-system-title">
                          {project.title}
                        </h3>
                      </div>

                      <div className="collapsible-system-header-right">
                        <span className="botanical-badge warm">
                          {project.category}
                        </span>

                        <span className="collapsible-system-toggle-pill">
                          <span>
                            {isExpanded ? 'Hide details' : 'View details'}
                          </span>
                          <span className="collapsible-system-chevron">
                            <ChevronRightIcon size={14} />
                          </span>
                        </span>
                      </div>
                    </button>

                    {isExpanded && (
                      <div className="collapsible-system-body">
                        <div className="collapsible-system-narrative-col">
                          <div>
                            <span
                              style={{
                                display: 'inline-block',
                                fontSize: '0.82rem',
                                fontWeight: 700,
                                color: 'var(--text-primary)',
                              }}
                            >
                              {project.role}
                            </span>
                            <p
                              style={{
                                fontSize: '0.82rem',
                                fontWeight: 600,
                                color: 'var(--accent-warm)',
                                marginTop: '0.15rem',
                              }}
                            >
                              {project.accolade}
                            </p>
                          </div>

                          <p
                            style={{
                              fontSize: '0.92rem',
                              color: 'var(--text-secondary)',
                              lineHeight: 1.65,
                            }}
                          >
                            {project.summary}
                          </p>

                          <div
                            style={{
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'space-between',
                              flexWrap: 'wrap',
                              gap: '0.6rem',
                              marginTop: 'auto',
                            }}
                          >
                            <div className="badge-row">
                              {project.tools.map((tech) => (
                                <span key={tech} className="tech-pill">
                                  {tech}
                                </span>
                              ))}
                            </div>

                            {project.repo && (
                              <a
                                href={project.repo}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="quick-jump-link"
                                style={{
                                  fontSize: '0.76rem',
                                  padding: '0.28rem 0.75rem',
                                }}
                              >
                                Repository <ExternalLinkIcon size={13} />
                              </a>
                            )}
                          </div>
                        </div>

                        <div className="collapsible-system-specs-col">
                          <div
                            style={{
                              fontSize: '0.78rem',
                              fontWeight: 700,
                              color: 'var(--accent-primary)',
                            }}
                          >
                            Technical Architecture &amp; System Specifications
                          </div>
                          <ul
                            className="arch-metrics-list"
                            style={{
                              padding: '0.45rem 0 0 1.15rem',
                              margin: 0,
                            }}
                          >
                            {Object.entries(project.metrics).map(([k, v]) => (
                              <li key={k}>
                                <strong>{k}:</strong> {v}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    )}
                  </article>
                );
              })}
            </div>

            <div
              className="scenery-card-scroll-hint"
              onClick={() => jumpToChapter(4)}
            >
              <span>
                Scroll to Chapter 05 · Direct Dispatch &amp; Executive Dossier
              </span>
              <span>↓</span>
            </div>
          </article>
        </section>

        {/* ====================================================================
            TOPIC 05: DIRECT DISPATCH & EXECUTIVE DOSSIER
            ==================================================================== */}
        <section
          ref={(el) => {
            sectionRefs.current[4] = el;
          }}
          id="scenic-topic-4"
          data-chapter-index="4"
          className="scenery-scroll-section scenery-scroll-section--center"
          aria-label="Chapter 05: Direct Dispatch and Executive CV"
        >
          <article className="scenery-story-card">
            <div className="scenery-card-badge-row">
              <span className="scenery-card-chapter-pill">
                {SCENIC_CHAPTERS[4].chapterTag}
              </span>
              <span className="scenery-card-place-pill">
                {SCENIC_CHAPTERS[4].scenicPlace}
              </span>
            </div>

            <h2 className="scenery-card-title">
              Direct Dispatch &amp; Executive Dossier
            </h2>
            <p className="scenery-card-subtitle">
              Connect for machine learning research collaborations, full-stack
              engineering roles, or download the complete curriculum vitae.
            </p>

            <div className="grid-2col">
              {/* Direct Coordinates */}
              <div className="botanical-card">
                <div className="card-content-body">
                  <span
                    className="botanical-badge"
                    style={{ alignSelf: 'flex-start' }}
                  >
                    Verified Sanctuary Channels
                  </span>
                  <div
                    className="specimen-kv-list"
                    style={{ marginTop: '0.5rem' }}
                  >
                    <div className="specimen-kv-row">
                      <span className="specimen-kv-key">Email</span>
                      <a
                        href={`mailto:${PROFILE_INFO.email}`}
                        className="specimen-kv-val"
                        style={{ color: 'var(--accent-primary)' }}
                      >
                        {PROFILE_INFO.email}
                      </a>
                    </div>
                    <div className="specimen-kv-row">
                      <span className="specimen-kv-key">Phone (PH)</span>
                      <a
                        href="tel:+639150262014"
                        className="specimen-kv-val"
                        style={{ color: 'var(--text-primary)' }}
                      >
                        {PROFILE_INFO.phone}
                      </a>
                    </div>
                    <div className="specimen-kv-row">
                      <span className="specimen-kv-key">GitHub</span>
                      <a
                        href={PROFILE_INFO.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="specimen-kv-val"
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '0.3rem',
                          color: 'var(--accent-primary)',
                        }}
                      >
                        {PROFILE_INFO.githubHandle}{' '}
                        <ExternalLinkIcon size={13} />
                      </a>
                    </div>
                    <div
                      className="specimen-kv-row"
                      style={{ borderBottom: 'none' }}
                    >
                      <span className="specimen-kv-key">Institution</span>
                      <span className="specimen-kv-val">
                        {PROFILE_INFO.institutionShort}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="card-content-footer">
                  <a
                    href={PROFILE_INFO.cvPdfPath}
                    download="Charlone_Gianne_Cruz_CV.pdf"
                    className="primary-action-btn"
                  >
                    <DownloadIcon size={16} />
                    <span>Download Executive CV (PDF)</span>
                  </a>
                </div>
              </div>

              {/* Interactive Dispatch Form */}
              <div className="botanical-card">
                <div className="card-content-body">
                  <form
                    className="dispatch-form"
                    onSubmit={handleDispatchSubmit}
                  >
                    <div className="form-field">
                      <label className="form-label" htmlFor="scenic-name">
                        Your Name or Organization
                      </label>
                      <input
                        id="scenic-name"
                        type="text"
                        className="form-input"
                        placeholder="Dr. Maria Santos · Research Lab"
                        value={senderName}
                        onChange={(e) => setSenderName(e.target.value)}
                        required
                      />
                    </div>

                    <div className="form-field">
                      <label className="form-label" htmlFor="scenic-email">
                        Return Email
                      </label>
                      <input
                        id="scenic-email"
                        type="email"
                        className="form-input"
                        placeholder="name@institution.edu"
                        value={senderEmail}
                        onChange={(e) => setSenderEmail(e.target.value)}
                        required
                      />
                    </div>

                    <div className="form-field">
                      <label className="form-label" htmlFor="scenic-topic">
                        Inquiry Domain
                      </label>
                      <select
                        id="scenic-topic"
                        className="form-select"
                        value={topic}
                        onChange={(e) => setTopic(e.target.value)}
                      >
                        <option value="Research & Biomedical AI Collaboration">
                          Research &amp; Biomedical AI Collaboration
                        </option>
                        <option value="Software Engineering & Full-Stack Role">
                          Software Engineering &amp; Full-Stack Role
                        </option>
                        <option value="PAROLA / Marine ML Inquiry">
                          PAROLA / Marine ML Inquiry
                        </option>
                      </select>
                    </div>

                    <div className="form-field">
                      <label className="form-label" htmlFor="scenic-msg">
                        Message
                      </label>
                      <textarea
                        id="scenic-msg"
                        rows={3}
                        className="form-textarea"
                        placeholder="Share project context or timeline..."
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        required
                      />
                    </div>

                    <button type="submit" className="primary-action-btn">
                      <SparklesIcon size={16} />
                      <span>Release Carrier Dispatch</span>
                    </button>
                  </form>

                  {submittedAt && (
                    <div
                      role="status"
                      style={{
                        marginTop: '0.4rem',
                        padding: '0.65rem 0.9rem',
                        borderRadius: 'var(--radius-md)',
                        background: 'var(--accent-soft)',
                        fontSize: '0.82rem',
                      }}
                    >
                      <strong>Logged at {submittedAt}:</strong>{' '}
                      <a
                        href={`mailto:${
                          PROFILE_INFO.email
                        }?subject=${encodeURIComponent(
                          `[Portfolio Dispatch] ${topic} — ${senderName}`
                        )}&body=${encodeURIComponent(message)}`}
                        style={{ fontWeight: 700, textDecoration: 'underline' }}
                      >
                        Open in Mail Client
                      </a>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div
              className="scenery-card-scroll-hint"
              onClick={() => jumpToChapter(0)}
            >
              <span>↑ Return to Chapter 01 · Origin &amp; Sanctuary Roots</span>
              <span>↑</span>
            </div>
          </article>
        </section>
      </main>

      {/* 4. FULL-SIZE CERTIFICATE LIGHTBOX MODAL */}
      {isCertLightboxOpen && activeMilestone && activeCertItem && (
        <div
          className="certificate-lightbox-backdrop"
          role="dialog"
          aria-modal="true"
          aria-label={`Certificate view: ${activeCertItem.label}`}
          onClick={() => setIsCertLightboxOpen(false)}
        >
          <div
            className="certificate-lightbox-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="certificate-showcase-header">
              <div>
                <div className="badge-row" style={{ marginBottom: '0.35rem' }}>
                  <span className="botanical-badge">{activeMilestone.badge}</span>
                  <span className="botanical-badge warm">
                    {activeMilestone.period}
                  </span>
                </div>
                <h3 style={{ fontSize: '1.25rem', margin: 0 }}>
                  {activeMilestone.title}
                </h3>
                <p
                  style={{
                    fontSize: '0.86rem',
                    color: 'var(--text-secondary)',
                    marginTop: '0.15rem',
                  }}
                >
                  {activeMilestone.organization} · {activeCertItem.label}
                </p>
              </div>

              <button
                type="button"
                className="quick-jump-link"
                onClick={() => setIsCertLightboxOpen(false)}
              >
                <CloseIcon size={15} />
                <span>Close Preview</span>
              </button>
            </div>

            {activeMilestoneCerts.length > 1 && (
              <div
                className="certificate-tabs-bar"
                role="tablist"
                aria-label="Switch certificate"
              >
                {activeMilestoneCerts.map((cert, cIdx) => (
                  <button
                    key={cert.imageUrl}
                    type="button"
                    role="tab"
                    aria-selected={selectedCertTabIdx === cIdx}
                    className={`certificate-tab-btn ${
                      selectedCertTabIdx === cIdx ? 'active' : ''
                    }`}
                    onClick={() => setSelectedCertTabIdx(cIdx)}
                  >
                    {cert.label}
                  </button>
                ))}
              </div>
            )}

            <img
              src={activeCertItem.imageUrl}
              alt={`${activeMilestone.title} — ${activeCertItem.label}`}
              className="certificate-lightbox-img"
            />
          </div>
        </div>
      )}
    </div>
  );
};
