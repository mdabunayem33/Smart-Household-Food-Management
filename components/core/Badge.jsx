import React from 'react';

const toneMap = {
  fresh: { bg: 'var(--color-fresh-surface)', fg: 'var(--green-700)' },
  aging: { bg: 'var(--color-aging-surface)', fg: '#8a6d1a' },
  soon: { bg: 'var(--color-soon-surface)', fg: 'var(--orange-700)' },
  expired: { bg: 'var(--color-expired-surface)', fg: 'var(--red-700)' },
  info: { bg: 'var(--color-accent-blue-surface)', fg: 'var(--blue-700)' },
};

export function Badge({ label, tone = 'fresh', icon }) {
  const t = toneMap[tone] || toneMap.fresh;
  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 4,
        padding: '4px 10px',
        borderRadius: 'var(--radius-pill)',
        background: t.bg,
        color: t.fg,
        font: 'var(--text-caption)',
        fontFamily: 'var(--font-body)',
      }}
    >
      {icon && <span className="material-symbols-rounded" style={{ fontSize: 14 }}>{icon}</span>}
      {label}
    </span>
  );
}
