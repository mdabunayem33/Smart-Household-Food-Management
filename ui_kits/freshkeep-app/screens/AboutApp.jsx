const WHATS_NEW = [
  'Improved expiry reminders',
  'Faster inventory loading',
  'Bug fixes and performance improvements',
];

const ABOUT_LINKS = [
  { icon: 'privacy_tip', label: 'Privacy Policy', key: 'privacy' },
  { icon: 'gavel', label: 'Terms & Conditions', key: 'terms' },
];

function AboutApp({ onBack }) {
  const { useState } = React;
  const { TopBar } = window.SmartHouseholdFoodManagementDesignSystem_8f59ea;
  const [legalPage, setLegalPage] = useState(null); // 'privacy' | 'terms' | null

  if (legalPage === 'privacy') return <window.PrivacyPolicy onBack={() => setLegalPage(null)} />;
  if (legalPage === 'terms') return <window.TermsConditions onBack={() => setLegalPage(null)} />;

  return (
    <div style={{ position: 'absolute', inset: 0, background: 'var(--color-bg)', display: 'flex', flexDirection: 'column', animation: 'page-in 220ms var(--ease-out-soft)' }}>
      <TopBar title="About App" onBack={onBack} />
      <div className="fk-no-scrollbar" style={{ flex: 1, overflowY: 'auto', padding: '4px 20px 24px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10, marginBottom: 28 }}>
          <img src="../../assets/logo/freshkeep-app-icon.png" alt="FreshKeep" style={{ width: 72, height: 72, borderRadius: 'var(--radius-lg)' }} />
          <div style={{ font: 'var(--text-h2)', fontFamily: 'var(--font-display)' }}>FreshKeep</div>
          <div style={{ font: 'var(--text-body-sm)', color: 'var(--color-text-secondary)' }}>Version 1.2.0 (Build 108)</div>
          <div style={{ font: 'var(--text-caption)', color: 'var(--color-text-tertiary)' }}>Released July 1, 2026</div>
        </div>

        <div style={{ background: 'var(--color-bg-elevated)', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-xs)', padding: 18, marginBottom: 20 }}>
          <div style={{ font: 'var(--text-h3)', fontFamily: 'var(--font-display)', marginBottom: 10 }}>What's New</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {WHATS_NEW.map((w) => (
              <div key={w} style={{ display: 'flex', alignItems: 'flex-start', gap: 8 }}>
                <span className="material-symbols-rounded" style={{ fontSize: 16, color: 'var(--color-primary)', marginTop: 2 }}>check_circle</span>
                <span style={{ font: 'var(--text-body-sm)', color: 'var(--color-text-secondary)' }}>{w}</span>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: 'var(--color-bg-elevated)', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-xs)', padding: 18, marginBottom: 20 }}>
          <div style={{ font: 'var(--text-h3)', fontFamily: 'var(--font-display)', marginBottom: 10 }}>Features Overview</div>
          <div style={{ font: 'var(--text-body-sm)', color: 'var(--color-text-secondary)' }}>
            Track your kitchen inventory, get smart expiry reminders, and reduce food waste — all in one simple app.
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 2, background: 'var(--color-bg-section)', borderRadius: 'var(--radius-lg)', overflow: 'hidden' }}>
          {ABOUT_LINKS.map((l) => (
            <button
              key={l.label}
              onClick={l.key === 'privacy' ? () => setLegalPage('privacy') : () => setLegalPage('terms')}
              style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '14px 16px', background: 'var(--color-bg-elevated)', border: 'none', textAlign: 'left', width: '100%' }}
            >
              <span className="material-symbols-rounded" style={{ fontSize: 20, color: 'var(--color-text-secondary)' }}>{l.icon}</span>
              <span style={{ flex: 1, font: 'var(--text-body)' }}>{l.label}</span>
              <span className="material-symbols-rounded" style={{ fontSize: 18, color: 'var(--color-text-tertiary)' }}>chevron_right</span>
            </button>
          ))}
        </div>
      </div>
      <style>{`
        @keyframes page-in { from { opacity: 0; transform: translateX(16px); } to { opacity: 1; transform: translateX(0); } }
        .fk-no-scrollbar { scrollbar-width: none; -ms-overflow-style: none; }
        .fk-no-scrollbar::-webkit-scrollbar { display: none; width: 0; height: 0; }
      `}</style>
    </div>
  );
}

window.AboutApp = AboutApp;
