const TERMS_SECTIONS = [
  ['Acceptance of Terms', 'By using FreshKeep, you agree to these Terms & Conditions and our Privacy Policy.'],
  ['User Responsibilities', 'Keep your account credentials secure and provide accurate information about your food inventory.'],
  ['Acceptable Use', 'Use FreshKeep only for personal household food management and community food donation — not for commercial resale.'],
  ['Inventory Management Rules', 'Freshness indicators and reminders are estimates; always use your own judgment about food safety.'],
  ['Food Donation Guidelines', 'Only donate food that is safely stored, within its safe-use window, and accurately described to recipients.'],
  ['Community Rules', 'Be respectful and honest with other household members and donation recipients using the app.'],
  ['Prohibited Activities', 'No fraudulent listings, harassment, or attempts to disrupt the service.'],
  ['Privacy & Data Usage', 'Your use of the app is also governed by our Privacy Policy, which explains what data we collect and how.'],
  ['Account Suspension', 'Accounts that violate these terms may be suspended or terminated.'],
  ['Disclaimer', 'FreshKeep is provided "as is" — we do our best to keep reminders and data accurate but cannot guarantee zero errors.'],
  ['Limitation of Liability', 'FreshKeep is not liable for food spoilage, donation outcomes, or losses arising from app use.'],
  ['Changes to Terms', 'We may update these terms occasionally; continued use after changes means you accept the updated terms.'],
  ['Contact Information', 'Questions about these terms can be sent to legal@freshkeep.app.'],
];

function TermsConditions({ onBack }) {
  const { useState } = React;
  const { TopBar, Button } = window.SmartHouseholdFoodManagementDesignSystem_8f59ea;
  const [agreed, setAgreed] = useState(false);

  return (
    <div style={{ position: 'absolute', inset: 0, background: 'var(--color-bg)', display: 'flex', flexDirection: 'column', animation: 'legal-in 220ms var(--ease-out-soft)' }}>
      <TopBar title="Terms & Conditions" onBack={onBack} />
      <div className="fk-no-scrollbar" style={{ flex: 1, overflowY: 'auto', padding: '0 20px 24px' }}>
        <div style={{ font: 'var(--text-caption)', color: 'var(--color-text-tertiary)', marginBottom: 16 }}>Effective Date: July 1, 2026</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {TERMS_SECTIONS.map(([t, b]) => <LegalAccordion key={t} title={t} body={b} />)}
        </div>
        <label style={{ display: 'flex', alignItems: 'center', gap: 10, marginTop: 20, cursor: 'pointer' }}>
          <span
            onClick={() => setAgreed(!agreed)}
            style={{
              width: 24, height: 24, borderRadius: 'var(--radius-sm)',
              border: agreed ? 'none' : '2px solid var(--color-border-strong)',
              background: agreed ? 'var(--color-primary)' : 'transparent',
              display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
            }}
          >
            {agreed && <span className="material-symbols-rounded" style={{ fontSize: 16, color: '#fff' }}>check</span>}
          </span>
          <span style={{ font: 'var(--text-body)', color: 'var(--color-text-primary)' }}>I agree to the Terms & Conditions</span>
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

window.TermsConditions = TermsConditions;
