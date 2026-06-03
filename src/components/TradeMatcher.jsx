import { useState } from 'react';
import { TEAM_FLAGS } from '../data/stickersData';

export default function TradeMatcher({ stickersList, stickerCounts, onCompleteTrade, showToast }) {
  const [inputText, setInputText] = useState('');
  const [tradeResults, setTradeResults] = useState(null);
  const [selectedReceives, setSelectedReceives] = useState({});
  const [selectedGives, setSelectedGives] = useState({});

  const handleCompare = (e) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const validTeams = [...new Set(stickersList.map(s => s.teamId))];
    const upperText = inputText.toUpperCase();

    // Define keywords to identify sections
    const repeatKeywords = ['REPETIDAS', 'REPES', 'REPETIDAS PARA CAMBIAR', 'TENGO PARA CAMBIAR', 'REPETIDA', 'REPETIDAS:'];
    const missingKeywords = ['FALTANTES', 'FALTAN', 'NO TENGO', 'BUSCO', 'FALTANTE', 'FALTANTES:'];

    let repeatsIndex = -1;
    let missingIndex = -1;

    // Find first keyword index
    for (const kw of repeatKeywords) {
      const idx = upperText.indexOf(kw);
      if (idx !== -1) {
        repeatsIndex = idx;
        break;
      }
    }

    for (const kw of missingKeywords) {
      const idx = upperText.indexOf(kw);
      if (idx !== -1) {
        missingIndex = idx;
        break;
      }
    }

    let repeatsText = '';
    let missingText = '';

    if (repeatsIndex !== -1 && missingIndex !== -1) {
      if (repeatsIndex < missingIndex) {
        repeatsText = inputText.substring(repeatsIndex, missingIndex);
        missingText = inputText.substring(missingIndex);
      } else {
        missingText = inputText.substring(missingIndex, repeatsIndex);
        repeatsText = inputText.substring(repeatsIndex);
      }
    } else if (repeatsIndex !== -1) {
      repeatsText = inputText;
    } else if (missingIndex !== -1) {
      missingText = inputText;
    } else {
      // Fallback: entire text is treated as repeats list
      repeatsText = inputText;
    }

    // Helper to extract sticker codes from text block
    const extractCodes = (textBlock) => {
      if (!textBlock.trim()) return [];
      const uppercaseSegment = textBlock.toUpperCase();
      const matches = [];

      validTeams.forEach(teamId => {
        let pos = uppercaseSegment.indexOf(teamId);
        while (pos !== -1) {
          const charBefore = pos > 0 ? uppercaseSegment[pos - 1] : ' ';
          const charAfter = pos + teamId.length < uppercaseSegment.length ? uppercaseSegment[pos + teamId.length] : ' ';
          
          const isWordBefore = /[A-Z]/.test(charBefore);
          const isWordAfter = /[A-Z]/.test(charAfter);

          if (!isWordBefore && !isWordAfter) {
            matches.push({ index: pos, teamId });
          }
          pos = uppercaseSegment.indexOf(teamId, pos + 1);
        }
      });

      matches.sort((a, b) => a.index - b.index);
      let parsed = [];

      if (matches.length === 0) {
        // Direct matching fallback (e.g. ARG-10)
        const directRegex = /\b([A-Z]{3})[-\s]?(\d{1,2})\b/gi;
        let match;
        const validTeamIds = new Set(validTeams);
        while ((match = directRegex.exec(textBlock)) !== null) {
          const teamId = match[1].toUpperCase();
          const num = parseInt(match[2]);
          if (validTeamIds.has(teamId) && num >= 1 && num <= 20) {
            parsed.push(`${teamId}-${num.toString().padStart(2, '0')}`);
          }
        }
      } else {
        for (let i = 0; i < matches.length; i++) {
          const startIdx = matches[i].index;
          const endIdx = (i + 1 < matches.length) ? matches[i].index : uppercaseSegment.length;
          const subText = uppercaseSegment.substring(startIdx + matches[i].teamId.length, endIdx);
          const teamId = matches[i].teamId;

          // Remove multipliers like x2, (x3), (3)
          const cleanText = subText
            .replace(/x\s*\d+/gi, '')
            .replace(/\(\s*\d+\s*\)/g, '');

          const numberRegex = /\b\d{1,2}\b/g;
          let numMatch;
          while ((numMatch = numberRegex.exec(cleanText)) !== null) {
            const numVal = parseInt(numMatch[0]);
            if (numVal >= 1 && numVal <= 20) {
              parsed.push(`${teamId}-${numVal.toString().padStart(2, '0')}`);
            }
          }
        }
      }
      return [...new Set(parsed)];
    };

    const friendRepeats = extractCodes(repeatsText);
    const friendMissing = extractCodes(missingText);

    // 1. Receives: Friend has it repeated, user doesn't have it (count === 0)
    const receives = friendRepeats
      .map(code => stickersList.find(s => s.code === code))
      .filter(s => s && (stickerCounts[s.code] || 0) === 0);

    // 2. Gives: Friend is missing it, user has it repeated (count > 1)
    const gives = friendMissing
      .map(code => stickersList.find(s => s.code === code))
      .filter(s => s && (stickerCounts[s.code] || 0) > 1);

    setTradeResults({ receives, gives });

    // Default select all
    const initialReceives = {};
    receives.forEach(s => { initialReceives[s.code] = true; });
    setSelectedReceives(initialReceives);

    const initialGives = {};
    gives.forEach(s => { initialGives[s.code] = true; });
    setSelectedGives(initialGives);

    if (receives.length > 0 || gives.length > 0) {
      showToast(`¡Se armó una lista de intercambio!`);
    } else {
      showToast(`No encontramos coincidencias para cambiar.`);
    }
  };

  const handleToggleReceive = (code) => {
    setSelectedReceives(prev => ({ ...prev, [code]: !prev[code] }));
  };

  const handleToggleGive = (code) => {
    setSelectedGives(prev => ({ ...prev, [code]: !prev[code] }));
  };

  const handleExecuteTrade = () => {
    const receivesToAdd = Object.keys(selectedReceives).filter(code => selectedReceives[code]);
    const givesToRemove = Object.keys(selectedGives).filter(code => selectedGives[code]);

    if (receivesToAdd.length === 0 && givesToRemove.length === 0) return;

    onCompleteTrade(receivesToAdd, givesToRemove);
    showToast(`¡Canje completado con éxito!`);
    
    // Clear state
    setTradeResults(null);
    setInputText('');
  };

  return (
    <div className="glass-card" style={{ marginTop: '20px' }}>
      <h3 className="quick-add-title">
        <span>🔄</span> ¡Cambia con tus amigos!
      </h3>
      <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '12px' }}>
        Pega abajo el mensaje completo de tu amigo (con sus repetidas y faltantes) para saber qué se pueden cambiar mutuamente.
      </p>

      <form onSubmit={handleCompare} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <textarea
          className="quick-add-input"
          style={{ minHeight: '120px', resize: 'vertical', fontFamily: 'monospace', fontSize: '0.85rem' }}
          placeholder="Pega el mensaje de tu amigo acá...
Ej:
MIS REPETIDAS:
• ARG: 10, 15
• FWC: 02

MIS FALTANTES:
• USA: 05, 12"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
        />
        <button type="submit" className="btn btn-secondary" style={{ width: '100%' }}>
          🔍 Comparar Listas
        </button>
      </form>

      {tradeResults && (
        <div style={{ marginTop: '16px', padding: '16px', background: 'rgba(0,0,0,0.3)', borderRadius: '12px', border: '1px solid var(--border-color)' }}>
          <h4 style={{ fontSize: '0.95rem', fontFamily: 'var(--font-display)', marginBottom: '12px', textAlign: 'center' }}>
            🤝 Plan de Intercambio Mutuo
          </h4>

          {/* Section 1: Receives (Le pides) */}
          <div style={{ marginBottom: '16px' }}>
            <h5 style={{ fontSize: '0.82rem', color: 'var(--primary)', fontWeight: 700, marginBottom: '6px', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span>📥</span> Lo que te sirve de tu amigo (Le pides):
            </h5>
            {tradeResults.receives.length > 0 ? (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '6px', maxHeight: '120px', overflowY: 'auto' }}>
                {tradeResults.receives.map(s => {
                  const isChecked = selectedReceives[s.code];
                  return (
                    <label key={s.code} style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '6px', background: isChecked ? 'rgba(16, 185, 129, 0.08)' : 'rgba(255,255,255,0.02)', border: `1px solid ${isChecked ? 'var(--primary)' : 'var(--border-color)'}`, borderRadius: '6px', fontSize: '0.75rem', cursor: 'pointer' }}>
                      <input type="checkbox" checked={isChecked} onChange={() => handleToggleReceive(s.code)} style={{ accentColor: 'var(--primary)' }} />
                      <span>{TEAM_FLAGS[s.teamId]}</span>
                      <strong>{s.code}</strong>
                    </label>
                  );
                })}
              </div>
            ) : (
              <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', paddingLeft: '8px' }}>Ninguna (no tiene repes que te sirvan).</p>
            )}
          </div>

          {/* Section 2: Gives (Le das) */}
          <div style={{ marginBottom: '20px' }}>
            <h5 style={{ fontSize: '0.82rem', color: 'var(--accent-gold)', fontWeight: 700, marginBottom: '6px', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span>📤</span> Lo que le sirve a tu amigo de tus repes (Le das):
            </h5>
            {tradeResults.gives.length > 0 ? (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '6px', maxHeight: '120px', overflowY: 'auto' }}>
                {tradeResults.gives.map(s => {
                  const isChecked = selectedGives[s.code];
                  return (
                    <label key={s.code} style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '6px', background: isChecked ? 'rgba(245, 158, 11, 0.08)' : 'rgba(255,255,255,0.02)', border: `1px solid ${isChecked ? 'var(--accent-gold)' : 'var(--border-color)'}`, borderRadius: '6px', fontSize: '0.75rem', cursor: 'pointer' }}>
                      <input type="checkbox" checked={isChecked} onChange={() => handleToggleGive(s.code)} style={{ accentColor: 'var(--accent-gold)' }} />
                      <span>{TEAM_FLAGS[s.teamId]}</span>
                      <strong>{s.code}</strong>
                    </label>
                  );
                })}
              </div>
            ) : (
              <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', paddingLeft: '8px' }}>Ninguna (no le faltan tus repetidas).</p>
            )}
          </div>

          {(tradeResults.receives.length > 0 || tradeResults.gives.length > 0) ? (
            <button
              className="btn btn-success"
              style={{ width: '100%', padding: '12px', fontSize: '0.9rem' }}
              onClick={handleExecuteTrade}
            >
              🤝 Completar Intercambio
            </button>
          ) : (
            <div style={{ textAlign: 'center', padding: '8px 0', color: 'var(--text-muted)', fontSize: '0.78rem' }}>
              No hay figuritas para intercambiar en este mensaje.
            </div>
          )}
        </div>
      )}
    </div>
  );
}
