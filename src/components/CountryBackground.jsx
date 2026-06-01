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
        viewBox="0 0 7061.88 4136.16"
        version="1.0"
        xmlSpace="preserve"
      >
        {/* Color 1 background polygon */}
        <polygon
          points="7061.88,0.01 0,0.01 0,4136.15 7061.88,4136.15"
          fill={colors[0]}
          style={{ transition: 'fill 0.5s ease-in-out' }}
        />
        {/* Color 5 polygon */}
        <polygon
          points="3530.95,4136.15 7061.88,4136.15 7061.88,492.55 3530.95,492.55"
          fill={colors[4]}
          style={{ transition: 'fill 0.5s ease-in-out' }}
        />
        {/* Color 3 path */}
        <path
          d="M 983.67,4136.16 H 6076.9 V 3315.02 H 3525.82 C 4934.67,3315.41 6076.9,2173.58 6076.9,765.45 6076.9,498.74 6035.86,241.63 5959.89,0 H 1712.87 c 586.14,622.59 1373.91,755.88 1821.88,755.88 -1408.85,0 -2551.08,1141.5 -2551.08,2549.95 z"
          fill={colors[2]}
          style={{ transition: 'fill 0.5s ease-in-out' }}
        />
        {/* Color 4 polygon */}
        <polygon
          points="7061.88,0.01 5722.93,0.01 5722.93,755.87 7061.88,755.87"
          fill={colors[3]}
          style={{ transition: 'fill 0.5s ease-in-out' }}
        />
        {/* Color 2 path */}
        <path
          d="m 3532.67,755.87 h 2544.2 C 6075.9,492.58 6034.95,238.73 5959.89,0 H 1712.87 c 585.24,621.63 1371.48,755.46 1819.8,755.87 z"
          fill={colors[1]}
          style={{ transition: 'fill 0.5s ease-in-out' }}
        />
      </svg>
    </div>
  );
}
