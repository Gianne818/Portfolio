import React, { useState, useMemo } from 'react';
import { PROJECTS_LIST } from '../../data/portfolioData';
import {
  LighthouseIcon,
  ChevronRightIcon,
  ExternalLinkIcon,
} from '../icons/BotanicalIcons';

export const ChapterProjects: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All Systems');
  const [expandedIds, setExpandedIds] = useState<string[]>([]);

  const categories = useMemo<string[]>(() => {
    const unique = Array.from(new Set(PROJECTS_LIST.map((p) => p.category)));
    return ['All Systems', ...unique];
  }, []);

  const filteredProjects = useMemo(() => {
    if (selectedCategory === 'All Systems') return PROJECTS_LIST;
    return PROJECTS_LIST.filter((p) => p.category === selectedCategory);
  }, [selectedCategory]);

  const toggleProject = (id: string) => {
    setExpandedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const allFilteredExpanded =
    filteredProjects.length > 0 &&
    filteredProjects.every((p) => expandedIds.includes(p.id));

  const handleToggleAll = () => {
    if (allFilteredExpanded) {
      setExpandedIds((prev) =>
        prev.filter((id) => !filteredProjects.some((p) => p.id === id))
      );
    } else {
      const nextSet = new Set([
        ...expandedIds,
        ...filteredProjects.map((p) => p.id),
      ]);
      setExpandedIds(Array.from(nextSet));
    }
  };

  return (
    <div className="chapter-content">
      <header className="chapter-header">
        <span className="chapter-eyebrow">
          <LighthouseIcon size={15} /> Island III · PAROLA Lighthouse Spire
        </span>
        <h2 className="chapter-title">Top 10 Systems</h2>
        <p className="chapter-lead">
          Ten production-grade software architectures, marine &amp; biomedical
          machine learning pipelines, and assistive platforms. Click any system
          row below to expand its full engineering dossier and specifications.
        </p>
      </header>

      {/* Category Filter Pills + Expand/Collapse All Control */}
      <div className="systems-toolbar-row">
        <div
          className="filter-pill-bar"
          role="tablist"
          aria-label="Filter projects by category"
          style={{ marginBottom: 0 }}
        >
          {categories.map((category) => (
            <button
              key={category}
              type="button"
              role="tab"
              aria-selected={selectedCategory === category}
              className={`filter-pill-btn ${
                selectedCategory === category ? 'active' : ''
              }`}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>

        <button
          type="button"
          className="hint-switch-cta"
          onClick={handleToggleAll}
          aria-label={
            allFilteredExpanded ? 'Collapse all systems' : 'Expand all systems'
          }
        >
          <span>{allFilteredExpanded ? 'Collapse All' : 'Expand All'}</span>
          <span
            style={{
              display: 'inline-flex',
              transition: 'transform 220ms ease',
              transform: allFilteredExpanded ? 'rotate(90deg)' : 'rotate(0deg)',
            }}
          >
            <ChevronRightIcon size={14} />
          </span>
        </button>
      </div>

      {/* Zero-Gap Full-Width Collapsible Stack of Top 10 Systems */}
      <div className="systems-collapsible-grid">
        {filteredProjects.map((project) => {
          const isExpanded = expandedIds.includes(project.id);
          const rankLabel = `#${String(project.rank).padStart(2, '0')}`;

          return (
            <article
              key={project.id}
              className={`collapsible-system-card ${
                isExpanded ? 'is-expanded' : ''
              }`}
            >
              {/* Single-Line Scannable Summary Header Bar */}
              <button
                type="button"
                className="collapsible-system-trigger"
                aria-expanded={isExpanded}
                onClick={() => toggleProject(project.id)}
              >
                <div className="collapsible-system-header-left">
                  <span className="botanical-badge">{rankLabel}</span>
                  <h3 className="collapsible-system-title">{project.title}</h3>
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

              {/* Expanded 2-Column Balanced Interior (Zero Empty Space) */}
              {isExpanded && (
                <div className="collapsible-system-body">
                  {/* Left Column: Accolade, Narrative Summary, Tech Stack & Repo */}
                  <div className="collapsible-system-narrative-col">
                    <div
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '0.45rem',
                      }}
                    >
                      <div className="badge-row">
                        <span className="tech-pill">{project.role}</span>
                        <span
                          style={{
                            fontSize: '0.82rem',
                            fontWeight: 600,
                            color: 'var(--accent-warm)',
                          }}
                        >
                          {project.accolade}
                        </span>
                      </div>

                      <p
                        style={{
                          fontSize: '0.92rem',
                          color: 'var(--text-secondary)',
                          marginTop: '0.2rem',
                        }}
                      >
                        {project.summary}
                      </p>
                    </div>

                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        flexWrap: 'wrap',
                        gap: '0.6rem',
                        paddingTop: '0.5rem',
                        borderTop: '1px dashed var(--border-subtle)',
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
                            fontSize: '0.78rem',
                            padding: '0.32rem 0.8rem',
                          }}
                        >
                          <span>Repository</span>
                          <ExternalLinkIcon size={13} />
                        </a>
                      )}
                    </div>
                  </div>

                  {/* Right Column: Technical Architecture & System Specifications */}
                  <div className="collapsible-system-specs-col">
                    <span
                      style={{
                        fontSize: '0.75rem',
                        fontWeight: 700,
                        textTransform: 'uppercase',
                        letterSpacing: '0.06em',
                        color: 'var(--accent-primary)',
                      }}
                    >
                      Technical Architecture &amp; Specs
                    </span>

                    <div className="specimen-kv-list">
                      {Object.entries(project.metrics).map(([label, value]) => (
                        <div key={label} className="specimen-kv-row">
                          <span className="specimen-kv-key">{label}</span>
                          <span className="specimen-kv-val">{value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </article>
          );
        })}
      </div>
    </div>
  );
};
