import React, { useState } from 'react';
import { PROFILE_INFO } from '../../data/portfolioData';
import {
  DovePerchIcon,
  DownloadIcon,
  ExternalLinkIcon,
  SparklesIcon,
} from '../icons/BotanicalIcons';

export const ChapterDispatch: React.FC = () => {
  const [senderName, setSenderName] = useState('');
  const [senderEmail, setSenderEmail] = useState('');
  const [topic, setTopic] = useState('Research & Biomedical AI Collaboration');
  const [message, setMessage] = useState('');
  const [submittedAt, setSubmittedAt] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!senderName.trim() || !senderEmail.trim() || !message.trim()) return;
    const timestamp = new Date().toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    });
    setSubmittedAt(timestamp);
  };

  return (
    <div className="chapter-content">
      <header className="chapter-header">
        <span className="chapter-eyebrow">
          <DovePerchIcon size={15} /> Island IV · The Carrier Perch Tower
        </span>
        <h2 className="chapter-title">
          Direct Dispatch &amp; Executive Dossier
        </h2>
        <p className="chapter-lead">
          Initiate a research collaboration, software engineering inquiry, or
          download the verified curriculum vitae directly from the sanctuary
          perch.
        </p>
      </header>

      <div className="grid-2col">
        {/* Direct Coordinates & CV Dossier Card */}
        <article className="botanical-card">
          <div className="card-content-body">
            <div className="badge-row">
              <span className="botanical-badge">Verified Channels</span>
              <span className="botanical-badge warm">Open for Collaboration</span>
            </div>
            <h3 style={{ fontSize: '1.38rem', marginTop: '0.25rem' }}>
              Direct Sanctuary Coordinates
            </h3>
            <p style={{ fontSize: '0.92rem', color: 'var(--text-secondary)' }}>
              Available for machine learning research internships, biomedical
              signal engineering projects, and full-stack software development.
            </p>

            <div className="specimen-kv-list" style={{ marginTop: '0.75rem' }}>
              <div className="specimen-kv-row">
                <span className="specimen-kv-key">Electronic Mail</span>
                <a
                  href={`mailto:${PROFILE_INFO.email}`}
                  className="specimen-kv-val"
                  style={{ color: 'var(--accent-primary)' }}
                >
                  {PROFILE_INFO.email}
                </a>
              </div>
              <div className="specimen-kv-row">
                <span className="specimen-kv-key">Direct Line (PH)</span>
                <a
                  href="tel:+639150262014"
                  className="specimen-kv-val"
                  style={{ color: 'var(--text-primary)' }}
                >
                  {PROFILE_INFO.phone}
                </a>
              </div>
              <div className="specimen-kv-row">
                <span className="specimen-kv-key">GitHub Laboratory</span>
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
                  {PROFILE_INFO.githubHandle} <ExternalLinkIcon size={13} />
                </a>
              </div>
              <div className="specimen-kv-row">
                <span className="specimen-kv-key">University</span>
                <span className="specimen-kv-val">{PROFILE_INFO.institutionShort}</span>
              </div>
              <div className="specimen-kv-row" style={{ borderBottom: 'none' }}>
                <span className="specimen-kv-key">Location</span>
                <span className="specimen-kv-val">{PROFILE_INFO.location}</span>
              </div>
            </div>
          </div>

          <div className="card-content-footer">
            <a
              href={PROFILE_INFO.cvPdfPath}
              download="Charlone_Gianne_Cruz_CV.pdf"
              className="primary-action-btn"
            >
              <DownloadIcon size={16} /> Download Executive CV (PDF)
            </a>
          </div>
        </article>

        {/* Interactive Carrier Dispatch Form */}
        <article className="botanical-card">
          <div className="card-content-body">
            <div className="badge-row">
              <span className="botanical-badge">Carrier Dispatch</span>
            </div>
            <h3 style={{ fontSize: '1.38rem', marginTop: '0.25rem' }}>
              Send a Direct Dispatch
            </h3>

            <form className="dispatch-form" onSubmit={handleSubmit}>
              <div className="form-field">
                <label className="form-label" htmlFor="dispatch-name">
                  Your Name or Organization
                </label>
                <input
                  id="dispatch-name"
                  type="text"
                  className="form-input"
                  placeholder="Dr. Maria Santos · Biomedical Lab"
                  value={senderName}
                  onChange={(e) => setSenderName(e.target.value)}
                  required
                />
              </div>

              <div className="form-field">
                <label className="form-label" htmlFor="dispatch-email">
                  Return Email Address
                </label>
                <input
                  id="dispatch-email"
                  type="email"
                  className="form-input"
                  placeholder="name@institution.edu"
                  value={senderEmail}
                  onChange={(e) => setSenderEmail(e.target.value)}
                  required
                />
              </div>

              <div className="form-field">
                <label className="form-label" htmlFor="dispatch-topic">
                  Inquiry Domain
                </label>
                <select
                  id="dispatch-topic"
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
                  <option value="PAROLA / Clinical ML Inquiry">
                    PAROLA / Clinical ML Inquiry
                  </option>
                  <option value="General Sanctuary Correspondence">
                    General Sanctuary Correspondence
                  </option>
                </select>
              </div>

              <div className="form-field">
                <label className="form-label" htmlFor="dispatch-message">
                  Dispatch Message
                </label>
                <textarea
                  id="dispatch-message"
                  rows={4}
                  className="form-textarea"
                  placeholder="Share project context, research goals, or timeline..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  required
                />
              </div>

              <button type="submit" className="primary-action-btn">
                <SparklesIcon size={16} /> Release Carrier Dispatch
              </button>
            </form>

            {submittedAt && (
              <div
                role="status"
                style={{
                  marginTop: '0.5rem',
                  padding: '0.75rem 1rem',
                  borderRadius: 'var(--radius-md)',
                  background: 'var(--accent-soft)',
                  border: '1px solid var(--border-strong)',
                  fontSize: '0.84rem',
                  color: 'var(--text-primary)',
                }}
              >
                <strong>Dispatch Logged at {submittedAt}:</strong> Thank you,{' '}
                {senderName}. Your message regarding <em>{topic}</em> has been
                prepared—you may also{' '}
                <a
                  href={`mailto:${PROFILE_INFO.email}?subject=${encodeURIComponent(
                    `[Portfolio Dispatch] ${topic} — ${senderName}`
                  )}&body=${encodeURIComponent(message)}`}
                  style={{ fontWeight: 700, textDecoration: 'underline' }}
                >
                  open directly in your mail client
                </a>
                .
              </div>
            )}
          </div>
        </article>
      </div>
    </div>
  );
};
