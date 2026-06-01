import React from 'react';

export const COUNTRY_COLORS = {
  MEX: ["#ffffff", "#e81602", "#00ad54", "#aed600", "#ffd8be"],
  RSA: ["#ffffff", "#4c1d95", "#e81602", "#86efac", "#00ad54"],
  KOR: ["#ffffff", "#e81602", "#1d4ed8", "#aed600", "#fbbf24"],
  CZE: ["#ffffff", "#e81602", "#1d4ed8", "#aed600", "#f472b6"],
  CAN: ["#ffffff", "#ea580c", "#991b1b", "#e81602", "#f97316"],
  BIH: ["#ffffff", "#facc15", "#1d4ed8", "#e81602", "#bae6fd"],
  QAT: ["#ffffff", "#db2777", "#881337", "#e81602", "#aed600"],
  SUI: ["#ffffff", "#991b1b", "#e81602", "#ff8a80", "#38bdf8"],
  BRA: ["#ffffff", "#facc15", "#00ad54", "#a3e635", "#60a5fa"],
  MAR: ["#ffffff", "#00ad54", "#e81602", "#a3e635", "#6b21a8"],
  HAI: ["#ffffff", "#e81602", "#1d4ed8", "#facc15", "#ffb74d"],
  SCO: ["#ffffff", "#1d4ed8", "#38bdf8", "#a3e635", "#f97316"],
  USA: ["#ffffff", "#38bdf8", "#1e3a8a", "#1d4ed8", "#e81602"],
  PAR: ["#ffffff", "#1e3a8a", "#e81602", "#1d4ed8", "#fbbf24"],
  AUS: ["#ffffff", "#e81602", "#1e3a8a", "#1d4ed8", "#d8b4fe"],
  TUR: ["#ffffff", "#fda4af", "#e81602", "#1d4ed8", "#38bdf8"],
  GER: ["#ffffff", "#18181b", "#e81602", "#f97316", "#facc15"],
  CUW: ["#ffffff", "#facc15", "#1e3a8a", "#f97316", "#d8b4fe"],
  CIV: ["#ffffff", "#ffedd5", "#00ad54", "#f97316", "#38bdf8"],
  ECU: ["#ffffff", "#1e3a8a", "#facc15", "#f97316", "#e81602"],
  NED: ["#ffffff", "#e81602", "#1d4ed8", "#00ad54", "#f97316"],
  JPN: ["#ffffff", "#fda4af", "#e81602", "#00ad54", "#38bdf8"],
  SWE: ["#ffffff", "#facc15", "#1d4ed8", "#00ad54", "#d8b4fe"],
  TUN: ["#ffffff", "#991b1b", "#e81602", "#00ad54", "#facc15"],
  BEL: ["#ffffff", "#18181b", "#e81602", "#bae6fd", "#facc15"],
  EGY: ["#ffffff", "#18181b", "#e81602", "#38bdf8", "#00ad54"],
  IRN: ["#ffffff", "#e81602", "#00ad54", "#38bdf8", "#881337"],
  NZL: ["#ffffff", "#e81602", "#1e3a8a", "#38bdf8", "#ffd8be"],
  ESP: ["#ffffff", "#facc15", "#e81602", "#38bdf8", "#1d4ed8"],
  CPV: ["#ffffff", "#e81602", "#1d4ed8", "#38bdf8", "#facc15"],
  KSA: ["#ffffff", "#14532d", "#00ad54", "#38bdf8", "#d8b4fe"],
  URU: ["#ffffff", "#38bdf8", "#1e3a8a", "#81e6d9", "#facc15"],
  FRA: ["#ffffff", "#e81602", "#0066cc", "#6b21a8", "#ffd8be"],
  SEN: ["#ffffff", "#00ad54", "#facc15", "#4f46e5", "#e81602"],
  IRQ: ["#ffffff", "#18181b", "#e81602", "#4f46e5", "#00ad54"],
  NOR: ["#ffffff", "#e81602", "#1d4ed8", "#6b21a8", "#aed600"],
  ARG: ["#ffffff", "#1d4ed8", "#38bdf8", "#ffd8be", "#ff9800"],
  ALG: ["#ffffff", "#e81602", "#00ad54", "#ffd8be", "#d8b4fe"],
  AUT: ["#ffffff", "#fda4af", "#e81602", "#ffd8be", "#aed600"],
  JOR: ["#ffffff", "#18181b", "#00ad54", "#ffd8be", "#e81602"],
  POR: ["#ffffff", "#e81602", "#14532d", "#ff1493", "#d8b4fe"],
  COD: ["#ffffff", "#e81602", "#0284c7", "#f472b6", "#facc15"],
  UZB: ["#ffffff", "#00ad54", "#0284c7", "#ff1493", "#ffedd5"],
  COL: ["#ffffff", "#1d4ed8", "#facc15", "#f472b6", "#e81602"],
  ENG: ["#ffffff", "#e81602", "#f472b6", "#881337", "#1d4ed8"],
  CRO: ["#ffffff", "#1d4ed8", "#e81602", "#881337", "#38bdf8"],
  GHA: ["#ffffff", "#00ad54", "#facc15", "#881337", "#f472b6"],
  PAN: ["#ffffff", "#1d4ed8", "#e81602", "#881337", "#aed600"],
  FWC: ["#6917F2", "#7C1D10", "#00AD54", "#AED600", "#E81602"] // Default 2026 World Cup pattern colors
};

export default function CountryBackground({ teamId }) {
  const colors = COUNTRY_COLORS[teamId] || COUNTRY_COLORS.FWC;

  return (
    <div 
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: -2,
        opacity: 0.14,
        pointerEvents: 'none',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        transition: 'all 0.5s ease-in-out'
      }}
    >
      <svg
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          shapeRendering: 'geometricPrecision'
        }}
        viewBox="0 0 5296.4151 6676.5295"
        version="1.0"
        xmlSpace="preserve"
      >
        <g id="Capa_x0020_1" transform="translate(0,2540.3799)">
          <polygon
            points="0,4136.15 7061.88,4136.15 7061.88,0.01 0,0.01"
            id="Color1"
            transform="matrix(0.75000071,0,0,1.6141934,0,-2540.3961)"
            fill={colors[0]}
            style={{ transition: 'fill 0.5s ease-in-out' }}
          />
          <polygon
            points="7061.88,4136.15 7061.88,492.55 3530.95,492.55 3530.95,4136.15"
            id="Color5"
            transform="matrix(0.50000001,0,0,1,1765.475,0)"
            fill={colors[4]}
            style={{ transition: 'fill 0.5s ease-in-out' }}
          />
          <path
            id="Color3"
            d="M 1712.8691 0.000959375 C 2299.0091 622.59096 3086.78 755.87987 3534.75 755.87987 C 2125.9 755.87987 983.66992 1897.3791 983.66992 3305.8291 L 983.66992 4136.1494 L 5296.4141 4136.1494 L 5296.4141 3315.0205 L 3525.8203 3315.0205 C 4213.4774 3315.2108 4837.6158 3043.2775 5296.4141 2601.0791 L 5296.4141 0.000959375 L 1712.8691 0.000959375 z"
            fill={colors[2]}
            style={{ transition: 'fill 0.5s ease-in-out' }}
          />
          <polygon
            points="5722.93,755.87 7061.88,755.87 7061.88,0.01 5722.93,0.01"
            id="Color4"
            transform="matrix(1.2585466,0,0,4.3609266,-3591.2898,-2540.4236)"
            fill={colors[3]}
            style={{ transition: 'fill 0.5s ease-in-out' }}
          />
          <path
            id="Color2"
            d="M 1100.6816 -2540.3799 C 1024.7116 -2298.7499 983.67187 -2041.6407 983.67188 -1774.9307 C 983.67188 -440.46052 2009.5255 654.84257 3315.9727 765.45018 L 5296.4141 765.45018 L 5296.4141 -1070.3447 C 4837.6157 -1512.55 4213.4775 -1784.501 3525.8203 -1784.501 C 3960.8502 -1784.501 4716.3319 -1910.2008 5296.4141 -2487.6436 L 5296.4141 -2540.3799 L 1100.6816 -2540.3799 z"
            fill={colors[1]}
            style={{ transition: 'fill 0.5s ease-in-out' }}
          />
        </g>
      </svg>
    </div>
  );
}
