// Shared "Range Expansion" control used by every expandable slider in the app
// (Quantity, Expiry Duration Days/Months/Years, Reminder Settings, Shopping unit sliders).
// Renders [ + ] [ − ] side by side, an "Expand Range" caption, and a small pill
// showing the current maximum. Keep this the single source of truth for that pattern.

function RangeExpandControls({ rangeMax, onExpand, step, capMax, floor, unitLabel }) {
  const min = floor !== undefined ? floor : step;
  const atCap = capMax !== undefined && rangeMax >= capMax;
  const atFloor = rangeMax <= min;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, flexShrink: 0 }}>
      <div style={{ display: 'flex', gap: 8 }}>
        <button
          onClick={() => onExpand(Math.min(capMax || Infinity, rangeMax + step))}
          disabled={atCap}
          className="fk-range-btn"
          style={{
            width: 34, height: 34, borderRadius: '50%', border: 'none',
            background: 'var(--color-primary-surface)', color: 'var(--color-primary-press)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            opacity: atCap ? 0.5 : 1,
          }}
        >
          <span className="material-symbols-rounded" style={{ fontSize: 18 }}>add</span>
        </button>
        <button
          onClick={() => onExpand(Math.max(min, rangeMax - step))}
          disabled={atFloor}
          className="fk-range-btn"
          style={{
            width: 34, height: 34, borderRadius: '50%', border: 'none',
            background: 'var(--color-bg-section)', color: atFloor ? 'var(--color-text-tertiary)' : 'var(--color-text-primary)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            opacity: atFloor ? 0.5 : 1,
          }}
        >
          <span className="material-symbols-rounded" style={{ fontSize: 18 }}>remove</span>
        </button>
      </div>
      <span style={{ font: 'var(--text-caption)', fontSize: 11, color: 'var(--color-text-tertiary)', textAlign: 'center', whiteSpace: 'nowrap' }}>Expand Range</span>
      <span style={{
        display: 'inline-block', padding: '3px 10px', borderRadius: 'var(--radius-pill)',
        background: 'var(--color-primary-surface)', color: 'var(--green-700)', fontWeight: 600,
        font: 'var(--text-caption)', fontSize: 12, textAlign: 'center', whiteSpace: 'nowrap',
        transition: 'all 200ms var(--ease-out-soft)',
      }}>
        {rangeMax} {unitLabel}
      </span>
      <style>{`
        .fk-range-btn { transition: transform 120ms var(--ease-bounce), background 150ms; }
        .fk-range-btn:active:not(:disabled) { transform: scale(0.88); }
      `}</style>
    </div>
  );
}

window.RangeExpandControls = RangeExpandControls;
