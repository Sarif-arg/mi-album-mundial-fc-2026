import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import QRCode from 'qrcode';
import logoSvg from '../assets/2026_FIFA_World_Cup_emblem.svg';
import { TEAM_FLAGS } from '../data/stickersData';
import { buildTradeMatches, createTradeQrPayload, parseTradeQrPayload } from '../utils/tradeQr';

export default function QrExchange({ stickersList, stickerCounts, onCompleteTrade, showToast }) {
  const [mode, setMode] = useState('generate');
  const [qrImage, setQrImage] = useState('');
  const [manualCode, setManualCode] = useState('');
  const [scanStatus, setScanStatus] = useState('');
  const [cameraActive, setCameraActive] = useState(false);
  const [tradeResults, setTradeResults] = useState(null);
  const [selectedReceives, setSelectedReceives] = useState({});
  const [selectedGives, setSelectedGives] = useState({});
  const videoRef = useRef(null);
  const streamRef = useRef(null);
  const detectorRef = useRef(null);
  const cameraActiveRef = useRef(false);
  const scanFrameRef = useRef(null);

  const payload = useMemo(() => {
    return createTradeQrPayload(stickersList, stickerCounts);
  }, [stickersList, stickerCounts]);

  const counts = useMemo(() => {
    const parsed = parseTradeQrPayload(payload);
    return {
      repeats: parsed.repeats.length,
      missing: parsed.missing.length
    };
  }, [payload]);

  const resetTradeSelection = (results) => {
    const receives = {};
    const gives = {};

    results.receives.forEach((sticker) => {
      receives[sticker.code] = true;
    });
    results.gives.forEach((sticker) => {
      gives[sticker.code] = true;
    });

    setSelectedReceives(receives);
    setSelectedGives(gives);
  };

  const comparePayload = useCallback((rawValue) => {
    try {
      const parsed = parseTradeQrPayload(rawValue);
      const results = buildTradeMatches({
        stickersList,
        stickerCounts,
        friendRepeats: parsed.repeats,
        friendMissing: parsed.missing
      });

      setTradeResults(results);
      resetTradeSelection(results);

      if (results.receives.length > 0 || results.gives.length > 0) {
        showToast('QR leído. Se armó un canje posible.');
      } else {
        showToast('QR leído, pero no hay coincidencias para cambiar.');
      }
    } catch (error) {
      showToast(error.message || 'No pude leer ese QR.');
    }
  }, [showToast, stickerCounts, stickersList]);

  const stopCamera = useCallback(() => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
    cameraActiveRef.current = false;
    setCameraActive(false);
  }, []);

  useEffect(() => {
    QRCode.toDataURL(payload, {
      errorCorrectionLevel: 'M',
      margin: 2,
      width: 280,
      color: {
        dark: '#111326',
        light: '#ffffff'
      }
    })
      .then(setQrImage)
      .catch(() => showToast('No se pudo generar el QR.'));
  }, [payload, showToast]);

  useEffect(() => {
    return () => stopCamera();
  }, [stopCamera]);

  useEffect(() => {
    scanFrameRef.current = async () => {
      if (!cameraActiveRef.current || !detectorRef.current || !videoRef.current) return;

      try {
        const codes = await detectorRef.current.detect(videoRef.current);
        if (codes.length > 0) {
          const rawValue = codes[0].rawValue;
          stopCamera();
          setScanStatus('QR detectado.');
          comparePayload(rawValue);
          return;
        }
      } catch {
        setScanStatus('No se pudo leer la cámara.');
      }

      requestAnimationFrame(scanFrameRef.current);
    };
  }, [comparePayload, stopCamera]);

  const startCamera = async () => {
    if (!('BarcodeDetector' in window)) {
      setScanStatus('Este navegador no permite escanear QR desde la cámara. Pegá el código abajo.');
      return;
    }

    try {
      detectorRef.current = new window.BarcodeDetector({ formats: ['qr_code'] });
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment' },
        audio: false
      });

      streamRef.current = stream;
      videoRef.current.srcObject = stream;
      await videoRef.current.play();
      cameraActiveRef.current = true;
      setCameraActive(true);
      setScanStatus('Apuntá la cámara al QR.');
      requestAnimationFrame(scanFrameRef.current);
    } catch {
      setScanStatus('No pude abrir la cámara. Revisá permisos o pegá el código abajo.');
    }
  };

  const handleToggleReceive = (code) => {
    setSelectedReceives((prev) => ({ ...prev, [code]: !prev[code] }));
  };

  const handleToggleGive = (code) => {
    setSelectedGives((prev) => ({ ...prev, [code]: !prev[code] }));
  };

  const handleExecuteTrade = () => {
    const receivesToAdd = Object.keys(selectedReceives).filter((code) => selectedReceives[code]);
    const givesToRemove = Object.keys(selectedGives).filter((code) => selectedGives[code]);

    if (receivesToAdd.length === 0 && givesToRemove.length === 0) return;

    onCompleteTrade(receivesToAdd, givesToRemove);
    setTradeResults(null);
    setManualCode('');
    showToast('¡Canje QR completado!');
  };

  const renderStickerChecks = (stickers, selected, onToggle, emptyText, tone) => {
    if (stickers.length === 0) {
      return <p className="qr-empty-line">{emptyText}</p>;
    }

    return (
      <div className="qr-result-grid">
        {stickers.map((sticker) => (
          <label key={sticker.code} className={`qr-check-item ${selected[sticker.code] ? tone : ''}`}>
            <input
              type="checkbox"
              checked={Boolean(selected[sticker.code])}
              onChange={() => onToggle(sticker.code)}
            />
            <span>{TEAM_FLAGS[sticker.teamId] || '🏆'}</span>
            <strong>{sticker.code}</strong>
          </label>
        ))}
      </div>
    );
  };

  return (
    <div className="glass-card qr-section">
      <div className="qr-title-row">
        <img src={logoSvg} alt="" className="qr-title-logo" />
        <div>
          <h3>Canje por QR</h3>
          <p>Compartí tu estado del álbum o escaneá el de otra persona para calcular cambios.</p>
        </div>
      </div>

      <div className="qr-mode-tabs">
        <button className={mode === 'generate' ? 'active' : ''} onClick={() => setMode('generate')}>
          Generar QR
        </button>
        <button className={mode === 'scan' ? 'active' : ''} onClick={() => setMode('scan')}>
          Escanear QR
        </button>
      </div>

      {mode === 'generate' && (
        <div className="qr-generate-panel">
          <div className="qr-card">
            {qrImage && <img src={qrImage} alt="QR de canje" />}
          </div>
          <div className="qr-summary">
            <span>{counts.repeats} repetidas</span>
            <span>{counts.missing} faltantes</span>
          </div>
          <button
            className="btn btn-secondary"
            onClick={() => {
              navigator.clipboard.writeText(payload);
              showToast('Código QR copiado.');
            }}
          >
            Copiar código
          </button>
        </div>
      )}

      {mode === 'scan' && (
        <div className="qr-scan-panel">
          <div className="qr-camera-box">
            <video ref={videoRef} playsInline muted />
          </div>
          <div className="qr-actions-row">
            <button className="btn btn-success" onClick={startCamera} disabled={cameraActive}>
              Abrir cámara
            </button>
            <button className="btn btn-secondary" onClick={stopCamera} disabled={!cameraActive}>
              Detener
            </button>
          </div>
          {scanStatus && <p className="qr-status">{scanStatus}</p>}

          <div className="qr-manual-box">
            <textarea
              className="quick-add-input"
              placeholder="Pegá acá el código QR si no podés usar la cámara..."
              value={manualCode}
              onChange={(event) => setManualCode(event.target.value)}
            />
            <button className="btn btn-secondary" onClick={() => comparePayload(manualCode)}>
              Leer código pegado
            </button>
          </div>
        </div>
      )}

      {tradeResults && (
        <div className="qr-results-box">
          <h4>Plan de intercambio</h4>
          <div className="qr-result-block">
            <h5>Recibís</h5>
            {renderStickerChecks(
              tradeResults.receives,
              selectedReceives,
              handleToggleReceive,
              'No tiene repetidas que te falten.',
              'receive'
            )}
          </div>
          <div className="qr-result-block">
            <h5>Entregás</h5>
            {renderStickerChecks(
              tradeResults.gives,
              selectedGives,
              handleToggleGive,
              'No le faltan tus repetidas.',
              'give'
            )}
          </div>
          {(tradeResults.receives.length > 0 || tradeResults.gives.length > 0) && (
            <button className="btn btn-success" onClick={handleExecuteTrade}>
              Completar intercambio
            </button>
          )}
        </div>
      )}
    </div>
  );
}
