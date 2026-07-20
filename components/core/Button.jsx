import React from 'react';

const sizeStyles = {
  lg: { height: 64, padding: '0 32px', fontSize: 17 },
  md: { height: 56, padding: '0 28px', fontSize: 15 },
  sm: { height: 48, padding: '0 20px', fontSize: 14 },
};

const variantStyles = {
  primary: {
    background: 'var(--color-primary)',
    color: 'var(--color-text-inverse)',
    boxShadow: 'var(--shadow-primary)',
  },
  secondary: {
    background: 'var(--color-primary-surface)',
    color: 'var(--color-primary-press)',
    boxShadow: 'none',
  },
  ghost: {
    background: 'transparent',
    color: 'var(--color-text-primary)',
    boxShadow: 'none',
  },
  danger: {
    background: 'var(--color-accent-red)',
    color: 'var(--color-text-inverse)',
    boxShadow: '0 10px 24px oklch(from var(--red-500) 0.6 0.16 h / 0.32)',
  },
};

export function Button({
  children,
  variant = 'primary',
  size = 'lg',
  fullWidth = false,
  disabled = false,
  icon = null,
  onClick,
  style,
}) {
  const v = variantStyles[variant] || variantStyles.primary;
  const s = sizeStyles[size] || sizeStyles.lg;

  return (
    <button
      onClick={disabled ? undefined : onClick}
      disabled={disabled}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 10,
        width: fullWidth ? '100%' : undefined,
        height: s.height,
        padding: s.padding,
        border: 'none',
        borderRadius: 'var(--radius-pill)',
        font: 'var(--text-label)',
        fontSize: s.fontSize,
        fontFamily: 'var(--font-display)',
        letterSpacing: 'var(--tracking-tight)',
        background: v.background,
        color: v.color,
        boxShadow: v.boxShadow,
        opacity: disabled ? 0.45 : 1,
        cursor: disabled ? 'not-allowed' : 'pointer',
        transition: 'transform var(--duration-fast) var(--ease-bounce), filter var(--duration-fast) var(--ease-standard)',
        transform: 'scale(1)',
        ...style,
      }}
      onPointerDown={(e) => { if (!disabled) e.currentTarget.style.transform = 'scale(0.96)'; }}
      onPointerUp={(e) => { e.currentTarget.style.transform = 'scale(1)'; }}
      onPointerLeave={(e) => { e.currentTarget.style.transform = 'scale(1)'; }}
    >
      {icon}
      <span>{children}</span>
    </button>
  );
}
