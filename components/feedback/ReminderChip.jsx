import React from 'react';

const styleMap = {
  gentle: { bg: 'var(--color-primary-surface)', fg: 'var(--green-700)', icon: 'notifications' },
  urgent: { bg: 'var(--color-accent-orange-surface)', fg: 'var(--orange-700)', icon: 'priority_high' },
  critical: { bg: 'var(--color-accent-red-surface)', fg: 'var(--red-700)', icon: 'error' },
};

export function ReminderChip({ timing, tone = 'gentle', onRemove }) {
  const s = styleMap[tone] || styleMap.gentle;
  return (
    <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, height: 44, padding: '0 8px 0 14px', borderRadius: 'var(--radius-pill)', background: s.bg, color: s.fg }}>
      <span className="material-symbols-rounded" style={{ fontSize: 18 }}>{s.icon}</span>
      <span style={{ font: 'var(--text-label)', fontFamily: 'var(--font-body)' }}>{timing}</span>
      {onRemove && (
        <button onClick={onRemove} style={{ width: 28, height: 28, borderRadius: '50%', border: 'none', background: 'transparent', color: s.fg, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <span className="material-symbols-rounded" style={{ fontSize: 16 }}>close</span>
        </button>
      )}
    </div>
  );
}
