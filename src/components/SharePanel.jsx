import React from 'react';

export default function SharePanel({ stickersList, stickerCounts, showToast }) {
  
  // Format sticker code numbers (e.g. "ARG-05" -> "05")
  const getNumberOnly = (code) => {
    const parts = code.split('-');
    return parts.length > 1 ? parts[1] : code;
  };

  // Generate formatted text for sharing
  const generateShareData = () => {
    const missingGrouped = {};
    const repeatsGrouped = {};

    stickersList.forEach(s => {
      const count = stickerCounts[s.code] || 0;
      
      if (count === 0) {
        // Missing
        if (!missingGrouped[s.teamId]) {
          missingGrouped[s.teamId] = [];
        }
        missingGrouped[s.teamId].push(getNumberOnly(s.code));
      } else if (count > 1) {
        // Has duplicates
        if (!repeatsGrouped[s.teamId]) {
          repeatsGrouped[s.teamId] = [];
        }
        const dupCount = count - 1; // Duplicates are total count minus the 1 in the album
        repeatsGrouped[s.teamId].push(
          `${getNumberOnly(s.code)}${dupCount > 1 ? ` (x${dupCount})` : ''}`
        );
      }
    });

    // Format missing list
    let missingText = '';
    const missingTeams = Object.keys(missingGrouped).sort();
    if (missingTeams.length > 0) {
      missingText = '❌ MIS FALTANTES:\n';
      missingTeams.forEach(teamId => {
        missingText += `• ${teamId}: ${missingGrouped[teamId].join(', ')}\n`;
      });
    } else {
      missingText = '🎉 ¡No tengo faltantes! ¡Álbum completado! 🎉\n';
    }

    // Format repeats list
    let repeatsText = '';
    const repeatsTeams = Object.keys(repeatsGrouped).sort();
    if (repeatsTeams.length > 0) {
      repeatsText = '🔁 MIS REPETIDAS:\n';
      repeatsTeams.forEach(teamId => {
        repeatsText += `• ${teamId}: ${repeatsGrouped[teamId].join(', ')}\n`;
      });
    } else {
      repeatsText = '🔁 No tengo repetidas para cambiar por ahora.\n';
    }

    return {
      text: `🏆 *Mi Álbum Mundial 2026* 🏆\n\n${repeatsText}\n${missingText}`,
      hasRepeats: repeatsTeams.length > 0,
      hasMissing: missingTeams.length > 0
    };
  };

  const shareData = generateShareData();

  const handleCopy = () => {
    navigator.clipboard.writeText(shareData.text)
      .then(() => {
        showToast('¡Copiado al portapapeles!');
      })
      .catch(() => {
        showToast('Error al copiar.');
      });
  };

  const handleWhatsApp = () => {
    const encodedText = encodeURIComponent(shareData.text);
    const url = `https://api.whatsapp.com/send?text=${encodedText}`;
    window.open(url, '_blank');
  };

  return (
    <div className="glass-card share-section">
      <h3 style={{ fontFamily: 'var(--font-display)', display: 'flex', alignItems: 'center', gap: '8px' }}>
        <span>📊</span> Compartir Figuritas
      </h3>
      <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
        Genera listas ordenadas y compactas para compartir con tus amigos por WhatsApp o redes sociales.
      </p>

      <div className="share-preview-box">
        {shareData.text}
      </div>

      <div style={{ display: 'flex', gap: '10px' }}>
        <button className="btn btn-secondary" style={{ flex: 1 }} onClick={handleCopy}>
          📋 Copiar Texto
        </button>
        <button className="btn btn-success" style={{ flex: 1 }} onClick={handleWhatsApp}>
          💬 WhatsApp
        </button>
      </div>
    </div>
  );
}
