const REMINDER_OPTIONS = [
  { value: 0, label: 'On Expiry Day' },
  { value: 1, label: '1 Day Before' },
  { value: 2, label: '2 Days Before' },
  { value: 3, label: '3 Days Before' },
  { value: 5, label: '5 Days Before' },
  { value: 7, label: '7 Days Before' },
];

const REMINDER_CATEGORIES = [
  { key: 'vegetables', label: 'Vegetables', icon: 'nutrition' },
  { key: 'fruits', label: 'Fruits', icon: 'eco' },
  { key: 'dairy', label: 'Dairy', icon: 'water_drop' },
  { key: 'meatFish', label: 'Meat & Fish', icon: 'set_meal' },
  { key: 'packaged', label: 'Packaged Foods', icon: 'inventory_2' },
  { key: 'frozen', label: 'Frozen Foods', icon: 'ac_unit' },
  { key: 'beverages', label: 'Beverages', icon: 'local_bar' },
];

function reminderLabel(days) {
  const opt = REMINDER_OPTIONS.find((o) => o.value === days);
  return opt ? opt.label : `${days} Days Before`;
}

function EmailAvatar({ email }) {
  const letter = (email || '?').trim().charAt(0).toUpperCase();
  const palette = [
    { bg: 'var(--color-primary-surface)', fg: 'var(--color-primary-press)' },
    { bg: 'var(--color-accent-blue-surface)', fg: 'var(--blue-700)' },
    { bg: 'var(--color-accent-orange-surface)', fg: 'var(--orange-700)' },
  ];
  const code = letter.charCodeAt(0) || 0;
  const c = palette[code % palette.length];
  return (
    <div style={{ width: 64, height: 64, borderRadius: '50%', background: c.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
      <span style={{ font: 'var(--text-h1)', fontFamily: 'var(--font-display)', color: c.fg }}>{letter}</span>
    </div>
  );
}

function Profile({ goTab, onLogout, reminderPrefs, onOpenReminderPrefs, language, onOpenLanguage, onOpenHelp, onOpenAbout, email }) {
  const { useState } = React;
  const { BottomNav, Toggle, Button } = window.SmartHouseholdFoodManagementDesignSystem_8f59ea;
  const [dark, setDark] = useState(false);
  const [notif, setNotif] = useState(true);
  const userEmail = email || 'rohim@example.com';

  const rows = [
    { icon: 'language', label: 'Language', value: language, onClick: onOpenLanguage },
    { icon: 'menu_book', label: 'User Manual', onClick: onOpenHelp },
    { icon: 'info', label: 'About', onClick: onOpenAbout },
  ];

  return (
    <div style={{ position: 'absolute', inset: 0, background: 'var(--color-bg)', display: 'flex', flexDirection: 'column' }}>
      <div className="fk-no-scrollbar" style={{ flex: 1, overflowY: 'auto', padding: '28px 20px 100px' }}>
        <style>{`
          .fk-no-scrollbar { scrollbar-width: none; -ms-overflow-style: none; }
          .fk-no-scrollbar::-webkit-scrollbar { display: none; width: 0; height: 0; }
        `}</style>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 28 }}>
          <EmailAvatar email={userEmail} />
          <div style={{ font: 'var(--text-h2)', fontFamily: 'var(--font-display)', wordBreak: 'break-all' }}>{userEmail}</div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 4, background: 'var(--color-bg-section)', borderRadius: 'var(--radius-lg)', padding: 8, marginBottom: 20 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 12px' }}>
            <span style={{ font: 'var(--text-body-lg)' }}>Notifications</span>
            <Toggle checked={notif} onChange={setNotif} />
          </div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 12px' }}>
            <span style={{ font: 'var(--text-body-lg)' }}>Dark mode</span>
            <Toggle checked={dark} onChange={setDark} />
          </div>
        </div>

        <button
          onClick={onOpenReminderPrefs}
          style={{
            display: 'flex', alignItems: 'center', gap: 14, padding: '16px', width: '100%',
            background: 'var(--color-bg-elevated)', borderRadius: 'var(--radius-lg)',
            boxShadow: 'var(--shadow-xs)', border: 'none', textAlign: 'left', marginBottom: 24,
          }}
        >
          <div style={{ width: 44, height: 44, borderRadius: '50%', background: 'var(--color-primary-surface)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <span className="material-symbols-rounded" style={{ fontSize: 22, color: 'var(--color-primary-press)' }}>notifications</span>
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ font: 'var(--text-body-lg)' }}>Reminder Preferences</div>
            <div style={{ font: 'var(--text-body-sm)', color: 'var(--color-text-secondary)' }}>Manage reminder times for each food category</div>
          </div>
          <span className="material-symbols-rounded" style={{ fontSize: 18, color: 'var(--color-text-tertiary)' }}>chevron_right</span>
        </button>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 2, background: 'var(--color-bg-section)', borderRadius: 'var(--radius-lg)', overflow: 'hidden', marginBottom: 24 }}>
          {rows.map((r) => (
            <button key={r.label} onClick={r.onClick} style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '14px 16px', background: 'var(--color-bg-elevated)', border: 'none', textAlign: 'left', width: '100%' }}>
              <span className="material-symbols-rounded" style={{ fontSize: 22, color: 'var(--color-text-secondary)' }}>{r.icon}</span>
              <span style={{ flex: 1, font: 'var(--text-body-lg)' }}>{r.label}</span>
              {r.value && <span style={{ font: 'var(--text-body-sm)', color: 'var(--color-text-tertiary)' }}>{r.value}</span>}
              <span className="material-symbols-rounded" style={{ fontSize: 18, color: 'var(--color-text-tertiary)' }}>chevron_right</span>
            </button>
          ))}
        </div>

        <Button variant="ghost" fullWidth onClick={onLogout} icon={<span className="material-symbols-rounded" style={{ fontSize: 20, color: 'var(--color-accent-red)' }}>logout</span>}>
          <span style={{ color: 'var(--color-accent-red)' }}>Log out</span>
        </Button>
      </div>

      <BottomNav active="profile" onChange={goTab} />
    </div>
  );
}

window.Profile = Profile;
