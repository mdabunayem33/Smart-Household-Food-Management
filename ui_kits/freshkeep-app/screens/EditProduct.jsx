const EP_CATEGORIES = [
  { key: 'vegetables', label: 'Vegetables', icon: 'nutrition' },
  { key: 'fruits', label: 'Fruits', icon: 'eco' },
  { key: 'frozen', label: 'Frozen', icon: 'ac_unit' },
  { key: 'meat', label: 'Meat', icon: 'kebab_dining' },
  { key: 'fish', label: 'Fish', icon: 'set_meal' },
  { key: 'milk', label: 'Milk', icon: 'water_drop' },
  { key: 'snacks', label: 'Snacks', icon: 'cookie' },
  { key: 'drinks', label: 'Drinks', icon: 'local_bar' },
  { key: 'rice', label: 'Rice', icon: 'rice_bowl' },
  { key: 'spices', label: 'Spices', icon: 'spa' },
  { key: 'others', label: 'Others', icon: 'category' },
];

function EditProduct({ item, onCancel, onSave }) {
  const { useState } = React;
  const { Button, TopBar, Chip, TextField, FoodIllustration } = window.SmartHouseholdFoodManagementDesignSystem_8f59ea;
  const AdjustQuantityWheel = window.AdjustQuantityWheel;
  const aqFormat = window.aqFormat;
  const AQ_UNIT_STEP = window.AQ_UNIT_STEP;

  const parsedQty = (() => {
    const m = String(item.quantity || '1 Piece').match(/^(\d+(?:\.\d+)?)\s*(.*)$/);
    return m ? { num: parseFloat(m[1]), unit: m[2] || 'Piece' } : { num: 1, unit: 'Piece' };
  })();
  const unitAliasMap = { pcs: 'Piece', kg: 'Kg', g: 'Gram', L: 'Liter', ml: 'Gram', pack: 'Packet', pc: 'Piece', pieces: 'Piece' };
  const units = ['Kg', 'Gram', 'Piece', 'Bottle', 'Packet', 'Liter'];

  const [name, setName] = useState(item.name);
  const [category, setCategory] = useState(item.category || 'others');
  const [unit, setUnit] = useState(unitAliasMap[parsedQty.unit] || (AQ_UNIT_STEP[parsedQty.unit] ? parsedQty.unit : 'Piece'));
  const [qty, setQty] = useState(parsedQty.num);
  const initialDays = Math.max(0, Math.ceil((new Date(item.expiryDate || Date.now()) - new Date()) / 86400000));
  const [durationDays, setDurationDays] = useState(initialDays);

  const estimatedExpiry = (() => {
    const d = new Date();
    d.setDate(d.getDate() + durationDays);
    return d;
  })();

  function handleSave() {
    onSave({
      name: name.trim() || item.name,
      category,
      quantity: `${aqFormat(qty)} ${unit}`,
      expiryDate: estimatedExpiry.toISOString(),
    });
  }

  return (
    <div style={{ position: 'absolute', inset: 0, background: 'var(--color-bg)', zIndex: 30, display: 'flex', flexDirection: 'column', animation: 'ep-in 220ms var(--ease-out-soft)' }}>
      <TopBar title="Edit Product" onBack={onCancel} />
      <div className="fk-no-scrollbar" style={{ flex: 1, overflowY: 'auto', overflowX: 'hidden', padding: '8px 20px 20px', display: 'flex', flexDirection: 'column', gap: 26 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14, padding: 16, background: 'var(--color-bg-elevated)', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-xs)' }}>
          <div style={{ width: 48, height: 48, borderRadius: 'var(--radius-md)', background: 'var(--color-primary-surface)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: item.illustration ? 8 : 0, flexShrink: 0 }}>
            {item.illustration ? <FoodIllustration type={item.illustration} /> : <span className="material-symbols-rounded" style={{ fontSize: 24, color: 'var(--color-primary-press)' }}>{item.icon}</span>}
          </div>
          <TextField label="Product name" value={name} onChange={setName} style={{ flex: 1 }} />
        </div>

        <div>
          <div style={{ font: 'var(--text-label)', color: 'var(--color-text-secondary)', marginBottom: 10 }}>Category</div>
          <div className="fk-no-scrollbar" style={{ display: 'flex', gap: 10, overflowX: 'auto', paddingBottom: 4 }}>
            {EP_CATEGORIES.map((c) => (
              <Chip key={c.key} label={c.label} icon={c.icon} selected={category === c.key} onClick={() => setCategory(c.key)} tone="green" />
            ))}
          </div>
        </div>

        <div>
          <div style={{ font: 'var(--text-label)', color: 'var(--color-text-secondary)', marginBottom: 10 }}>Quantity</div>
          <div style={{ textAlign: 'center', font: 'var(--text-numeral)', fontFamily: 'var(--font-display)', color: 'var(--color-primary-press)', marginBottom: 10 }}>
            {aqFormat(qty)} {unit}
          </div>
          <AdjustQuantityWheel value={qty} onChange={setQty} step={AQ_UNIT_STEP[unit] || 1} />
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginTop: 12 }}>
            {units.map((u) => <Chip key={u} label={u} selected={unit === u} onClick={() => setUnit(u)} tone="green" />)}
          </div>
        </div>

        <div>
          <div style={{ font: 'var(--text-label)', color: 'var(--color-text-secondary)', marginBottom: 10 }}>Expiry Duration</div>
          <div style={{ textAlign: 'center', font: 'var(--text-numeral)', fontFamily: 'var(--font-display)', color: 'var(--color-primary-press)', marginBottom: 10 }}>
            {durationDays} Day{durationDays === 1 ? '' : 's'}
          </div>
          <AdjustQuantityWheel value={durationDays} onChange={setDurationDays} step={1} />
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 14, background: 'var(--color-bg-section)', borderRadius: 'var(--radius-md)', padding: '12px 16px' }}>
            <span style={{ font: 'var(--text-body-sm)', color: 'var(--color-text-secondary)' }}>Expiry date</span>
            <span style={{ font: 'var(--text-body-sm)', fontWeight: 700, color: 'var(--color-primary-press)' }}>
              {estimatedExpiry.toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' })}
            </span>
          </div>
        </div>
      </div>

      <div style={{ padding: 20, display: 'flex', gap: 10 }}>
        <Button variant="ghost" onClick={onCancel} style={{ flex: 1 }}>Cancel</Button>
        <Button variant="primary" onClick={handleSave} style={{ flex: 2 }}>Save Changes</Button>
      </div>

      <style>{`
        @keyframes ep-in { from { opacity: 0; transform: translateX(16px); } to { opacity: 1; transform: translateX(0); } }
        .fk-no-scrollbar { scrollbar-width: none; -ms-overflow-style: none; }
        .fk-no-scrollbar::-webkit-scrollbar { display: none; width: 0; height: 0; }
      `}</style>
    </div>
  );
}

window.EditProduct = EditProduct;
