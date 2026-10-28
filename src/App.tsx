import React, { useEffect, useRef, useState, useCallback } from 'react';
import {
  ISLAND_PORTALS,
  PortalId,
} from './data/portfolioData';
import {
  TopNavHud,
  ExperienceMode,
  ThemeMode,
} from './components/hud/TopNavHud';
import { FlightDock } from './components/hud/FlightDock';
import { AvianSanctuary3D } from './components/canvas/AvianSanctuary3D';
import { CineTerraScrollyPage } from './components/editorial/CineTerraScrollyPage';
import { ChapterBio } from './components/chapters/ChapterBio';
import { ChapterSkills } from './components/chapters/ChapterSkills';
import { ChapterProjects } from './components/chapters/ChapterProjects';
import { ChapterDispatch } from './components/chapters/ChapterDispatch';
import {
  FeatherIcon,
  CloseIcon,
} from './components/icons/BotanicalIcons';

export const App: React.FC = () => {
  // 3D Bird Flight is the default experience per user requirement
  const [mode, setMode] = useState<ExperienceMode>('3d-flight');
  const [theme, setTheme] = useState<ThemeMode>('light');
  // Show Flight Controls Guide first on launch; gone once dismissed, reopenable anytime
  const [isControlsGuideOpen, setIsControlsGuideOpen] = useState<boolean>(true);
  const [activePortal, setActivePortal] = useState<PortalId | null>(null);
  const [autoPilotTarget, setAutoPilotTarget] = useState<PortalId | null>(null);

  const dialogRef = useRef<HTMLDialogElement | null>(null);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  useEffect(() => {
    document.body.classList.remove('mode-3d', 'mode-editorial');
    document.body.classList.add(mode === '3d-flight' ? 'mode-3d' : 'mode-editorial');
  }, [mode]);

  // Manage native <dialog closedby="any"> modal lifecycle + Safari light-dismiss fallback
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (activePortal && mode === '3d-flight') {
      if (!dialog.open) {
        dialog.showModal();
      }
    } else if (dialog.open) {
      dialog.close();
    }
  }, [activePortal, mode]);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    dialog.setAttribute('closedby', 'any');

    const handleNativeClose = () => {
      setActivePortal(null);
    };

    dialog.addEventListener('close', handleNativeClose);

    // Safari / legacy browser light-dismiss fallback when closedby="any" is unsupported
    const handleFallbackLightDismiss = (event: MouseEvent) => {
      if (!('closedBy' in HTMLDialogElement.prototype)) {
        if (event.target === dialog) {
          const rect = dialog.getBoundingClientRect();
          const clickedOutside =
            event.clientX < rect.left ||
            event.clientX > rect.right ||
            event.clientY < rect.top ||
            event.clientY > rect.bottom;
          if (clickedOutside) {
            dialog.close();
          }
        }
      }
    };

    dialog.addEventListener('click', handleFallbackLightDismiss);

    return () => {
      dialog.removeEventListener('close', handleNativeClose);
      dialog.removeEventListener('click', handleFallbackLightDismiss);
    };
  }, []);

  const handleToggleTheme = useCallback(() => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  }, []);

  // Fly the bird to the selected portal first; only open the sheet when the bird physically makes contact
  const handleFlyToPortal = useCallback(
    (portalId: PortalId) => {
      setIsControlsGuideOpen(false);
      if (activePortal === portalId) {
        setActivePortal(null);
        setAutoPilotTarget(null);
        return;
      }
      // Close any currently open sheet so the user watches the bird fly to the new island portal
      setActivePortal(null);
      setAutoPilotTarget(portalId);
    },
    [activePortal]
  );

  // Called by AvianSanctuary3D only when the bird physically reaches / makes contact with the portal ring
  const handleArriveAtPortal = useCallback((portalId: PortalId) => {
    setIsControlsGuideOpen(false);
    setAutoPilotTarget(null);
    setActivePortal(portalId);
  }, []);

  const currentPortalMeta = ISLAND_PORTALS.find((p) => p.id === activePortal);

  return (
    <>
      {/* Persistent Top Navigation HUD + Dismissible/Reopenable Flight Controls Guide */}
      <TopNavHud
        mode={mode}
        onModeChange={(nextMode) => {
          setActivePortal(null);
          setAutoPilotTarget(null);
          setMode(nextMode);
        }}
        theme={theme}
        onToggleTheme={handleToggleTheme}
        isControlsGuideOpen={isControlsGuideOpen}
        onToggleControlsGuide={setIsControlsGuideOpen}
      />

      {/* MODE 1 (DEFAULT): 3D AVIAN SANCTUARY FLIGHT WORLD */}
      {mode === '3d-flight' && (
        <>
          <AvianSanctuary3D
            theme={theme}
            activePortal={activePortal}
            autoPilotTarget={autoPilotTarget}
            onArriveAtPortal={handleArriveAtPortal}
            onTriggerAutoPilot={handleFlyToPortal}
          />

          {/* Apple Translucent Bottom Flight Dock */}
          <FlightDock
            activePortal={activePortal}
            targetPortal={autoPilotTarget}
            onSelectPortal={handleFlyToPortal}
          />

          {/* Native <dialog closedby="any"> Apple Spatial Sheet Overlay */}
          <dialog
            ref={dialogRef}
            className="spatial-sheet-dialog"
            aria-label={
              currentPortalMeta
                ? `${currentPortalMeta.landmarkTitle} — ${currentPortalMeta.name}`
                : 'Sanctuary Portal Dossier'
            }
          >
            {currentPortalMeta && (
              <>
                <div className="sheet-sticky-header">
                  <div className="sheet-header-meta">
                    <span className="sheet-Portal-badge">
                      Island {currentPortalMeta.numeral} · {currentPortalMeta.name}
                    </span>
                    <strong
                      style={{
                        fontFamily: 'var(--font-serif)',
                        fontSize: '1.15rem',
                      }}
                    >
                      {currentPortalMeta.landmarkTitle}
                    </strong>
                  </div>

                  <div className="sheet-header-actions">
                    <div className="sheet-portal-pills">
                      {ISLAND_PORTALS.map((p) => (
                        <button
                          key={p.id}
                          type="button"
                          className={`filter-pill-btn ${
                            activePortal === p.id ? 'active' : ''
                          }`}
                          style={{ padding: '0.3rem 0.7rem', fontSize: '0.74rem' }}
                          onClick={() => handleFlyToPortal(p.id)}
                        >
                          {p.name}
                        </button>
                      ))}
                    </div>

                    <button
                      type="button"
                      className="take-flight-btn"
                      onClick={() => setActivePortal(null)}
                    >
                      <FeatherIcon size={15} />
                      <span className="take-flight-label-full">Take Flight Again</span>
                      <span className="take-flight-label-short">Fly</span>
                    </button>

                    <button
                      type="button"
                      className="hud-icon-btn"
                      style={{ width: '36px', height: '36px', padding: 0 }}
                      onClick={() => setActivePortal(null)}
                      aria-label="Close portal sheet"
                    >
                      <CloseIcon size={16} />
                    </button>
                  </div>
                </div>

                <div className="sheet-scroll-body">
                  {activePortal === 'bio' && <ChapterBio />}
                  {activePortal === 'skills' && <ChapterSkills />}
                  {activePortal === 'projects' && <ChapterProjects />}
                  {activePortal === 'dispatch' && <ChapterDispatch />}
                </div>
              </>
            )}
          </dialog>
        </>
      )}

      {/* MODE 2: CINETERRA-STYLE FULL-BLEED SCENIC SCROLLYTELLING PAGE */}
      {mode === 'editorial' && (
        <CineTerraScrollyPage onSwitchTo3D={() => setMode('3d-flight')} />
      )}
    </>
  );
};
