import React from 'react';
import { ISLAND_PORTALS, PortalId } from '../../data/portfolioData';
import {
  BanyanIcon,
  AstrolabeIcon,
  LighthouseIcon,
  DovePerchIcon,
} from '../icons/BotanicalIcons';

interface FlightDockProps {
  activePortal: PortalId | null;
  targetPortal: PortalId | null;
  onSelectPortal: (portalId: PortalId) => void;
}

const getPortalIcon = (id: PortalId) => {
  switch (id) {
    case 'bio':
      return <BanyanIcon size={16} />;
    case 'skills':
      return <AstrolabeIcon size={16} />;
    case 'projects':
      return <LighthouseIcon size={16} />;
    case 'dispatch':
      return <DovePerchIcon size={16} />;
  }
};

export const FlightDock: React.FC<FlightDockProps> = ({
  activePortal,
  targetPortal,
  onSelectPortal,
}) => {
  return (
    <nav
      className="flight-dock-container"
      aria-label="Sanctuary Island Portals (Click to Auto-Fly and Open)"
    >
      {ISLAND_PORTALS.map((portal) => {
        const isCurrent = activePortal === portal.id || targetPortal === portal.id;
        return (
          <button
            key={portal.id}
            type="button"
            className={`dock-portal-btn ${isCurrent ? 'active' : ''}`}
            onClick={() => onSelectPortal(portal.id)}
          >
            <span className="dock-portal-icon">{getPortalIcon(portal.id)}</span>
            <span className="dock-portal-text">
              <span className="dock-portal-roman">
                Island {portal.numeral} · {portal.landmarkTitle}
              </span>
              <span className="dock-portal-label">{portal.name}</span>
            </span>
          </button>
        );
      })}
    </nav>
  );
};
