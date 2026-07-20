const LANGUAGES = [
  'English', 'বাংলা (Bengali)', 'हिन्दी (Hindi)', 'العربية (Arabic)', 'Español (Spanish)',
  'Français (French)', 'Deutsch (German)', 'Italiano (Italian)', 'Português (Portuguese)',
  '中文 (Chinese)', '日本語 (Japanese)', '한국어 (Korean)', 'Русский (Russian)', 'Türkçe (Turkish)',
];

function LanguagePage({ onBack, language, onChangeLanguage }) {
  const { TopBar } = window.SmartHouseholdFoodManagementDesignSystem_8f59ea;
  return (
    <div style={{ position: 'absolute', inset: 0, background: 'var(--color-bg)', display: 'flex', flexDirection: 'column', animation: 'page-in 220ms var(--ease-out-soft)' }}>
      <TopBar title="Language" onBack={onBack} />
      <div className="fk-no-scrollbar" style={{ flex: 1, overflowY: 'auto', padding: '4px 20px 24px', display: 'flex', flexDirection: 'column', gap: 8 }}>
        {LANGUAGES.map((lang) => {
          const selected = language === lang;
          return (
            <button
              key={lang}
              onClick={() => onChangeLanguage(lang)}
              style={{
                display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 16px',
                borderRadius: 'var(--radius-lg)', border: 'none',
                background: selected ? 'var(--color-primary-surface)' : 'var(--color-bg-elevated)',
                boxShadow: selected ? 'none' : 'var(--shadow-xs)',
              }}
            >
              <span style={{ font: 'var(--text-body-lg)', color: selected ? 'var(--color-primary-press)' : 'var(--color-text-primary)' }}>{lang}</span>
              {selected && <span className="material-symbols-rounded" style={{ fontSize: 20, color: 'var(--color-primary-press)' }}>check</span>}
            </button>
          );
        })}
      </div>
      <style>{`
        @keyframes page-in { from { opacity: 0; transform: translateX(16px); } to { opacity: 1; transform: translateX(0); } }
        .fk-no-scrollbar { scrollbar-width: none; -ms-overflow-style: none; }
        .fk-no-scrollbar::-webkit-scrollbar { display: none; width: 0; height: 0; }
      `}</style>
    </div>
  );
}

window.LanguagePage = LanguagePage;
