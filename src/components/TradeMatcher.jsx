import React, { useState } from 'react';
import { TEAM_FLAGS } from '../data/stickersData';

export default function TradeMatcher({ stickersList, stickerCounts, onBulkAdd, showToast }) {
  const [inputText, setInputText] = useState('');
  const [matchingStickers, setMatchingStickers] = useState(null);
  const [selectedCodes, setSelectedCodes] = useState({});

  // Clean and parse the shared list from WhatsApp
  const handleCompare = (e) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    // Get list of valid team IDs (e.g. ["FWC", "ARG", "USA", ...])
    const validTeams = [...new Set(stickersList.map(s => s.teamId))];
    const uppercaseText = inputText.toUpperCase();

    // 1. Find all occurrences of valid team IDs to segment the text
    const matches = [];
    validTeams.forEach(teamId => {
      let pos = uppercaseText.indexOf(teamId);
      while (pos !== -1) {
        // Confirm it's a word boundary (not part of another word like PORTUGAL containing POR)
        const charBefore = pos > 0 ? uppercaseText[pos - 1] : ' ';
        const charAfter = pos + teamId.length < uppercaseText.length ? uppercaseText[pos + teamId.length] : ' ';
        
        const isWordBefore = /[A-Z]/.test(charBefore);
        const isWordAfter = /[A-Z]/.test(charAfter);

        if (!isWordBefore && !isWordAfter) {
          matches.push({ index: pos, teamId });
        }
        pos = uppercaseText.indexOf(teamId, pos + 1);
      }
    });

    // Sort segments by their appearance index
    matches.sort((a, b) => a.index - b.index);

    let parsedStickers = [];

    if (matches.length === 0) {
      // Fallback: search for direct codes (e.g. ARG-10, FWC02)
      const directRegex = /\b([A-Z]{3})[-\s]?(\d{1,2})\b/gi;
      let match;
      const validTeamIds = new Set(validTeams);
      while ((match = directRegex.exec(inputText)) !== null) {
        const teamId = match[1].toUpperCase();
        const num = parseInt(match[2]);
        if (validTeamIds.has(teamId) && num >= 1 && num <= 20) {
          parsedStickers.push(`${teamId}-${num.toString().padStart(2, '0')}`);
        }
      }
    } else {
      // Segment parsing: extract numbers associated with each team block
      for (let i = 0; i < matches.length; i++) {
        const startIdx = matches[i].index;
        const endIdx = (i + 1 < matches.length) ? matches[i + 1].index : uppercaseText.length;
        const segmentText = uppercaseText.substring(startIdx + matches[i].teamId.length, endIdx);
        const teamId = matches[i].teamId;

        // Clean segment: remove multipliers like (x2), x3, (3) to avoid parsing them as sticker numbers
        const cleanSegment = segmentText
          .replace(/x\s*\d+/gi, '')
          .replace(/\(\s*\d+\s*\)/g, '');

        // Find all 1-to-2 digits numbers in the cleaned segment
        const numberRegex = /\b\d{1,2}\b/g;
        let numMatch;
        while ((numMatch = numberRegex.exec(cleanSegment)) !== null) {
          const numVal = parseInt(numMatch[0]);
          if (numVal >= 1 && numVal <= 20) {
            parsedStickers.push(`${teamId}-${numVal.toString().padStart(2, '0')}`);
          }
        }
      }
    }

    // Make parsed codes unique
    const uniqueParsed = [...new Set(parsedStickers)];

    // Filter to find only the ones the user DOES NOT have (count === 0)
    const needed = uniqueParsed
      .map(code => stickersList.find(s => s.code === code))
      .filter(s => s && (stickerCounts[s.code] || 0) === 0);

    setMatchingStickers(needed);

    // Initialize all matching stickers as "selected" (checked)
    const initialSelected = {};
    needed.forEach(s => {
      initialSelected[s.code] = true;
    });
    setSelectedCodes(initialSelected);

    if (needed.length > 0) {
      showToast(`¡Encontradas ${needed.length} figuritas que te sirven!`);
    } else if (uniqueParsed.length > 0) {
      showToast(`Ninguna de esas figuritas te falta.`);
    } else {
      showToast(`No se reconocieron códigos en el texto.`);
    }
  };

  const handleToggleSticker = (code) => {
    setSelectedCodes(prev => ({
      ...prev,
      [code]: !prev[code]
    }));
  };

  const handleAddSelected = () => {
    const codesToAdd = Object.keys(selectedCodes).filter(code => selectedCodes[code]);
    if (codesToAdd.length === 0) return;

    onBulkAdd(codesToAdd);
    showToast(`¡Se agregaron ${codesToAdd.length} figuritas al álbum!`);
    
    // Clear results
    setMatchingStickers(null);
    setInputText('');
  };

  return (
    <div className="glass-card" style={{ marginTop: '20px' }}>
      <h3 className="quick-add-title">
        <span>🔄</span> Comparador de Canjes (Trade Matcher)
      </h3>
      <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '12px' }}>
        ¿Un amigo te mandó su lista de repetidas? Pégala aquí abajo y analizaremos automáticamente cuáles te faltan a ti.
      </p>

      <form onSubmit={handleCompare} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <textarea
          className="quick-add-input"
          style={{ minHeight: '100px', resize: 'vertical', fontFamily: 'monospace', fontSize: '0.85rem' }}
          placeholder="Ej: Hola! Mis repetidas del mundial son:
• ARG: 02, 10 (x2), 15
• FWC: 01, 04, 18
• USA: 05, 12..."
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
        />
        <button type="submit" className="btn btn-secondary" style={{ width: '100%' }}>
          🔍 Comparar con mi Álbum
        </button>
      </form>

      {matchingStickers !== null && (
        <div style={{ marginTop: '16px', padding: '16px', background: 'rgba(0,0,0,0.3)', borderRadius: '12px', border: '1px solid var(--border-color)' }}>
          <h4 style={{ fontSize: '0.95rem', fontFamily: 'var(--font-display)', marginBottom: '8px' }}>
            Resultados del Cruce:
          </h4>

          {matchingStickers.length > 0 ? (
            <>
              <p style={{ fontSize: '0.8rem', color: 'var(--primary)', fontWeight: 600, marginBottom: '12px' }}>
                ✔ ¡Te sirven estas {matchingStickers.length} figuritas! Selecciona las que vas a cambiar:
              </p>
              
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '8px', maxHeight: '200px', overflowY: 'auto', marginBottom: '16px', paddingRight: '4px' }}>
                {matchingStickers.map(s => {
                  const isChecked = selectedCodes[s.code];
                  return (
                    <label
                      key={s.code}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        padding: '8px',
                        background: isChecked ? 'rgba(16, 185, 129, 0.08)' : 'rgba(255, 255, 255, 0.02)',
                        border: `1px solid ${isChecked ? 'var(--primary)' : 'var(--border-color)'}`,
                        borderRadius: '8px',
                        fontSize: '0.78rem',
                        cursor: 'pointer',
                        userSelect: 'none',
                        transition: 'all 0.2s'
                      }}
                    >
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => handleToggleSticker(s.code)}
                        style={{ accentColor: 'var(--primary)', cursor: 'pointer' }}
                      />
                      <span>{TEAM_FLAGS[s.teamId] || '⚽'}</span>
                      <strong style={{ color: isChecked ? '#fff' : 'var(--text-secondary)' }}>{s.code}</strong>
                      <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        ({s.name})
                      </span>
                    </label>
                  );
                })}
              </div>

              <button
                className="btn btn-success"
                style={{ width: '100%', padding: '10px' }}
                onClick={handleAddSelected}
              >
                📥 Agregar Seleccionadas a mi Álbum
              </button>
            </>
          ) : (
            <div style={{ textAlign: 'center', padding: '12px 0' }}>
              <span style={{ fontSize: '1.5rem' }}>😢</span>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '4px' }}>
                No te sirve ninguna de las figuritas pegadas. ¡Ya las tienes todas!
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
