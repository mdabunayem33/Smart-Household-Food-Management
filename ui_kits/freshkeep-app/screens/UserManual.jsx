const MANUAL_SECTIONS = [
  {
    key: 'inventory', icon: 'inventory_2', label: 'Add Inventory',
    body: 'Learn how to add food items, choose categories, set quantity, and set expiry dates from the green Add food button on Home or Inventory.',
  },
  {
    key: 'reminders', icon: 'notifications', label: 'Expiry Reminders',
    body: 'Understand how reminders work per category and how to customize reminder timing from Reminder Preferences.',
  },
  {
    key: 'grocery', icon: 'shopping_cart', label: 'Grocery Planning',
    body: 'Learn how grocery planning and shopping recommendations work based on what is running low in your inventory.',
  },
  {
    key: 'analytics', icon: 'donut_large', label: 'Analytics',
    body: 'View monthly food waste, food saved, and money saved reports from the Analytics tab.',
  },
  {
    key: 'notifications', icon: 'notifications_active', label: 'Notifications',
    body: 'Manage reminder notifications and alerts from the Notifications toggle at the top of Profile.',
  },
  {
    key: 'family', icon: 'diversity_3', label: 'Family Sharing',
    body: 'Learn how to share food management with family members so everyone stays in sync.',
  },
  {
    key: 'faq', icon: 'quiz', label: 'Frequently Asked Questions',
    faqs: [
      ['How do I add food?', 'Tap the green Add food button on Home or Inventory and follow the quick steps.'],
      ['How do reminders work?', 'Each category has its own reminder days, set in Profile → Reminder Preferences.'],
      ['How do I change the language?', 'Profile → Language, then tap any language in the list.'],
      ['How do I delete my account?', 'Contact Support to request account deletion.'],
      ['Can I use the app without Wi-Fi?', 'Yes, core tracking works offline; sync happens when you\'re back online.'],
    ],
  },
  {
    key: 'contact', icon: 'support_agent', label: 'Contact Support',
    contact: [
      { icon: 'mail', label: 'Email Support', value: 'support@freshkeep.app' },
      { icon: 'info', label: 'App Version', value: '1.2.0 (Build 108)' },
    ],
  },
];

function ManualAccordion({ icon, label, body, faqs, contact }) {
  const { useState } = React;
  const [open, setOpen] = useState(false);
  return (
    <div style={{ background: 'var(--color-bg-elevated)', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-xs)', overflow: 'hidden' }}>
      <button onClick={() => setOpen(!open)} style={{ display: 'flex', alignItems: 'center', gap: 14, width: '100%', border: 'none', background: 'transparent', padding: 16, textAlign: 'left', minHeight: 44 }}>
        <div style={{ width: 40, height: 40, borderRadius: '50%', background: 'var(--color-primary-surface)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
          <span className="material-symbols-rounded" style={{ fontSize: 20, color: 'var(--color-primary-press)' }}>{icon}</span>
        </div>
        <span style={{ flex: 1, font: 'var(--text-body-lg)', fontWeight: 600 }}>{label}</span>
        <span className="material-symbols-rounded" style={{ fontSize: 20, color: 'var(--color-text-tertiary)', transform: open ? 'rotate(180deg)' : 'none', transition: 'transform 200ms var(--ease-out-soft)' }}>expand_more</span>
      </button>
      <div style={{ maxHeight: open ? 500 : 0, opacity: open ? 1 : 0, overflow: 'hidden', transition: 'max-height 260ms var(--ease-out-soft), opacity 200ms' }}>
        <div style={{ padding: '0 16px 16px', display: 'flex', flexDirection: 'column', gap: 10 }}>
          {body && <div style={{ font: 'var(--text-body-sm)', color: 'var(--color-text-secondary)' }}>{body}</div>}
          {faqs && faqs.map(([q, a]) => (
            <div key={q} style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <div style={{ font: 'var(--text-body)', fontWeight: 600 }}>{q}</div>
              <div style={{ font: 'var(--text-body-sm)', color: 'var(--color-text-secondary)' }}>{a}</div>
            </div>
          ))}
          {contact && contact.map((c) => (
            <div key={c.label} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <span className="material-symbols-rounded" style={{ fontSize: 18, color: 'var(--color-text-secondary)' }}>{c.icon}</span>
              <div>
                <div style={{ font: 'var(--text-body-sm)' }}>{c.label}</div>
                <div style={{ font: 'var(--text-caption)', color: 'var(--color-text-tertiary)' }}>{c.value}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function UserManual({ onBack }) {
  const { TopBar } = window.SmartHouseholdFoodManagementDesignSystem_8f59ea;
  return (
    <div style={{ position: 'absolute', inset: 0, background: 'var(--color-bg)', display: 'flex', flexDirection: 'column', animation: 'manual-in 220ms var(--ease-out-soft)' }}>
      <TopBar title="User Manual" onBack={onBack} />
      <div className="fk-no-scrollbar" style={{ flex: 1, overflowY: 'auto', padding: '4px 20px 24px', display: 'flex', flexDirection: 'column', gap: 10 }}>
        {MANUAL_SECTIONS.map((s) => (
          <ManualAccordion key={s.key} icon={s.icon} label={s.label} body={s.body} faqs={s.faqs} contact={s.contact} />
        ))}
      </div>
      <style>{`
        @keyframes manual-in { from { opacity: 0; transform: translateX(16px); } to { opacity: 1; transform: translateX(0); } }
        .fk-no-scrollbar { scrollbar-width: none; -ms-overflow-style: none; }
        .fk-no-scrollbar::-webkit-scrollbar { display: none; width: 0; height: 0; }
      `}</style>
    </div>
  );
}

window.UserManual = UserManual;
