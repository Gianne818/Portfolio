import React, { useState, useMemo } from 'react';
import { SKILLS_INVENTORY } from '../../data/portfolioData';
import { AstrolabeIcon } from '../icons/BotanicalIcons';

export const ChapterSkills: React.FC = () => {
  const [selectedDomain, setSelectedDomain] = useState<string>('All Domains');

  const domains = useMemo(() => {
    const unique = Array.from(new Set(SKILLS_INVENTORY.map((s) => s.domain)));
    return ['All Domains', ...unique];
  }, []);

  const filteredSkills = useMemo(() => {
    if (selectedDomain === 'All Domains') return SKILLS_INVENTORY;
    return SKILLS_INVENTORY.filter((item) => item.domain === selectedDomain);
  }, [selectedDomain]);

  return (
    <div className="chapter-content">
      <header className="chapter-header">
        <span className="chapter-eyebrow">
          <AstrolabeIcon size={15} /> Island II · The Astrolabe Observatory
        </span>
        <h2 className="chapter-title">
          Technical Synthesis &amp; Full-Text Inventory
        </h2>
        <p className="chapter-lead">
          Every language, mathematical framework, and systems tool is anchored
          to a verified engineering build or clinical machine learning pipeline
          — presented below in an unclipped, full-text readable specification
          table.
        </p>
      </header>

      {/* Synthesis Pillars (Equal-Height 2-Column Grid) */}
      <div className="grid-2col" style={{ marginBottom: 'var(--space-8)' }}>
        <article className="botanical-card">
          <div className="card-content-body">
            <div className="badge-row">
              <span className="botanical-badge">Pillar I</span>
              <span className="botanical-badge warm">Biomedical &amp; Deep Learning</span>
            </div>
            <h3 style={{ fontSize: '1.3rem' }}>
              Clinical Signal Processing &amp; Interpretability
            </h3>
            <p style={{ fontSize: '0.92rem', color: 'var(--text-secondary)' }}>
              Specializing in physiological waveform cleaning (ECG/PPG),
              continuous wavelet transforms, 1D-CNN + BiLSTM architectures, and
              SHAP feature attribution so clinical decision support systems
              remain transparent under real hospital noise.
            </p>
          </div>
          <div className="card-content-footer">
            <div className="badge-row">
              <span className="tech-pill">PyTorch</span>
              <span className="tech-pill">SciPy DSP</span>
              <span className="tech-pill">Scikit-Learn</span>
              <span className="tech-pill">SHAP / Grad-CAM</span>
            </div>
          </div>
        </article>

        <article className="botanical-card">
          <div className="card-content-body">
            <div className="badge-row">
              <span className="botanical-badge">Pillar II</span>
              <span className="botanical-badge warm">Full-Stack &amp; Spatial Systems</span>
            </div>
            <h3 style={{ fontSize: '1.3rem' }}>
              Production Web, Mobile &amp; Algorithmic Engines
            </h3>
            <p style={{ fontSize: '0.92rem', color: 'var(--text-secondary)' }}>
              Architecting end-to-end applications that pair high-throughput
              FastAPI, Spring Boot, or Node.js backends with responsive React,
              Three.js WebGL, and native Android clients backed by PostgreSQL
              and PostGIS spatial indexing.
            </p>
          </div>
          <div className="card-content-footer">
            <div className="badge-row">
              <span className="tech-pill">TypeScript &amp; React</span>
              <span className="tech-pill">Three.js WebGL</span>
              <span className="tech-pill">FastAPI &amp; Spring Boot</span>
              <span className="tech-pill">PostgreSQL / PostGIS</span>
            </div>
          </div>
        </article>
      </div>

      {/* Domain Filter Bar */}
      <div className="filter-pill-bar" role="tablist" aria-label="Filter skills by domain">
        {domains.map((domain) => (
          <button
            key={domain}
            type="button"
            role="tab"
            aria-selected={selectedDomain === domain}
            className={`filter-pill-btn ${selectedDomain === domain ? 'active' : ''}`}
            onClick={() => setSelectedDomain(domain)}
          >
            {domain}
          </button>
        ))}
      </div>

      {/* Full-Text Readable Technical Inventory Table (Zero Truncation) */}
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
            {filteredSkills.map((row, index) => (
              <tr key={`${row.domain}-${row.skill}-${index}`}>
                <td className="table-col-domain" data-label="Domain">
                  {row.domain}
                </td>
                <td className="table-col-skill" data-label="Skill / Technology">
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
    </div>
  );
};
