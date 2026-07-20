import React, { useRef, useState, useCallback } from 'react';

export function Slider({ value: valueProp, defaultValue = 1, min = 0, max = 10, step = 1, unit = '', onChange }) {
  const [uncontrolled, setUncontrolled] = useState(defaultValue);
  const value = valueProp !== undefined ? valueProp : uncontrolled;
  const trackRef = useRef(null);
  const pct = ((value - min) / (max - min)) * 100;

  const setFromClientX = useCallback((clientX) => {
    const rect = trackRef.current.getBoundingClientRect();
    const ratio = Math.min(1, Math.max(0, (clientX - rect.left) / rect.width));
    const raw = min + ratio * (max - min);
    const snapped = Math.round(raw / step) * step;
    if (valueProp === undefined) setUncontrolled(snapped);
    onChange && onChange(snapped);
  }, [min, max, step, onChange, valueProp]);

  return (
    <div style={{ width: '100%' }}>
      <div style={{ textAlign: 'center', font: 'var(--text-numeral)', fontFamily: 'var(--font-display)', color: 'var(--color-primary-press)', marginBottom: 20 }}>
        {value}{unit}
      </div>
      <div
        ref={trackRef}
        onPointerDown={(e) => { e.currentTarget.setPointerCapture(e.pointerId); setFromClientX(e.clientX); }}
        onPointerMove={(e) => { if (e.buttons === 1) setFromClientX(e.clientX); }}
        style={{
          position: 'relative',
          height: 56,
          borderRadius: 'var(--radius-pill)',
          background: 'var(--color-primary-surface)',
          cursor: 'pointer',
        }}
      >
        <div style={{ position: 'absolute', inset: 0, borderRadius: 'var(--radius-pill)', background: 'var(--color-primary)', width: `${pct}%`, transition: 'width var(--duration-fast) var(--ease-standard)' }} />
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: `${pct}%`,
            width: 40,
            height: 40,
            marginLeft: -20,
            marginTop: -20,
            borderRadius: '50%',
            background: '#fff',
            boxShadow: 'var(--shadow-md)',
          }}
        />
      </div>
    </div>
  );
}
