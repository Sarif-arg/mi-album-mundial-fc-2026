
export default function StickerCard({ sticker, count, onIncrement, onDecrement }) {
  const isOwned = count > 0;
  const isDuplicate = count > 1;

  const handleDecrement = (e) => {
    e.stopPropagation(); // Prevent card tap (which increments)
    if (count > 0) {
      onDecrement(sticker.code);
    }
  };

  return (
    <div
      className={`sticker-card ${isOwned ? 'owned' : ''} ${isDuplicate ? 'has-duplicates' : ''} ${sticker.isSpecial ? 'special-card' : ''
        }`}
      onClick={() => onIncrement(sticker.code)}
      title={sticker.name}
    >
      {/* Count badge for duplicates */}
      {isOwned && (
        <div className="badge-count" style={{ background: isDuplicate ? 'var(--accent-gold)' : 'var(--primary)' }}>
          {count}
        </div>
      )}

      {/* Special marker */}
      {sticker.isSpecial && (
        <span
          style={{
            fontSize: '0.6rem',
            color: 'var(--accent-gold)',
            fontWeight: 800,
            letterSpacing: '0.05em',
            textTransform: 'uppercase'
          }}
        >
          {sticker.teamId === 'FWC' ? '★ Especial' : '★ Escudo'}
        </span>
      )}

      {/* Code */}
      <span className="sticker-code">{sticker.code}</span>

      {/* Sticker name/role */}
      <span className="sticker-name">{sticker.name}</span>

      {/* Controls: Show minus button if owned */}
      {isOwned && (
        <div className="card-actions">
          <button
            className="action-btn"
            onClick={handleDecrement}
            aria-label="Disminuir cantidad"
            style={{
              backgroundColor: 'rgba(239, 68, 68, 0.25)',
              border: '1px solid rgba(239, 68, 68, 0.4)',
              color: '#ef4444',
              width: '24px',
              height: '24px',
              borderRadius: '50%',
              fontSize: '1rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            -
          </button>
        </div>
      )}
    </div>
  );
}

