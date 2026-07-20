import React from 'react';

/**
 * Flat, minimal, rounded-shape food illustrations with soft two-tone gradients.
 * Vector-drawn (no photography) — consistent single illustration style across
 * the whole app: soft gradient fill, no outlines, no per-illustration face/mascot.
 */
const DEFS_ID_PREFIX = 'fi';

function grad(id, from, to) {
  return (
    <linearGradient id={id} x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stopColor={from} />
      <stop offset="100%" stopColor={to} />
    </linearGradient>
  );
}

const ILLUSTRATIONS = {
  tomato: (id) => (
    <svg viewBox="0 0 100 100" width="100%" height="100%">
      <defs>{grad(id, '#EF9A9A', '#E53935')}</defs>
      <circle cx="50" cy="58" r="32" fill={`url(#${id})`} />
      <path d="M50 26c-4-6-13-8-18-4 4 6 12 8 18 4Z" fill="#66BB6A" />
      <path d="M50 26c4-6 13-8 18-4-4 6-12 8-18 4Z" fill="#81C784" />
      <ellipse cx="38" cy="46" rx="7" ry="5" fill="#ffffff" opacity="0.35" />
    </svg>
  ),
  vegetables: (id) => (
    <svg viewBox="0 0 100 100" width="100%" height="100%">
      <defs>{grad(id, '#A5D6A7', '#43A047')}</defs>
      <circle cx="36" cy="60" r="20" fill={`url(#${id})`} />
      <circle cx="62" cy="52" r="24" fill={`url(#${id})`} opacity="0.9" />
      <circle cx="60" cy="30" r="9" fill="#66BB6A" />
      <rect x="57" y="18" width="6" height="14" rx="3" fill="#388E3C" />
    </svg>
  ),
  fruits: (id) => (
    <svg viewBox="0 0 100 100" width="100%" height="100%">
      <defs>{grad(id, '#FFAB91', '#FB8C00')}</defs>
      <circle cx="48" cy="58" r="30" fill={`url(#${id})`} />
      <rect x="45" y="22" width="6" height="14" rx="3" fill="#6D4C41" />
      <path d="M50 26c4-6 12-8 17-5-4 6-11 8-17 5Z" fill="#66BB6A" />
    </svg>
  ),
  frozen: (id) => (
    <svg viewBox="0 0 100 100" width="100%" height="100%">
      <defs>{grad(id, '#81D4FA', '#0288D1')}</defs>
      <rect x="24" y="24" width="52" height="52" rx="14" fill={`url(#${id})`} />
      <g stroke="#ffffff" strokeWidth="4" strokeLinecap="round">
        <line x1="50" y1="36" x2="50" y2="64" />
        <line x1="38" y1="42" x2="62" y2="58" />
        <line x1="62" y1="42" x2="38" y2="58" />
      </g>
    </svg>
  ),
  meat: (id) => (
    <svg viewBox="0 0 100 100" width="100%" height="100%">
      <defs>{grad(id, '#EF9A9A', '#C62828')}</defs>
      <path d="M30 40c8-12 34-12 40 4 5 13-4 28-19 30-14 2-24-10-24-20 0-6 1-10 3-14Z" fill={`url(#${id})`} />
      <circle cx="42" cy="52" r="4" fill="#ffffff" opacity="0.4" />
    </svg>
  ),
  fish: (id) => (
    <svg viewBox="0 0 100 100" width="100%" height="100%">
      <defs>{grad(id, '#90CAF9', '#1E88E5')}</defs>
      <path d="M22 54c14-16 42-16 54 0-12 16-40 16-54 0Z" fill={`url(#${id})`} />
      <path d="M76 54l12-10v20l-12-10Z" fill="#1565C0" />
      <circle cx="34" cy="50" r="3" fill="#ffffff" />
    </svg>
  ),
  milk: (id) => (
    <svg viewBox="0 0 100 100" width="100%" height="100%">
      <defs>{grad(id, '#E3F2FD', '#64B5F6')}</defs>
      <path d="M40 24h20l4 12v40a4 4 0 0 1-4 4H40a4 4 0 0 1-4-4V36l4-12Z" fill={`url(#${id})`} />
      <path d="M40 24h20l-6 8H46l-6-8Z" fill="#1E88E5" />
      <rect x="36" y="50" width="28" height="8" fill="#ffffff" opacity="0.55" />
    </svg>
  ),
  snacks: (id) => (
    <svg viewBox="0 0 100 100" width="100%" height="100%">
      <defs>{grad(id, '#FFE0B2', '#FB8C00')}</defs>
      <path d="M32 30h36l6 44a6 6 0 0 1-6 6H32a6 6 0 0 1-6-6l6-44Z" fill={`url(#${id})`} />
      <path d="M38 30c0-8 6-14 12-14s12 6 12 14" fill="none" stroke="#EF6C00" strokeWidth="4" />
    </svg>
  ),
  drinks: (id) => (
    <svg viewBox="0 0 100 100" width="100%" height="100%">
      <defs>{grad(id, '#FFCC80', '#FB8C00')}</defs>
      <rect x="38" y="26" width="24" height="50" rx="6" fill={`url(#${id})`} />
      <rect x="44" y="18" width="12" height="10" rx="3" fill="#8D6E63" />
    </svg>
  ),
  rice: (id) => (
    <svg viewBox="0 0 100 100" width="100%" height="100%">
      <defs>{grad(id, '#FFF3E0', '#FFB74D')}</defs>
      <path d="M24 52a26 14 0 0 1 52 0Z" fill={`url(#${id})`} />
      <path d="M24 52h52l-4 18a6 6 0 0 1-6 5H34a6 6 0 0 1-6-5l-4-18Z" fill="#FFA726" />
    </svg>
  ),
  spices: (id) => (
    <svg viewBox="0 0 100 100" width="100%" height="100%">
      <defs>{grad(id, '#FFCDD2', '#E53935')}</defs>
      <circle cx="38" cy="60" r="16" fill={`url(#${id})`} />
      <circle cx="64" cy="56" r="20" fill="#8D6E63" opacity="0.85" />
    </svg>
  ),
  others: (id) => (
    <svg viewBox="0 0 100 100" width="100%" height="100%">
      <defs>{grad(id, '#C8E6C9', '#4CAF50')}</defs>
      <rect x="26" y="30" width="48" height="40" rx="10" fill={`url(#${id})`} />
      <path d="M26 40h48" stroke="#2E7D32" strokeWidth="4" />
    </svg>
  ),
};

let uid = 0;

export function FoodIllustration({ type = 'others', size = '100%' }) {
  const id = React.useMemo(() => `${DEFS_ID_PREFIX}-${type}-${uid++}`, [type]);
  const render = ILLUSTRATIONS[type] || ILLUSTRATIONS.others;
  return (
    <div style={{ width: size, height: size }}>
      {render(id)}
    </div>
  );
}

export const FOOD_ILLUSTRATION_KEYS = Object.keys(ILLUSTRATIONS);
