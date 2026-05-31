import React from 'react';

export default function Dashboard({ totalStickers, ownedUnique, totalDuplicates, missingCount }) {
  const percentage = totalStickers > 0 ? Math.round((ownedUnique / totalStickers) * 100) : 0;
  
  // SVG circular progress parameters
  const radius = 40;
  const strokeWidth = 8;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div className="glass-card">
      <div className="dashboard-progress">
        <div className="progress-ring-container">
          <svg width="100" height="100" viewBox="0 0 100 100" style={{ transform: 'rotate(-90deg)' }}>
            {/* Background Circle */}
            <circle
              cx="50"
              cy="50"
              r={radius}
              fill="transparent"
              stroke="rgba(255, 255, 255, 0.05)"
              strokeWidth={strokeWidth}
            />
            {/* Progress Circle with Gradient */}
            <circle
              cx="50"
              cy="50"
              r={radius}
              fill="transparent"
              stroke="url(#progress-gradient)"
              strokeWidth={strokeWidth}
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              style={{ transition: 'stroke-dashoffset 0.8s ease' }}
            />
            <defs>
              <linearGradient id="progress-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#a855f7" /> {/* Purple */}
                <stop offset="100%" stopColor="#10b981" /> {/* Green */}
              </linearGradient>
            </defs>
          </svg>
          <div className="progress-text">
            {percentage}%
            <span>Completado</span>
          </div>
        </div>

        <div style={{ flex: 1 }}>
          <h3 style={{ fontSize: '1.2rem', marginBottom: '4px', fontFamily: 'var(--font-display)' }}>
            Tu Álbum 2026
          </h3>
          <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
            Sigue completando tu colección y gestionando tus repetidas para canjear.
          </p>
        </div>
      </div>

      <div className="stats-grid">
        <div className="stat-item">
          <span className="stat-lbl">Tengo</span>
          <span className="stat-val primary">{ownedUnique}</span>
          <span style={{ fontSize: '0.62rem', color: 'var(--text-muted)' }}>de {totalStickers}</span>
        </div>
        <div className="stat-item">
          <span className="stat-lbl">Faltan</span>
          <span className="stat-val" style={{ color: 'var(--accent-pink)', textShadow: '0 0 10px rgba(236, 72, 153, 0.3)' }}>
            {missingCount}
          </span>
          <span style={{ fontSize: '0.62rem', color: 'var(--text-muted)' }}>por conseguir</span>
        </div>
        <div className="stat-item">
          <span className="stat-lbl">Repetidas</span>
          <span className="stat-val gold">{totalDuplicates}</span>
          <span style={{ fontSize: '0.62rem', color: 'var(--text-muted)' }}>para cambiar</span>
        </div>
      </div>
    </div>
  );
}
