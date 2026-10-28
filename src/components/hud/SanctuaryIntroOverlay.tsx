import React, { useEffect, useState } from 'react';
import { MILESTONES_LIST, PROFILE_INFO } from '../../data/portfolioData';
import { ExperienceMode, ThemeMode } from './TopNavHud';
import {
  BookOpenIcon,
  CompassIcon,
  FeatherIcon,
  MoonIcon,
  SparklesIcon,
  SunIcon,
} from '../icons/BotanicalIcons';

interface SanctuaryIntroOverlayProps {
  theme: ThemeMode;
  onToggleTheme: () => void;
  onSelectExperience: (mode: ExperienceMode) => void;
}

const LOADING_STEPS = [
  { threshold: 0, text: 'Awakening the Avian Sanctuary...' },
  { threshold: 30, text: 'Gathering botanical specimens & verified credentials...' },
  { threshold: 65, text: 'Charting the four floating island portals...' },
  { threshold: 90, text: 'Feathers aligned — ready for departure...' },
];

export const SanctuaryIntroOverlay: React.FC<SanctuaryIntroOverlayProps> = ({
  theme,
  onToggleTheme,
  onSelectExperience,
}) => {
  const [stage, setStage] = useState<'loading' | 'choosing'>('loading');
  const [progress, setProgress] = useState<number>(0);
  const [isExiting, setIsExiting] = useState<boolean>(false);

  useEffect(() => {
    let isCancelled = false;
    let assetsLoaded = false;

    // Collect all certificate image URLs to preload during the loading screen
    const imageUrls = Array.from(
      new Set(
        MILESTONES_LIST.flatMap((m) =>
          (m.certificates ?? []).map((c) => c.imageUrl)
        )
      )
    );

    const preloadImage = (url: string) =>
      new Promise<void>((resolve) => {
        const img = new Image();
        img.onload = () => resolve();
        img.onerror = () => resolve();
        img.src = url;
      });

    const fontsPromise =
      typeof document !== 'undefined' && 'fonts' in document
        ? document.fonts.ready.then(() => undefined).catch(() => undefined)
        : Promise.resolve();

    Promise.all([...imageUrls.map(preloadImage), fontsPromise]).then(() => {
      assetsLoaded = true;
    });

    const startTime = performance.now();
    const minDurationMs = 1750;

    let rafId = 0;
    const tick = (now: number) => {
      if (isCancelled) return;
      const elapsed = now - startTime;
      const timeRatio = Math.min(1, elapsed / minDurationMs);
      // Smooth ease-out cubic progress curve
      const easedRatio = 1 - Math.pow(1 - timeRatio, 3);

      // Hold at 92% only if assets haven't finished yet (with a 3s safety cap)
      const cap = assetsLoaded || elapsed > 3000 ? 100 : 92;
      const nextProgress = Math.min(cap, Math.round(easedRatio * 100));

      setProgress(nextProgress);

      if (nextProgress < 100) {
        rafId = requestAnimationFrame(tick);
      } else {
        window.setTimeout(() => {
          if (!isCancelled) {
            setStage('choosing');
          }
        }, 260);
      }
    };

    rafId = requestAnimationFrame(tick);

    return () => {
      isCancelled = true;
      cancelAnimationFrame(rafId);
    };
  }, []);

  const currentStatusText =
    [...LOADING_STEPS].reverse().find((s) => progress >= s.threshold)?.text ??
    LOADING_STEPS[0].text;

  const handleChoose = (chosenMode: ExperienceMode) => {
    setIsExiting(true);
    window.setTimeout(() => {
      onSelectExperience(chosenMode);
    }, 280);
  };

  return (
    <div
      className={`sanctuary-intro-overlay ${isExiting ? 'is-exiting' : ''}`}
      role="dialog"
      aria-modal="true"
      aria-label="Avian Sanctuary Portfolio Introduction"
    >
      {/* Subtle Top Bar with Theme Switcher Pill */}
      <div className="sanctuary-intro-topbar">
        <div className="sanctuary-intro-brand-pill">
          <FeatherIcon size={15} />
          <span>Avian Sanctuary · Portfolio</span>
        </div>

        <button
          type="button"
          className="hud-icon-btn"
          onClick={onToggleTheme}
          aria-label="Toggle color theme"
        >
          {theme === 'light' ? <MoonIcon size={15} /> : <SunIcon size={15} />}
          <span>{theme === 'light' ? 'Night Canopy' : 'Day Parchment'}</span>
        </button>
      </div>

      <div className="sanctuary-intro-center">
        {/* Animated Bird & Botanical Astrolabe Emblem */}
        <div
          className={`sanctuary-bird-emblem ${
            stage === 'choosing' ? 'is-ready' : ''
          }`}
          aria-hidden="true"
        >
          <svg
            viewBox="0 0 180 180"
            className="sanctuary-bird-svg"
            fill="none"
          >
            {/* Outer rotating astrolabe ring */}
            <circle
              cx="90"
              cy="90"
              r="76"
              stroke="currentColor"
              strokeOpacity="0.18"
              strokeWidth="1.2"
              strokeDasharray="5 7"
              className="bird-orbit-ring"
            />
            <circle
              cx="90"
              cy="90"
              r="60"
              stroke="currentColor"
              strokeOpacity="0.26"
              strokeWidth="1.2"
            />

            {/* Cardinal sanctuary island stars */}
            <circle cx="90" cy="14" r="3" fill="var(--accent-warm)" />
            <circle cx="166" cy="90" r="3" fill="var(--accent-primary)" />
            <circle cx="90" cy="166" r="3" fill="var(--accent-warm)" />
            <circle cx="14" cy="90" r="3" fill="var(--accent-primary)" />

            {/* Gliding Bird Silhouette with Flapping Wings */}
            <g className="bird-glider-group">
              {/* Left Wing */}
              <path
                className="bird-wing-left"
                d="M90 92 C 72 70, 46 64, 26 76 C 46 78, 66 86, 84 96 Z"
                fill="var(--accent-primary)"
              />
              {/* Right Wing */}
              <path
                className="bird-wing-right"
                d="M90 92 C 108 70, 134 64, 154 76 C 134 78, 114 86, 96 96 Z"
                fill="var(--accent-primary)"
              />
              {/* Bird Body & Tail */}
              <path
                d="M90 76 C 94 84, 95 96, 90 112 C 85 96, 86 84, 90 76 Z"
                fill="var(--accent-warm)"
              />
              <path
                d="M90 108 L 82 122 L 90 117 L 98 122 Z"
                fill="var(--accent-primary)"
              />
            </g>
          </svg>
        </div>

        {stage === 'loading' ? (
          <div className="sanctuary-loading-panel" aria-live="polite">
            <span className="botanical-badge">
              <SparklesIcon size={13} />
              <span>Preparing Sanctuary Assets</span>
            </span>

            <h1 className="sanctuary-intro-title">{PROFILE_INFO.fullName}</h1>
            <p className="sanctuary-loading-status">{currentStatusText}</p>

            <div className="sanctuary-progress-wrapper">
              <div
                className="sanctuary-progress-track"
                role="progressbar"
                aria-valuenow={progress}
                aria-valuemin={0}
                aria-valuemax={100}
              >
                <div
                  className="sanctuary-progress-fill"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <span className="sanctuary-progress-percent">{progress}%</span>
            </div>
          </div>
        ) : (
          <div className="sanctuary-choice-panel">
            <span className="botanical-badge">
              <SparklesIcon size={13} />
              <span>Sanctuary Ready · Choose Your Experience</span>
            </span>

            <h1 className="sanctuary-intro-title">{PROFILE_INFO.fullName}</h1>
            <p className="sanctuary-intro-subtitle">{PROFILE_INFO.headline}</p>

            <div className="sanctuary-choice-grid">
              {/* Choice 1: 3D Bird Flight */}
              <button
                type="button"
                className="sanctuary-choice-card choice-card-3d"
                onClick={() => handleChoose('3d-flight')}
              >
                <div className="choice-card-top">
                  <span className="choice-card-icon">
                    <CompassIcon size={22} />
                  </span>
                  <span className="botanical-badge">Interactive 3D World</span>
                </div>

                <div className="choice-card-body">
                  <h2>3D Bird Flight</h2>
                  <p>
                    Soar freely as a bird between four floating island portals
                    using touch gestures or keyboard flight controls.
                  </p>
                </div>

                <span className="choice-card-pill-cta primary">
                  <FeatherIcon size={15} />
                  <span>Take Flight (with Controls Guide)</span>
                </span>
              </button>

              {/* Choice 2: Standard Scenic Page */}
              <button
                type="button"
                className="sanctuary-choice-card choice-card-editorial"
                onClick={() => handleChoose('editorial')}
              >
                <div className="choice-card-top">
                  <span className="choice-card-icon warm">
                    <BookOpenIcon size={22} />
                  </span>
                  <span className="botanical-badge warm">
                    Standard Portfolio Page
                  </span>
                </div>

                <div className="choice-card-body">
                  <h2>Standard Scenic Page</h2>
                  <p>
                    Read through the full biography, technical capabilities, top
                    10 systems, and verified credentials in a classic scroll
                    layout.
                  </p>
                </div>

                <span className="choice-card-pill-cta secondary">
                  <BookOpenIcon size={15} />
                  <span>Open Standard Page</span>
                </span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
