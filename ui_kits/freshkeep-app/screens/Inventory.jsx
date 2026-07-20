function ExpiryProgressBar({ addedDate, expiryDate }) {
  const { useState, useEffect } = React;
  const [result, setResult] = useState(null);

  useEffect(() => {
    if (window.fkExpiryProgress) setResult(window.fkExpiryProgress(addedDate, expiryDate));
  }, [addedDate, expiryDate]);

  if (!addedDate || !expiryDate) return null;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
      <div style={{ height: 6, borderRadius: 'var(--radius-pill)', background: 'var(--gray-100)', overflow: 'hidden', position: 'relative' }}>
        {result && !result.expired && (
          <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: `${result.fillPct}%`, background: result.color, borderRadius: 'var(--radius-pill)', transition: 'width 400ms var(--ease-out-soft)' }} />
        )}
        {result && result.expired && (
          <div style={{ position: 'absolute', right: 0, top: 0, bottom: 0, width: `${result.fillPct}%`, background: result.color, borderRadius: 'var(--radius-pill)', transition: 'width 400ms var(--ease-out-soft)' }} />
        )}
      </div>
      {result && (
        <span style={{ font: 'var(--text-caption)', color: result.expired ? 'var(--red-700)' : 'var(--color-text-tertiary)' }}>{result.label}</span>
      )}
    </div>
  );
}

function InventoryItemCard({ item, onOpen, onEdit, onDelete }) {
  const { FoodIllustration } = window.SmartHouseholdFoodManagementDesignSystem_8f59ea;
  const iconTone = {
    fresh: 'var(--color-primary-surface)', aging: 'var(--color-aging-surface)',
    soon: 'var(--color-soon-surface)', expired: 'var(--color-expired-surface)',
  }[item.freshness] || 'var(--color-primary-surface)';

  return (
    <div style={{ position: 'relative', width: '100%', padding: 16, borderRadius: 'var(--radius-lg)', background: 'var(--color-bg-elevated)', boxShadow: 'var(--shadow-sm)' }}>
      <div style={{ position: 'absolute', top: 10, right: 10, display: 'flex', gap: 6 }}>
        <button onClick={onEdit} aria-label="Edit product" style={{ border: 'none', background: 'var(--color-bg-section)', width: 36, height: 36, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <span className="material-symbols-rounded" style={{ fontSize: 17, color: 'var(--color-text-secondary)' }}>edit</span>
        </button>
        <button onClick={onDelete} aria-label="Delete product" style={{ border: 'none', background: 'var(--color-accent-red-surface)', width: 36, height: 36, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <span className="material-symbols-rounded" style={{ fontSize: 17, color: 'var(--red-700)' }}>delete</span>
        </button>
      </div>
      <button onClick={onOpen} style={{ display: 'flex', alignItems: 'center', gap: 16, width: '100%', paddingRight: 84, border: 'none', background: 'transparent', textAlign: 'left' }}>
        <div style={{ width: 56, height: 56, borderRadius: 'var(--radius-md)', background: iconTone, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, padding: item.illustration ? 8 : 0 }}>
          {item.illustration
            ? <FoodIllustration type={item.illustration} />
            : <span className="material-symbols-rounded" style={{ fontSize: 28, color: 'var(--color-text-primary)', fontVariationSettings: "'FILL' 1" }}>{item.icon}</span>}
        </div>
        <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', gap: 8 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 8 }}>
            <span style={{ font: 'var(--text-h3)', fontFamily: 'var(--font-display)', fontSize: 16, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{item.name}</span>
            <span style={{ font: 'var(--text-body-sm)', color: 'var(--color-text-secondary)', flexShrink: 0 }}>{item.quantity}</span>
          </div>
          <ExpiryProgressBar addedDate={item.addedDate} expiryDate={item.expiryDate} />
        </div>
      </button>
    </div>
  );
}

// Lightweight manual virtualization: only mounts the real card (with its icon,
// expiry math) when scrolled near the viewport; off-screen rows render an
// empty placeholder of the same height so scroll position/height stay stable.
function LazyInventoryRow({ item, onOpen, onEdit, onDelete }) {
  const { useRef, useState, useEffect } = React;
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!ref.current || typeof IntersectionObserver === 'undefined') { setVisible(true); return; }
    const obs = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) setVisible(true); }, { rootMargin: '400px 0px' });
    obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <div ref={ref} style={{ minHeight: 88 }}>
      {visible
        ? <InventoryItemCard item={item} onOpen={() => onOpen(item)} onEdit={() => onEdit(item)} onDelete={() => onDelete(item)} />
        : <div style={{ minHeight: 88, borderRadius: 'var(--radius-lg)', background: 'var(--color-bg-section)' }} />}
    </div>
  );
}

function DeleteConfirmDialog({ item, onCancel, onConfirm }) {
  const { Button } = window.SmartHouseholdFoodManagementDesignSystem_8f59ea;
  return (
    <div style={{ position: 'absolute', inset: 0, background: 'var(--color-overlay-scrim)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 40 }} onClick={onCancel}>
      <div onClick={(e) => e.stopPropagation()} style={{ width: '82%', background: 'var(--color-bg)', borderRadius: 'var(--radius-lg)', padding: 22, display: 'flex', flexDirection: 'column', gap: 16, animation: 'inv-dialog-in 180ms var(--ease-out-soft)' }}>
        <div style={{ font: 'var(--text-h3)', fontFamily: 'var(--font-display)' }}>Delete Product?</div>
        <div style={{ font: 'var(--text-body-sm)', color: 'var(--color-text-secondary)' }}>Are you sure you want to remove "{item.name}" from your inventory?</div>
        <div style={{ display: 'flex', gap: 10 }}>
          <Button variant="ghost" onClick={onCancel} style={{ flex: 1 }}>Cancel</Button>
          <Button variant="danger" onClick={onConfirm} style={{ flex: 1 }}>Delete</Button>
        </div>
      </div>
    </div>
  );
}

function Inventory({ inventory, onOpenFood, onDelete, goTab, onOpenAddFood, onEditProduct }) {
  const { BottomNav, FAB, Chip } = window.SmartHouseholdFoodManagementDesignSystem_8f59ea;
  const { useState } = React;
  const [filter, setFilter] = useState('all');
  const [query, setQuery] = useState('');
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [snackbar, setSnackbar] = useState(null);
  const filters = ['all', 'vegetables', 'fruits', 'milk', 'frozen'];
  const shown = inventory
    .filter((i) => filter === 'all' || i.category === filter)
    .filter((i) => i.name.toLowerCase().includes(query.toLowerCase()));

  function confirmDelete() {
    onDelete(deleteTarget.id);
    setDeleteTarget(null);
    setSnackbar('Product deleted successfully.');
    setTimeout(() => setSnackbar(null), 3000);
  }

  return (
    <div style={{ position: 'absolute', inset: 0, background: 'var(--color-bg)', display: 'flex', flexDirection: 'column' }}>
      <div style={{ padding: '28px 20px 8px' }}>
        <div style={{ font: 'var(--text-h1)', fontFamily: 'var(--font-display)', marginBottom: 16 }}>Inventory</div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, height: 48, padding: '0 16px', borderRadius: 'var(--radius-md)', background: 'var(--color-bg-section)', marginBottom: 12 }}>
          <span className="material-symbols-rounded" style={{ fontSize: 20, color: 'var(--color-text-tertiary)' }}>search</span>
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search inventory"
            style={{ border: 'none', outline: 'none', background: 'transparent', flex: 1, font: 'var(--text-body)', fontFamily: 'var(--font-body)', color: 'var(--color-text-primary)' }}
          />
          {query && (
            <button onClick={() => setQuery('')} style={{ border: 'none', background: 'transparent', display: 'flex' }}>
              <span className="material-symbols-rounded" style={{ fontSize: 18, color: 'var(--color-text-tertiary)' }}>close</span>
            </button>
          )}
        </div>
        <div className="fk-no-scrollbar" style={{ display: 'flex', gap: 8, overflowX: 'auto', overflowY: 'hidden', paddingBottom: 4 }}>
          {filters.map((f) => <Chip key={f} label={f === 'all' ? 'All' : f[0].toUpperCase() + f.slice(1)} selected={filter === f} onClick={() => setFilter(f)} tone="green" />)}
        </div>
      </div>
      <div className="fk-no-scrollbar" style={{ flex: 1, overflowY: 'auto', overflowX: 'hidden', padding: '12px 20px 100px', display: 'flex', flexDirection: 'column', gap: 10 }}>
        {shown.map((item) => (
          <LazyInventoryRow
            key={item.id}
            item={item}
            onOpen={onOpenFood}
            onEdit={onEditProduct}
            onDelete={setDeleteTarget}
          />
        ))}
        {shown.length === 0 && <div style={{ textAlign: 'center', color: 'var(--color-text-tertiary)', padding: 40 }}>Nothing here yet</div>}
      </div>
      <FAB icon="add" label="Add food" onClick={onOpenAddFood} />
      <BottomNav active="inventory" onChange={goTab} />

      {deleteTarget && (
        <DeleteConfirmDialog item={deleteTarget} onCancel={() => setDeleteTarget(null)} onConfirm={confirmDelete} />
      )}

      {snackbar && (
        <div style={{
          position: 'absolute', bottom: 96, left: 20, right: 20,
          background: 'var(--gray-900)', color: '#fff', padding: '14px 18px', borderRadius: 'var(--radius-md)',
          font: 'var(--text-label)', fontFamily: 'var(--font-body)', boxShadow: 'var(--shadow-lg)',
          animation: 'inv-snackbar-in 220ms var(--ease-out-soft)', zIndex: 35, display: 'flex', alignItems: 'center', gap: 8,
        }}>
          <span className="material-symbols-rounded" style={{ fontSize: 18, color: 'var(--green-300)' }}>check_circle</span>
          {snackbar}
        </div>
      )}

      <style>{`
        .fk-no-scrollbar { scrollbar-width: none; -ms-overflow-style: none; }
        .fk-no-scrollbar::-webkit-scrollbar { display: none; width: 0; height: 0; }
        @keyframes inv-dialog-in { from { opacity: 0; transform: scale(0.94); } to { opacity: 1; transform: scale(1); } }
        @keyframes inv-snackbar-in { from { opacity: 0; transform: translateY(12px); } to { opacity: 1; transform: translateY(0); } }
      `}</style>
    </div>
  );
}

window.Inventory = Inventory;
