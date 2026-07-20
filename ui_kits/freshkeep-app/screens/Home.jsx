function StatCardButton({ label, value, icon, onClick, preview, more, emptyText }) {
  const { useState, useRef } = React;
  const [ripples, setRipples] = useState([]);
  const [pressed, setPressed] = useState(false);
  const idRef = useRef(0);

  function handleClick(e) {
    const rect = e.currentTarget.getBoundingClientRect();
    const id = idRef.current++;
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setRipples((r) => [...r, { id, x, y }]);
    setTimeout(() => setRipples((r) => r.filter((rp) => rp.id !== id)), 600);
    onClick && onClick();
  }

  return (
    <button
      onClick={handleClick}
      onPointerDown={() => setPressed(true)}
      onPointerUp={() => setPressed(false)}
      onPointerLeave={() => setPressed(false)}
      style={{
        position: 'relative', overflow: 'hidden',
        flex: 1, minWidth: 0, background: 'rgba(255,255,255,0.16)', borderRadius: 'var(--radius-lg)',
        padding: '14px 12px', display: 'flex', flexDirection: 'column', gap: 6,
        border: 'none', textAlign: 'left', cursor: 'pointer',
        transform: pressed ? 'scale(0.96) translateY(1px)' : 'scale(1)',
        boxShadow: pressed ? 'none' : '0 6px 16px rgba(0,0,0,0.12)',
        transition: 'transform 140ms var(--ease-bounce), box-shadow 140ms var(--ease-standard)',
      }}
    >
      <span className="material-symbols-rounded" style={{ fontSize: 20 }}>{icon}</span>
      <span style={{ font: 'var(--text-numeral)', fontFamily: 'var(--font-display)', fontSize: 20, color: '#FFF3C4' }}>{value}</span>
      <span style={{ font: 'var(--text-caption)', color: 'rgba(255,255,255,0.85)' }}>{label}</span>
      {preview !== undefined && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 2, marginTop: 2 }}>
          {preview.length === 0 && emptyText && (
            <span style={{ font: 'var(--text-caption)', fontSize: 10, color: 'rgba(255,255,255,0.75)' }}>{emptyText}</span>
          )}
          {preview.map((name, i) => (
            <span key={i} style={{ font: 'var(--text-caption)', fontSize: 10, color: 'rgba(255,255,255,0.85)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{name}</span>
          ))}
          {more > 0 && <span style={{ font: 'var(--text-caption)', fontSize: 10, fontWeight: 700, color: '#FFF3C4' }}>+{more} More</span>}
        </div>
      )}
      {ripples.map((r) => (
        <span key={r.id} style={{
          position: 'absolute', left: r.x, top: r.y, width: 10, height: 10,
          marginLeft: -5, marginTop: -5, borderRadius: '50%',
          background: 'rgba(255,255,255,0.5)', pointerEvents: 'none',
          animation: 'stat-ripple 600ms ease-out forwards',
        }} />
      ))}
      <style>{`@keyframes stat-ripple { to { width: 260px; height: 260px; margin-left: -130px; margin-top: -130px; opacity: 0; } }`}</style>
    </button>
  );
}

function SmartInsightCard({ onOpen }) {
  const { useState, useEffect } = React;
  const [visible, setVisible] = useState(false);
  useEffect(() => { const t = setTimeout(() => setVisible(true), 60); return () => clearTimeout(t); }, []);

  const monthly = window.computeMonthlyInsight ? window.computeMonthlyInsight() : { type: 'neutral', pct: 0, sign: '≈' };
  const variants = {
    success: { icon: 'eco', title: 'Great job!', subtitle: `Food waste ↓ ${monthly.pct}%`, bg: 'rgba(255,255,255,0.95)', fg: 'var(--green-700)', dot: 'var(--color-primary)' },
    warning: { icon: 'warning', title: 'Reminder', subtitle: `Waste increased ${monthly.pct}%`, bg: 'rgba(255,255,255,0.95)', fg: 'var(--orange-700)', dot: 'var(--orange-500)' },
    neutral: { icon: 'insights', title: 'Looking good', subtitle: "You're managing food well", bg: 'rgba(255,255,255,0.95)', fg: 'var(--blue-700)', dot: 'var(--blue-500)' },
  };
  const v = variants[monthly.type] || variants.neutral;

  return (
    <button
      onClick={onOpen}
      style={{
        display: 'flex', alignItems: 'center', gap: 8, border: 'none', cursor: 'pointer',
        background: v.bg, borderRadius: 'var(--radius-lg)', padding: '10px 14px',
        boxShadow: '0 6px 16px rgba(0,0,0,0.12)', maxWidth: 168, textAlign: 'left',
        opacity: visible ? 1 : 0, transform: visible ? 'scale(1)' : 'scale(0.9)',
        transition: 'opacity 320ms var(--ease-out-soft), transform 320ms var(--ease-out-soft)',
      }}
    >
      <span style={{ width: 30, height: 30, borderRadius: '50%', background: v.dot, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <span className="material-symbols-rounded" style={{ fontSize: 16, color: '#fff' }}>{v.icon}</span>
      </span>
      <div style={{ lineHeight: 1.25 }}>
        <div style={{ font: 'var(--text-caption)', fontWeight: 700, fontSize: 12, color: v.fg }}>{v.title}</div>
        <div style={{ font: 'var(--text-caption)', fontSize: 11, color: 'var(--color-text-secondary)' }}>{v.subtitle}</div>
      </div>
    </button>
  );
}

function Home({ inventory, onOpenAddFood, onOpenFood, goTab, onOpenEatFirst, shoppingFrequency }) {
  const { FoodCard, BottomNav, FAB, FoodIllustration } = window.SmartHouseholdFoodManagementDesignSystem_8f59ea;

  const expiringSoon = inventory
    .filter((i) => i.freshness === 'soon' || i.freshness === 'expired')
    .sort((a, b) => (a.freshness === 'expired' ? 0 : 1) - (b.freshness === 'expired' ? 0 : 1))
    .slice(0, 3);
  function expiredDaysOf(item) {
    if (item.freshness !== 'expired' || !item.expiryDate) return 0;
    return Math.max(0, Math.floor((new Date() - new Date(item.expiryDate)) / 86400000));
  }
  const eatFirstCount = inventory.filter((i) => (i.daysLeft ?? 99) <= 7).length;
  const toBuy = window.fkGetActiveShoppingItems ? window.fkGetActiveShoppingItems(inventory, shoppingFrequency) : [];
  const toBuyPreview = toBuy.slice(0, 3);
  const recentlyAdded = [...inventory]
    .sort((a, b) => new Date(b.addedDate || 0) - new Date(a.addedDate || 0))
    .slice(0, 3);

  const heroStats = [
    { label: 'In Stock', value: `${inventory.length} Items`, icon: 'inventory_2', onClick: () => goTab('inventory') },
    { label: 'Eat First', value: `${eatFirstCount} Items`, icon: 'restaurant', onClick: onOpenEatFirst },
    { label: 'To Buy', value: `${toBuy.length} Items`, icon: 'shopping_cart', onClick: () => goTab('shopping') },
  ];

  return (
    <div style={{ position: 'absolute', inset: 0, background: 'var(--color-bg)', display: 'flex', flexDirection: 'column' }}>
      <style>{`
        .fk-no-scrollbar { scrollbar-width: none; -ms-overflow-style: none; }
        .fk-no-scrollbar::-webkit-scrollbar { display: none; width: 0; height: 0; }
      `}</style>
      <div className="fk-no-scrollbar" style={{ flex: 1, overflowY: 'auto', padding: '0 0 100px' }}>
        {/* Hero */}
        <div style={{
          background: 'var(--color-primary)',
          borderRadius: '0 0 var(--radius-xl) var(--radius-xl)',
          padding: '28px 20px 24px',
          color: '#fff',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
            <div>
              <div style={{ font: 'var(--text-body)', color: 'rgba(255,255,255,0.85)' }}>Good morning</div>
              <div style={{ font: 'var(--text-display)', fontFamily: 'var(--font-display)' }}>Rohim</div>
            </div>
            <SmartInsightCard onOpen={() => goTab('analytics')} />
          </div>
          <div style={{ display: 'flex', gap: 10, alignItems: 'stretch' }}>
            {heroStats.map((s) => (
              <StatCardButton key={s.label} label={s.label} value={s.value} icon={s.icon} onClick={s.onClick} preview={s.preview} more={s.more} emptyText={s.emptyText} />
            ))}
          </div>
        </div>

        <div style={{ padding: '24px 20px 0' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
            <div style={{ font: 'var(--text-h2)', fontFamily: 'var(--font-display)' }}>Expiring soon</div>
            <button onClick={() => goTab('inventory')} style={{ border: 'none', background: 'transparent', font: 'var(--text-label)', color: 'var(--color-primary-press)' }}>See all</button>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 28 }}>
            {expiringSoon.length === 0 && (
              <div style={{ padding: 20, borderRadius: 'var(--radius-lg)', background: 'var(--color-primary-surface)', font: 'var(--text-body)', color: 'var(--color-primary-press)' }}>
                Nothing expiring soon — you're all set 🎉
              </div>
            )}
            {expiringSoon.map((f) => (
              <FoodCard key={f.id} name={f.name} quantity={f.quantity} icon={f.icon} illustration={f.illustration} freshness={f.freshness} expiryLabel={f.expiryLabel} expiredDays={expiredDaysOf(f)} daysLeft={f.daysLeft} onClick={() => onOpenFood(f)} />
            ))}
          </div>

          {/* Recently Added */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
            <div style={{ font: 'var(--text-h2)', fontFamily: 'var(--font-display)' }}>Recently added</div>
            <button onClick={() => goTab('inventory')} style={{ border: 'none', background: 'transparent', font: 'var(--text-label)', color: 'var(--color-primary-press)' }}>See all</button>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 28 }}>
            {recentlyAdded.length === 0 && (
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, padding: '28px 20px', textAlign: 'center', background: 'var(--color-bg-section)', borderRadius: 'var(--radius-lg)' }}>
                <div style={{ fontSize: 32 }}>📦</div>
                <div style={{ font: 'var(--text-body)', color: 'var(--color-text-secondary)' }}>No recently added items.</div>
                <div style={{ font: 'var(--text-caption)', color: 'var(--color-text-tertiary)' }}>Start by adding your first food item.</div>
              </div>
            )}
            {recentlyAdded.map((f) => (
              <button
                key={f.id}
                onClick={() => onOpenFood(f)}
                style={{ display: 'flex', alignItems: 'center', gap: 12, width: '100%', height: 56, padding: '0 14px', border: 'none', borderRadius: 'var(--radius-lg)', background: 'var(--color-bg-elevated)', boxShadow: 'var(--shadow-xs)', textAlign: 'left', cursor: 'pointer' }}
              >
                <div style={{ width: 36, height: 36, borderRadius: 'var(--radius-md)', background: 'var(--color-primary-surface)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: f.illustration ? 5 : 0, flexShrink: 0 }}>
                  {f.illustration ? <FoodIllustration type={f.illustration} /> : <span className="material-symbols-rounded" style={{ fontSize: 20, color: 'var(--color-primary-press)' }}>{f.icon}</span>}
                </div>
                <span style={{ flex: 1, font: 'var(--text-body-lg)', color: 'var(--color-text-primary)' }}>{f.name}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      <FAB icon="add" label="Add food" onClick={onOpenAddFood} />
      <BottomNav active="home" onChange={goTab} />
    </div>
  );
}

window.Home = Home;
