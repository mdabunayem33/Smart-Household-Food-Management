import React from 'react';

const items = [
  { key: 'home', label: 'Home', icon: 'home' },
  { key: 'inventory', label: 'Inventory', icon: 'kitchen' },
  { key: 'shopping', label: 'Shopping', icon: 'shopping_cart' },
  { key: 'analytics', label: 'Analytics', icon: 'donut_large' },
  { key: 'profile', label: 'Profile', icon: 'person' },
];

export function BottomNav({ active = 'home', onChange }) {
  return (
    <nav
      style={{
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'center',
        height: 'var(--nav-bar-height)',
        background: 'color-mix(in oklab, var(--color-bg-elevated) 88%, transparent)',
        backdropFilter: 'blur(16px)',
        borderTop: '1px solid var(--color-divider)',
        position: 'absolute',
        left: 0, right: 0, bottom: 0,
      }}
    >
      {items.map((it) => {
        const isActive = it.key === active;
        return (
          <button
            key={it.key}
            onClick={() => onChange && onChange(it.key)}
            style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, border: 'none', background: 'transparent', color: isActive ? 'var(--color-primary)' : 'var(--color-text-tertiary)', minWidth: 48, minHeight: 48, justifyContent: 'center' }}
          >
            <span className="material-symbols-rounded" style={{ fontSize: 26, fontVariationSettings: isActive ? "'FILL' 1" : "'FILL' 0" }}>{it.icon}</span>
            <span style={{ font: 'var(--text-caption)', fontSize: 11, fontFamily: 'var(--font-body)' }}>{it.label}</span>
          </button>
        );
      })}
    </nav>
  );
}
