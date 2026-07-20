import React from 'react';

export function FAB({ icon = 'add', onClick, label }) {
  return (
    <button
      onClick={onClick}
      style={{
        position: 'absolute',
        right: 20,
        bottom: 'calc(var(--nav-bar-height) + 20px)',
        width: label ? 'auto' : 'var(--fab-size)',
        height: 'var(--fab-size)',
        padding: label ? '0 24px 0 20px' : 0,
        borderRadius: 'var(--radius-pill)',
        border: 'none',
        background: 'var(--color-primary)',
        color: '#fff',
        display: 'flex',
        alignItems: 'center',
        gap: 8,
        justifyContent: 'center',
        boxShadow: 'var(--shadow-primary)',
        transition: 'transform var(--duration-fast) var(--ease-bounce)',
      }}
      onPointerDown={(e) => (e.currentTarget.style.transform = 'scale(0.94)')}
      onPointerUp={(e) => (e.currentTarget.style.transform = 'scale(1)')}
    >
      <span className="material-symbols-rounded" style={{ fontSize: 28 }}>{icon}</span>
      {label && <span style={{ font: 'var(--text-label)', fontFamily: 'var(--font-display)' }}>{label}</span>}
    </button>
  );
}
