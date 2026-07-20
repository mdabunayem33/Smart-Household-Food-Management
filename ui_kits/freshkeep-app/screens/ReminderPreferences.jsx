const REMINDER_DEFAULT_CATEGORIES = [
  { key: 'vegetables', label: 'Vegetables', icon: 'nutrition' },
  { key: 'fruits', label: 'Fruits', icon: 'eco' },
  { key: 'dairy', label: 'Dairy', icon: 'water_drop' },
  { key: 'meatFish', label: 'Meat & Fish', icon: 'set_meal' },
  { key: 'packaged', label: 'Packaged Foods', icon: 'inventory_2' },
  { key: 'frozen', label: 'Frozen Foods', icon: 'ac_unit' },
  { key: 'beverages', label: 'Beverages', icon: 'local_bar' },
];

const REMINDER_PRESETS = [
  { label: 'Today', days: 0 },
  { label: '1 Day Before', days: 1 },
  { label: '2 Days Before', days: 2 },
  { label: '3 Days Before', days: 3 },
  { label: '5 Days Before', days: 5 },
  { label: '7 Days Before', days: 7 },
  { label: '10 Days Before', days: 10 },
  { label: '14 Days Before', days: 14 },
  { label: '21 Days Before', days: 21 },
  { label: '30 Days Before', days: 30 },
];

const WHEEL_ITEM_H = 44;
const WHEEL_VISIBLE = 5; // odd number, centered

function WheelPicker({ items, index, onChange, height = WHEEL_ITEM_H * WHEEL_VISIBLE }) {
  const { useRef, useEffect } = React;
  const listRef = useRef(null);
  const scrollTimeout = useRef(null);
  const padCount = Math.floor(WHEEL_VISIBLE / 2);

  useEffect(() => {
    if (listRef.current) listRef.current.scrollTop = index * WHEEL_ITEM_H;
  }, []); // eslint-disable-line

  function handleScroll() {
    clearTimeout(scrollTimeout.current);
    scrollTimeout.current = setTimeout(() => {
      if (!listRef.current) return;
      const raw = listRef.current.scrollTop / WHEEL_ITEM_H;
      const snapped = Math.max(0, Math.min(items.length - 1, Math.round(raw)));
      listRef.current.scrollTo({ top: snapped * WHEEL_ITEM_H, behavior: 'smooth' });
      if (snapped !== index) onChange(snapped);
    }, 100);
  }

  return (
    <div style={{ position: 'relative', height }}>
      {/* Highlight pill sits BEHIND the scroll list (lower z-index) so centered text always stays visible on top of it. */}
      <div
        style={{
          position: 'absolute', top: '50%', left: 0, right: 0, height: WHEEL_ITEM_H,
          marginTop: -WHEEL_ITEM_H / 2, background: 'var(--color-primary-surface)',
          borderRadius: 'var(--radius-md)', pointerEvents: 'none', zIndex: 0,
        }}
      />
      <div
        ref={listRef}
        className="fk-no-scrollbar"
        onScroll={handleScroll}
        style={{
          position: 'relative', zIndex: 1,
          height: '100%', overflowY: 'scroll', scrollSnapType: 'y mandatory',
          WebkitOverflowScrolling: 'touch',
        }}
      >
        <div style={{ height: WHEEL_ITEM_H * padCount }} />
        {items.map((it, i) => {
          const dist = Math.abs(i - index);
          return (
            <div
              key={i}
              onClick={() => { onChange(i); if (listRef.current) listRef.current.scrollTo({ top: i * WHEEL_ITEM_H, behavior: 'smooth' }); }}
              style={{
                height: WHEEL_ITEM_H, display: 'flex', alignItems: 'center', justifyContent: 'center',
                scrollSnapAlign: 'center', cursor: 'pointer',
                font: dist === 0 ? 'var(--text-h3)' : 'var(--text-body)',
                fontFamily: dist === 0 ? 'var(--font-display)' : 'var(--font-body)',
                color: dist === 0 ? 'var(--color-primary-press)' : 'var(--color-text-tertiary)',
                opacity: Math.max(0.3, 1 - dist * 0.32),
                transition: 'color 150ms, opacity 150ms',
              }}
            >
              {it}
            </div>
          );
        })}
        <div style={{ height: WHEEL_ITEM_H * padCount }} />
      </div>
    </div>
  );
}

// Horizontal variant — used for the Custom Reminder "number of days" picker.
const HWHEEL_ITEM_W = 64;
const HWHEEL_VISIBLE = 5;

function HorizontalWheelPicker({ items, index, onChange, width = HWHEEL_ITEM_W * HWHEEL_VISIBLE }) {
  const { useRef, useEffect } = React;
  const listRef = useRef(null);
  const scrollTimeout = useRef(null);
  const padCount = Math.floor(HWHEEL_VISIBLE / 2);

  useEffect(() => {
    if (listRef.current) listRef.current.scrollLeft = index * HWHEEL_ITEM_W;
  }, []); // eslint-disable-line

  function handleScroll() {
    clearTimeout(scrollTimeout.current);
    scrollTimeout.current = setTimeout(() => {
      if (!listRef.current) return;
      const raw = listRef.current.scrollLeft / HWHEEL_ITEM_W;
      const snapped = Math.max(0, Math.min(items.length - 1, Math.round(raw)));
      listRef.current.scrollTo({ left: snapped * HWHEEL_ITEM_W, behavior: 'smooth' });
      if (snapped !== index) onChange(snapped);
    }, 100);
  }

  return (
    <div style={{ position: 'relative', width, maxWidth: '100%', height: 64, margin: '0 auto', overflow: 'hidden' }}>
      {/* Highlight pill sits BEHIND the scroll list (lower z-index) so centered text always stays visible on top of it. */}
      <div
        style={{
          position: 'absolute', left: '50%', top: 0, bottom: 0, width: HWHEEL_ITEM_W,
          marginLeft: -HWHEEL_ITEM_W / 2, background: 'var(--color-primary-surface)',
          borderRadius: 'var(--radius-md)', pointerEvents: 'none', zIndex: 0,
        }}
      />
      <div
        ref={listRef}
        className="fk-no-scrollbar"
        onScroll={handleScroll}
        style={{
          position: 'relative', zIndex: 1,
          width: '100%', display: 'flex', overflowX: 'scroll', scrollSnapType: 'x mandatory',
          WebkitOverflowScrolling: 'touch',
        }}
      >
        <div style={{ width: HWHEEL_ITEM_W * padCount, flexShrink: 0 }} />
        {items.map((it, i) => {
          const dist = Math.abs(i - index);
          return (
            <div
              key={i}
              onClick={() => { onChange(i); if (listRef.current) listRef.current.scrollTo({ left: i * HWHEEL_ITEM_W, behavior: 'smooth' }); }}
              style={{
                width: HWHEEL_ITEM_W, height: 64, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center',
                scrollSnapAlign: 'center', cursor: 'pointer',
                font: dist === 0 ? 'var(--text-h3)' : 'var(--text-body)',
                fontFamily: dist === 0 ? 'var(--font-display)' : 'var(--font-body)',
                color: dist === 0 ? 'var(--color-primary-press)' : 'var(--color-text-tertiary)',
                opacity: Math.max(0.3, 1 - dist * 0.32),
                transition: 'color 150ms, opacity 150ms',
              }}
            >
              {it}
            </div>
          );
        })}
        <div style={{ width: HWHEEL_ITEM_W * padCount, flexShrink: 0 }} />
      </div>
    </div>
  );
}

function reminderPreviewList(daysArray) {
  const sorted = [...new Set(daysArray)].sort((a, b) => b - a);
  return sorted;
}

function CustomReminderSheet({ onClose, onSave }) {
  const { useState } = React;
  const { Button } = window.SmartHouseholdFoodManagementDesignSystem_8f59ea;
  const numberItems = Array.from({ length: 99 }, (_, i) => i + 1);
  const [numIdx, setNumIdx] = useState(0); // index into numberItems, value = numIdx+1 (starts at 1)

  const num = numberItems[numIdx];

  return (
    <div style={{ position: 'absolute', inset: 0, background: 'var(--color-overlay-scrim)', display: 'flex', alignItems: 'flex-end', zIndex: 70 }} onClick={onClose}>
      <div onClick={(e) => e.stopPropagation()} style={{ width: '100%', background: 'var(--color-bg)', borderRadius: 'var(--radius-xl) var(--radius-xl) 0 0', padding: 24, display: 'flex', flexDirection: 'column', gap: 16, animation: 'sheet-up 220ms var(--ease-out-soft)' }}>
        <div style={{ width: 40, height: 4, borderRadius: 'var(--radius-pill)', background: 'var(--gray-200)', alignSelf: 'center' }} />
        <div style={{ font: 'var(--text-h3)', fontFamily: 'var(--font-display)', textAlign: 'center' }}>Custom Reminder</div>
        <div style={{ textAlign: 'center', font: 'var(--text-h2)', fontFamily: 'var(--font-display)', color: 'var(--color-primary-press)' }}>
          {num} Day{num === 1 ? '' : 's'} Before
        </div>
        <HorizontalWheelPicker items={numberItems} index={numIdx} onChange={setNumIdx} />
        <div style={{ display: 'flex', gap: 10 }}>
          <Button variant="ghost" onClick={onClose} style={{ flex: 1 }}>Cancel</Button>
          <Button variant="primary" onClick={() => onSave(num)} style={{ flex: 1 }}>Save Reminder</Button>
        </div>
      </div>
      <style>{`@keyframes sheet-up { from { transform: translateY(40px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }`}</style>
    </div>
  );
}

function ReminderToggleRow({ label, checked, onChange }) {
  const { Toggle } = window.SmartHouseholdFoodManagementDesignSystem_8f59ea;
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '8px 0' }}>
      <span style={{ font: 'var(--text-body)', color: 'var(--color-text-primary)' }}>{label}</span>
      <Toggle checked={checked} onChange={onChange} />
    </div>
  );
}

function ReminderCategoryCard({ category, daysArray, onChangeDays, settings, onChangeSettings, expanded, onToggleExpand }) {
  const { useState } = React;
  const [customSheetOpen, setCustomSheetOpen] = useState(false);
  const [wheelIdx, setWheelIdx] = useState(0);
  const [toast, setToast] = useState(null);
  const selected = daysArray && daysArray.length ? daysArray : [1, 3, 7];
  const sortedSelected = [...new Set(selected)].sort((a, b) => b - a);

  function addFromWheel() {
    const days = REMINDER_PRESETS[wheelIdx].days;
    if (!selected.includes(days)) onChangeDays([...selected, days]);
    setToast('Reminder updated successfully.');
    setTimeout(() => setToast(null), 2200);
  }
  function saveCustomReminder(days) {
    if (!selected.includes(days)) onChangeDays([...selected, days]);
    setCustomSheetOpen(false);
    setToast('Reminder updated successfully.');
    setTimeout(() => setToast(null), 2200);
  }
  function removeReminder(d) {
    const next = selected.filter((x) => x !== d);
    onChangeDays(next.length ? next : [d]);
  }
  function dayLabel(d) {
    if (d === 0) return 'Today';
    return `${d} Day${d === 1 ? '' : 's'}`;
  }

  return (
    <div style={{ background: 'var(--color-bg-elevated)', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-xs)', overflow: 'hidden', animation: 'cat-fade-in 260ms var(--ease-out-soft)', position: 'relative' }}>
      <button
        onClick={onToggleExpand}
        style={{ display: 'flex', alignItems: 'center', gap: 12, width: '100%', border: 'none', background: 'transparent', padding: 16, textAlign: 'left' }}
      >
        <div style={{ width: 40, height: 40, borderRadius: '50%', background: 'var(--color-primary-surface)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
          <span className="material-symbols-rounded" style={{ fontSize: 20, color: 'var(--color-primary-press)' }}>{category.icon}</span>
        </div>
        <span style={{ flex: 1, font: 'var(--text-h3)', fontFamily: 'var(--font-display)' }}>{category.label}</span>
        <span style={{ font: 'var(--text-label)', color: 'var(--color-primary-press)' }}>{sortedSelected.map((d) => dayLabel(d)).join(', ')}</span>
        <span className="material-symbols-rounded" style={{ fontSize: 20, color: 'var(--color-text-tertiary)', transform: expanded ? 'rotate(180deg)' : 'none', transition: 'transform 200ms var(--ease-out-soft)' }}>expand_more</span>
      </button>

      <div style={{
        maxHeight: expanded ? 900 : 0, opacity: expanded ? 1 : 0, overflow: 'hidden',
        transition: 'max-height 320ms var(--ease-out-soft), opacity 240ms var(--ease-out-soft)',
      }}>
        <div style={{ padding: '0 18px 18px', display: 'flex', flexDirection: 'column', gap: 14 }}>
          <div>
            <div style={{ font: 'var(--text-label)', color: 'var(--color-text-secondary)', marginBottom: 10 }}>Reminder Before</div>
            <WheelPicker items={REMINDER_PRESETS.map((p) => p.label)} index={wheelIdx} onChange={setWheelIdx} />
            <div style={{ display: 'flex', gap: 10, marginTop: 12 }}>
              <button
                onClick={addFromWheel}
                style={{ flex: 1, display: 'flex', alignItems: 'center', gap: 6, justifyContent: 'center', border: 'none', background: 'var(--color-primary)', color: '#fff', borderRadius: 'var(--radius-pill)', padding: '10px 16px', font: 'var(--text-label)' }}
              >
                <span className="material-symbols-rounded" style={{ fontSize: 18 }}>add</span> Add Reminder
              </button>
              <button
                onClick={() => setCustomSheetOpen(true)}
                style={{ flex: 1, display: 'flex', alignItems: 'center', gap: 6, justifyContent: 'center', border: '1.5px solid var(--color-border-strong)', background: 'transparent', color: 'var(--color-text-secondary)', borderRadius: 'var(--radius-pill)', padding: '10px 16px', font: 'var(--text-label)' }}
              >
                Add Custom Reminder
              </button>
            </div>
          </div>

          <div>
            <div style={{ font: 'var(--text-label)', color: 'var(--color-text-secondary)', marginBottom: 10 }}>Selected Reminders</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {sortedSelected.map((d) => (
                <span key={d} style={{ display: 'flex', alignItems: 'center', gap: 6, background: 'var(--color-primary-surface)', color: 'var(--color-primary-press)', borderRadius: 'var(--radius-pill)', padding: '6px 6px 6px 14px', font: 'var(--text-label)' }}>
                  {dayLabel(d)}
                  <button onClick={() => removeReminder(d)} style={{ width: 20, height: 20, borderRadius: '50%', border: 'none', background: 'rgba(0,0,0,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <span className="material-symbols-rounded" style={{ fontSize: 13 }}>close</span>
                  </button>
                </span>
              ))}
            </div>
          </div>

          <div style={{ font: 'var(--text-body-sm)', color: 'var(--color-text-secondary)' }}>
            <div style={{ fontWeight: 600, marginBottom: 4 }}>Notifications will be sent:</div>
            {sortedSelected.map((d) => (
              <div key={d}>• {dayLabel(d).toLowerCase()}{d === 0 ? '' : ' before expiry'}</div>
            ))}
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 2, borderTop: '1px solid var(--color-divider)', paddingTop: 8 }}>
            <ReminderToggleRow label="Enable Reminder" checked={settings.enabled} onChange={(v) => onChangeSettings({ ...settings, enabled: v })} />
            <ReminderToggleRow label="Push Notification" checked={settings.push} onChange={(v) => onChangeSettings({ ...settings, push: v })} />
            <ReminderToggleRow label="Sound" checked={settings.sound} onChange={(v) => onChangeSettings({ ...settings, sound: v })} />
            <ReminderToggleRow label="Vibration" checked={settings.vibration} onChange={(v) => onChangeSettings({ ...settings, vibration: v })} />
          </div>
        </div>
      </div>

      {customSheetOpen && (
        <CustomReminderSheet onClose={() => setCustomSheetOpen(false)} onSave={saveCustomReminder} />
      )}

      {toast && (
        <div style={{ position: 'absolute', left: 16, right: 16, bottom: 12, background: 'var(--gray-900)', color: '#fff', borderRadius: 'var(--radius-md)', padding: '10px 14px', font: 'var(--text-body-sm)', textAlign: 'center', boxShadow: 'var(--shadow-lg)', animation: 'sheet-up 180ms var(--ease-out-soft)', zIndex: 5 }}>
          {toast}
        </div>
      )}
    </div>
  );
}

function ReminderPreferences({ onBack, reminderPrefs, onChangeReminderPref, customCategories }) {
  const { useState } = React;
  const { TopBar } = window.SmartHouseholdFoodManagementDesignSystem_8f59ea;
  const [settingsMap, setSettingsMap] = useState({});
  const [expandedKey, setExpandedKey] = useState(null);

  const allCategories = [
    ...REMINDER_DEFAULT_CATEGORIES,
    ...(customCategories || []).map((c) => ({ key: c.key, label: c.label, icon: c.icon || 'category' })),
  ];

  function getDays(key) {
    return reminderPrefs[key] !== undefined ? reminderPrefs[key] : [1, 3, 7];
  }
  function getSettings(key) {
    return settingsMap[key] || { enabled: true, push: true, sound: true, vibration: false };
  }
  function setSettings(key, next) {
    setSettingsMap((prev) => ({ ...prev, [key]: next }));
  }

  return (
    <div style={{ position: 'absolute', inset: 0, background: 'var(--color-bg)', display: 'flex', flexDirection: 'column', animation: 'rp-in 220ms var(--ease-out-soft)' }}>
      <TopBar title="Reminder Preferences" onBack={onBack} />
      <div className="fk-no-scrollbar" style={{ flex: 1, overflowY: 'auto', padding: '4px 20px 32px' }}>
        <div style={{ font: 'var(--text-body-sm)', color: 'var(--color-text-secondary)', marginBottom: 16 }}>
          Every category — including your custom ones — gets its own reminder schedule.
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          {allCategories.map((c) => (
            <ReminderCategoryCard
              key={c.key}
              category={c}
              daysArray={getDays(c.key)}
              onChangeDays={(arr) => onChangeReminderPref(c.key, arr)}
              settings={getSettings(c.key)}
              onChangeSettings={(s) => setSettings(c.key, s)}
              expanded={expandedKey === c.key}
              onToggleExpand={() => setExpandedKey(expandedKey === c.key ? null : c.key)}
            />
          ))}
        </div>
      </div>

      <style>{`
        @keyframes rp-in { from { opacity: 0; transform: translateX(16px); } to { opacity: 1; transform: translateX(0); } }
        @keyframes cat-fade-in { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }
        .fk-no-scrollbar { scrollbar-width: none; -ms-overflow-style: none; }
        .fk-no-scrollbar::-webkit-scrollbar { display: none; width: 0; height: 0; }
      `}</style>
    </div>
  );
}

window.ReminderPreferences = ReminderPreferences;
window.reminderLabel = function (days) { return `${days} Days Before`; };
