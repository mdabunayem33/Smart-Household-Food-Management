import React from 'react';
import { FreshnessBar } from '../feedback/FreshnessBar.jsx';
import { FoodIllustration } from '../illustrations/FoodIllustration.jsx';

export function FoodCard({ name, quantity, icon, illustration, freshness = 'fresh', expiryLabel, expiredDays, daysLeft, onClick }) {
  const iconTone = {
    fresh: 'var(--color-primary-surface)',
    aging: 'var(--color-aging-surface)',
    soon: 'var(--color-soon-surface)',
    expired: 'var(--color-expired-surface)',
  }[freshness];
  const isExpired = freshness === 'expired';

  return (
    <button
      onClick={onClick}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 16,
        width: '100%',
        padding: 16,
        border: 'none',
        borderRadius: 'var(--radius-lg)',
        background: 'var(--color-bg-elevated)',
        boxShadow: 'var(--shadow-sm)',
        textAlign: 'left',
      }}
    >
      <div style={{ width: 56, height: 56, borderRadius: 'var(--radius-md)', background: iconTone, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, padding: illustration ? 8 : 0 }}>
        {illustration
          ? <FoodIllustration type={illustration} />
          : <span className="material-symbols-rounded" style={{ fontSize: 28, color: 'var(--color-text-primary)', fontVariationSettings: "'FILL' 1" }}>{icon}</span>}
      </div>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 8 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 8 }}>
          <span style={{ font: 'var(--text-h3)', fontFamily: 'var(--font-display)', fontSize: 16, display: 'flex', alignItems: 'center', gap: 8 }}>
            {name}
            {isExpired && (
              <span style={{ font: 'var(--text-caption)', fontSize: 10, fontWeight: 700, color: '#fff', background: 'var(--color-expired)', borderRadius: 'var(--radius-pill)', padding: '2px 8px', textTransform: 'uppercase', letterSpacing: '0.04em' }}>Expired</span>
            )}
          </span>
          <span style={{ font: 'var(--text-body-sm)', color: 'var(--color-text-secondary)', flexShrink: 0 }}>{quantity}</span>
        </div>
        <FreshnessBar level={freshness} label={expiryLabel} expiredDays={expiredDays} daysLeft={daysLeft} />
      </div>
    </button>
  );
}
