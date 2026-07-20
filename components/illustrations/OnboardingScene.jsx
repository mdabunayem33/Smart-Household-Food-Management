import React from 'react';

/**
 * Flat vector "scene" illustrations for onboarding — richer multi-element
 * compositions (phone + person/family + food) built from the same rounded,
 * soft-gradient shape language as FoodIllustration, one per onboarding beat.
 * Human figures are abstract silhouettes (no facial detail) to stay clean,
 * minimal and premium rather than cartoonish.
 */

function grad(id, from, to) {
  return (
    <linearGradient id={id} x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stopColor={from} />
      <stop offset="100%" stopColor={to} />
    </linearGradient>
  );
}

function Person({ x, y, scale = 1, color = '#4CAF50' }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${scale})`}>
      <circle cx="0" cy="0" r="10" fill={color} />
      <path d="M-14 40c0-14 6.5-22 14-22s14 8 14 22Z" fill={color} />
    </g>
  );
}

const SCENES = {
  track: (id) => (
    <svg viewBox="0 0 220 220" width="100%" height="100%">
      <defs>
        {grad(`${id}-bg`, '#E8F5E9', '#C8E6C9')}
        {grad(`${id}-phone`, '#FFFFFF', '#F1F8F1')}
      </defs>
      <circle cx="110" cy="110" r="100" fill={`url(#${id}-bg)`} />
      {/* smart pantry shelf */}
      <rect x="34" y="118" width="70" height="52" rx="10" fill="#A5D6A7" />
      <rect x="42" y="128" width="18" height="18" rx="5" fill="#43A047" />
      <rect x="64" y="128" width="18" height="18" rx="5" fill="#FFA726" />
      <rect x="42" y="150" width="18" height="12" rx="5" fill="#EF5350" />
      <rect x="64" y="150" width="18" height="12" rx="5" fill="#42A5F5" />
      {/* person adding an item */}
      <Person x={40} y={92} scale={0.62} color="#388E3C" />
      {/* phone with inventory grid */}
      <rect x="112" y="70" width="72" height="118" rx="18" fill={`url(#${id}-phone)`} stroke="#C8E6C9" strokeWidth="2" />
      <rect x="122" y="84" width="52" height="10" rx="5" fill="#4CAF50" />
      <rect x="122" y="102" width="22" height="22" rx="6" fill="#A5D6A7" />
      <rect x="150" y="102" width="22" height="22" rx="6" fill="#FFCC80" />
      <rect x="122" y="130" width="22" height="22" rx="6" fill="#90CAF9" />
      <rect x="150" y="130" width="22" height="22" rx="6" fill="#EF9A9A" />
      <rect x="122" y="158" width="50" height="14" rx="7" fill="#4CAF50" />
    </svg>
  ),
  reminders: (id) => (
    <svg viewBox="0 0 220 220" width="100%" height="100%">
      <defs>
        {grad(`${id}-bg`, '#FFF3E0', '#FFE0B2')}
        {grad(`${id}-phone`, '#FFFFFF', '#FFF8F0')}
      </defs>
      <circle cx="110" cy="110" r="100" fill={`url(#${id}-bg)`} />
      <rect x="66" y="46" width="88" height="140" rx="20" fill={`url(#${id}-phone)`} stroke="#FFE0B2" strokeWidth="2" />
      <rect x="78" y="60" width="64" height="10" rx="5" fill="#FB8C00" />
      {/* freshness notification cards */}
      <rect x="76" y="82" width="68" height="24" rx="10" fill="#E8F5E9" />
      <circle cx="90" cy="94" r="6" fill="#4CAF50" />
      <rect x="102" y="90" width="34" height="8" rx="4" fill="#A5D6A7" />
      <rect x="76" y="112" width="68" height="24" rx="10" fill="#FFF8E1" />
      <circle cx="90" cy="124" r="6" fill="#FDD835" />
      <rect x="102" y="120" width="34" height="8" rx="4" fill="#FFECB3" />
      <rect x="76" y="142" width="68" height="24" rx="10" fill="#FFEBEE" />
      <circle cx="90" cy="154" r="6" fill="#EF5350" />
      <rect x="102" y="150" width="34" height="8" rx="4" fill="#EF9A9A" />
      {/* bell */}
      <circle cx="168" cy="70" r="18" fill="#FFA726" />
      <path d="M168 62c-5 0-8 4-8 9v5l-3 4h22l-3-4v-5c0-5-3-9-8-9Z" fill="#ffffff" />
      <circle cx="168" cy="82" r="2.5" fill="#ffffff" />
    </svg>
  ),
  shopping: (id) => (
    <svg viewBox="0 0 220 220" width="100%" height="100%">
      <defs>
        {grad(`${id}-bg`, '#E3F2FD', '#BBDEFB')}
        {grad(`${id}-card`, '#FFFFFF', '#F2F8FF')}
      </defs>
      <circle cx="110" cy="110" r="100" fill={`url(#${id}-bg)`} />
      {/* family */}
      <Person x={52} y={130} scale={0.85} color="#1E88E5" />
      <Person x={78} y={140} scale={0.55} color="#42A5F5" />
      {/* cart */}
      <path d="M92 110h60l-8 34a6 6 0 0 1-6 5h-32a6 6 0 0 1-6-5l-8-34Z" fill="#64B5F6" />
      <rect x="86" y="100" width="70" height="10" rx="5" fill="#1E88E5" />
      <circle cx="106" cy="156" r="6" fill="#0D47A1" />
      <circle cx="140" cy="156" r="6" fill="#0D47A1" />
      {/* checklist card */}
      <rect x="120" y="50" width="66" height="60" rx="14" fill={`url(#${id}-card)`} />
      <rect x="130" y="62" width="46" height="8" rx="4" fill="#42A5F5" />
      <circle cx="134" cy="82" r="5" fill="#4CAF50" />
      <rect x="144" y="79" width="32" height="6" rx="3" fill="#B0BEC5" />
      <circle cx="134" cy="96" r="5" fill="#4CAF50" />
      <rect x="144" y="93" width="24" height="6" rx="3" fill="#B0BEC5" />
    </svg>
  ),
};

export function OnboardingScene({ type = 'track', size = '100%' }) {
  const render = SCENES[type] || SCENES.track;
  const id = React.useMemo(() => `os-${type}-${Math.random().toString(36).slice(2, 8)}`, [type]);
  return <div style={{ width: size, height: size }}>{render(id)}</div>;
}

export const ONBOARDING_SCENE_KEYS = Object.keys(SCENES);
