// ============================================================
// Shopping — Smart Shopping List module
// Single-page: first-time frequency setup → auto-generated list
// (from inventory) + manual add, purchase circle, edit qty, delete.
// ============================================================

const SHOP_FREQ_OPTIONS = [
  { key: 'weekly', label: 'Weekly', days: 7, emoji: '📅', desc: 'I usually shop once every week.' },
  { key: 'biweekly', label: 'Every 15 Days', days: 15, emoji: '🗓', desc: 'I usually shop every two weeks.' },
  { key: 'monthly', label: 'Monthly', days: 30, emoji: '📆', desc: 'I usually shop once every month.' },
];

function shopFreqDays(key) {
  return (SHOP_FREQ_OPTIONS.find((o) => o.key === key) || SHOP_FREQ_OPTIONS[0]).days;
}
function shopFreqLabel(key) {
  return (SHOP_FREQ_OPTIONS.find((o) => o.key === key) || SHOP_FREQ_OPTIONS[0]).label;
}

function shopFormatDate(d) {
  return d.toLocaleDateString('en-GB', { weekday: 'long', day: '2-digit', month: 'long', year: 'numeric' });
}
// Next shopping date = last shopping date + frequency days.
function shopNextDate(lastIso, freqKey) {
  const base = lastIso ? new Date(lastIso) : new Date();
  const next = new Date(base);
  next.setDate(next.getDate() + shopFreqDays(freqKey));
  next.setHours(0, 0, 0, 0);
  return next;
}

// Build the auto shopping list from inventory + schedule.
// Rules: low stock, out of stock (expired), or expiring before next shopping day.
function buildAutoShoppingList(inventory, freqKey) {
  const horizon = shopFreqDays(freqKey);
  return inventory
    .filter((i) => i.low || i.freshness === 'expired' || (typeof i.daysLeft === 'number' && i.daysLeft <= horizon))
    .map((i) => {
      let reason = 'Low stock';
      if (i.freshness === 'expired') reason = 'Out of stock';
      else if (typeof i.daysLeft === 'number' && i.daysLeft <= horizon && !i.low) reason = 'Expiring soon';
      return {
        key: `auto-${i.id}`,
        name: i.name,
        category: i.category,
        icon: i.icon,
        illustration: i.illustration,
        quantity: i.quantity,
        reason,
        source: 'auto',
      };
    });
}

// ---------- First-time frequency setup ----------
function ShoppingSetup({ onSave }) {
  const { useState } = React;
  const { Button } = window.SmartHouseholdFoodManagementDesignSystem_8f59ea;
  const [choice, setChoice] = useState(null);

  return (
    <div style={{ position: 'absolute', inset: 0, background: 'var(--color-bg)', display: 'flex', flexDirection: 'column', padding: '48px 24px 24px' }}>
      <div style={{ width: 72, height: 72, borderRadius: 'var(--radius-xl)', background: 'var(--color-primary-surface)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 24 }}>
        <span className="material-symbols-rounded" style={{ fontSize: 36, color: 'var(--color-primary-press)' }}>event_repeat</span>
      </div>
      <div style={{ font: 'var(--text-h1)', fontFamily: 'var(--font-display)', marginBottom: 10 }}>How often do you usually shop for groceries?</div>
      <div style={{ font: 'var(--text-body)', color: 'var(--color-text-secondary)', marginBottom: 32 }}>
        Choose your shopping schedule so we can automatically prepare your shopping list based on your inventory.
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, flex: 1 }}>
        {SHOP_FREQ_OPTIONS.map((opt) => {
          const active = choice === opt.key;
          return (
            <button
              key={opt.key}
              onClick={() => setChoice(opt.key)}
              style={{
                display: 'flex', alignItems: 'center', gap: 14,
                border: active ? '2px solid var(--color-primary)' : '2px solid var(--color-border)',
                background: active ? 'var(--color-primary-surface)' : 'var(--color-bg-elevated)',
                borderRadius: 'var(--radius-lg)', padding: '16px 18px', textAlign: 'left', minHeight: 72,
              }}
            >
              <span style={{ fontSize: 30, flexShrink: 0 }}>{opt.emoji}</span>
              <span style={{ flex: 1 }}>
                <span style={{ display: 'block', font: 'var(--text-h3)', fontFamily: 'var(--font-display)', fontSize: 16 }}>{opt.label}</span>
                <span style={{ display: 'block', font: 'var(--text-caption)', color: 'var(--color-text-secondary)' }}>{opt.desc}</span>
              </span>
              <span style={{ width: 24, height: 24, borderRadius: '50%', flexShrink: 0, border: active ? 'none' : '2px solid var(--color-border-strong)', background: active ? 'var(--color-primary)' : 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {active && <span className="material-symbols-rounded" style={{ fontSize: 16, color: '#fff' }}>check</span>}
              </span>
            </button>
          );
        })}
      </div>
      <Button variant="primary" fullWidth disabled={!choice} onClick={() => choice && onSave(choice)}>Continue</Button>
    </div>
  );
}

// ---------- Shopping item card ----------
function ShoppingItemCard({ item, purchased, onTogglePurchase, onEdit, onDelete }) {
  const { FoodIllustration } = window.SmartHouseholdFoodManagementDesignSystem_8f59ea;
  const { useState } = React;
  const [confirmOpen, setConfirmOpen] = useState(false);

  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 12, padding: 12,
      background: 'var(--color-bg-elevated)', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-xs)',
      opacity: purchased ? 0.55 : 1, transition: 'opacity 220ms var(--ease-out-soft)', position: 'relative',
    }}>
      {/* Purchase circle */}
      <button
        onClick={onTogglePurchase}
        aria-label={purchased ? 'Mark as not purchased' : 'Mark as purchased'}
        style={{
          width: 28, height: 28, borderRadius: '50%', flexShrink: 0,
          border: purchased ? 'none' : '2px solid var(--color-border-strong)',
          background: purchased ? 'var(--color-primary)' : 'transparent',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          transition: 'background 200ms var(--ease-out-soft)',
        }}
      >
        {purchased && <span className="material-symbols-rounded" style={{ fontSize: 18, color: '#fff' }}>check</span>}
      </button>

      <div style={{ width: 44, height: 44, borderRadius: 'var(--radius-md)', background: 'var(--color-primary-surface)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: item.illustration ? 6 : 0, flexShrink: 0 }}>
        {item.illustration ? <FoodIllustration type={item.illustration} /> : <span className="material-symbols-rounded" style={{ fontSize: 22, color: 'var(--color-primary-press)' }}>{item.icon}</span>}
      </div>

      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ font: 'var(--text-h3)', fontFamily: 'var(--font-display)', fontSize: 15, textDecoration: purchased ? 'line-through' : 'none', color: purchased ? 'var(--color-text-tertiary)' : 'var(--color-text-primary)' }}>{item.name}</div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, font: 'var(--text-caption)', color: 'var(--color-text-secondary)' }}>
          <span>{item.quantity}</span>
          {item.reason && !purchased && (
            <span style={{ padding: '1px 8px', borderRadius: 'var(--radius-pill)', background: 'var(--color-soon-surface)', color: 'var(--orange-700)', fontSize: 10, fontWeight: 700 }}>{item.reason}</span>
          )}
        </div>
      </div>

      <button onClick={onEdit} aria-label="Edit quantity" style={{ width: 36, height: 36, borderRadius: '50%', border: 'none', background: 'var(--color-bg-section)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
        <span className="material-symbols-rounded" style={{ fontSize: 18, color: 'var(--color-text-secondary)' }}>edit</span>
      </button>
      <button onClick={() => setConfirmOpen(true)} aria-label="Remove item" style={{ width: 36, height: 36, borderRadius: '50%', border: 'none', background: 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
        <span className="material-symbols-rounded" style={{ fontSize: 18, color: 'var(--color-text-tertiary)' }}>close</span>
      </button>

      {confirmOpen && ReactDOM.createPortal(
        <div style={{ position: 'fixed', inset: 0, background: 'var(--color-overlay-scrim)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 999 }} onClick={() => setConfirmOpen(false)}>
          <div onClick={(e) => e.stopPropagation()} style={{ width: '82%', maxWidth: 340, background: 'var(--color-bg)', borderRadius: 'var(--radius-lg)', padding: 22, display: 'flex', flexDirection: 'column', gap: 16, animation: 'rc-dialog-in 200ms var(--ease-out-soft)' }}>
            <div style={{ font: 'var(--text-h3)', fontFamily: 'var(--font-display)' }}>Remove item?</div>
            <div style={{ font: 'var(--text-body-sm)', color: 'var(--color-text-secondary)' }}>Are you sure you want to remove {item.name} from your shopping list?</div>
            <div style={{ display: 'flex', gap: 10 }}>
              <button onClick={() => setConfirmOpen(false)} style={{ flex: 1, border: 'none', background: 'var(--color-bg-section)', color: 'var(--color-text-primary)', borderRadius: 'var(--radius-pill)', padding: 12, font: 'var(--text-label)' }}>Cancel</button>
              <button onClick={() => { setConfirmOpen(false); onDelete(); }} style={{ flex: 1, border: 'none', background: 'var(--color-accent-red)', color: '#fff', borderRadius: 'var(--radius-pill)', padding: 12, font: 'var(--text-label)' }}>Remove</button>
            </div>
          </div>
          <style>{`@keyframes rc-dialog-in { from { opacity: 0; transform: scale(0.92); } to { opacity: 1; transform: scale(1); } }`}</style>
        </div>,
        document.body,
      )}
    </div>
  );
}

// ---------- Main Shopping screen ----------
function Shopping({ inventory, goTab, frequency, onChangeFrequency, onOpenManualAdd }) {
  const { useState, useMemo } = React;
  const { BottomNav } = window.SmartHouseholdFoodManagementDesignSystem_8f59ea;

  // Persisted per-item state: purchased set + qty overrides + removed set + manual items
  const [purchasedKeys, setPurchasedKeys] = useState(() => {
    try { return new Set(JSON.parse(localStorage.getItem('fk-shop-purchased') || '[]')); } catch (e) { return new Set(); }
  });
  const [removedKeys, setRemovedKeys] = useState(() => {
    try { return new Set(JSON.parse(localStorage.getItem('fk-shop-removed') || '[]')); } catch (e) { return new Set(); }
  });
  const [qtyOverrides, setQtyOverrides] = useState(() => {
    try { return JSON.parse(localStorage.getItem('fk-shop-qty') || '{}'); } catch (e) { return {}; }
  });
  const [manualItems, setManualItems] = useState(() => {
    try { return JSON.parse(localStorage.getItem('fk-shop-manual') || '[]'); } catch (e) { return []; }
  });
  const [editing, setEditing] = useState(null);
  const [freqSheetOpen, setFreqSheetOpen] = useState(false);
  const [lastShoppingDate, setLastShoppingDate] = useState(() => {
    try { return localStorage.getItem('fk-shop-last-date') || null; } catch (e) { return null; }
  });

  React.useEffect(() => { try { localStorage.setItem('fk-shop-purchased', JSON.stringify([...purchasedKeys])); } catch (e) {} }, [purchasedKeys]);
  React.useEffect(() => { try { localStorage.setItem('fk-shop-removed', JSON.stringify([...removedKeys])); } catch (e) {} }, [removedKeys]);
  React.useEffect(() => { try { localStorage.setItem('fk-shop-qty', JSON.stringify(qtyOverrides)); } catch (e) {} }, [qtyOverrides]);
  React.useEffect(() => { try { localStorage.setItem('fk-shop-manual', JSON.stringify(manualItems)); } catch (e) {} }, [manualItems]);
  React.useEffect(() => { try { if (lastShoppingDate) localStorage.setItem('fk-shop-last-date', lastShoppingDate); } catch (e) {} }, [lastShoppingDate]);

  // Expose a manual-add hook for App-level flow
  React.useEffect(() => {
    window.__fkShoppingAddManual = (entry) => {
      setManualItems((prev) => {
        if (prev.some((m) => m.name === entry.name) || inventory.some((i) => i.name === entry.name)) return prev;
        return [...prev, { ...entry, key: `manual-${Date.now()}`, source: 'manual' }];
      });
    };
    return () => { delete window.__fkShoppingAddManual; };
  }, [inventory]);

  const allItems = useMemo(() => {
    const auto = buildAutoShoppingList(inventory, frequency);
    const combined = [...auto, ...manualItems].filter((it) => !removedKeys.has(it.key));
    return combined.map((it) => ({ ...it, quantity: qtyOverrides[it.key] || it.quantity }));
  }, [inventory, frequency, manualItems, removedKeys, qtyOverrides]);

  const pending = allItems.filter((it) => !purchasedKeys.has(it.key));
  const purchased = allItems.filter((it) => purchasedKeys.has(it.key));
  const total = allItems.length;
  const purchasedCount = purchased.length;
  const progressPct = total ? (purchasedCount / total) * 100 : 0;

  function togglePurchase(key) {
    setPurchasedKeys((prev) => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key); else next.add(key);
      return next;
    });
  }
  function removeItem(key) { setRemovedKeys((prev) => new Set([...prev, key])); }
  function saveQty(key, quantity) { setQtyOverrides((prev) => ({ ...prev, [key]: quantity })); setEditing(null); }

  // Cycle completion: when every item in a non-empty list is purchased, record today
  // as the last shopping date and start a fresh cycle (clear purchased/removed/qty state).
  React.useEffect(() => {
    if (total > 0 && purchasedCount === total) {
      const today = new Date(); today.setHours(0, 0, 0, 0);
      const todayIso = today.toISOString();
      if (todayIso !== lastShoppingDate) {
        const t = setTimeout(() => {
          setLastShoppingDate(todayIso);
          setPurchasedKeys(new Set());
          setRemovedKeys(new Set());
          setQtyOverrides({});
          setManualItems([]);
        }, 900);
        return () => clearTimeout(t);
      }
    }
  }, [total, purchasedCount]); // eslint-disable-line

  const nextDate = shopNextDate(lastShoppingDate, frequency);

  return (
    <div style={{ position: 'absolute', inset: 0, background: 'var(--color-bg)', display: 'flex', flexDirection: 'column' }}>
      <div className="fk-no-scrollbar" style={{ flex: 1, overflowY: 'auto', padding: '28px 20px 100px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 10, marginBottom: 8 }}>
          <div style={{ font: 'var(--text-h1)', fontFamily: 'var(--font-display)', minWidth: 0, flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>Shopping list</div>
          <button onClick={() => setFreqSheetOpen(true)} style={{ display: 'flex', alignItems: 'center', gap: 4, flexShrink: 0, maxWidth: '48%', border: 'none', background: 'var(--color-bg-section)', borderRadius: 'var(--radius-pill)', padding: '8px 12px', color: 'var(--color-text-secondary)', font: 'var(--text-caption)' }}>
            <span className="material-symbols-rounded" style={{ fontSize: 16, flexShrink: 0 }}>event_repeat</span>
            <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{shopFreqLabel(frequency)}</span>
          </button>
          <button onClick={() => setFreqSheetOpen(true)} aria-label="Shopping settings" style={{ width: 40, height: 40, flexShrink: 0, borderRadius: '50%', border: 'none', background: 'var(--color-bg-section)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-text-secondary)' }}>
            <span className="material-symbols-rounded" style={{ fontSize: 20 }}>settings</span>
          </button>
        </div>

        {/* Next shopping schedule card */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 14, padding: 16, marginBottom: 20, background: 'var(--color-primary-surface)', borderRadius: 'var(--radius-lg)' }}>
          <div style={{ width: 44, height: 44, borderRadius: 'var(--radius-md)', background: 'var(--color-bg-elevated)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <span className="material-symbols-rounded" style={{ fontSize: 24, color: 'var(--color-primary-press)' }}>calendar_month</span>
          </div>
          <div>
            <div style={{ font: 'var(--text-overline)', letterSpacing: 'var(--tracking-overline)', textTransform: 'uppercase', color: 'var(--color-primary-press)', opacity: 0.8 }}>Next Shopping</div>
            <div style={{ font: 'var(--text-h3)', fontFamily: 'var(--font-display)', color: 'var(--color-text-primary)' }}>{shopFormatDate(nextDate)}</div>
            <div style={{ font: 'var(--text-caption)', color: 'var(--color-text-secondary)' }}>{shopFreqLabel(frequency)} schedule</div>
          </div>
        </div>

        {total === 0 ? (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12, padding: '64px 20px', textAlign: 'center' }}>
            <div style={{ fontSize: 56 }}>🎉</div>
            <div style={{ font: 'var(--text-h3)', fontFamily: 'var(--font-display)' }}>Everything is stocked.</div>
            <div style={{ font: 'var(--text-body)', color: 'var(--color-text-secondary)' }}>No shopping needed today.</div>
            <button onClick={onOpenManualAdd} style={{ marginTop: 8, border: 'none', background: 'var(--color-primary)', color: '#fff', borderRadius: 'var(--radius-pill)', padding: '12px 28px', font: 'var(--text-label)', fontFamily: 'var(--font-display)', boxShadow: 'var(--shadow-primary)' }}>Add item</button>
          </div>
        ) : (
          <React.Fragment>
            {/* Progress */}
            <div style={{ marginBottom: 20 }}>
              <div style={{ font: 'var(--text-overline)', letterSpacing: 'var(--tracking-overline)', textTransform: 'uppercase', color: 'var(--color-text-tertiary)', marginBottom: 4 }}>Shopping Progress</div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                <span style={{ font: 'var(--text-caption)', color: 'var(--color-text-secondary)' }}>{purchasedCount} of {total} purchased</span>
                <span style={{ font: 'var(--text-caption)', color: 'var(--color-primary-press)', fontWeight: 700 }}>{Math.round(progressPct)}%</span>
              </div>
              <div style={{ height: 6, borderRadius: 'var(--radius-pill)', background: 'var(--color-bg-section)', overflow: 'hidden' }}>
                <div style={{ height: '100%', width: `${progressPct}%`, background: 'var(--color-primary)', borderRadius: 'var(--radius-pill)', transition: 'width 320ms var(--ease-out-soft)' }} />
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
              <div style={{ font: 'var(--text-h2)', fontFamily: 'var(--font-display)' }}>To buy</div>
              <button onClick={onOpenManualAdd} style={{ display: 'flex', alignItems: 'center', gap: 4, border: 'none', background: 'transparent', color: 'var(--color-primary-press)', font: 'var(--text-label)' }}>
                <span className="material-symbols-rounded" style={{ fontSize: 18 }}>add</span> Add item
              </button>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {pending.map((it) => (
                <ShoppingItemCard key={it.key} item={it} purchased={false} onTogglePurchase={() => togglePurchase(it.key)} onEdit={() => setEditing(it)} onDelete={() => removeItem(it.key)} />
              ))}
              {pending.length === 0 && <div style={{ color: 'var(--color-text-tertiary)', padding: 16, textAlign: 'center', font: 'var(--text-body-sm)' }}>All items purchased 🎉</div>}
            </div>

            {purchased.length > 0 && (
              <React.Fragment>
                <div style={{ font: 'var(--text-h2)', fontFamily: 'var(--font-display)', margin: '24px 0 12px' }}>Purchased</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                  {purchased.map((it) => (
                    <ShoppingItemCard key={it.key} item={it} purchased onTogglePurchase={() => togglePurchase(it.key)} onEdit={() => setEditing(it)} onDelete={() => removeItem(it.key)} />
                  ))}
                </div>
              </React.Fragment>
            )}

            <div style={{ marginTop: 20, font: 'var(--text-caption)', color: 'var(--color-text-tertiary)', textAlign: 'center', opacity: 0.7 }}>
              Auto-prepared from your inventory · updates every {shopFreqLabel(frequency).toLowerCase()}
            </div>
          </React.Fragment>
        )}
      </div>

      {editing && (
        <div style={{ position: 'absolute', inset: 0, zIndex: 40 }}>
          <window.AdjustQuantity item={editing} onCancel={() => setEditing(null)} onSave={(quantity) => saveQty(editing.key, quantity)} />
        </div>
      )}

      {freqSheetOpen && (
        <div style={{ position: 'absolute', inset: 0, background: 'var(--color-overlay-scrim)', display: 'flex', alignItems: 'flex-end', zIndex: 60 }} onClick={() => setFreqSheetOpen(false)}>
          <div onClick={(e) => e.stopPropagation()} style={{ width: '100%', background: 'var(--color-bg)', borderRadius: 'var(--radius-xl) var(--radius-xl) 0 0', padding: 24, display: 'flex', flexDirection: 'column', gap: 12, animation: 'sheet-up 220ms var(--ease-out-soft)' }}>
            <div style={{ font: 'var(--text-h3)', fontFamily: 'var(--font-display)' }}>Shopping frequency</div>
            {SHOP_FREQ_OPTIONS.map((opt) => (
              <button key={opt.key} onClick={() => { onChangeFrequency(opt.key); setFreqSheetOpen(false); }} style={{ display: 'flex', alignItems: 'center', gap: 12, border: opt.key === frequency ? '2px solid var(--color-primary)' : '2px solid var(--color-border)', background: opt.key === frequency ? 'var(--color-primary-surface)' : 'var(--color-bg-elevated)', borderRadius: 'var(--radius-lg)', padding: '14px 16px', minHeight: 48 }}>
                <span style={{ font: 'var(--text-body-lg)' }}>{opt.label}</span>
              </button>
            ))}
          </div>
          <style>{`@keyframes sheet-up { from { transform: translateY(30px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }`}</style>
        </div>
      )}

      <BottomNav active="shopping" onChange={goTab} />
    </div>
  );
}

window.Shopping = Shopping;
window.ShoppingSetup = ShoppingSetup;

// Compute active (not purchased, not removed) shopping items — shared with Home's "To Buy" card.
window.fkGetActiveShoppingItems = function (inventory, frequency) {
  let purchased = new Set(), removed = new Set(), qty = {}, manual = [];
  try { purchased = new Set(JSON.parse(localStorage.getItem('fk-shop-purchased') || '[]')); } catch (e) {}
  try { removed = new Set(JSON.parse(localStorage.getItem('fk-shop-removed') || '[]')); } catch (e) {}
  try { qty = JSON.parse(localStorage.getItem('fk-shop-qty') || '{}'); } catch (e) {}
  try { manual = JSON.parse(localStorage.getItem('fk-shop-manual') || '[]'); } catch (e) {}
  const auto = buildAutoShoppingList(inventory, frequency || 'weekly');
  return [...auto, ...manual]
    .filter((it) => !removed.has(it.key) && !purchased.has(it.key))
    .map((it) => ({ ...it, quantity: qty[it.key] || it.quantity }));
};

// ---------- Manual Add (Category → Product from inventory → Quantity) ----------
const SHOP_CAT_META = {
  vegetables: { label: 'Vegetables', icon: 'nutrition', tone: 'green' },
  fruits: { label: 'Fruits', icon: 'eco', tone: 'green' },
  frozen: { label: 'Frozen', icon: 'ac_unit', tone: 'blue' },
  meat: { label: 'Meat', icon: 'kebab_dining', tone: 'red' },
  fish: { label: 'Fish', icon: 'set_meal', tone: 'blue' },
  milk: { label: 'Dairy', icon: 'water_drop', tone: 'blue' },
  snacks: { label: 'Snacks', icon: 'cookie', tone: 'orange' },
  drinks: { label: 'Drinks', icon: 'local_bar', tone: 'orange' },
  rice: { label: 'Rice', icon: 'rice_bowl', tone: 'orange' },
  spices: { label: 'Spices', icon: 'spa', tone: 'red' },
  others: { label: 'Others', icon: 'category', tone: 'green' },
};

function ManualAddShopping({ inventory, customCategories, onClose, onAdd }) {
  const { useState } = React;
  const { TopBar, CategoryCard } = window.SmartHouseholdFoodManagementDesignSystem_8f59ea;
  const [category, setCategory] = useState(null);
  const [product, setProduct] = useState(null);

  // Single shared master catalog (same data as Add Food): built-in + custom categories/products.
  const catalog = window.fkGetCatalog ? window.fkGetCatalog(customCategories) : { categories: [], productsByCat: {} };
  const categories = catalog.categories;
  const productsInCat = category ? (catalog.productsByCat[category.key] || []) : [];

  if (product) {
    const item = {
      name: product.name,
      category: category.key,
      icon: category.icon,
      illustration: product.illustration,
      quantity: `1 ${product.unit || 'Piece'}`,
    };
    return (
      <window.AdjustQuantity
        item={item}
        onCancel={() => setProduct(null)}
        onSave={(quantity) => { onAdd({ name: product.name, category: category.key, icon: category.icon, illustration: product.illustration, quantity }); onClose(); }}
      />
    );
  }

  return (
    <div style={{ position: 'absolute', inset: 0, background: 'var(--color-bg)', zIndex: 30, display: 'flex', flexDirection: 'column', animation: 'aq-in 220ms var(--ease-out-soft)' }}>
      <TopBar title={category ? 'Choose a product' : 'Choose a category'} onBack={() => (category ? setCategory(null) : onClose())} />
      <div className="fk-no-scrollbar" style={{ flex: 1, overflowY: 'auto', padding: '8px 20px 24px' }}>
        {!category && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 14 }}>
            {categories.map((c) => (
              <div key={c.key} onClick={() => setCategory(c)} style={{ cursor: 'pointer' }}>
                <CategoryCard label={c.label} icon={c.icon} illustration={(window.FK_CATEGORY_ILLUSTRATION || {})[c.key]} tone={c.tone} />
              </div>
            ))}
            {categories.length === 0 && <div style={{ gridColumn: '1 / -1', textAlign: 'center', color: 'var(--color-text-tertiary)', padding: 40 }}>No categories yet.</div>}
          </div>
        )}
        {category && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 14 }}>
            {productsInCat.map((p) => (
              <div key={p.name} onClick={() => setProduct(p)} style={{ cursor: 'pointer' }}>
                <CategoryCard label={p.name} icon={category.icon} illustration={p.illustration} tone={category.tone} />
              </div>
            ))}
            {productsInCat.length === 0 && <div style={{ gridColumn: '1 / -1', textAlign: 'center', color: 'var(--color-text-tertiary)', padding: 40 }}>No products in this category yet.</div>}
          </div>
        )}
      </div>
    </div>
  );
}

window.ManualAddShopping = ManualAddShopping;
