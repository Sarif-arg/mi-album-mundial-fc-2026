import { useState, useMemo, useEffect } from 'react';
import { Html5QrcodeScanner } from 'html5-qrcode';
import { TEAM_FLAGS } from '../data/stickersData';
import { compressStickerCounts, decompressStickerCounts } from '../utils/qrUtils';

export default function QRShare({ stickersList, stickerCounts, friendCounts, onClearComparison, onCompleteTrade, onFriendScanned, showToast }) {
  const [toggledReceives, setToggledReceives] = useState({});
  const [toggledGives, setToggledGives] = useState({});
  const [isScanning, setIsScanning] = useState(false);

  // 1. Calculate receives (friend repeats you need)
  const receives = useMemo(() => {
    if (!friendCounts) return [];
    return stickersList.filter(s => {
      const myCount = stickerCounts[s.code] || 0;
      const friendCount = friendCounts[s.code] || 0;
      return myCount === 0 && friendCount >= 2;
    });
  }, [stickersList, stickerCounts, friendCounts]);

  // 2. Calculate gives (your repeats friend needs)
  const gives = useMemo(() => {
    if (!friendCounts) return [];
    return stickersList.filter(s => {
      const myCount = stickerCounts[s.code] || 0;
      const friendCount = friendCounts[s.code] || 0;
      return myCount >= 2 && friendCount === 0;
    });
  }, [stickersList, stickerCounts, friendCounts]);

  const shareUrl = useMemo(() => {
    const compressed = compressStickerCounts(stickerCounts, stickersList);
    return `${window.location.origin}${window.location.pathname}?share=${compressed}`;
  }, [stickerCounts, stickersList]);

  // QR Scanner Initialization and Lifecycle
  useEffect(() => {
    if (!isScanning) return;

    const scanner = new Html5QrcodeScanner("reader", {
      fps: 10,
      qrbox: { width: 250, height: 250 },
      rememberLastUsedCamera: true,
      supportedScanTypes: [0, 1] // Both Camera (0) and File Upload (1)
    }, false);

    const onScanSuccess = (decodedText) => {
      try {
        let shareData = null;
        if (decodedText.startsWith('http') || decodedText.includes('?share=')) {
          const url = new URL(decodedText);
          shareData = url.searchParams.get('share');
        } else {
          // Fallback: scanned the raw base64 token directly
          shareData = decodedText;
        }

        if (shareData) {
          const counts = decompressStickerCounts(shareData, stickersList);
          scanner.clear().then(() => {
            onFriendScanned(counts);
            setIsScanning(false);
            showToast('¡Figuritas de tu amigo importadas!');
          }).catch(err => {
            console.error("Failed to clear scanner on success", err);
            // Fallback: set states anyway
            onFriendScanned(counts);
            setIsScanning(false);
          });
        } else {
          showToast('Código QR inválido.');
        }
      } catch (e) {
        showToast('Error al leer el código QR.');
        console.error(e);
      }
    };

    const onScanFailure = () => {
      // Quietly log scanner failures as they happen continuously until match is found
    };

    scanner.render(onScanSuccess, onScanFailure);

    return () => {
      scanner.clear().catch(() => {
        // Quietly catch cleanup errors when scanner is already cleared
      });
    };
  }, [isScanning, stickersList, onFriendScanned, showToast]);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(shareUrl)
      .then(() => showToast('¡Enlace de intercambio copiado al portapapeles!'))
      .catch(() => showToast('Error al copiar el enlace.'));
  };

  const handleWhatsAppShare = () => {
    const text = `🏆 ¡Hola! Compara tus figuritas del Mundial 2026 con las mías usando este enlace:\n\n${shareUrl}`;
    const url = `https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
  };

  const handleToggleReceive = (code) => {
    setToggledReceives(prev => ({ ...prev, [code]: !prev[code] }));
  };

  const handleToggleGive = (code) => {
    setToggledGives(prev => ({ ...prev, [code]: !prev[code] }));
  };

  const handleExecuteTrade = () => {
    const receivesToAdd = receives.filter(s => !toggledReceives[s.code]).map(s => s.code);
    const givesToRemove = gives.filter(s => !toggledGives[s.code]).map(s => s.code);

    if (receivesToAdd.length === 0 && givesToRemove.length === 0) {
      showToast('Selecciona al menos una figurita para el canje.');
      return;
    }

    onCompleteTrade(receivesToAdd, givesToRemove);
  };

  return (
    <div className="glass-card share-section">
      {friendCounts ? (
        // COMPARISON VIEW
        <div>
          <h3 style={{ fontFamily: 'var(--font-display)', display: 'flex', alignItems: 'center', gap: '8px', justifyContent: 'center', marginBottom: '16px' }}>
            <span>🤝</span> Comparando Figuritas
          </h3>
          <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', textAlign: 'center', marginBottom: '20px' }}>
            Hemos detectado la colección de tu amigo. Selecciona las figuritas que desean cambiar e intercambien de forma automática.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {/* Le pides (Lo que te sirve) */}
            <div>
              <h4 style={{ fontSize: '0.9rem', color: 'var(--primary)', fontWeight: 700, marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span>📥</span> Lo que te sirve de tu amigo (Le pides):
              </h4>
              {receives.length > 0 ? (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '8px', maxHeight: '150px', overflowY: 'auto', padding: '4px' }}>
                  {receives.map(s => {
                    const isChecked = !toggledReceives[s.code];
                    return (
                      <label key={s.code} style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px', background: isChecked ? 'rgba(16, 185, 129, 0.08)' : 'rgba(255,255,255,0.02)', border: `1.5px solid ${isChecked ? 'var(--primary)' : 'var(--border-color)'}`, borderRadius: '8px', fontSize: '0.8rem', cursor: 'pointer', transition: 'var(--transition-smooth)' }}>
                        <input type="checkbox" checked={isChecked} onChange={() => handleToggleReceive(s.code)} style={{ accentColor: 'var(--primary)', width: '15px', height: '15px' }} />
                        <span>{TEAM_FLAGS[s.teamId] || '⚽'}</span>
                        <strong>{s.code}</strong>
                      </label>
                    );
                  })}
                </div>
              ) : (
                <div style={{ background: 'rgba(255,255,255,0.02)', border: '1.5px dashed var(--border-color)', borderRadius: '8px', padding: '16px', textAlign: 'center', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                  Tu amigo no tiene repetidas que te falten.
                </div>
              )}
            </div>

            {/* Le das (Lo que le sirve a tu amigo) */}
            <div>
              <h4 style={{ fontSize: '0.9rem', color: 'var(--accent-gold)', fontWeight: 700, marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span>📤</span> Lo que le sirve a tu amigo (Le das):
              </h4>
              {gives.length > 0 ? (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '8px', maxHeight: '150px', overflowY: 'auto', padding: '4px' }}>
                  {gives.map(s => {
                    const isChecked = !toggledGives[s.code];
                    return (
                      <label key={s.code} style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px', background: isChecked ? 'rgba(245, 158, 11, 0.08)' : 'rgba(255,255,255,0.02)', border: `1.5px solid ${isChecked ? 'var(--accent-gold)' : 'var(--border-color)'}`, borderRadius: '8px', fontSize: '0.8rem', cursor: 'pointer', transition: 'var(--transition-smooth)' }}>
                        <input type="checkbox" checked={isChecked} onChange={() => handleToggleGive(s.code)} style={{ accentColor: 'var(--accent-gold)', width: '15px', height: '15px' }} />
                        <span>{TEAM_FLAGS[s.teamId] || '⚽'}</span>
                        <strong>{s.code}</strong>
                      </label>
                    );
                  })}
                </div>
              ) : (
                <div style={{ background: 'rgba(255,255,255,0.02)', border: '1.5px dashed var(--border-color)', borderRadius: '8px', padding: '16px', textAlign: 'center', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                  No tienes repetidas que le falten a tu amigo.
                </div>
              )}
            </div>
          </div>

          <div style={{ display: 'flex', gap: '12px', marginTop: '24px' }}>
            <button className="btn btn-secondary" style={{ flex: 1 }} onClick={onClearComparison}>
              ❌ Cancelar
            </button>
            <button 
              className="btn btn-success" 
              style={{ flex: 2 }} 
              onClick={handleExecuteTrade}
              disabled={receives.length === 0 && gives.length === 0}
            >
              🤝 Completar Canje
            </button>
          </div>
        </div>
      ) : isScanning ? (
        // SCANNING VIEW
        <div id="qr-scanner-box">
          <h3 style={{ fontFamily: 'var(--font-display)', display: 'flex', alignItems: 'center', gap: '8px', justifyContent: 'center' }}>
            <span>📷</span> Escanear Código QR
          </h3>
          <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', textAlign: 'center', marginBottom: '8px' }}>
            Permite el acceso a la cámara y apunta hacia el código QR de tu amigo, o sube una imagen de un código desde tu galería.
          </p>
          <div id="reader" style={{ width: '100%' }}></div>
          <button className="btn btn-secondary" style={{ width: '100%', marginTop: '10px' }} onClick={() => setIsScanning(false)}>
            Cancelar Escaneo
          </button>
        </div>
      ) : (
        // SHOW CODE VIEW
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}>
          <h3 style={{ fontFamily: 'var(--font-display)', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span>🏆</span> Mi Código de Canje
          </h3>
          <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', textAlign: 'center' }}>
            Haz que tu amigo escanee este código con su celular para ver al instante qué figuritas pueden intercambiar.
          </p>

          {/* QR Code Container */}
          <div style={{ background: 'white', padding: '16px', borderRadius: '16px', boxShadow: 'var(--shadow-md)', display: 'flex', justifyContent: 'center', alignItems: 'center', width: '210px', height: '210px', margin: '8px 0' }}>
            <img 
              src={`https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=${encodeURIComponent(shareUrl)}`} 
              alt="Mi QR de Canje" 
              style={{ width: '100%', height: '100%', objectFit: 'contain' }}
            />
          </div>

          {/* Action buttons */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', width: '100%', marginTop: '8px' }}>
            <button className="btn" style={{ background: 'linear-gradient(135deg, var(--secondary), var(--accent-pink))' }} onClick={handleCopyLink}>
              📋 Copiar Enlace de Intercambio
            </button>
            <button className="btn btn-secondary" onClick={() => setIsScanning(true)}>
              📷 Escanear QR de un Amigo
            </button>
            <button className="btn btn-success" onClick={handleWhatsAppShare}>
              <i className="fa-brands fa-whatsapp" style={{ fontSize: '1.2rem' }}></i> Enviar por WhatsApp
            </button>
          </div>

          <p style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textAlign: 'center', marginTop: '4px' }}>
            También puedes enviarle el enlace a tu amigo de forma virtual. ¡Al abrirlo, la comparación se hará automáticamente!
          </p>
        </div>
      )}
    </div>
  );
}
