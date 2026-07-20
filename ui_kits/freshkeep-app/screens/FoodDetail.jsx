function FoodDetail({ item, onClose, onConsume, onDiscard, onAdjust }) {
  const { Button, IconButton, FreshnessBar, Badge } = window.SmartHouseholdFoodManagementDesignSystem_8f59ea;
  const { FoodIllustration } = window.SmartHouseholdFoodManagementDesignSystem_8f59ea;
  const { useState } = React;
  const [discardOpen, setDiscardOpen] = useState(false);
  if (!item) return null;

  return (
    <div style={{ position: 'absolute', inset: 0, background: 'var(--color-overlay-scrim)', display: 'flex', alignItems: 'flex-end', zIndex: 10 }} onClick={onClose}>
      <div
        onClick={(e) => e.stopPropagation()}
        style={{ width: '100%', background: 'var(--color-bg)', borderRadius: 'var(--radius-xl) var(--radius-xl) 0 0', padding: 24, display: 'flex', flexDirection: 'column', gap: 20, animation: 'fd-up 260ms var(--ease-out-soft)' }}
      >
        <div style={{ width: 40, height: 4, borderRadius: 'var(--radius-pill)', background: 'var(--gray-200)', alignSelf: 'center' }} />
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <div style={{ width: 64, height: 64, borderRadius: 'var(--radius-lg)', background: 'var(--color-primary-surface)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: item.illustration ? 10 : 0 }}>
            {item.illustration
              ? <FoodIllustration type={item.illustration} />
              : <span className="material-symbols-rounded" style={{ fontSize: 32, color: 'var(--color-primary-press)' }}>{item.icon}</span>}
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ font: 'var(--text-h1)', fontFamily: 'var(--font-display)' }}>{item.name}</div>
            <div style={{ font: 'var(--text-body)', color: 'var(--color-text-secondary)' }}>{item.quantity}</div>
          </div>
          <IconButton icon="close" variant="surface" onClick={onClose} />
        </div>
        <FreshnessBar level={item.freshness} label={item.expiryLabel} />
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          <Button variant="primary" fullWidth onClick={onConsume}>Mark as consumed</Button>
          <Button variant="secondary" fullWidth onClick={onAdjust}>Adjust quantity</Button>
          <Button variant="danger" fullWidth onClick={() => setDiscardOpen(true)}>Discard</Button>
        </div>
      </div>

      {discardOpen && ReactDOM.createPortal(
        <div style={{ position: 'fixed', inset: 0, background: 'var(--color-overlay-scrim)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 999 }} onClick={() => setDiscardOpen(false)}>
          <div onClick={(e) => e.stopPropagation()} style={{ width: '82%', maxWidth: 340, background: 'var(--color-bg)', borderRadius: 'var(--radius-lg)', padding: 22, display: 'flex', flexDirection: 'column', gap: 16, animation: 'rc-dialog-in 200ms var(--ease-out-soft)' }}>
            <div style={{ font: 'var(--text-h3)', fontFamily: 'var(--font-display)' }}>Discard product?</div>
            <div style={{ font: 'var(--text-body-sm)', color: 'var(--color-text-secondary)' }}>This action will permanently remove {item.name} from your inventory.</div>
            <div style={{ display: 'flex', gap: 10 }}>
              <button onClick={() => setDiscardOpen(false)} style={{ flex: 1, border: 'none', background: 'var(--color-bg-section)', color: 'var(--color-text-primary)', borderRadius: 'var(--radius-pill)', padding: 12, font: 'var(--text-label)' }}>Cancel</button>
              <button onClick={() => { setDiscardOpen(false); onDiscard(); }} style={{ flex: 1, border: 'none', background: 'var(--color-accent-red)', color: '#fff', borderRadius: 'var(--radius-pill)', padding: 12, font: 'var(--text-label)' }}>Discard</button>
            </div>
          </div>
          <style>{`@keyframes rc-dialog-in { from { opacity: 0; transform: scale(0.92); } to { opacity: 1; transform: scale(1); } }`}</style>
        </div>,
        document.body,
      )}
      <style>{`@keyframes fd-up { from { transform: translateY(40px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }`}</style>
    </div>
  );
}

window.FoodDetail = FoodDetail;
