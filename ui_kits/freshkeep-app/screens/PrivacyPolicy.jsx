const PRIVACY_SECTIONS = [
  ['Introduction', 'FreshKeep helps your household track food and reduce waste. This policy explains what data we collect and how we use it.'],
  ['Information We Collect', 'Account details (name, email, profile photo), the food data you enter, and basic device/notification settings.'],
  ['How We Use Your Information', 'To run core features — inventory tracking, reminders, analytics — and to improve the app experience.'],
  ['Food Inventory Data', 'Item names, quantities, categories, and expiry dates you add are stored to power reminders and freshness tracking.'],
  ['Donation Data', 'If you post a food donation, its description, quantity, and pickup details are shared with prospective recipients.'],
  ['Notification Permissions', 'Used solely to deliver expiry reminders you\'ve opted into.'],
  ['Camera Permission', 'Used only when you choose Take Photo for your profile picture or a custom item image.'],
  ['Photo Permission', 'Used only when you choose Choose from Gallery to select an existing image.'],
  ['Location Permission', 'Requested only for donation pickup coordination — never for tracking outside that feature.'],
  ['Data Security', 'Data is encrypted in transit and at rest, with access limited to what each feature needs.'],
  ['Data Sharing Policy', 'We do not sell your data. Limited data is shared with household members you invite or donation recipients you choose to contact.'],
  ['User Rights', 'You can access, export, or correct your data at any time from Profile settings.'],
  ['Delete Account & Data', 'Contact Support to permanently delete your account and all associated data.'],
  ['Contact Information', 'Reach us at privacy@freshkeep.app with any questions about this policy.'],
];

function LegalAccordion({ title, body }) {
  const { useState } = React;
  const [open, setOpen] = useState(false);
  return (
    <div style={{ background: 'var(--color-bg-elevated)', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-xs)', overflow: 'hidden' }}>
      <button onClick={() => setOpen(!open)} style={{ display: 'flex', alignItems: 'center', gap: 10, width: '100%', border: 'none', background: 'transparent', padding: 16, textAlign: 'left' }}>
        <span style={{ flex: 1, font: 'var(--text-body-lg)', fontWeight: 600 }}>{title}</span>
        <span className="material-symbols-rounded" style={{ fontSize: 20, color: 'var(--color-text-tertiary)', transform: open ? 'rotate(180deg)' : 'none', transition: 'transform 200ms var(--ease-out-soft)' }}>expand_more</span>
      </button>
      <div style={{ maxHeight: open ? 300 : 0, opacity: open ? 1 : 0, overflow: 'hidden', transition: 'max-height 260ms var(--ease-out-soft), opacity 200ms' }}>
        <div style={{ padding: '0 16px 16px', font: 'var(--text-body-sm)', color: 'var(--color-text-secondary)' }}>{body}</div>
      </div>
    </div>
  );
}

function PrivacyPolicy({ onBack }) {
  const { useState } = React;
  const { TopBar, Button } = window.SmartHouseholdFoodManagementDesignSystem_8f59ea;
  const [acked, setAcked] = useState(false);

  return (
    <div style={{ position: 'absolute', inset: 0, background: 'var(--color-bg)', display: 'flex', flexDirection: 'column', animation: 'legal-in 220ms var(--ease-out-soft)' }}>
      <TopBar title="Privacy Policy" onBack={onBack} />
      <div className="fk-no-scrollbar" style={{ flex: 1, overflowY: 'auto', padding: '0 20px 24px' }}>
        <div style={{ font: 'var(--text-caption)', color: 'var(--color-text-tertiary)', marginBottom: 16 }}>Last Updated: July 1, 2026</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {PRIVACY_SECTIONS.map(([t, b]) => <LegalAccordion key={t} title={t} body={b} />)}
        </div>
        <label style={{ display: 'flex', alignItems: 'center', gap: 10, marginTop: 20, cursor: 'pointer' }}>
          <span
            onClick={() => setAcked(!acked)}
            style={{
              width: 24, height: 24, borderRadius: 'var(--radius-sm)',
              border: acked ? 'none' : '2px solid var(--color-border-strong)',
              background: acked ? 'var(--color-primary)' : 'transparent',
              display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
            }}
          >
            {acked && <span className="material-symbols-rounded" style={{ fontSize: 16, color: '#fff' }}>check</span>}
          </span>
          <span style={{ font: 'var(--text-body)', color: 'var(--color-text-primary)' }}>I have read the Privacy Policy</span>
        </label>
      </div>
      <div style={{ padding: 20 }}>
        <Button variant="secondary" fullWidth onClick={onBack}>Back</Button>
      </div>
      <style>{`
        @keyframes legal-in { from { opacity: 0; transform: translateX(16px); } to { opacity: 1; transform: translateX(0); } }
        .fk-no-scrollbar { scrollbar-width: none; -ms-overflow-style: none; }
        .fk-no-scrollbar::-webkit-scrollbar { display: none; width: 0; height: 0; }
      `}</style>
    </div>
  );
}

window.PrivacyPolicy = PrivacyPolicy;
