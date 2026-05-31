import React, { useState } from 'react';

export default function QuickAdd({ stickersList, onBulkAdd, showToast }) {
  const [inputText, setInputText] = useState('');
  const [report, setReport] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    // Split by commas, semicolons, spaces, or newlines
    const rawTokens = inputText.split(/[,\s;\n]+/);
    const addedCodes = [];
    const invalidCodes = [];

    // Create a lookup set of valid uppercase codes with and without hyphens
    const validCodesMap = {};
    stickersList.forEach(s => {
      validCodesMap[s.code.toUpperCase()] = s.code; // "ARG-10" -> "ARG-10"
      validCodesMap[s.code.replace('-', '').toUpperCase()] = s.code; // "ARG10" -> "ARG-10"
    });

    rawTokens.forEach(token => {
      const cleanToken = token.trim().toUpperCase();
      if (!cleanToken) return;

      const matchedCode = validCodesMap[cleanToken];
      if (matchedCode) {
        addedCodes.push(matchedCode);
      } else {
        invalidCodes.push(token);
      }
    });

    if (addedCodes.length > 0) {
      onBulkAdd(addedCodes);
      showToast(`¡Se agregaron ${addedCodes.length} figuritas!`);
      setInputText('');
    } else if (invalidCodes.length > 0) {
      showToast(`Ningún código válido encontrado.`);
    }

    setReport({
      successCount: addedCodes.length,
      invalid: invalidCodes
    });
  };

  return (
    <div className="glass-card">
      <h3 className="quick-add-title">
        <span>📥</span> Carga Rápida en Lote
      </h3>
      <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '12px' }}>
        Escribe o pega múltiples códigos separados por espacios, comas o saltos de línea (ej: <code>ARG-10, FWC02, USA01, ARG10</code>).
      </p>
      
      <form onSubmit={handleSubmit} className="quick-add-input-wrapper">
        <input
          type="text"
          className="quick-add-input"
          placeholder="Ej: FWC-01, ARG-10, USA12..."
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
        />
        <button type="submit" className="btn btn-success">
          Cargar
        </button>
      </form>

      {report && (
        <div style={{ marginTop: '12px', fontSize: '0.8rem', padding: '10px', background: 'rgba(0,0,0,0.2)', borderRadius: '8px' }}>
          {report.successCount > 0 && (
            <div style={{ color: 'var(--primary)', fontWeight: 600 }}>
              ✔ {report.successCount} figuritas cargadas con éxito.
            </div>
          )}
          {report.invalid.length > 0 && (
            <div style={{ color: 'var(--accent-pink)', marginTop: '4px' }}>
              ⚠ Códigos no reconocidos: {report.invalid.join(', ')}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
