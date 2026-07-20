import React from 'react';

export function Chip({ label, icon, selected = false, onClick, tone = 'neutral' }) {
  const toneMap = {
    neutral: { bg: 'var(--color-bg-section)', fg: 'var(--color-text-secondary)' },
    green: { bg: 'var(--color-primary-surface)', fg: 'var(--color-primary-press)' },
    orange: { bg: 'var(--color-accent-orange-surface)', fg: 'var(--orange-700)' },
    red: { bg: 'var(--color-accent-red-surface)', fg: 'var(--red-700)' },
    blue: { bg: 'var(--color-accent-blue-surface)', fg: 'var(--blue-700)' },
  };
  const t = toneMap[tone] || toneMap.neutral;
  const bg = selected ? 'var(--color-primary)' : t.bg;
  const fg = selected ? 'var(--color-text-inverse)' : t.fg;
  return (
    <button
      onClick={onClick}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 6,
        height: 40,
        padding: '0 16px',
        borderRadius: 'var(--radius-pill)',
        border: 'none',
        background: bg,
        color: fg,
        font: 'var(--text-label)',
        fontFamily: 'var(--font-body)',
        transition: 'background var(--duration-fast), transform var(--duration-fast) var(--ease-bounce)',
      }}
      onPointerDown={(e) => (e.currentTarget.style.transform = 'scale(0.96)')}
      onPointerUp={(e) => (e.currentTarget.style.transform = 'scale(1)')}
    >
      {icon && <span className="material-symbols-rounded" style={{ fontSize: 18 }}>{icon}</span>}
      {label}
    </button>
  );
}
