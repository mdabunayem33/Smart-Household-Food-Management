import React from 'react';

const levelMap = {
  fresh: { pct: 100, color: 'var(--color-fresh)' },
  aging: { pct: 70, color: 'var(--color-aging)' },
  soon: { pct: 40, color: 'var(--color-soon)' },
  expired: { pct: 12, color: 'var(--color-expired)' },
};

// Map remaining shelf life (days until expiry) to a precise bar fill + color.
// The bar shrinks and shifts green→yellow→orange→red as expiry approaches.
//   >7d  green ~95% · 4–7d yellow 60–80% · 2–3d orange 35–48% · 1d red ~15% · 0d solid red ~8%
export function freshnessFromDaysLeft(daysLeft) {
  const d = daysLeft;
  if (d > 7) return { pct: 95, color: 'var(--color-fresh)' };
  if (d >= 4) return { pct: 60 + ((d - 4) / 3) * 20, color: 'var(--color-aging)' };   // 4→60, 7→80
  if (d >= 2) return { pct: 35 + (d - 2) * 13, color: 'var(--color-soon)' };            // 2→35, 3→48
  if (d === 1) return { pct: 15, color: 'var(--color-expired)' };
  return { pct: 8, color: 'var(--color-expired)' };                                     // 0 → expires today
}

export function FreshnessBar({ level = 'fresh', label, expiredDays, daysLeft }) {
  const isExpired = level === 'expired';
  // Expired: solid red bar that fills from the RIGHT edge, growing leftward the
  // longer the item has been expired (newly expired ≈ small sliver, ~7+ days = full).
  const expiredPct = isExpired ? Math.min(100, 15 + (Math.max(0, expiredDays || 0)) * 14) : 0;
  // Prefer precise day-based fill when daysLeft is known; else fall back to the coarse level map.
  const l = (!isExpired && typeof daysLeft === 'number') ? freshnessFromDaysLeft(daysLeft) : (levelMap[level] || levelMap.fresh);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
      <div style={{ position: 'relative', height: 6, borderRadius: 'var(--radius-pill)', background: 'var(--gray-100)', overflow: 'hidden' }}>
        {isExpired ? (
          <div style={{ position: 'absolute', top: 0, right: 0, height: '100%', width: `${expiredPct}%`, background: 'var(--color-expired)', borderRadius: 'var(--radius-pill)', transition: 'width var(--duration-slow) var(--ease-out-soft)' }} />
        ) : (
          <div style={{ height: '100%', width: `${l.pct}%`, background: l.color, borderRadius: 'var(--radius-pill)', transition: 'width var(--duration-slow) var(--ease-out-soft)' }} />
        )}
      </div>
      {label && <span style={{ font: 'var(--text-caption)', color: isExpired ? 'var(--red-700)' : 'var(--color-text-tertiary)', fontWeight: isExpired ? 700 : 400 }}>{label}</span>}
    </div>
  );
}

