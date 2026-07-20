import React from 'react';

export function TopBar({ title, onBack, action }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 64, padding: '0 8px' }}>
      <div style={{ width: 48 }}>
        {onBack && (
          <button onClick={onBack} style={{ width: 48, height: 48, borderRadius: '50%', border: 'none', background: 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span className="material-symbols-rounded" style={{ fontSize: 24 }}>arrow_back</span>
          </button>
        )}
      </div>
      <span style={{ font: 'var(--text-h2)', fontFamily: 'var(--font-display)', fontSize: 18 }}>{title}</span>
      <div style={{ width: 48, display: 'flex', justifyContent: 'flex-end' }}>{action}</div>
    </div>
  );
}
