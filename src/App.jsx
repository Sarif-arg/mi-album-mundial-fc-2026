import React, { useState, useEffect, useMemo } from 'react';
import { generateStickersList, GROUPS, TEAM_FLAGS } from './data/stickersData';
import Dashboard from './components/Dashboard';
import StickerCard from './components/StickerCard';
import QuickAdd from './components/QuickAdd';
import SharePanel from './components/SharePanel';
import TradeMatcher from './components/TradeMatcher';
import CountryBackground from './components/CountryBackground';
import logoSvg from './assets/2026_FIFA_World_Cup_emblem.svg';
import './App.css'; // Just in case, although styling is mainly in index.css

export default function App() {
  // Navigation tabs: 'dashboard', 'album', 'quickadd', 'settings'
  const [activeTab, setActiveTab] = useState('dashboard');
  
  // Stickers database list (constant)
  const stickersList = useMemo(() => generateStickersList(), []);

  // Sticker counts state: { [stickerCode]: count }
  const [stickerCounts, setStickerCounts] = useState(() => {
    try {
      const saved = localStorage.getItem('world_cup_2026_sticker_counts');
      return saved ? JSON.parse(saved) : {};
    } catch (e) {
      console.error('Error loading sticker counts from localStorage', e);
      return {};
    }
  });

  // Selected Team for the Album View (defaults to FWC special section)
  const [selectedTeam, setSelectedTeam] = useState('FWC');
  
  // Album sub-filter tabs: 'all', 'missing', 'owned', 'repeats'
  const [albumFilter, setAlbumFilter] = useState('all');
  
  // Search query
  const [searchQuery, setSearchQuery] = useState('');

  // Toast notification state
  const [toast, setToast] = useState(null);

  // Save progress to localStorage on any state change
  useEffect(() => {
    localStorage.setItem('world_cup_2026_sticker_counts', JSON.stringify(stickerCounts));
  }, [stickerCounts]);

  // Utility to show toast message
  const showToast = (message) => {
    setToast(message);
    // Haptic feedback if supported by browser/Android
    if (navigator.vibrate) {
      navigator.vibrate(50);
    }
  };

  // Clear toast after timeout
  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => setToast(null), 2500);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  // Increment sticker count
  const handleIncrement = (code) => {
    setStickerCounts(prev => {
      const current = prev[code] || 0;
      // Haptic bump
      if (navigator.vibrate) {
        navigator.vibrate(30);
      }
      return { ...prev, [code]: current + 1 };
    });
  };

  // Decrement sticker count
  const handleDecrement = (code) => {
    setStickerCounts(prev => {
      const current = prev[code] || 0;
      if (current <= 0) return prev;
      const nextCounts = { ...prev };
      if (current === 1) {
        delete nextCounts[code];
      } else {
        nextCounts[code] = current - 1;
      }
      // Haptic bump
      if (navigator.vibrate) {
        navigator.vibrate([20, 20]);
      }
      return nextCounts;
    });
  };

  // Bulk add stickers from QuickAdd
  const handleBulkAdd = (codes) => {
    setStickerCounts(prev => {
      const nextCounts = { ...prev };
      codes.forEach(code => {
        nextCounts[code] = (nextCounts[code] || 0) + 1;
      });
      return nextCounts;
    });
  };

  // Complete two-way trade: add received, remove duplicates given away
  const handleCompleteTrade = (receives, gives) => {
    setStickerCounts(prev => {
      const nextCounts = { ...prev };
      
      // 1. Add stickers received (got from friend)
      receives.forEach(code => {
        nextCounts[code] = (nextCounts[code] || 0) + 1;
      });

      // 2. Remove duplicates given away (gave to friend)
      gives.forEach(code => {
        const current = nextCounts[code] || 0;
        if (current > 1) {
          nextCounts[code] = current - 1;
        } else if (current === 1) {
          delete nextCounts[code];
        }
      });

      return nextCounts;
    });
  };

  // --- STATISTICS CALCULATIONS ---
  const stats = useMemo(() => {
    const total = stickersList.length;
    let ownedUnique = 0;
    let totalDuplicates = 0;

    stickersList.forEach(s => {
      const count = stickerCounts[s.code] || 0;
      if (count > 0) {
        ownedUnique += 1;
        if (count > 1) {
          totalDuplicates += (count - 1);
        }
      }
    });

    const missing = total - ownedUnique;

    return {
      total,
      ownedUnique,
      totalDuplicates,
      missingCount: missing
    };
  }, [stickersList, stickerCounts]);

  // --- FILTERS & SEARCH SYSTEM ---
  const filteredStickers = useMemo(() => {
    let list = stickersList;

    // Search query matches code, team name, or player name
    if (searchQuery.trim()) {
      const query = searchQuery.trim().toLowerCase();
      return list.filter(s => 
        s.code.toLowerCase().includes(query) || 
        s.teamName.toLowerCase().includes(query) ||
        s.name.toLowerCase().includes(query)
      );
    }

    // Filter by team
    list = list.filter(s => s.teamId === selectedTeam);

    // Filter by sub-category tab
    if (albumFilter === 'missing') {
      list = list.filter(s => (stickerCounts[s.code] || 0) === 0);
    } else if (albumFilter === 'owned') {
      list = list.filter(s => (stickerCounts[s.code] || 0) > 0);
    } else if (albumFilter === 'repeats') {
      list = list.filter(s => (stickerCounts[s.code] || 0) > 1);
    }

    return list;
  }, [stickersList, selectedTeam, albumFilter, searchQuery, stickerCounts]);

  // Progress for each team (to display on header)
  const teamProgress = useMemo(() => {
    const counts = {};
    // Initialize counts for each team
    stickersList.forEach(s => {
      if (!counts[s.teamId]) {
        counts[s.teamId] = { total: 0, owned: 0 };
      }
      counts[s.teamId].total += 1;
      if ((stickerCounts[s.code] || 0) > 0) {
        counts[s.teamId].owned += 1;
      }
    });
    return counts;
  }, [stickersList, stickerCounts]);

  // List of all teams for the sliding selector
  const teamList = useMemo(() => {
    const list = [];
    Object.keys(GROUPS).forEach(gKey => {
      GROUPS[gKey].teams.forEach(t => {
        list.push({
          ...t,
          groupName: GROUPS[gKey].name
        });
      });
    });
    return list;
  }, []);

  // --- SETTINGS ACTIONS ---
  const handleExportData = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(stickerCounts));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", "mi-album-mundial-2026.json");
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    showToast('Archivo de respaldo exportado.');
  };

  const handleImportData = (e) => {
    const fileReader = new FileReader();
    const file = e.target.files[0];
    if (!file) return;

    fileReader.onload = (event) => {
      try {
        const parsed = JSON.parse(event.target.result);
        if (typeof parsed === 'object' && parsed !== null) {
          // Quick type verification
          const cleanObj = {};
          Object.keys(parsed).forEach(k => {
            const val = parseInt(parsed[k]);
            if (!isNaN(val) && val >= 0) {
              cleanObj[k] = val;
            }
          });
          setStickerCounts(cleanObj);
          showToast('¡Datos importados con éxito!');
        } else {
          showToast('Formato de archivo inválido.');
        }
      } catch (err) {
        showToast('Error al leer el archivo JSON.');
      }
    };
    fileReader.readAsText(file);
  };

  const handleResetData = () => {
    const conf = window.confirm('¿Estás seguro de que quieres borrar TODOS los datos de tu álbum? Esta acción no se puede deshacer.');
    if (conf) {
      setStickerCounts({});
      showToast('Álbum reiniciado por completo.');
    }
  };

  return (
    <div className="app-container">
      {/* Dynamic Background Watermark */}
      <CountryBackground teamId={activeTab === 'album' ? selectedTeam : 'FWC'} />

      {/* Toast Alert */}
      {toast && <div className="toast-msg">{toast}</div>}

      {/* App Header */}
      <header className="app-header">
        <div className="logo-container">
          <img 
            src={logoSvg} 
            alt="Logo Mundial 2026" 
            style={{ 
              width: '42px', 
              height: '42px', 
              objectFit: 'contain',
              filter: 'drop-shadow(0 2px 8px rgba(168, 85, 247, 0.5))'
            }} 
          />
          <div>
            <h1 className="logo-text">MI ÁLBUM</h1>
            <span style={{ fontSize: '0.68rem', letterSpacing: '0.1em', color: 'var(--text-secondary)' }}>
              WORLD CUP 2026
            </span>
          </div>
        </div>
        <div style={{ textAlign: 'right' }}>
          <span 
            style={{ 
              fontSize: '0.72rem', 
              color: 'var(--primary)', 
              fontWeight: 800,
              background: 'rgba(16, 185, 129, 0.1)',
              padding: '4px 8px',
              borderRadius: '20px',
              border: '1px solid rgba(16, 185, 129, 0.2)'
            }}
          >
            {Math.round((stats.ownedUnique / stats.total) * 100)}% Listo
          </span>
        </div>
      </header>

      {/* RENDER ACTIVE TABS */}
      {activeTab === 'dashboard' && (
        <>
          <Dashboard 
            totalStickers={stats.total} 
            ownedUnique={stats.ownedUnique} 
            totalDuplicates={stats.totalDuplicates} 
            missingCount={stats.missingCount} 
          />

          <SharePanel 
            stickersList={stickersList} 
            stickerCounts={stickerCounts} 
            showToast={showToast} 
          />
        </>
      )}

      {activeTab === 'album' && (
        <div className="toolbar-section">
          {/* Search bar */}
          <div className="search-box">
            <span className="search-icon">🔍</span>
            <input
              type="text"
              className="search-input"
              placeholder="Buscar por código (ej: ARG-10) o nombre..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                style={{
                  position: 'absolute',
                  right: '16px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'transparent',
                  border: 'none',
                  color: 'var(--text-secondary)',
                  cursor: 'pointer',
                  fontSize: '1rem'
                }}
              >
                ✕
              </button>
            )}
          </div>

          {/* Sub-Filters Tabs (All, Missing, Owned, Repeats) - Only show if not searching globally */}
          {!searchQuery && (
            <div className="filter-tabs">
              <button 
                className={`filter-tab ${albumFilter === 'all' ? 'active' : ''}`}
                onClick={() => setAlbumFilter('all')}
              >
                Todas
              </button>
              <button 
                className={`filter-tab ${albumFilter === 'missing' ? 'active' : ''}`}
                onClick={() => setAlbumFilter('missing')}
              >
                Faltan
              </button>
              <button 
                className={`filter-tab ${albumFilter === 'owned' ? 'active' : ''}`}
                onClick={() => setAlbumFilter('owned')}
              >
                Tengo
              </button>
              <button 
                className={`filter-tab ${albumFilter === 'repeats' ? 'active' : ''}`}
                onClick={() => setAlbumFilter('repeats')}
              >
                Repes
              </button>
            </div>
          )}

          {/* Horizontal team scrollbar - Only show if not searching globally */}
          {!searchQuery && (
            <div className="team-scroll-container">
              {teamList.map(t => {
                const prog = teamProgress[t.id] || { total: 20, owned: 0 };
                const isSelected = selectedTeam === t.id;
                return (
                  <button
                    key={t.id}
                    className={`team-pill ${isSelected ? 'active' : ''}`}
                    onClick={() => setSelectedTeam(t.id)}
                  >
                    <span>{TEAM_FLAGS[t.id] || '⚽'}</span>
                    <span>{t.id}</span>
                    <span style={{ fontSize: '0.65rem', opacity: 0.8 }}>
                      ({prog.owned}/{prog.total})
                    </span>
                  </button>
                );
              })}
            </div>
          )}

          {/* Sticker Grid View */}
          <div className="sticker-grid-wrapper">
            <h3 className="team-header-title">
              <span>
                {searchQuery ? 'Resultado de Búsqueda' : `${TEAM_FLAGS[selectedTeam] || '⚽'} ${teamList.find(t => t.id === selectedTeam)?.name || 'Especiales'}`}
              </span>
              {!searchQuery && (
                <span className="team-header-progress">
                  {teamProgress[selectedTeam]?.owned || 0} de {teamProgress[selectedTeam]?.total || 20}
                </span>
              )}
            </h3>

            {filteredStickers.length > 0 ? (
              <div className="sticker-grid">
                {filteredStickers.map(sticker => (
                  <StickerCard
                    key={sticker.code}
                    sticker={sticker}
                    count={stickerCounts[sticker.code] || 0}
                    onIncrement={handleIncrement}
                    onDecrement={handleDecrement}
                  />
                ))}
              </div>
            ) : (
              <div className="empty-state">
                <span className="empty-icon">⚽</span>
                <h4>No se encontraron figuritas</h4>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                  Intenta cambiar la pestaña de filtro o buscar un código diferente.
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      {activeTab === 'quickadd' && (
        <>
          <QuickAdd 
            stickersList={stickersList} 
            onBulkAdd={handleBulkAdd} 
            showToast={showToast} 
          />
          
          <TradeMatcher
            stickersList={stickersList}
            stickerCounts={stickerCounts}
            onCompleteTrade={handleCompleteTrade}
            showToast={showToast}
          />
        </>
      )}

      {activeTab === 'settings' && (
        <div className="glass-card share-section">
          <h3 style={{ fontFamily: 'var(--font-display)', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span>⚙</span> Ajustes y Respaldo
          </h3>
          <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '8px' }}>
            Administra tus datos del álbum para no perder tu progreso o transferirlo a otro celular.
          </p>

          <div className="settings-list">
            <div className="settings-item">
              <div className="settings-info">
                <h4>Copia de Seguridad</h4>
                <p>Exporta tu progreso en un archivo JSON.</p>
              </div>
              <button className="btn btn-secondary" style={{ padding: '8px 16px' }} onClick={handleExportData}>
                Exportar
              </button>
            </div>

            <div className="settings-item">
              <div className="settings-info">
                <h4>Restaurar Datos</h4>
                <p>Importa un archivo JSON de respaldo.</p>
              </div>
              <label className="btn btn-secondary" style={{ padding: '8px 16px', display: 'inline-block', textAlign: 'center', cursor: 'pointer' }}>
                Importar
                <input 
                  type="file" 
                  accept=".json" 
                  onChange={handleImportData} 
                  style={{ display: 'none' }} 
                />
              </label>
            </div>

            <div className="settings-item" style={{ borderColor: 'rgba(239, 68, 68, 0.2)' }}>
              <div className="settings-info">
                <h4 style={{ color: '#ef4444' }}>Reiniciar Álbum</h4>
                <p>Borra todo el progreso de la aplicación.</p>
              </div>
              <button 
                className="btn" 
                style={{ 
                  background: 'linear-gradient(135deg, #dc2626, #ef4444)', 
                  padding: '8px 16px' 
                }} 
                onClick={handleResetData}
              >
                Reiniciar
              </button>
            </div>
          </div>

          <div style={{ marginTop: '20px', borderTop: '1px solid var(--border-color)', paddingTop: '16px', textAlign: 'center' }}>
            <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
              Mi Álbum Mundial 2026 v1.0.0 (PWA)
            </p>
            <p style={{ fontSize: '0.65rem', color: 'var(--text-muted)', marginTop: '4px' }}>
              Optimizado para celulares. Hecho con ❤️ para coleccionistas.
            </p>
          </div>
        </div>
      )}

      {/* BOTTOM NAV BAR */}
      <nav className="bottom-nav">
        <button 
          className={`nav-item ${activeTab === 'dashboard' ? 'active' : ''}`}
          onClick={() => setActiveTab('dashboard')}
        >
          <span className="nav-icon">📊</span>
          <span className="nav-label">Progreso</span>
        </button>

        <button 
          className={`nav-item ${activeTab === 'album' ? 'active' : ''}`}
          onClick={() => setActiveTab('album')}
        >
          <span className="nav-icon">📖</span>
          <span className="nav-label">Álbum</span>
        </button>

        <button 
          className={`nav-item ${activeTab === 'quickadd' ? 'active' : ''}`}
          onClick={() => setActiveTab('quickadd')}
        >
          <span className="nav-icon">🔄</span>
          <span className="nav-label">Canjes</span>
        </button>

        <button 
          className={`nav-item ${activeTab === 'settings' ? 'active' : ''}`}
          onClick={() => setActiveTab('settings')}
        >
          <span className="nav-icon">⚙</span>
          <span className="nav-label">Ajustes</span>
        </button>
      </nav>
    </div>
  );
}
