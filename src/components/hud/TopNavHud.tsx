import React from 'react';
import { PROFILE_INFO } from '../../data/portfolioData';
import {
  FeatherIcon,
  CompassIcon,
  BookOpenIcon,
  SunIcon,
  MoonIcon,
  DownloadIcon,
  SparklesIcon,
  CloseIcon,
} from '../icons/BotanicalIcons';

export type ExperienceMode = '3d-flight' | 'editorial';
export type ThemeMode = 'light' | 'dark';

interface TopNavHudProps {
  mode: ExperienceMode;
  onModeChange: (mode: ExperienceMode) => void;
  theme: ThemeMode;
  onToggleTheme: () => void;
  isControlsGuideOpen: boolean;
  onToggleControlsGuide: (open: boolean) => void;
}

export const TopNavHud: React.FC<TopNavHudProps> = ({
  mode,
  onModeChange,
  theme,
  onToggleTheme,
  isControlsGuideOpen,
  onToggleControlsGuide,
}) => {
  return (
    <>
      <header
        className="top-nav-hud"
        aria-label="Portfolio Navigation and Mode Controls"
      >
        {/* Brand Identity Pill (Strictly No Course / Section F2) */}
        <div className="hud-brand-pill">
          <div className="hud-brand-icon">
            <FeatherIcon size={17} />
          </div>
          <div className="hud-brand-text">
            <span className="hud-brand-name">{PROFILE_INFO.fullName}</span>
            <span className="hud-brand-meta">
              {PROFILE_INFO.institutionShort} · {PROFILE_INFO.degree}
            </span>
          </div>
        </div>

        {/* Prominent Segmented Mode Toggle (3D Bird Flight vs Scenic Editorial Page) */}
        <div
          className="mode-switcher-seg"
          role="group"
          aria-label="Switch between 3D Bird Flight and Scenic Scroll Page"
        >
          <button
            type="button"
            className={`mode-seg-btn ${mode === '3d-flight' ? 'active' : ''}`}
            onClick={() => onModeChange('3d-flight')}
            aria-pressed={mode === '3d-flight'}
          >
            <CompassIcon size={15} />
            <span className="mode-seg-label-full">3D Bird Flight</span>
            <span className="mode-seg-label-short">3D Flight</span>
          </button>
          <button
            type="button"
            className={`mode-seg-btn ${mode === 'editorial' ? 'active' : ''}`}
            onClick={() => onModeChange('editorial')}
            aria-pressed={mode === 'editorial'}
          >
            <BookOpenIcon size={15} />
            <span className="mode-seg-label-full">Scenic Editorial Page</span>
            <span className="mode-seg-label-short">Scenic Page</span>
          </button>
        </div>

        {/* Right Controls: Re-openable Flight Controls Button (in 3D mode) + Theme Toggle + CV PDF */}
        <div className="hud-controls-cluster">
          {mode === '3d-flight' && (
            <button
              type="button"
              className="hud-icon-btn"
              onClick={() => onToggleControlsGuide(!isControlsGuideOpen)}
              aria-expanded={isControlsGuideOpen}
              title="Open Flight Controls Guide"
            >
              <SparklesIcon size={15} />
              <span className="hud-btn-label">Flight Controls</span>
              <span className="hud-btn-label-short">Guide</span>
            </button>
          )}

          <button
            type="button"
            className="hud-icon-btn"
            onClick={onToggleTheme}
            title={
              theme === 'light'
                ? 'Switch to Night Canopy (Dark Mode)'
                : 'Switch to Golden Parchment (Day Mode)'
            }
            aria-label="Toggle color theme"
          >
            {theme === 'light' ? <MoonIcon size={16} /> : <SunIcon size={16} />}
            <span className="hud-btn-label">{theme === 'light' ? 'Night' : 'Day'}</span>
          </button>

          <a
            href={PROFILE_INFO.cvPdfPath}
            download="Charlone_Gianne_Cruz_CV.pdf"
            className="hud-cv-btn"
          >
            <DownloadIcon size={15} />
            <span>CV</span>
          </a>
        </div>
      </header>

      {/* Dismissible & Re-openable Flight Controls Guide Overlay (Shown on first load) */}
      {mode === '3d-flight' && isControlsGuideOpen && (
        <div
          className="flight-controls-overlay-backdrop"
          role="dialog"
          aria-modal="false"
          aria-label="3D Sanctuary Flight Controls Guide"
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              onToggleControlsGuide(false);
            }
          }}
        >
          <div className="flight-controls-guide-card">
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '1rem',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                <span className="botanical-badge">Sanctuary Flight Guide</span>
                <span className="botanical-badge warm">Touch &amp; Keyboard</span>
              </div>

              <button
                type="button"
                className="hud-icon-btn"
                style={{ width: '34px', height: '34px', padding: 0 }}
                onClick={() => onToggleControlsGuide(false)}
                aria-label="Dismiss controls guide"
              >
                <CloseIcon size={15} />
              </button>
            </div>

            <div>
              <h2 style={{ fontSize: '1.6rem' }}>
                Welcome to the 3D Avian Sanctuary
              </h2>
              <p
                style={{
                  fontSize: '0.9rem',
                  color: 'var(--text-secondary)',
                  marginTop: '0.25rem',
                }}
              >
                Fly freely between the four floating sanctuary islands using
                natural touch gestures or keyboard controls—with zero screen
                clutter.
              </p>
            </div>

            <div className="controls-guide-grid">
              <div className="controls-guide-row">
                <span className="controls-guide-badge">Long-Press</span>
                <div className="controls-guide-desc">
                  <strong>Press &amp; Hold Screen to Fly Forward</strong>
                  <span>
                    Touch and hold anywhere on the sky/canvas (or hold{' '}
                    <strong>W</strong> / <strong>Spacebar</strong>) to propel
                    the bird forward. Release to hover calmly.
                  </span>
                </div>
              </div>

              <div className="controls-guide-row">
                <span className="controls-guide-badge">Swipe to Steer</span>
                <div className="controls-guide-desc">
                  <strong>
                    Swipe Right → Left · Swipe Down → Up (Reversed)
                  </strong>
                  <span>
                    Swipe in any direction to pull the sky and steer the bird in
                    the opposite direction (or press <strong>A / D</strong> and{' '}
                    <strong>Q / E</strong>).
                  </span>
                </div>
              </div>

              <div className="controls-guide-row">
                <span className="controls-guide-badge">Tap Island</span>
                <div className="controls-guide-desc">
                  <strong>1-Tap Auto-Pilot to Any Chapter</strong>
                  <span>
                    Tap any floating island pin or bottom dock icon to auto-fly
                    directly into that chapter.
                  </span>
                </div>
              </div>
            </div>

            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '0.6rem',
                marginTop: '0.25rem',
              }}
            >
              <button
                type="button"
                className="primary-action-btn"
                style={{ width: '100%' }}
                onClick={() => onToggleControlsGuide(false)}
              >
                <FeatherIcon size={16} />
                <span>Dismiss &amp; Start Flying</span>
              </button>

              <button
                type="button"
                className="quick-jump-link"
                style={{ justifyContent: 'center', width: '100%' }}
                onClick={() => {
                  onToggleControlsGuide(false);
                  onModeChange('editorial');
                }}
              >
                <BookOpenIcon size={15} />
                <span>Prefer Standard Scrolling? Switch to Scenic Page</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
