import React from 'react';
import { FoodIllustration } from '../illustrations/FoodIllustration.jsx';

const palette = {
  green: { bg: 'var(--color-primary-surface)', fg: 'var(--green-700)' },
  orange: { bg: 'var(--color-accent-orange-surface)', fg: 'var(--orange-700)' },
  red: { bg: 'var(--color-accent-red-surface)', fg: 'var(--red-700)' },
  blue: { bg: 'var(--color-accent-blue-surface)', fg: 'var(--blue-700)' },
};

export function CategoryCard({ label, icon, illustration, tone = 'green', selected = false, onClick }) {
  const t = palette[tone] || palette.green;

  return (
    <button
      onClick={onClick}
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 10,
        width: '100%',
        aspectRatio: '1 / 1',
        border: 'none',
        borderRadius: 'var(--radius-lg)',
        background: t.bg,
        boxShadow: selected ? 'var(--shadow-md)' : 'var(--shadow-xs)',
        outline: selected ? `3px solid ${t.fg}` : 'none',
        outlineOffset: -3,
        transition: 'transform var(--duration-fast) var(--ease-bounce), box-shadow var(--duration-base)',
      }}
      onPointerDown={(e) => (e.currentTarget.style.transform = 'scale(0.96)')}
      onPointerUp={(e) => (e.currentTarget.style.transform = 'scale(1)')}
    >
      {illustration
        ? <div style={{ width: '48%', filter: 'drop-shadow(0 6px 10px rgba(0,0,0,0.12))' }}><FoodIllustration type={illustration} /></div>
        : (icon && <span className="material-symbols-rounded" style={{ fontSize: 40, color: t.fg, fontVariationSettings: "'FILL' 1" }}>{icon}</span>)}
      <span style={{ font: 'var(--text-h3)', fontFamily: 'var(--font-display)', color: 'var(--color-text-primary)', fontSize: 15 }}>{label}</span>
    </button>
  );
}
