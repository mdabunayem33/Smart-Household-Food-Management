const AQ_UNIT_STEP = { Kg: 0.5, Gram: 50, Piece: 1, Bottle: 1, Packet: 1, Liter: 0.5 };
const AQ_TICK_W = 56;
const AQ_FRICTION = 0.94;
const AQ_MIN_VELOCITY = 0.01;

function aqFormat(v) { return Number.isInteger(v) ? String(v) : v.toFixed(1).replace(/\.0$/, ''); }

// Same infinite-wheel physics as the Add Food quantity picker (momentum, friction,
// snap-to-center, haptic tick feedback) — duplicated locally so this screen has no
// cross-file dependency on AddFood.jsx.
function AdjustQuantityWheel({ value, onChange, step }) {
  const { useRef, useState, useEffect } = React;
  const trackRef = useRef(null);
  const [pos, setPos] = useState(value / step);
  const drag = useRef({ dragging: false, lastX: 0, lastT: 0, velocity: 0 });
  const rafRef = useRef(null);
  const lastHapticIdx = useRef(Math.round(value / step));
  const posRef = useRef(pos);
  posRef.current = pos;

  useEffect(() => {
    const target = value / step;
    if (Math.abs(target - posRef.current) > 0.01) setPos(target);
  }, [value, step]);

  function haptic() { try { navigator.vibrate && navigator.vibrate(3); } catch (e) {} }
  function maybeHaptic(p) {
    const idx = Math.round(p);
    if (idx !== lastHapticIdx.current) { lastHapticIdx.current = idx; haptic(); }
  }
  function commit(p) {
    const clamped = Math.max(0, p);
    setPos(clamped);
    maybeHaptic(clamped);
    onChange(Math.round(clamped) * step);
  }
  function stopMomentum() { if (rafRef.current) cancelAnimationFrame(rafRef.current); rafRef.current = null; }
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
      drag.current.velocity *= Math.pow(AQ_FRICTION, dt / 16.67);
      const next = posRef.current + drag.current.velocity * dt;
      if (Math.abs(drag.current.velocity) < AQ_MIN_VELOCITY) { snapTo(Math.max(0, Math.round(next))); return; }
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
    const deltaIndex = -dx / AQ_TICK_W;
    drag.current.velocity = deltaIndex / dt;
    drag.current.lastX = e.clientX;
    drag.current.lastT = now;
    commit(posRef.current + deltaIndex);
  }
  function onPointerUp() {
    if (!drag.current.dragging) return;
    drag.current.dragging = false;
    if (Math.abs(drag.current.velocity) > AQ_MIN_VELOCITY) runMomentum();
    else snapTo(Math.round(posRef.current));
  }
  function onWheelEvent(e) {
    e.preventDefault();
    stopMomentum();
    const delta = (e.deltaX || e.deltaY);
    commit(posRef.current + delta / AQ_TICK_W);
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
      <div style={{ position: 'absolute', left: '50%', top: 14, bottom: 14, width: AQ_TICK_W, marginLeft: -AQ_TICK_W / 2, background: 'var(--color-primary-surface)', borderRadius: 'var(--radius-md)' }} />
      <div style={{ position: 'absolute', top: 0, left: '50%', height: '100%', transform: `translateX(${-pos * AQ_TICK_W}px)` }}>
        {ticks.map((i) => {
          const isCenter = i === centerIdx;
          const dist = Math.abs(i - pos);
          return (
            <div
              key={i}
              style={{
                position: 'absolute', left: i * AQ_TICK_W - AQ_TICK_W / 2, top: 0, width: AQ_TICK_W, height: '100%',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontFamily: 'var(--font-display)',
                fontWeight: isCenter ? 700 : 500,
                fontSize: isCenter ? 22 : 16,
                color: isCenter ? 'var(--color-text-primary)' : 'var(--color-text-tertiary)',
                opacity: Math.max(0.25, 1 - dist * 0.18),
              }}
            >
              {aqFormat(i * step)}
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

function AdjustQuantity({ item, onCancel, onSave }) {
  const { useState } = React;
  const { Button, TopBar, Chip, FoodIllustration } = window.SmartHouseholdFoodManagementDesignSystem_8f59ea;
  const parsed = (() => {
    const m = String(item.quantity || '1 Piece').match(/^(\d+(?:\.\d+)?)\s*(.*)$/);
    return m ? { num: parseFloat(m[1]), unit: m[2] || 'Piece' } : { num: 1, unit: 'Piece' };
  })();
  const unitAliasMap = { pcs: 'Piece', kg: 'Kg', g: 'Gram', L: 'Liter', ml: 'Gram', pack: 'Packet', pc: 'Piece', pieces: 'Piece' };
  const [unit, setUnit] = useState(unitAliasMap[parsed.unit] || (AQ_UNIT_STEP[parsed.unit] ? parsed.unit : 'Piece'));
  const [qty, setQty] = useState(parsed.num);
  const units = ['Kg', 'Gram', 'Piece', 'Bottle', 'Packet', 'Liter'];

  return (
    <div style={{ position: 'absolute', inset: 0, background: 'var(--color-bg)', zIndex: 30, display: 'flex', flexDirection: 'column', animation: 'aq-in 220ms var(--ease-out-soft)' }}>
      <TopBar title="Adjust Quantity" onBack={onCancel} />
      <div className="fk-no-scrollbar" style={{ flex: 1, overflowY: 'auto', padding: '8px 20px 20px', display: 'flex', flexDirection: 'column', gap: 24 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14, padding: 16, background: 'var(--color-bg-elevated)', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-xs)' }}>
          <div style={{ width: 48, height: 48, borderRadius: 'var(--radius-md)', background: 'var(--color-primary-surface)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: item.illustration ? 8 : 0, flexShrink: 0 }}>
            {item.illustration ? <FoodIllustration type={item.illustration} /> : <span className="material-symbols-rounded" style={{ fontSize: 24, color: 'var(--color-primary-press)' }}>{item.icon}</span>}
          </div>
          <div>
            <div style={{ font: 'var(--text-h3)', fontFamily: 'var(--font-display)' }}>{item.name}</div>
            <div style={{ font: 'var(--text-body-sm)', color: 'var(--color-text-secondary)' }}>Current quantity: {item.quantity}</div>
          </div>
        </div>

        <div style={{ textAlign: 'center', font: 'var(--text-numeral-lg)', fontFamily: 'var(--font-display)', fontSize: 40, color: 'var(--color-primary-press)' }}>
          {aqFormat(qty)} {unit}
        </div>
        <AdjustQuantityWheel value={qty} onChange={setQty} step={AQ_UNIT_STEP[unit] || 1} />

        <div>
          <div style={{ font: 'var(--text-label)', color: 'var(--color-text-secondary)', marginBottom: 10 }}>Unit</div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
            {units.map((u) => <Chip key={u} label={u} selected={unit === u} onClick={() => setUnit(u)} tone="green" />)}
          </div>
        </div>
      </div>
      <div style={{ padding: 20, display: 'flex', gap: 10 }}>
        <Button variant="ghost" onClick={onCancel} style={{ flex: 1 }}>Cancel</Button>
        <Button variant="primary" onClick={() => onSave(`${aqFormat(qty)} ${unit}`)} style={{ flex: 2 }}>Save</Button>
      </div>
      <style>{`
        @keyframes aq-in { from { opacity: 0; transform: translateX(16px); } to { opacity: 1; transform: translateX(0); } }
        .fk-no-scrollbar { scrollbar-width: none; -ms-overflow-style: none; }
        .fk-no-scrollbar::-webkit-scrollbar { display: none; width: 0; height: 0; }
      `}</style>
    </div>
  );
}

window.AdjustQuantity = AdjustQuantity;
window.AdjustQuantityWheel = AdjustQuantityWheel;
window.aqFormat = aqFormat;
window.AQ_UNIT_STEP = AQ_UNIT_STEP;
