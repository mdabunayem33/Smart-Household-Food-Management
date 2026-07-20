import React from 'react';

const toneMap = {
  green: { bg: 'var(--color-primary-surface)', fg: 'var(--green-700)' },
  orange: { bg: 'var(--color-accent-orange-surface)', fg: 'var(--orange-700)' },
  blue: { bg: 'var(--color-accent-blue-surface)', fg: 'var(--blue-700)' },
  red: { bg: 'var(--color-accent-red-surface)', fg: 'var(--red-700)' },
};

export function StatCard({ label, value, icon, tone = 'green' }) {
  const t = toneMap[tone] || toneMap.green;
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 12,
        padding: 20,
        borderRadius: 'var(--radius-lg)',
        background: 'var(--color-bg-elevated)',
        boxShadow: 'var(--shadow-sm)',
        minWidth: 150,
      }}
    >
      <div style={{ width: 40, height: 40, borderRadius: '50%', background: t.bg, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <span className="material-symbols-rounded" style={{ fontSize: 22, color: t.fg }}>{icon}</span>
      </div>
      <div style={{ font: 'var(--text-numeral)', fontFamily: 'var(--font-display)', color: 'var(--color-text-primary)' }}>{value}</div>
      <div style={{ font: 'var(--text-body-sm)', color: 'var(--color-text-secondary)' }}>{label}</div>
    </div>
  );
}
