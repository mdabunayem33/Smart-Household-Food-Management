import React from 'react';

const sizes = { sm: 40, md: 48, lg: 56 };

export function IconButton({ icon, size = 'md', variant = 'ghost', onClick, ariaLabel, style }) {
  const dim = sizes[size] || sizes.md;
  const bg = variant === 'filled' ? 'var(--color-primary)' : variant === 'surface' ? 'var(--color-bg-section)' : 'transparent';
  const color = variant === 'filled' ? 'var(--color-text-inverse)' : 'var(--color-text-primary)';
  return (
    <button
      aria-label={ariaLabel}
      onClick={onClick}
      style={{
        width: dim,
        height: dim,
        borderRadius: '50%',
        border: 'none',
        background: bg,
        color,
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        transition: 'transform var(--duration-fast) var(--ease-bounce), background var(--duration-fast)',
        ...style,
      }}
      onPointerDown={(e) => (e.currentTarget.style.transform = 'scale(0.92)')}
      onPointerUp={(e) => (e.currentTarget.style.transform = 'scale(1)')}
      onPointerLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
    >
      <span className="material-symbols-rounded" style={{ fontSize: size === 'lg' ? 28 : 24 }}>{icon}</span>
    </button>
  );
}
