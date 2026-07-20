function Splash({ onDone }) {
  const { useEffect } = React;
  const { FoodIllustration } = window.SmartHouseholdFoodManagementDesignSystem_8f59ea;
  useEffect(() => {
    const t = setTimeout(onDone, 2200);
    return () => clearTimeout(t);
  }, []);

  const deco = [
    { type: 'vegetables', top: '8%', left: '10%', size: 64, rot: -8 },
    { type: 'fruits', top: '14%', left: '76%', size: 56, rot: 10 },
    { type: 'tomato', top: '72%', left: '78%', size: 60, rot: -6 },
    { type: 'others', top: '70%', left: '12%', size: 52, rot: 8 },
  ];

  return (
    <div style={{ position: 'absolute', inset: 0, background: '#ffffff', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 20, overflow: 'hidden' }}>
      {/* soft green ambient accents */}
      <div style={{ position: 'absolute', top: '-18%', left: '-22%', width: '65%', height: '55%', borderRadius: '50%', background: 'radial-gradient(circle, var(--green-100) 0%, rgba(255,255,255,0) 70%)' }} />
      <div style={{ position: 'absolute', bottom: '-20%', right: '-18%', width: '60%', height: '50%', borderRadius: '50%', background: 'radial-gradient(circle, var(--green-100) 0%, rgba(255,255,255,0) 70%)' }} />

      {/* subtle food-themed accents around the logo, low-opacity so they stay quiet */}
      {deco.map((d, i) => (
        <div key={i} style={{ position: 'absolute', top: d.top, left: d.left, width: d.size, height: d.size, opacity: 0.16, transform: `rotate(${d.rot}deg)` }}>
          <FoodIllustration type={d.type} />
        </div>
      ))}

      <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 24, animation: 'splash-fade 900ms var(--ease-out-soft) both' }}>
        <img src="../../assets/logo/freshkeep-app-icon.png" alt="Smart Household Food Management System" style={{
          width: 215, height: 215, objectFit: 'contain',
          animation: 'splash-float 2.6s ease-in-out infinite',
        }} />
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10, textAlign: 'center', padding: '0 40px' }}>
          <div style={{ font: 'var(--text-h1)', fontFamily: 'var(--font-display)', fontSize: 24, lineHeight: 1.25, color: 'var(--gray-900)' }}>
            Smart Household<br />Food Management System
          </div>
          <div style={{ font: 'var(--text-body-lg)', fontFamily: 'var(--font-body)', color: 'var(--color-primary-press)', fontWeight: 700 }}>
            Manage. Plan. Save.
          </div>
        </div>
      </div>

      <style>{`
        @keyframes splash-fade { from { opacity: 0; transform: translateY(14px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes splash-float { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-8px); } }
      `}</style>
    </div>
  );
}

window.Splash = Splash;
