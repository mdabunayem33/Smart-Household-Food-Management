import React from 'react';

export function ProgressRing({ value = 0.6, size = 120, stroke = 12, color = 'var(--color-primary)', label, sublabel }) {
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const offset = c * (1 - value);
  return (
    <div style={{ position: 'relative', width: size, height: size }}>
      <svg width={size} height={size} style={{ transform: 'rotate(-90deg)' }}>
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="var(--gray-100)" strokeWidth={stroke} />
        <circle
          cx={size / 2} cy={size / 2} r={r} fill="none"
          stroke={color} strokeWidth={stroke} strokeLinecap="round"
          strokeDasharray={c} strokeDashoffset={offset}
          style={{ transition: 'stroke-dashoffset var(--duration-slow) var(--ease-out-soft)' }}
        />
      </svg>
      <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <span style={{ font: 'var(--text-numeral)', fontFamily: 'var(--font-display)', color: 'var(--color-text-primary)' }}>{label}</span>
        {sublabel && <span style={{ font: 'var(--text-caption)', color: 'var(--color-text-secondary)' }}>{sublabel}</span>}
      </div>
    </div>
  );
}
