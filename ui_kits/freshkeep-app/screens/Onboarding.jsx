function Onboarding({ onDone, onSetFrequency }) {
  const { useState } = React;
  const { Button, OnboardingScene } = window.SmartHouseholdFoodManagementDesignSystem_8f59ea;
  const [step, setStep] = useState(0);

  const slides = [
    { scene: 'track', tone: 'var(--green-50)', title: 'Track Your Food', body: 'Keep every food item organized in one place.' },
    { scene: 'reminders', tone: 'var(--orange-100)', title: 'Waste Less Food', body: 'Smart reminders help you use food before it expires.' },
    { scene: 'shopping', tone: 'var(--blue-100)', title: 'Shop Smart', body: 'Buy only what you need and save money every week.' },
  ];

  // Screen 4 — full-screen shopping schedule picker (reuses ShoppingSetup).
  if (step === slides.length) {
    return (
      <window.ShoppingSetup onSave={(key) => { onSetFrequency && onSetFrequency(key); onDone(); }} />
    );
  }

  const s = slides[step];

  return (
    <div style={{ position: 'absolute', inset: 0, background: 'var(--color-bg)', display: 'flex', flexDirection: 'column' }}>
      <div style={{ display: 'flex', justifyContent: 'flex-end', padding: '20px 20px 0' }}>
        <button onClick={() => setStep(slides.length)} style={{ border: 'none', background: 'transparent', font: 'var(--text-label)', fontFamily: 'var(--font-body)', color: 'var(--color-text-tertiary)', padding: 12 }}>Skip</button>
      </div>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 32, padding: '0 32px', textAlign: 'center' }}>
        <div key={step} style={{ width: 240, height: 240, borderRadius: 'var(--radius-xl)', background: s.tone, animation: 'ob-in 0.4s var(--ease-out-soft)' }}>
          <OnboardingScene type={s.scene} />
        </div>
        <div>
          <div style={{ font: 'var(--text-h1)', fontFamily: 'var(--font-display)', color: 'var(--color-text-primary)', marginBottom: 12 }}>{s.title}</div>
          <div style={{ font: 'var(--text-body-lg)', color: 'var(--color-text-secondary)' }}>{s.body}</div>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          {slides.map((_, i) => (
            <div key={i} style={{ width: i === step ? 24 : 8, height: 8, borderRadius: 'var(--radius-pill)', background: i === step ? 'var(--color-primary)' : 'var(--gray-200)', transition: 'width var(--duration-base) var(--ease-out-soft)' }} />
          ))}
        </div>
      </div>
      <div style={{ padding: 24 }}>
        <Button variant="primary" fullWidth onClick={() => setStep(step + 1)}>
          {step === slides.length - 1 ? 'Get Started' : 'Next'}
        </Button>
      </div>
      <style>{`@keyframes ob-in { from { opacity: 0; transform: scale(0.85); } to { opacity: 1; transform: scale(1); } }`}</style>
    </div>
  );
}

window.Onboarding = Onboarding;
