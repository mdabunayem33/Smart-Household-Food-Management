function bucketFor(daysLeft) {
  if (daysLeft <= 0) return 'Expiring Today';
  if (daysLeft === 1) return 'Tomorrow';
  if (daysLeft <= 3) return 'Within 3 Days';
  return 'Within 7 Days';
}

function EatFirst({ inventory, onBack, onConsume, onOpenFood }) {
  const { TopBar, FoodIllustration, Button, FreshnessBar } = window.SmartHouseholdFoodManagementDesignSystem_8f59ea;

  const urgent = inventory
    .filter((i) => (i.daysLeft ?? 99) <= 7)
    .sort((a, b) => (a.daysLeft ?? 99) - (b.daysLeft ?? 99));

  const order = ['Expiring Today', 'Tomorrow', 'Within 3 Days', 'Within 7 Days'];
  const groups = order
    .map((label) => ({ label, items: urgent.filter((i) => bucketFor(i.daysLeft) === label) }))
    .filter((g) => g.items.length > 0);

  return (
    <div style={{ position: 'absolute', inset: 0, background: 'var(--color-bg)', display: 'flex', flexDirection: 'column', animation: 'ef-in 220ms var(--ease-out-soft)' }}>
      <TopBar title="Eat First" onBack={onBack} />
      <div style={{ flex: 1, overflowY: 'auto', padding: '4px 20px 32px' }}>
        {groups.length === 0 && (
          <div style={{ textAlign: 'center', color: 'var(--color-text-tertiary)', padding: 40 }}>Nothing urgent — you're all caught up 🎉</div>
        )}
        {groups.map((g) => {
          const isUrgent = g.label === 'Expiring Today' || g.label === 'Tomorrow';
          return (
            <div key={g.label} style={{ marginBottom: 24 }}>
              <div style={{
                display: 'inline-flex', alignItems: 'center', gap: 6, marginBottom: 12,
                padding: '4px 12px', borderRadius: 'var(--radius-pill)',
                background: isUrgent ? 'var(--color-accent-red-surface)' : 'var(--color-accent-orange-surface)',
                color: isUrgent ? 'var(--red-700)' : 'var(--orange-700)',
              }}>
                <span className="material-symbols-rounded" style={{ fontSize: 16 }}>{isUrgent ? 'warning' : 'schedule'}</span>
                <span style={{ font: 'var(--text-label)', fontFamily: 'var(--font-body)' }}>{g.label}</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {g.items.map((item) => (
                  <div
                    key={item.id}
                    style={{
                      display: 'flex', alignItems: 'center', gap: 14, padding: 14,
                      borderRadius: 'var(--radius-lg)', background: 'var(--color-bg-elevated)',
                      boxShadow: 'var(--shadow-sm)',
                      borderLeft: isUrgent ? '4px solid var(--color-accent-red)' : '4px solid var(--color-accent-orange)',
                    }}
                  >
                    <button onClick={() => onOpenFood(item)} style={{ display: 'flex', alignItems: 'center', gap: 14, flex: 1, border: 'none', background: 'transparent', textAlign: 'left', padding: 0 }}>
                      <div style={{ width: 52, height: 52, borderRadius: 'var(--radius-md)', background: 'var(--color-bg-section)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, padding: 8 }}>
                        {item.illustration ? <FoodIllustration type={item.illustration} /> : <span className="material-symbols-rounded">{item.icon}</span>}
                      </div>
                      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 6 }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                          <span style={{ font: 'var(--text-h3)', fontFamily: 'var(--font-display)', fontSize: 15 }}>{item.name}</span>
                          <span style={{ font: 'var(--text-body-sm)', color: 'var(--color-text-secondary)' }}>{item.quantity}</span>
                        </div>
                        <FreshnessBar level={item.freshness} label={item.expiryLabel} expiredDays={item.expiredDays} daysLeft={item.daysLeft} />
                      </div>
                    </button>
                    <Button variant="secondary" size="sm" onClick={() => onConsume(item.id)}>Mark as Consumed</Button>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
      <style>{`@keyframes ef-in { from { opacity: 0; transform: translateY(12px); } to { opacity: 1; transform: translateY(0); } }`}</style>
    </div>
  );
}

window.EatFirst = EatFirst;
