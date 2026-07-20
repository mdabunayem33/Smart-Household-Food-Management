const FK_CATEGORIES = [
  { key: 'vegetables', label: 'Vegetables', icon: 'nutrition', tone: 'green' },
  { key: 'fruits', label: 'Fruits', icon: 'eco', tone: 'green' },
  { key: 'frozen', label: 'Frozen', icon: 'ac_unit', tone: 'blue' },
  { key: 'meat', label: 'Meat', icon: 'kebab_dining', tone: 'red' },
  { key: 'fish', label: 'Fish', icon: 'set_meal', tone: 'blue' },
  { key: 'milk', label: 'Milk', icon: 'water_drop', tone: 'blue' },
  { key: 'snacks', label: 'Snacks', icon: 'cookie', tone: 'orange' },
  { key: 'drinks', label: 'Drinks', icon: 'local_bar', tone: 'orange' },
  { key: 'rice', label: 'Rice', icon: 'rice_bowl', tone: 'orange' },
  { key: 'spices', label: 'Spices', icon: 'spa', tone: 'red' },
  { key: 'others', label: 'Others', icon: 'category', tone: 'green' },
];

const FK_PRODUCTS = {
  vegetables: [['Tomato', 7], ['Potato', 30], ['Onion', 30], ['Carrot', 21], ['Broccoli', 7], ['Cucumber', 10]],
  fruits: [['Apple', 21], ['Banana', 6], ['Orange', 14], ['Grapes', 7]],
  frozen: [['Frozen Chicken', 90], ['Frozen Peas', 180], ['Ice Cream', 120]],
  meat: [['Chicken Breast', 3], ['Ground Beef', 3], ['Bacon', 7]],
  fish: [['Salmon', 2], ['Shrimp', 2], ['Tuna', 3]],
  milk: [['Milk', 5], ['Yogurt', 14], ['Cheese', 21]],
  snacks: [['Chips', 60], ['Cookies', 45], ['Crackers', 90]],
  drinks: [['Orange Juice', 10], ['Soda', 180], ['Sparkling Water', 270]],
  rice: [['White Rice', 365], ['Basmati Rice', 365]],
  spices: [['Cumin', 730], ['Paprika', 730], ['Black Pepper', 730]],
  others: [['Bread', 5], ['Eggs', 21]],
};

const FK_DEFAULT_UNIT = {
  'Tomato': 'Kg', 'Potato': 'Kg', 'Onion': 'Kg', 'Carrot': 'Kg', 'Broccoli': 'Kg', 'Cucumber': 'Piece',
  'Apple': 'Piece', 'Banana': 'Piece', 'Orange': 'Piece', 'Grapes': 'Kg',
  'Frozen Chicken': 'Kg', 'Frozen Peas': 'Packet', 'Ice Cream': 'Packet',
  'Chicken Breast': 'Kg', 'Ground Beef': 'Kg', 'Bacon': 'Packet',
  'Salmon': 'Kg', 'Shrimp': 'Kg', 'Tuna': 'Kg',
  'Milk': 'Liter', 'Yogurt': 'Packet', 'Cheese': 'Packet',
  'Chips': 'Packet', 'Cookies': 'Packet', 'Crackers': 'Packet',
  'Orange Juice': 'Bottle', 'Soda': 'Bottle', 'Sparkling Water': 'Bottle',
  'White Rice': 'Kg', 'Basmati Rice': 'Kg',
  'Cumin': 'Packet', 'Paprika': 'Packet', 'Black Pepper': 'Packet',
  'Bread': 'Packet', 'Eggs': 'Piece',
};
function defaultUnitFor(name) { return FK_DEFAULT_UNIT[name] || 'Kg'; }

const UNIT_STEP = { Kg: 0.5, Gram: 50, Piece: 1, Bottle: 1, Packet: 1, Liter: 0.5 };
const UNIT_DEFAULT_QTY = { Kg: 1, Gram: 500, Piece: 1, Bottle: 1, Packet: 1, Liter: 1 };

const WHEEL_TICK_W = 56;
const WHEEL_FRICTION = 0.94; // velocity decay per ~16ms frame
const WHEEL_MIN_VELOCITY = 0.01; // index/ms below which momentum stops

function formatQtyValue(value) {
  return Number.isInteger(value) ? String(value) : value.toFixed(1).replace(/\.0$/, '');
}

function InfiniteQuantityWheel({ value, onChange, step, unit }) {
  const { useRef, useState, useEffect } = React;
  const trackRef = useRef(null);
  const [pos, setPos] = useState(value / step);
  const drag = useRef({ dragging: false, lastX: 0, lastT: 0, velocity: 0 });
  const rafRef = useRef(null);
  const lastHapticIdx = useRef(Math.round(value / step));
  const posRef = useRef(pos);
  posRef.current = pos;

  // Keep wheel in sync if parent value/step changes externally (e.g. unit switch)
  useEffect(() => {
    const target = value / step;
    if (Math.abs(target - posRef.current) > 0.01) setPos(target);
  }, [value, step]);

  function haptic() { try { navigator.vibrate && navigator.vibrate(3); } catch (e) {} }

  function maybeHaptic(p) {
    const idx = Math.round(p);
    if (idx !== lastHapticIdx.current) {
      lastHapticIdx.current = idx;
      haptic();
    }
  }

  function commit(p) {
    const clamped = Math.max(0, p);
    setPos(clamped);
    maybeHaptic(clamped);
    onChange(Math.round(clamped) * step);
  }

  function stopMomentum() {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    rafRef.current = null;
  }

  function snapTo(target) {
    const start = posRef.current;
    const startT = performance.now();
    const duration = 180;
    function tick(now) {
      const t = Math.min(1, (now - startT) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      const p = start + (target - start) * eased;
      commit(p);
      if (t < 1) rafRef.current = requestAnimationFrame(tick);
      else rafRef.current = null;
    }
    rafRef.current = requestAnimationFrame(tick);
  }

  function runMomentum() {
    let lastT = performance.now();
    function tick(now) {
      const dt = Math.min(48, now - lastT);
      lastT = now;
      drag.current.velocity *= Math.pow(WHEEL_FRICTION, dt / 16.67);
      const next = posRef.current + drag.current.velocity * dt;
      if (Math.abs(drag.current.velocity) < WHEEL_MIN_VELOCITY) {
        snapTo(Math.max(0, Math.round(next)));
        return;
      }
      commit(next);
      rafRef.current = requestAnimationFrame(tick);
    }
    rafRef.current = requestAnimationFrame(tick);
  }

  function onPointerDown(e) {
    stopMomentum();
    try { trackRef.current.setPointerCapture(e.pointerId); } catch (err) {}
    drag.current = { dragging: true, lastX: e.clientX, lastT: performance.now(), velocity: 0 };
  }
  function onPointerMove(e) {
    if (!drag.current.dragging) return;
    const now = performance.now();
    const dx = e.clientX - drag.current.lastX;
    const dt = Math.max(1, now - drag.current.lastT);
    const deltaIndex = -dx / WHEEL_TICK_W;
    drag.current.velocity = deltaIndex / dt;
    drag.current.lastX = e.clientX;
    drag.current.lastT = now;
    commit(posRef.current + deltaIndex);
  }
  function onPointerUp() {
    if (!drag.current.dragging) return;
    drag.current.dragging = false;
    if (Math.abs(drag.current.velocity) > WHEEL_MIN_VELOCITY) runMomentum();
    else snapTo(Math.round(posRef.current));
  }
  function onWheelEvent(e) {
    e.preventDefault();
    stopMomentum();
    const delta = (e.deltaX || e.deltaY);
    commit(posRef.current + delta / WHEEL_TICK_W);
    clearTimeout(onWheelEvent._t);
    onWheelEvent._t = setTimeout(() => snapTo(Math.round(posRef.current)), 140);
  }

  const centerIdx = Math.round(pos);
  const RANGE = 10;
  const ticks = [];
  for (let i = Math.max(0, centerIdx - RANGE); i <= centerIdx + RANGE; i++) ticks.push(i);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 20, width: '100%' }}>
      <div style={{ font: 'var(--text-numeral-lg)', fontFamily: 'var(--font-display)', fontSize: 44, color: 'var(--color-text-primary)', transition: 'opacity 100ms' }}>
        {formatQtyValue(value)} {unit}
      </div>
      <div
        ref={trackRef}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
        onWheel={onWheelEvent}
        style={{ position: 'relative', width: '100%', height: 90, overflow: 'hidden', touchAction: 'none', cursor: 'grab', borderRadius: 'var(--radius-lg)', background: 'var(--color-bg-section)' }}
      >
        <div style={{ position: 'absolute', left: '50%', top: 14, bottom: 14, width: WHEEL_TICK_W, marginLeft: -WHEEL_TICK_W / 2, background: 'var(--color-primary-surface)', borderRadius: 'var(--radius-md)' }} />
        <div style={{ position: 'absolute', top: 0, left: '50%', height: '100%', transform: `translateX(${-pos * WHEEL_TICK_W}px)` }}>
          {ticks.map((i) => {
            const isCenter = i === centerIdx;
            const dist = Math.abs(i - pos);
            return (
              <div
                key={i}
                style={{
                  position: 'absolute', left: i * WHEEL_TICK_W - WHEEL_TICK_W / 2, top: 0, width: WHEEL_TICK_W, height: '100%',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontFamily: 'var(--font-display)',
                  fontWeight: isCenter ? 700 : 500,
                  fontSize: isCenter ? 22 : 16,
                  color: isCenter ? 'var(--color-text-primary)' : 'var(--color-text-tertiary)',
                  opacity: Math.max(0.25, 1 - dist * 0.18),
                }}
              >
                {formatQtyValue(i * step)}
              </div>
            );
          })}
        </div>
        <div style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          background: 'linear-gradient(to right, var(--color-bg-section), transparent 20%, transparent 80%, var(--color-bg-section))',
        }} />
      </div>
      <div style={{ font: 'var(--text-caption)', color: 'var(--color-text-tertiary)' }}>Drag to scroll · flick for momentum</div>
    </div>
  );
}


function WheelWithLimit({ label, unitLabel, value, onChange, max, onExpandLimit, expandTo, capMax }) {
  const items = Array.from({ length: max + 1 }, (_, i) => i);
  const atCap = capMax !== undefined && max >= capMax;
  return (
    <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, animation: 'wheel-in 240ms var(--ease-out-soft)' }}>
      <div style={{ font: 'var(--text-label)', color: 'var(--color-text-secondary)' }}>{label}</div>
      <div style={{ position: 'relative', width: '100%' }}>
        <div style={{
          position: 'absolute', left: 4, right: 4, top: WHEEL_ITEM_H * 2, height: WHEEL_ITEM_H,
          background: 'var(--color-primary-surface)', borderRadius: 'var(--radius-md)', zIndex: -1,
        }} />
        <div style={{
          position: 'absolute', inset: 0, zIndex: 1, pointerEvents: 'none',
          background: 'linear-gradient(var(--color-bg-section), transparent 34%, transparent 66%, var(--color-bg-section))',
        }} />
        <WheelColumn items={items} index={value} onChange={onChange} />
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
        <span style={{ font: 'var(--text-caption)', color: 'var(--color-text-tertiary)' }}>Maximum: {max} {label}</span>
        {!atCap && (
          <button
            onClick={() => onExpandLimit(Math.min(capMax || Infinity, max + expandTo))}
            style={{ width: 26, height: 26, borderRadius: '50%', border: 'none', background: 'var(--color-primary-surface)', color: 'var(--color-primary-press)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}
          >
            <span className="material-symbols-rounded" style={{ fontSize: 15 }}>add</span>
          </button>
        )}
      </div>
    </div>
  );
}

function DateWheelSheet({ initialDate, onCancel, onConfirm }) {
  const { useState } = React;
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const days = Array.from({ length: 31 }, (_, i) => i + 1);
  const thisYear = new Date().getFullYear();
  const years = Array.from({ length: 11 }, (_, i) => thisYear + i);

  const [dayIdx, setDayIdx] = useState(initialDate.getDate() - 1);
  const [monthIdx, setMonthIdx] = useState(initialDate.getMonth());
  const [yearIdx, setYearIdx] = useState(Math.max(0, years.indexOf(initialDate.getFullYear())));

  function confirm() {
    onConfirm(new Date(years[yearIdx], monthIdx, days[dayIdx]));
  }

  return (
    <div style={{ position: 'absolute', inset: 0, background: 'var(--color-overlay-scrim)', display: 'flex', alignItems: 'flex-end', zIndex: 40 }} onClick={onCancel}>
      <div onClick={(e) => e.stopPropagation()} style={{ width: '100%', background: 'var(--color-bg)', borderRadius: 'var(--radius-xl) var(--radius-xl) 0 0', padding: '0 0 24px', display: 'flex', flexDirection: 'column', gap: 8, animation: 'sheet-up 220ms var(--ease-out-soft)' }}>
        <div style={{ width: 40, height: 4, borderRadius: 'var(--radius-pill)', background: 'var(--gray-200)', alignSelf: 'center', marginTop: 12 }} />
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 20px 4px' }}>
          <button onClick={onCancel} style={{ border: 'none', background: 'transparent', font: 'var(--text-label)', color: 'var(--color-text-secondary)', padding: 8 }}>Cancel</button>
          <span style={{ font: 'var(--text-h3)', fontFamily: 'var(--font-display)' }}>Exact Expiry Date</span>
          <button onClick={confirm} style={{ border: 'none', background: 'transparent', font: 'var(--text-label)', color: 'var(--color-primary-press)', fontWeight: 700, padding: 8 }}>Done</button>
        </div>
        <div style={{ position: 'relative', padding: '8px 20px 0' }}>
          <div style={{
            position: 'absolute', left: 20, right: 20, top: WHEEL_ITEM_H * 2 + 8, height: WHEEL_ITEM_H,
            background: 'var(--color-primary-surface)', borderRadius: 'var(--radius-md)', zIndex: -1,
          }} />
          <div style={{
            position: 'absolute', left: 20, right: 20, top: 8, height: WHEEL_ITEM_H * WHEEL_VISIBLE, zIndex: 1, pointerEvents: 'none',
            background: 'linear-gradient(var(--color-bg), transparent 30%, transparent 70%, var(--color-bg))',
          }} />
          <div style={{ display: 'flex' }}>
            <WheelColumn items={days} index={dayIdx} onChange={setDayIdx} />
            <WheelColumn items={months} index={monthIdx} onChange={setMonthIdx} />
            <WheelColumn items={years} index={yearIdx} onChange={setYearIdx} />
          </div>
        </div>
      </div>
    </div>
  );
}

function FullScreenCalendar({ initialDate, onCancel, onConfirm }) {
  const { useState } = React;
  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const [viewMonth, setViewMonth] = useState(initialDate.getMonth());
  const [viewYear, setViewYear] = useState(initialDate.getFullYear());
  const [selected, setSelected] = useState(initialDate);
  const years = Array.from({ length: 10 }, (_, i) => new Date().getFullYear() + i);

  function daysInGrid() {
    const first = new Date(viewYear, viewMonth, 1);
    const startOffset = first.getDay();
    const count = new Date(viewYear, viewMonth + 1, 0).getDate();
    const cells = [];
    for (let i = 0; i < startOffset; i++) cells.push(null);
    for (let d = 1; d <= count; d++) cells.push(d);
    return cells;
  }
  function shiftMonth(delta) {
    let m = viewMonth + delta, y = viewYear;
    if (m < 0) { m = 11; y -= 1; }
    if (m > 11) { m = 0; y += 1; }
    setViewMonth(m); setViewYear(y);
  }

  return (
    <div style={{ position: 'absolute', inset: 0, background: 'var(--color-bg)', zIndex: 40, display: 'flex', flexDirection: 'column', animation: 'sheet-up 260ms var(--ease-out-soft)' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '20px 16px 8px' }}>
        <button onClick={onCancel} style={{ border: 'none', background: 'transparent', font: 'var(--text-label)', color: 'var(--color-text-secondary)', padding: 10 }}>Cancel</button>
        <span style={{ font: 'var(--text-h3)', fontFamily: 'var(--font-display)' }}>Exact Expiry Date</span>
        <button onClick={() => onConfirm(selected)} style={{ border: 'none', background: 'transparent', font: 'var(--text-label)', color: 'var(--color-primary-press)', padding: 10, fontWeight: 700 }}>Done</button>
      </div>

      <div style={{ textAlign: 'center', padding: '8px 0 16px' }}>
        <div style={{ font: 'var(--text-display)', fontFamily: 'var(--font-display)', color: 'var(--color-primary-press)' }}>
          {selected.toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' })}
        </div>
      </div>

      <div style={{ flex: 1, overflowY: 'auto', padding: '0 20px 24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
          <button onClick={() => shiftMonth(-1)} style={{ width: 40, height: 40, borderRadius: '50%', border: 'none', background: 'var(--color-bg-section)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span className="material-symbols-rounded" style={{ fontSize: 20 }}>chevron_left</span>
          </button>
          <span style={{ font: 'var(--text-h3)', fontFamily: 'var(--font-display)' }}>{monthNames[viewMonth]} {viewYear}</span>
          <button onClick={() => shiftMonth(1)} style={{ width: 40, height: 40, borderRadius: '50%', border: 'none', background: 'var(--color-bg-section)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span className="material-symbols-rounded" style={{ fontSize: 20 }}>chevron_right</span>
          </button>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 6, marginBottom: 8 }}>
          {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((d, i) => (
            <div key={i} style={{ textAlign: 'center', font: 'var(--text-caption)', color: 'var(--color-text-tertiary)' }}>{d}</div>
          ))}
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 6, marginBottom: 20 }}>
          {daysInGrid().map((d, i) => {
            const isSelected = d && selected.getDate() === d && selected.getMonth() === viewMonth && selected.getFullYear() === viewYear;
            return (
              <button
                key={i}
                disabled={!d}
                onClick={() => setSelected(new Date(viewYear, viewMonth, d))}
                style={{
                  aspectRatio: '1/1', border: 'none', borderRadius: '50%',
                  background: isSelected ? 'var(--color-primary)' : 'transparent',
                  color: isSelected ? '#fff' : d ? 'var(--color-text-primary)' : 'transparent',
                  font: 'var(--text-body)', fontWeight: isSelected ? 700 : 500,
                }}
              >
                {d || ''}
              </button>
            );
          })}
        </div>

        <div style={{ font: 'var(--text-label)', color: 'var(--color-text-secondary)', marginBottom: 10 }}>Year</div>
        <div style={{ display: 'flex', gap: 8, overflowX: 'auto', paddingBottom: 4 }}>
          {years.map((y) => (
            <button
              key={y}
              onClick={() => setViewYear(y)}
              style={{ flexShrink: 0, border: 'none', padding: '8px 16px', borderRadius: 'var(--radius-pill)', background: y === viewYear ? 'var(--color-primary)' : 'var(--color-bg-section)', color: y === viewYear ? '#fff' : 'var(--color-text-secondary)', font: 'var(--text-label)' }}
            >
              {y}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

function DYSlider({ label, value, onChange, rangeMax, onExpand, step: expandStep, unitLabel, capMax }) {
  const { useRef, useState } = React;
  const trackRef = useRef(null);
  const [dragging, setDragging] = useState(false);
  const atCap = capMax !== undefined && rangeMax >= capMax;

  function setFromClientX(clientX) {
    const rect = trackRef.current.getBoundingClientRect();
    const ratio = Math.min(1, Math.max(0, (clientX - rect.left) / rect.width));
    onChange(Math.round(ratio * rangeMax));
  }
  const pct = rangeMax > 0 ? Math.min(100, (value / rangeMax) * 100) : 0;

  return (
    <div style={{ background: 'var(--color-bg-elevated)', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-xs)', padding: '18px 18px 20px', display: 'flex', flexDirection: 'column', gap: 14, animation: 'wheel-in 240ms var(--ease-out-soft)' }}>
      <div style={{ font: 'var(--text-h3)', fontFamily: 'var(--font-display)', color: 'var(--color-primary-press)', transition: 'all 150ms var(--ease-out-soft)' }}>
        {value} {label}
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <div
          ref={trackRef}
          onPointerDown={(e) => { e.currentTarget.setPointerCapture(e.pointerId); setDragging(true); setFromClientX(e.clientX); }}
          onPointerMove={(e) => { if (e.buttons === 1) setFromClientX(e.clientX); }}
          onPointerUp={() => setDragging(false)}
          style={{ position: 'relative', flex: 1, height: 40, display: 'flex', alignItems: 'center', cursor: 'pointer' }}
        >
          <div style={{ position: 'absolute', left: 0, right: 0, height: 8, borderRadius: 'var(--radius-pill)', background: 'var(--gray-200)' }} />
          <div style={{ position: 'absolute', left: 0, height: 8, borderRadius: 'var(--radius-pill)', background: 'var(--color-primary)', width: `${pct}%`, transition: dragging ? 'none' : 'width 260ms var(--ease-out-soft)' }} />
          <div style={{
            position: 'absolute', left: `${pct}%`, width: 26, height: 26, marginLeft: -13,
            borderRadius: '50%', background: '#fff', border: '3px solid var(--color-primary)',
            boxShadow: 'var(--shadow-md)', transition: dragging ? 'none' : 'left 260ms var(--ease-out-soft)',
          }} />
        </div>
        <div style={{ display: 'flex', gap: 8, flexShrink: 0, alignItems: 'flex-start' }}>
          <RangeExpandControls rangeMax={rangeMax} onExpand={onExpand} step={expandStep} capMax={capMax} floor={expandStep} unitLabel={label} />
        </div>
      </div>
    </div>
  );
}

function InfiniteDurationWheel({ value, onChange }) {
  const { useRef, useState, useEffect } = React;
  const trackRef = useRef(null);
  const [pos, setPos] = useState(value);
  const drag = useRef({ dragging: false, lastX: 0, lastT: 0, velocity: 0 });
  const rafRef = useRef(null);
  const lastHapticIdx = useRef(Math.round(value));
  const posRef = useRef(pos);
  posRef.current = pos;

  useEffect(() => {
    if (Math.abs(value - posRef.current) > 0.01) setPos(value);
  }, [value]);

  function haptic() { try { navigator.vibrate && navigator.vibrate(3); } catch (e) {} }
  function maybeHaptic(p) {
    const idx = Math.round(p);
    if (idx !== lastHapticIdx.current) { lastHapticIdx.current = idx; haptic(); }
  }
  function commit(p) {
    const clamped = Math.max(0, p);
    setPos(clamped);
    maybeHaptic(clamped);
    onChange(Math.round(clamped));
  }
  function stopMomentum() {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    rafRef.current = null;
  }
  function snapTo(target) {
    const start = posRef.current;
    const startT = performance.now();
    const duration = 180;
    function tick(now) {
      const t = Math.min(1, (now - startT) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      commit(start + (target - start) * eased);
      if (t < 1) rafRef.current = requestAnimationFrame(tick);
      else rafRef.current = null;
    }
    rafRef.current = requestAnimationFrame(tick);
  }
  function runMomentum() {
    let lastT = performance.now();
    function tick(now) {
      const dt = Math.min(48, now - lastT);
      lastT = now;
      drag.current.velocity *= Math.pow(WHEEL_FRICTION, dt / 16.67);
      const next = posRef.current + drag.current.velocity * dt;
      if (Math.abs(drag.current.velocity) < WHEEL_MIN_VELOCITY) { snapTo(Math.max(0, Math.round(next))); return; }
      commit(next);
      rafRef.current = requestAnimationFrame(tick);
    }
    rafRef.current = requestAnimationFrame(tick);
  }
  function onPointerDown(e) {
    stopMomentum();
    try { trackRef.current.setPointerCapture(e.pointerId); } catch (err) {}
    drag.current = { dragging: true, lastX: e.clientX, lastT: performance.now(), velocity: 0 };
  }
  function onPointerMove(e) {
    if (!drag.current.dragging) return;
    const now = performance.now();
    const dx = e.clientX - drag.current.lastX;
    const dt = Math.max(1, now - drag.current.lastT);
    const deltaIndex = -dx / WHEEL_TICK_W;
    drag.current.velocity = deltaIndex / dt;
    drag.current.lastX = e.clientX;
    drag.current.lastT = now;
    commit(posRef.current + deltaIndex);
  }
  function onPointerUp() {
    if (!drag.current.dragging) return;
    drag.current.dragging = false;
    if (Math.abs(drag.current.velocity) > WHEEL_MIN_VELOCITY) runMomentum();
    else snapTo(Math.round(posRef.current));
  }
  function onWheelEvent(e) {
    e.preventDefault();
    stopMomentum();
    const delta = (e.deltaX || e.deltaY);
    commit(posRef.current + delta / WHEEL_TICK_W);
    clearTimeout(onWheelEvent._t);
    onWheelEvent._t = setTimeout(() => snapTo(Math.round(posRef.current)), 140);
  }

  const centerIdx = Math.round(pos);
  const RANGE = 10;
  const ticks = [];
  for (let i = Math.max(0, centerIdx - RANGE); i <= centerIdx + RANGE; i++) ticks.push(i);

  return (
    <div
      ref={trackRef}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerUp}
      onWheel={onWheelEvent}
      style={{ position: 'relative', width: '100%', height: 90, overflow: 'hidden', touchAction: 'none', cursor: 'grab', borderRadius: 'var(--radius-lg)', background: 'var(--color-bg-section)' }}
    >
      <div style={{ position: 'absolute', left: '50%', top: 14, bottom: 14, width: WHEEL_TICK_W, marginLeft: -WHEEL_TICK_W / 2, background: 'var(--color-primary-surface)', borderRadius: 'var(--radius-md)' }} />
      <div style={{ position: 'absolute', top: 0, left: '50%', height: '100%', transform: `translateX(${-pos * WHEEL_TICK_W}px)` }}>
        {ticks.map((i) => {
          const isCenter = i === centerIdx;
          const dist = Math.abs(i - pos);
          return (
            <div
              key={i}
              style={{
                position: 'absolute', left: i * WHEEL_TICK_W - WHEEL_TICK_W / 2, top: 0, width: WHEEL_TICK_W, height: '100%',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontFamily: 'var(--font-display)',
                fontWeight: isCenter ? 700 : 500,
                fontSize: isCenter ? 22 : 16,
                color: isCenter ? 'var(--color-text-primary)' : 'var(--color-text-tertiary)',
                opacity: Math.max(0.25, 1 - dist * 0.18),
              }}
            >
              {i}
            </div>
          );
        })}
      </div>
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        background: 'linear-gradient(to right, var(--color-bg-section), transparent 20%, transparent 80%, var(--color-bg-section))',
      }} />
    </div>
  );
}

function QuantityStepper({ value, onChange }) {
  const { useRef } = React;
  const timerRef = useRef(null);
  const delayRef = useRef(null);

  function haptic() { try { navigator.vibrate && navigator.vibrate(8); } catch (e) {} }
  function step(delta) {
    haptic();
    onChange((v) => Math.max(1, v + delta));
  }
  function startRepeat(delta) {
    step(delta);
    delayRef.current = setTimeout(() => {
      timerRef.current = setInterval(() => step(delta), 110);
    }, 400);
  }
  function stopRepeat() {
    clearTimeout(delayRef.current);
    clearInterval(timerRef.current);
  }

  function StepButton({ icon, delta }) {
    const [pressed, setPressed] = React.useState(false);
    return (
      <button
        onPointerDown={() => { setPressed(true); startRepeat(delta); }}
        onPointerUp={() => { setPressed(false); stopRepeat(); }}
        onPointerLeave={() => { setPressed(false); stopRepeat(); }}
        style={{
          width: 64, height: 64, borderRadius: '50%', border: 'none',
          background: 'var(--color-primary-surface)', color: 'var(--color-primary-press)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          transform: pressed ? 'scale(0.9)' : 'scale(1)',
          transition: 'transform 120ms var(--ease-bounce)',
        }}
      >
        <span className="material-symbols-rounded" style={{ fontSize: 32 }}>{icon}</span>
      </button>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16 }}>
      <div style={{ font: 'var(--text-label)', color: 'var(--color-text-secondary)' }}>Quantity</div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 32 }}>
        <StepButton icon="remove" delta={-1} />
        <span style={{ font: 'var(--text-numeral-lg)', fontFamily: 'var(--font-display)', fontSize: 40, color: 'var(--color-text-primary)', minWidth: 56, textAlign: 'center' }}>{value}</span>
        <StepButton icon="add" delta={1} />
      </div>
    </div>
  );
}

const FK_DEFAULT_EXPIRY = {
  'Tomato': 7, 'Potato': 30, 'Onion': 30, 'Carrot': 21, 'Broccoli': 7, 'Cucumber': 10,
  'Apple': 21, 'Banana': 6, 'Orange': 14, 'Grapes': 7,
  'Frozen Chicken': 90, 'Frozen Peas': 180, 'Ice Cream': 120,
  'Chicken Breast': 3, 'Ground Beef': 3, 'Bacon': 7,
  'Salmon': 2, 'Shrimp': 2, 'Tuna': 3,
  'Milk': 5, 'Yogurt': 14, 'Cheese': 21,
  'Chips': 60, 'Cookies': 45, 'Crackers': 90, 'Biscuits': 180,
  'Orange Juice': 10, 'Soda': 180, 'Sparkling Water': 270, 'Juice': 180,
  'White Rice': 365, 'Basmati Rice': 365, 'Rice': 365,
  'Cumin': 730, 'Paprika': 730, 'Black Pepper': 730,
  'Bread': 4, 'Eggs': 21, 'Egg': 21, 'Chocolate': 365,
};

const FK_PACKAGED_PRODUCTS = new Set([
  'Milk', 'Yogurt', 'Butter', 'Cheese', 'Bread', 'Biscuits', 'Cookies', 'Chips', 'Chocolate',
  'Juice', 'Orange Juice', 'Soda', 'Sparkling Water', 'Soft Drink',
  'Frozen Chicken', 'Frozen Peas', 'Ice Cream', 'Bacon',
  'Sauce', 'Ketchup', 'Mayonnaise', 'Jam', 'Baby Food', 'Canned Food',
  'White Rice', 'Basmati Rice', 'Rice', 'Cumin', 'Paprika', 'Black Pepper', 'Crackers',
]);
function isPackagedProduct(name) { return FK_PACKAGED_PRODUCTS.has(name); }

const WHEEL_ITEM_H = 40;
const WHEEL_VISIBLE = 5;

function WheelColumn({ items, index, onChange }) {
  const { useRef, useEffect } = React;
  const ref = useRef(null);
  const scrollTimer = useRef(null);
  const padding = (WHEEL_ITEM_H * (WHEEL_VISIBLE - 1)) / 2;

  useEffect(() => {
    if (ref.current) ref.current.scrollTop = index * WHEEL_ITEM_H;
  }, []);

  function handleScroll() {
    clearTimeout(scrollTimer.current);
    scrollTimer.current = setTimeout(() => {
      if (!ref.current) return;
      const i = Math.round(ref.current.scrollTop / WHEEL_ITEM_H);
      const clamped = Math.max(0, Math.min(items.length - 1, i));
      ref.current.scrollTo({ top: clamped * WHEEL_ITEM_H, behavior: 'smooth' });
      onChange(clamped);
    }, 120);
  }

  return (
    <div
      ref={ref}
      onScroll={handleScroll}
      style={{
        height: WHEEL_ITEM_H * WHEEL_VISIBLE, overflowY: 'auto', scrollSnapType: 'y mandatory',
        padding: `${padding}px 0`, width: '100%',
      }}
    >
      {items.map((it, i) => (
        <div
          key={i}
          style={{
            height: WHEEL_ITEM_H, display: 'flex', alignItems: 'center', justifyContent: 'center',
            scrollSnapAlign: 'center',
            fontFamily: 'var(--font-display)',
            fontWeight: i === index ? 700 : 500,
            fontSize: i === index ? 20 : 16,
            color: i === index ? 'var(--color-text-primary)' : 'var(--color-text-tertiary)',
            transition: 'color 120ms, font-size 120ms',
          }}
        >
          {it}
        </div>
      ))}
    </div>
  );
}

function WheelDatePicker({ initialDate, onCancel, onConfirm }) {
  const { useState } = React;
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const days = Array.from({ length: 31 }, (_, i) => i + 1);
  const thisYear = initialDate.getFullYear();
  const years = Array.from({ length: 6 }, (_, i) => thisYear + i);

  const [dayIdx, setDayIdx] = useState(initialDate.getDate() - 1);
  const [monthIdx, setMonthIdx] = useState(initialDate.getMonth());
  const [yearIdx, setYearIdx] = useState(0);

  function confirm() {
    const d = new Date(years[yearIdx], monthIdx, days[dayIdx]);
    onConfirm(d);
  }

  return (
    <div style={{ position: 'absolute', inset: 0, background: 'var(--color-overlay-scrim)', display: 'flex', alignItems: 'flex-end', zIndex: 35 }} onClick={onCancel}>
      <div onClick={(e) => e.stopPropagation()} style={{ width: '100%', background: 'var(--color-bg)', borderRadius: 'var(--radius-xl) var(--radius-xl) 0 0', padding: 24, display: 'flex', flexDirection: 'column', gap: 16, animation: 'sheet-up 220ms var(--ease-out-soft)' }}>
        <div style={{ width: 40, height: 4, borderRadius: 'var(--radius-pill)', background: 'var(--gray-200)', alignSelf: 'center' }} />
        <div style={{ font: 'var(--text-h2)', fontFamily: 'var(--font-display)', textAlign: 'center' }}>Select expiry date</div>
        <div style={{ position: 'relative' }}>
          <div style={{
            position: 'absolute', left: 0, right: 0, top: WHEEL_ITEM_H * 2, height: WHEEL_ITEM_H,
            background: 'var(--color-primary-surface)', borderRadius: 'var(--radius-md)', zIndex: -1,
          }} />
          <div style={{ display: 'flex' }}>
            <WheelColumn items={days} index={dayIdx} onChange={setDayIdx} />
            <WheelColumn items={months} index={monthIdx} onChange={setMonthIdx} />
            <WheelColumn items={years} index={yearIdx} onChange={setYearIdx} />
          </div>
        </div>
        <div style={{ display: 'flex', gap: 10 }}>
          <Button2 variant="ghost" onClick={onCancel} style={{ flex: 1 }}>Cancel</Button2>
          <Button2 variant="primary" onClick={confirm} style={{ flex: 1 }}>Confirm</Button2>
        </div>
      </div>
    </div>
  );
}
function Button2(props) {
  const { Button } = window.SmartHouseholdFoodManagementDesignSystem_8f59ea;
  return <Button {...props} />;
}

function AddFood({ onFinish, onCancel, customCategories: customCategoriesProp, onCustomCategoriesChange }) {
  const { useState } = React;
  const { Button, IconButton, TopBar, Chip, Slider, SuccessCelebration, TextField } = window.SmartHouseholdFoodManagementDesignSystem_8f59ea;

  const FK_CATEGORY_ILLUSTRATION = {
    vegetables: 'vegetables', fruits: 'fruits', frozen: 'frozen', meat: 'meat', fish: 'fish',
    milk: 'milk', snacks: 'snacks', drinks: 'drinks', rice: 'rice', spices: 'spices', others: 'others',
  };

  const CUSTOM_ICON_CHOICES = ['category', 'star', 'bakery_dining', 'icecream', 'liquor', 'egg', 'grass', 'ramen_dining', 'cake', 'coffee'];
  const CUSTOM_COLOR_CHOICES = [
    { tone: 'green', swatch: 'var(--green-500)' },
    { tone: 'orange', swatch: 'var(--orange-500)' },
    { tone: 'red', swatch: 'var(--red-500)' },
    { tone: 'blue', swatch: 'var(--blue-500)' },
  ];

  const [step, setStep] = useState(1);
  const [category, setCategory] = useState(null);
  const [product, setProduct] = useState(null);
  const [customProductName, setCustomProductName] = useState('');
  const [manualStep2Name, setManualStep2Name] = useState('');
  const [qty, setQty] = useState(1);
  const [unit, setUnit] = useState('Kg');
  const [durationType, setDurationType] = useState('days');
  const [daysVal, setDaysVal] = useState(15);
  const [monthsVal, setMonthsVal] = useState(6);
  const [yearsVal, setYearsVal] = useState(4);
  const [expiryMode, setExpiryMode] = useState('duration');
  const [selectedDate, setSelectedDate] = useState(null);
  const [datePickerOpen, setDatePickerOpen] = useState(false);

  const [customCategories, setCustomCategories] = useState(() => customCategoriesProp || []);
  React.useEffect(() => {
    if (onCustomCategoriesChange) onCustomCategoriesChange(customCategories);
  }, [customCategories]);
  const [hiddenCategoryKeys, setHiddenCategoryKeys] = useState(() => new Set());
  const [hiddenProductNames, setHiddenProductNames] = useState({});
  function hideCategory(key) {
    setHiddenCategoryKeys((prev) => new Set([...prev, key]));
  }
  function hideProduct(categoryKey, name) {
    setHiddenProductNames((prev) => {
      const set = new Set(prev[categoryKey] || []);
      set.add(name);
      return { ...prev, [categoryKey]: set };
    });
  }
  const [sheetOpen, setSheetOpen] = useState(false);
  const [editingKey, setEditingKey] = useState(null);
  const [draftName, setDraftName] = useState('');
  const [draftIcon, setDraftIcon] = useState(CUSTOM_ICON_CHOICES[0]);
  const [draftTone, setDraftTone] = useState('green');
  const [toast, setToast] = useState(null);
  const [justAddedKey, setJustAddedKey] = useState(null);

  const units = ['Kg', 'Gram', 'Piece', 'Bottle', 'Packet', 'Liter'];

  const [customProducts, setCustomProducts] = useState(() => {
    try { return JSON.parse(localStorage.getItem('fk-custom-products') || '{}'); } catch (e) { return {}; }
  });
  React.useEffect(() => {
    try { localStorage.setItem('fk-custom-products', JSON.stringify(customProducts)); } catch (e) {}
  }, [customProducts]);
  const [productSheetOpen, setProductSheetOpen] = useState(false);
  const [editingProductName, setEditingProductName] = useState(null);
  const [productCelebration, setProductCelebration] = useState(false);
  const [draftProductName, setDraftProductName] = useState('');
  const [draftProductImageMode, setDraftProductImageMode] = useState('icon');
  const [draftProductUnit, setDraftProductUnit] = useState('Kg');
  const [draftProductExpiry, setDraftProductExpiry] = useState('');
  const [justAddedProduct, setJustAddedProduct] = useState(null);

  function detectCategory(name) {
    const norm = name.trim().toLowerCase();
    if (!norm) return null;
    for (const cat of FK_CATEGORIES) {
      if ((FK_PRODUCTS[cat.key] || []).some(([n]) => n.toLowerCase() === norm)) return cat;
    }
    for (const key of Object.keys(customProducts)) {
      if ((customProducts[key] || []).some((p) => p.name.toLowerCase() === norm)) {
        return FK_CATEGORIES.find((c) => c.key === key) || customCategories.find((c) => c.key === key) || null;
      }
    }
    return null;
  }

  function selectCategory(c) {
    setCategory(c);
    setCustomProductName('');
    setStep(2);
  }
  function selectProduct(name, defDays, forcedUnit) {
    if (!category) {
      const detected = detectCategory(name);
      if (detected) setCategory(detected);
    }
    const resolvedUnit = forcedUnit || defaultUnitFor(name);
    setProduct(name);
    setDurationType('days');
    setDaysVal(15);
    setMonthsVal(6);
    setYearsVal(4);
    setUnit(resolvedUnit);
    setQty(UNIT_DEFAULT_QTY[resolvedUnit] || 1);
    setExpiryMode('duration');
    setSelectedDate(null);
    setStep(3);
  }
  function skipCategory() {
    setCategory(null);
    setProduct(null);
    setStep(2);
  }
  function toggleDurationType(t) {
    setDurationType(t);
  }
  const durationVal = durationType === 'days' ? daysVal : durationType === 'months' ? monthsVal : yearsVal;
  function setDurationVal(v) {
    if (durationType === 'days') setDaysVal(v);
    else if (durationType === 'months') setMonthsVal(v);
    else setYearsVal(v);
  }
  const durationTypeLabel = durationType === 'days'
    ? (durationVal === 1 ? 'Day' : 'Days')
    : durationType === 'months'
      ? (durationVal === 1 ? 'Month' : 'Months')
      : (durationVal === 1 ? 'Year' : 'Years');
  function friendlyDurationText(type, val) {
    if (type === 'years') return `${val} Year${val === 1 ? '' : 's'}`;
    if (type === 'months') {
      const years = Math.floor(val / 12);
      const months = val % 12;
      const parts = [];
      if (years) parts.push(`${years} Year${years === 1 ? '' : 's'}`);
      if (months || parts.length === 0) parts.push(`${months} Month${months === 1 ? '' : 's'}`);
      return parts.join(' ');
    }
    const years = Math.floor(val / 365);
    const rem = val - years * 365;
    const months = Math.floor(rem / 30);
    const days = rem - months * 30;
    const parts = [];
    if (years) parts.push(`${years} Year${years === 1 ? '' : 's'}`);
    if (months) parts.push(`${months} Month${months === 1 ? '' : 's'}`);
    if (days || parts.length === 0) parts.push(`${days} Day${days === 1 ? '' : 's'}`);
    return parts.join(' ');
  }
  const friendlyDuration = friendlyDurationText(durationType, durationVal);
  function computeEstimatedDate(type, val) {
    const d = new Date();
    if (type === 'days') d.setDate(d.getDate() + val);
    else if (type === 'months') d.setMonth(d.getMonth() + val);
    else d.setFullYear(d.getFullYear() + val);
    return d;
  }
  const estimatedExpiryDate = computeEstimatedDate(durationType, durationVal);

  function openCreateProductSheet() {
    setEditingProductName(null);
    setDraftProductName('');
    setDraftProductImageMode('icon');
    setDraftProductUnit(category ? (category.units ? category.units[0] : 'Kg') : 'Kg');
    setDraftProductExpiry('');
    setProductSheetOpen(true);
  }
  function openEditProductSheet(p) {
    setEditingProductName(p.name);
    setDraftProductName(p.name);
    setDraftProductImageMode(p.imageMode || 'icon');
    setDraftProductUnit(p.unit);
    setDraftProductExpiry(p.expiryDays ? String(p.expiryDays) : '');
    setProductSheetOpen(true);
  }
  function saveCustomProduct() {
    const name = draftProductName.trim();
    if (!name || !category) return;
    const key = category.key;
    const entry = {
      name,
      unit: draftProductUnit,
      expiryDays: draftProductExpiry ? parseInt(draftProductExpiry, 10) : 14,
      imageMode: draftProductImageMode,
      custom: true,
    };
    setCustomProducts((prev) => {
      const list = prev[key] || [];
      const filtered = list.filter((p) => p.name !== editingProductName);
      return { ...prev, [key]: [...filtered, entry] };
    });
    setProductSheetOpen(false);
    if (!editingProductName) {
      setJustAddedProduct(name);
      setProductCelebration(true);
      setTimeout(() => setJustAddedProduct(null), 500);
    }
  }
  function deleteCustomProduct(name) {
    if (!category) return;
    setCustomProducts((prev) => ({ ...prev, [category.key]: (prev[category.key] || []).filter((p) => p.name !== name) }));
    setProductSheetOpen(false);
  }
  function openCreateSheet() {
    setEditingKey(null);
    setDraftName('');
    setDraftIcon(CUSTOM_ICON_CHOICES[0]);
    setDraftTone('green');
    setSheetOpen(true);
  }
  function openEditSheet(c) {
    setEditingKey(c.key);
    setDraftName(c.label);
    setDraftIcon(c.icon);
    setDraftTone(c.tone);
    setSheetOpen(true);
  }
  function saveCategory() {
    const name = draftName.trim();
    if (!name) return;
    if (editingKey) {
      setCustomCategories(customCategories.map((c) => (c.key === editingKey ? { ...c, label: name, icon: draftIcon, tone: draftTone } : c)));
      setToast('Category updated.');
    } else {
      const key = 'custom-' + Date.now();
      setCustomCategories([...customCategories, { key, label: name, icon: draftIcon, tone: draftTone, custom: true }]);
      setJustAddedKey(key);
      setToast('Custom category created successfully.');
      setTimeout(() => setJustAddedKey(null), 500);
    }
    setSheetOpen(false);
    setTimeout(() => setToast(null), 2200);
  }
  function deleteCategory(key) {
    setCustomCategories(customCategories.filter((c) => c.key !== key));
    setSheetOpen(false);
    setToast('Category deleted.');
    setTimeout(() => setToast(null), 2200);
  }

  const stepTitles = { 1: 'Choose a category', 2: 'Choose a product', 3: 'How much?', 4: 'Expiry date' };

  if (step === 5) {
    return (
      <div style={{ position: 'absolute', inset: 0, background: 'var(--color-bg)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <SuccessCelebration message="Food added!" sublabel={`We'll remind you before your ${product || 'item'} expires`} onDone={onFinish} />
      </div>
    );
  }

  return (
    <div style={{ position: 'absolute', inset: 0, background: 'var(--color-bg)', display: 'flex', flexDirection: 'column' }}>
      <TopBar
        title={stepTitles[step]}
        onBack={() => (step === 1 ? onCancel() : setStep(step - 1))}
        action={step === 1 ? (
          <button onClick={skipCategory} style={{ border: 'none', background: 'transparent', font: 'var(--text-label)', color: 'var(--color-text-tertiary)', padding: 8 }}>Skip</button>
        ) : undefined}
      />
      <div style={{ display: 'flex', gap: 6, padding: '0 20px 16px' }}>
        {[1, 2, 3, 4].map((n) => (
          <div key={n} style={{ flex: 1, height: 4, borderRadius: 'var(--radius-pill)', background: n <= step ? 'var(--color-primary)' : 'var(--gray-200)' }} />
        ))}
      </div>

      <div className="fk-no-scrollbar" style={{ flex: 1, overflowY: 'auto', padding: '4px 20px 20px' }}>
        {step === 1 && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 14 }}>
            {FK_CATEGORIES.filter((c) => !hiddenCategoryKeys.has(c.key)).map((c) => (
              <RemovableCard
                key={c.key}
                onSelect={() => selectCategory(c)}
                onRemove={() => hideCategory(c.key)}
                removeTitle="Remove Category?"
                removeMessage="Are you sure you want to remove this category?"
              >
                <FKCategoryCard label={c.label} icon={c.icon} illustration={FK_CATEGORY_ILLUSTRATION[c.key]} tone={c.tone} />
              </RemovableCard>
            ))}
            {customCategories.filter((c) => !hiddenCategoryKeys.has(c.key)).map((c) => (
              <RemovableCard
                key={c.key}
                onSelect={() => selectCategory(c)}
                onRemove={() => hideCategory(c.key)}
                popIn={justAddedKey === c.key}
                removeTitle="Remove Category?"
                removeMessage="Are you sure you want to remove this category?"
                secondaryAction={
                  <button
                    onClick={(e) => { e.stopPropagation(); openEditSheet(c); }}
                    style={{ width: 24, height: 24, borderRadius: '50%', border: 'none', background: 'rgba(255,255,255,0.92)', boxShadow: 'var(--shadow-xs)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                    aria-label="Edit category"
                  >
                    <span className="material-symbols-rounded" style={{ fontSize: 14, color: 'var(--color-text-secondary)' }}>edit</span>
                  </button>
                }
              >
                <FKCategoryCard label={c.label} icon={c.icon} tone={c.tone} />
              </RemovableCard>
            ))}
            <button onClick={openCreateSheet} style={{ cursor: 'pointer', border: 'none', background: 'transparent', padding: 0, width: '100%' }}>
              <div style={{
                display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 10,
                width: '100%', aspectRatio: '1 / 1', borderRadius: 'var(--radius-lg)',
                background: 'var(--color-bg-section)', border: '2px dashed var(--color-border-strong)',
              }}>
                <span className="material-symbols-rounded" style={{ fontSize: 32, color: 'var(--color-text-secondary)' }}>add</span>
                <span style={{ font: 'var(--text-h3)', fontFamily: 'var(--font-display)', fontSize: 14, color: 'var(--color-text-secondary)' }}>Custom Category</span>
              </div>
            </button>
          </div>
        )}

        {step === 2 && category && !category.custom && (
          <div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 14, marginBottom: 20 }}>
              {(FK_PRODUCTS[category.key] || []).filter(([name]) => !(hiddenProductNames[category.key] || new Set()).has(name)).map(([name, days]) => (
                <RemovableCard
                  key={name}
                  onSelect={() => selectProduct(name, days)}
                  onRemove={() => hideProduct(category.key, name)}
                  removeTitle="Remove Product?"
                  removeMessage="Are you sure you want to remove this product?"
                >
                  <FKCategoryCard label={name} icon={category.icon} illustration={window.fkIllustration ? window.fkIllustration(name) : category.key} tone={category.tone} />
                </RemovableCard>
              ))}
              {(customProducts[category.key] || []).filter((p) => !(hiddenProductNames[category.key] || new Set()).has(p.name)).map((p) => (
                <RemovableCard
                  key={p.name}
                  onSelect={() => selectProduct(p.name, p.expiryDays, p.unit)}
                  onRemove={() => hideProduct(category.key, p.name)}
                  popIn={justAddedProduct === p.name}
                  removeTitle="Remove Product?"
                  removeMessage="Are you sure you want to remove this product?"
                  secondaryAction={
                    <button
                      onClick={(e) => { e.stopPropagation(); openEditProductSheet(p); }}
                      style={{ width: 24, height: 24, borderRadius: '50%', border: 'none', background: 'rgba(255,255,255,0.92)', boxShadow: 'var(--shadow-xs)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                      aria-label="Edit product"
                    >
                      <span className="material-symbols-rounded" style={{ fontSize: 14, color: 'var(--color-text-secondary)' }}>edit</span>
                    </button>
                  }
                >
                  <FKCategoryCard label={p.name} icon={category.icon} illustration={window.fkIllustration ? window.fkIllustration(p.name) : category.key} tone={category.tone} />
                </RemovableCard>
              ))}
              <button onClick={openCreateProductSheet} style={{ cursor: 'pointer', border: 'none', background: 'transparent', padding: 0, width: '100%' }}>
                <div style={{
                  display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 10,
                  width: '100%', aspectRatio: '1 / 1', borderRadius: 'var(--radius-lg)',
                  background: 'var(--color-bg-section)', border: '2px dashed var(--color-border-strong)',
                }}>
                  <span className="material-symbols-rounded" style={{ fontSize: 32, color: 'var(--color-text-secondary)' }}>add</span>
                  <span style={{ font: 'var(--text-h3)', fontFamily: 'var(--font-display)', fontSize: 14, color: 'var(--color-text-secondary)', textAlign: 'center' }}>Add Custom Product</span>
                </div>
              </button>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: 12, color: 'var(--color-text-tertiary)', marginBottom: 16 }}>
              <div style={{ flex: 1, height: 1, background: 'var(--color-divider)' }} />
              <span style={{ font: 'var(--text-caption)' }}>OR</span>
              <div style={{ flex: 1, height: 1, background: 'var(--color-divider)' }} />
            </div>
            <div style={{ display: 'flex', gap: 10 }}>
              <TextField placeholder="Type a food name" value={manualStep2Name} onChange={setManualStep2Name} style={{ flex: 1 }} />
              <Button variant="secondary" disabled={!manualStep2Name.trim()} onClick={() => selectProduct(manualStep2Name.trim(), 14)}>Use</Button>
            </div>
          </div>
        )}

        {step === 2 && !category && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20, paddingTop: 12 }}>
            <div style={{ font: 'var(--text-body)', color: 'var(--color-text-secondary)' }}>No category chosen — just tell us what you got and we'll figure out the rest.</div>
            <TextField label="Food name" placeholder="e.g. Tomato, Milk, Hilsa…" value={manualStep2Name} onChange={setManualStep2Name} icon="restaurant" />
            <Button variant="primary" fullWidth disabled={!manualStep2Name.trim()} onClick={() => selectProduct(manualStep2Name.trim(), 14)}>Continue</Button>
            <button onClick={() => setStep(1)} style={{ border: 'none', background: 'transparent', color: 'var(--color-primary-press)', font: 'var(--text-label)', alignSelf: 'center' }}>
              Choose a category instead
            </button>
          </div>
        )}

        {step === 2 && category && category.custom && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20, paddingTop: 12 }}>
            <div style={{ font: 'var(--text-body)', color: 'var(--color-text-secondary)' }}>No preset products yet for "{category.label}" — name your item.</div>
            <TextField label="Item name" placeholder="e.g. Homemade pickle" value={customProductName} onChange={setCustomProductName} icon={category.icon} />
            <Button variant="primary" fullWidth disabled={!customProductName.trim()} onClick={() => selectProduct(customProductName.trim(), 7)}>Continue</Button>
          </div>
        )}

        {step === 3 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 32, paddingTop: 20 }}>
            {category && (
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
                <span style={{ font: 'var(--text-caption)', color: 'var(--color-text-tertiary)' }}>Category: {category.label}</span>
                <button onClick={() => setStep(1)} style={{ border: 'none', background: 'transparent', color: 'var(--color-primary-press)', font: 'var(--text-caption)' }}>Change</button>
              </div>
            )}
            <InfiniteQuantityWheel value={qty} onChange={setQty} step={UNIT_STEP[unit] || 1} unit={unit} />
            <div>
              <div style={{ font: 'var(--text-label)', color: 'var(--color-text-secondary)', marginBottom: 10 }}>Unit</div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
                {units.map((u) => <Chip key={u} label={u} selected={unit === u} onClick={() => setUnit(u)} tone="green" />)}
              </div>
            </div>
          </div>
        )}

        {step === 4 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 24, paddingTop: 4 }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ font: '500 17px var(--font-body)', color: '#666666' }}>Expires after</div>
              <div style={{ font: '700 40px var(--font-display)', color: '#1A1A1A', marginTop: 4, transition: 'all 150ms var(--ease-out-soft)' }}>
                {expiryMode === 'date'
                  ? (selectedDate && selectedDate.toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' }))
                  : friendlyDuration}
              </div>
            </div>

            {expiryMode === 'duration' && (
              <React.Fragment>
                <div>
                  <div style={{ font: 'var(--text-label)', color: 'var(--color-text-secondary)', marginBottom: 10, textAlign: 'center' }}>Expiry Duration Type</div>
                  <div style={{ display: 'flex', gap: 10, justifyContent: 'center' }}>
                    {[['days', 'Days'], ['months', 'Months'], ['years', 'Years']].map(([key, label]) => (
                      <Chip key={key} label={label} selected={durationType === key} onClick={() => toggleDurationType(key)} tone="green" />
                    ))}
                  </div>
                </div>

                <div style={{ textAlign: 'center' }}>
                  <div style={{ font: 'var(--text-numeral)', fontFamily: 'var(--font-display)', color: 'var(--color-primary-press)', marginBottom: 10 }}>
                    {durationVal} {durationTypeLabel}
                  </div>
                  <InfiniteDurationWheel key={durationType} value={durationVal} onChange={setDurationVal} />
                </div>

                <div style={{ background: 'var(--color-bg-section)', borderRadius: 'var(--radius-lg)', padding: 18, display: 'flex', flexDirection: 'column', gap: 8 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ font: 'var(--text-body-sm)', color: 'var(--color-text-secondary)' }}>Today's date</span>
                    <span style={{ font: 'var(--text-body-sm)', fontWeight: 600 }}>{new Date().toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ font: 'var(--text-body-sm)', color: 'var(--color-text-secondary)' }}>Selected duration</span>
                    <span style={{ font: 'var(--text-body-sm)', fontWeight: 600 }}>{durationVal} {durationTypeLabel}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ font: 'var(--text-body-sm)', color: 'var(--color-text-secondary)' }}>Estimated expiry date</span>
                    <span style={{ font: 'var(--text-body-sm)', fontWeight: 700, color: 'var(--color-primary-press)' }}>{estimatedExpiryDate.toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: 12, color: 'var(--color-text-tertiary)' }}>
                  <div style={{ flex: 1, height: 1, background: 'var(--color-divider)' }} />
                  <span style={{ font: 'var(--text-caption)' }}>OR</span>
                  <div style={{ flex: 1, height: 1, background: 'var(--color-divider)' }} />
                </div>

                <div style={{ background: 'var(--color-bg-elevated)', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-sm)', padding: 20, display: 'flex', flexDirection: 'column', gap: 12, alignItems: 'center', textAlign: 'center' }}>
                  <div style={{ font: 'var(--text-h3)', fontFamily: 'var(--font-display)' }}>Exact Expiry Date</div>
                  <div style={{ font: 'var(--text-body-sm)', color: 'var(--color-text-secondary)' }}>Choose the exact calendar date.</div>
                  <Button
                    variant="secondary"
                    fullWidth
                    icon={<span className="material-symbols-rounded" style={{ fontSize: 18 }}>calendar_month</span>}
                    onClick={() => setDatePickerOpen(true)}
                  >
                    {selectedDate ? selectedDate.toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' }) : 'Add Date'}
                  </Button>
                </div>
              </React.Fragment>
            )}

            {expiryMode === 'date' && (
              <div style={{ textAlign: 'center', background: 'var(--color-primary-surface)', borderRadius: 'var(--radius-lg)', padding: 24, display: 'flex', flexDirection: 'column', gap: 6 }}>
                <div style={{ font: 'var(--text-body-lg)', color: 'var(--color-text-primary)' }}>
                  Expires in {selectedDate ? Math.max(0, Math.ceil((selectedDate - new Date().setHours(0,0,0,0)) / 86400000)) : 0} days
                </div>
                <button onClick={() => setExpiryMode('duration')} style={{ border: 'none', background: 'transparent', color: 'var(--color-primary-press)', font: 'var(--text-label)', marginTop: 8 }}>Use duration instead</button>
              </div>
            )}
          </div>
        )}
      </div>

      {(step === 3 || step === 4) && (
        <div style={{ padding: 20 }}>
          <Button variant="primary" fullWidth onClick={() => (step === 4 ? setStep(5) : setStep(step + 1))}>
            {step === 4 ? 'Save' : 'Continue'}
          </Button>
        </div>
      )}

      {datePickerOpen && (
        <DateWheelSheet
          initialDate={selectedDate || new Date(Date.now() + daysVal * 86400000)}
          onCancel={() => setDatePickerOpen(false)}
          onConfirm={(d) => { setSelectedDate(d); setExpiryMode('date'); setDatePickerOpen(false); }}
        />
      )}

      {productCelebration && (
        <div style={{ position: 'absolute', inset: 0, background: 'var(--color-bg)', zIndex: 40, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <SuccessCelebration message="Custom product added successfully." onDone={() => setProductCelebration(false)} />
        </div>
      )}

      {productSheetOpen && (
        <div style={{ position: 'absolute', inset: 0, background: 'var(--color-overlay-scrim)', display: 'flex', alignItems: 'flex-end', zIndex: 30 }} onClick={() => setProductSheetOpen(false)}>
          <div onClick={(e) => e.stopPropagation()} style={{ width: '100%', maxHeight: '86%', overflowY: 'auto', background: 'var(--color-bg)', borderRadius: 'var(--radius-xl) var(--radius-xl) 0 0', padding: 24, display: 'flex', flexDirection: 'column', gap: 18, animation: 'sheet-up 220ms var(--ease-out-soft)' }}>
            <div style={{ width: 40, height: 4, borderRadius: 'var(--radius-pill)', background: 'var(--gray-200)', alignSelf: 'center' }} />
            <div style={{ font: 'var(--text-h2)', fontFamily: 'var(--font-display)' }}>{editingProductName ? 'Edit product' : 'Add New Product'}</div>
            <div style={{ font: 'var(--text-caption)', color: 'var(--color-text-tertiary)' }}>Category: {category?.label}</div>

            <TextField label="Product name" placeholder="e.g. Hilsa" value={draftProductName} onChange={setDraftProductName} />

            <div>
              <div style={{ font: 'var(--text-label)', color: 'var(--color-text-secondary)', marginBottom: 10 }}>Product image</div>
              <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                {[['icon', 'category', 'Default Icon'], ['camera', 'photo_camera', 'Take Photo'], ['gallery', 'photo_library', 'Gallery']].map(([mode, ic, label]) => (
                  <button
                    key={mode}
                    onClick={() => setDraftProductImageMode(mode)}
                    style={{
                      display: 'flex', alignItems: 'center', gap: 6, padding: '10px 14px', borderRadius: 'var(--radius-pill)',
                      border: 'none', background: draftProductImageMode === mode ? 'var(--color-primary-surface)' : 'var(--color-bg-section)',
                      color: draftProductImageMode === mode ? 'var(--color-primary-press)' : 'var(--color-text-secondary)',
                    }}
                  >
                    <span className="material-symbols-rounded" style={{ fontSize: 18 }}>{ic}</span>
                    <span style={{ font: 'var(--text-label)' }}>{label}</span>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <div style={{ font: 'var(--text-label)', color: 'var(--color-text-secondary)', marginBottom: 10 }}>Default unit</div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
                {units.map((u) => <Chip key={u} label={u} selected={draftProductUnit === u} onClick={() => setDraftProductUnit(u)} tone="green" />)}
              </div>
            </div>

            <TextField label="Default expiry duration (days, optional)" placeholder="e.g. 14" value={draftProductExpiry} onChange={setDraftProductExpiry} type="number" />

            <div style={{ display: 'flex', gap: 10 }}>
              <Button variant="ghost" onClick={() => setProductSheetOpen(false)} style={{ flex: 1 }}>Cancel</Button>
              <Button variant="primary" onClick={saveCustomProduct} disabled={!draftProductName.trim()} style={{ flex: 1 }}>Save</Button>
            </div>
            {editingProductName && (
              <Button variant="danger" fullWidth onClick={() => deleteCustomProduct(editingProductName)}>Delete product</Button>
            )}
          </div>
        </div>
      )}

      {sheetOpen && (
        <div style={{ position: 'absolute', inset: 0, background: 'var(--color-overlay-scrim)', display: 'flex', alignItems: 'flex-end', zIndex: 30 }} onClick={() => setSheetOpen(false)}>
          <div onClick={(e) => e.stopPropagation()} style={{ width: '100%', background: 'var(--color-bg)', borderRadius: 'var(--radius-xl) var(--radius-xl) 0 0', padding: 24, display: 'flex', flexDirection: 'column', gap: 20, animation: 'sheet-up 220ms var(--ease-out-soft)' }}>
            <div style={{ width: 40, height: 4, borderRadius: 'var(--radius-pill)', background: 'var(--gray-200)', alignSelf: 'center' }} />
            <div style={{ font: 'var(--text-h2)', fontFamily: 'var(--font-display)' }}>{editingKey ? 'Edit category' : 'Create custom category'}</div>

            <TextField label="Category name" placeholder="e.g. Baby Food" value={draftName} onChange={setDraftName} />

            <div>
              <div style={{ font: 'var(--text-label)', color: 'var(--color-text-secondary)', marginBottom: 10 }}>Icon</div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
                {CUSTOM_ICON_CHOICES.map((ic) => (
                  <button
                    key={ic}
                    onClick={() => setDraftIcon(ic)}
                    style={{
                      width: 44, height: 44, borderRadius: 'var(--radius-md)', border: draftIcon === ic ? '2px solid var(--color-primary)' : '2px solid transparent',
                      background: 'var(--color-bg-section)', display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }}
                  >
                    <span className="material-symbols-rounded" style={{ fontSize: 22, color: 'var(--color-text-primary)' }}>{ic}</span>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <div style={{ font: 'var(--text-label)', color: 'var(--color-text-secondary)', marginBottom: 10 }}>Color</div>
              <div style={{ display: 'flex', gap: 12 }}>
                {CUSTOM_COLOR_CHOICES.map((c) => (
                  <button
                    key={c.tone}
                    onClick={() => setDraftTone(c.tone)}
                    style={{
                      width: 40, height: 40, borderRadius: '50%', background: c.swatch, border: draftTone === c.tone ? '3px solid var(--color-text-primary)' : '3px solid transparent',
                    }}
                    aria-label={c.tone}
                  />
                ))}
              </div>
            </div>

            <div style={{ display: 'flex', gap: 10 }}>
              <Button variant="ghost" onClick={() => setSheetOpen(false)} style={{ flex: 1 }}>Cancel</Button>
              <Button variant="primary" onClick={saveCategory} disabled={!draftName.trim()} style={{ flex: 1 }}>{editingKey ? 'Save' : 'Create Category'}</Button>
            </div>
            {editingKey && (
              <Button variant="danger" fullWidth onClick={() => deleteCategory(editingKey)}>Delete category</Button>
            )}
          </div>
        </div>
      )}

      {toast && (
        <div style={{
          position: 'absolute', bottom: 24, left: '50%', transform: 'translateX(-50%)',
          background: 'var(--gray-900)', color: '#fff', padding: '12px 20px', borderRadius: 'var(--radius-pill)',
          font: 'var(--text-label)', fontFamily: 'var(--font-body)', boxShadow: 'var(--shadow-lg)',
          animation: 'toast-in 220ms var(--ease-out-soft)', zIndex: 40, whiteSpace: 'nowrap',
        }}>
          {toast}
        </div>
      )}

      <style>{`
        @keyframes cat-pop { from { transform: scale(0.7); opacity: 0; } to { transform: scale(1); opacity: 1; } }
        .fk-no-scrollbar { scrollbar-width: none; -ms-overflow-style: none; }
        .fk-no-scrollbar::-webkit-scrollbar { display: none; width: 0; height: 0; }
        @keyframes wheel-in { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes sheet-up { from { transform: translateY(40px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
        @keyframes toast-in { from { transform: translate(-50%, 12px); opacity: 0; } to { transform: translate(-50%, 0); opacity: 1; } }
      `}</style>
    </div>
  );
}

function FKCategoryCard({ label, icon, illustration, tone }) {
  const { CategoryCard } = window.SmartHouseholdFoodManagementDesignSystem_8f59ea;
  return <CategoryCard label={label} icon={icon} illustration={illustration} tone={tone} />;
}

function RemoveConfirmDialog({ title, message, onCancel, onConfirm }) {
  const dialog = (
    <div style={{ position: 'fixed', inset: 0, background: 'var(--color-overlay-scrim)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 999 }} onClick={onCancel}>
      <div onClick={(e) => e.stopPropagation()} style={{ width: '82%', maxWidth: 340, background: 'var(--color-bg)', borderRadius: 'var(--radius-lg)', padding: 22, display: 'flex', flexDirection: 'column', gap: 16, animation: 'rc-dialog-in 200ms var(--ease-out-soft)' }}>
        <div style={{ font: 'var(--text-h3)', fontFamily: 'var(--font-display)' }}>{title}</div>
        <div style={{ font: 'var(--text-body-sm)', color: 'var(--color-text-secondary)' }}>{message}</div>
        <div style={{ display: 'flex', gap: 10 }}>
          <button onClick={onCancel} style={{ flex: 1, border: 'none', background: 'var(--color-bg-section)', color: 'var(--color-text-primary)', borderRadius: 'var(--radius-pill)', padding: '12px', font: 'var(--text-label)' }}>Cancel</button>
          <button onClick={onConfirm} style={{ flex: 1, border: 'none', background: 'var(--color-accent-red)', color: '#fff', borderRadius: 'var(--radius-pill)', padding: '12px', font: 'var(--text-label)' }}>Remove</button>
        </div>
      </div>
      <style>{`@keyframes rc-dialog-in { from { opacity: 0; transform: scale(0.92); } to { opacity: 1; transform: scale(1); } }`}</style>
    </div>
  );
  // Portal to <body> so this overlay is never subject to an ancestor's CSS
  // transform (a transformed ancestor becomes the containing block for
  // position:fixed descendants, which would shrink/clip the dialog).
  return ReactDOM.createPortal(dialog, document.body);
}

function RemovableCard({ onSelect, onRemove, secondaryAction, children, popIn, removeTitle, removeMessage }) {
  const { useState } = React;
  const [removing, setRemoving] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  function requestRemove(e) {
    e.stopPropagation();
    setConfirmOpen(true);
  }
  function confirmRemove() {
    setConfirmOpen(false);
    setRemoving(true);
    setTimeout(onRemove, 180);
  }
  return (
    <div
      onClick={removing ? undefined : onSelect}
      style={{
        position: 'relative', cursor: 'pointer',
        ...(removing ? { transform: 'scale(0.85)' } : null),
        opacity: removing ? 0 : 1,
        transition: 'transform 180ms var(--ease-out-soft), opacity 180ms var(--ease-out-soft)',
        animation: popIn ? 'cat-pop 420ms var(--ease-bounce)' : 'none',
      }}
    >
      {children}
      <div style={{ position: 'absolute', top: 6, right: 6, display: 'flex', gap: 4, zIndex: 2 }}>
        {secondaryAction}
        <button
          onClick={requestRemove}
          aria-label="Remove"
          style={{ width: 24, height: 24, borderRadius: '50%', border: 'none', background: 'rgba(255,255,255,0.92)', boxShadow: 'var(--shadow-xs)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
        >
          <span className="material-symbols-rounded" style={{ fontSize: 14, color: 'var(--color-text-secondary)' }}>close</span>
        </button>
      </div>
      {confirmOpen && (
        <RemoveConfirmDialog
          title={removeTitle}
          message={removeMessage}
          onCancel={() => setConfirmOpen(false)}
          onConfirm={confirmRemove}
        />
      )}
    </div>
  );
}

window.AddFood = AddFood;

// ---- Shared master catalog (single source of truth for Add Food + Shopping) ----
window.FK_CATEGORIES = FK_CATEGORIES;
window.FK_PRODUCTS = FK_PRODUCTS;
window.FK_CATEGORY_ILLUSTRATION = {
  vegetables: 'vegetables', fruits: 'fruits', frozen: 'frozen', meat: 'meat', fish: 'fish',
  milk: 'milk', snacks: 'snacks', drinks: 'drinks', rice: 'rice', spices: 'spices', others: 'others',
};
// Returns { categories:[{key,label,icon,tone,custom?}], productsByCat:{key:[{name,unit,illustration}]} }
// merging built-in + custom categories/products so both modules render identical data.
window.fkGetCatalog = function (customCategories) {
  const categories = [...FK_CATEGORIES, ...(customCategories || [])];
  let customProducts = {};
  try { customProducts = JSON.parse(localStorage.getItem('fk-custom-products') || '{}'); } catch (e) {}
  const productsByCat = {};
  categories.forEach((c) => {
    const builtin = (FK_PRODUCTS[c.key] || []).map(([name, days]) => ({
      name, expiryDays: days,
      illustration: window.fkIllustration ? window.fkIllustration(name) : (window.FK_CATEGORY_ILLUSTRATION[c.key] || c.key),
      unit: 'Piece',
    }));
    const custom = (customProducts[c.key] || []).map((p) => ({
      name: p.name, expiryDays: p.expiryDays, unit: p.unit || 'Piece',
      illustration: p.illustration || (window.fkIllustration ? window.fkIllustration(p.name) : (window.FK_CATEGORY_ILLUSTRATION[c.key] || c.key)),
      custom: true,
    }));
    productsByCat[c.key] = [...builtin, ...custom];
  });
  return { categories, productsByCat };
};
