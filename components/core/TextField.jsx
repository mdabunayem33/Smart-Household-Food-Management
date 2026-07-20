import React from 'react';

export function TextField({ label, placeholder, value, onChange, icon, type = 'text' }) {
  return (
    <label style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      {label && <span style={{ font: 'var(--text-label)', color: 'var(--color-text-secondary)' }}>{label}</span>}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 10,
          height: 56,
          padding: '0 18px',
          borderRadius: 'var(--radius-md)',
          background: 'var(--color-bg-section)',
        }}
      >
        {icon && <span className="material-symbols-rounded" style={{ fontSize: 20, color: 'var(--color-text-tertiary)' }}>{icon}</span>}
        <input
          type={type}
          value={value}
          placeholder={placeholder}
          onChange={(e) => onChange && onChange(e.target.value)}
          style={{
            border: 'none',
            outline: 'none',
            background: 'transparent',
            flex: 1,
            font: 'var(--text-body-lg)',
            fontFamily: 'var(--font-body)',
            color: 'var(--color-text-primary)',
          }}
        />
      </div>
    </label>
  );
}
