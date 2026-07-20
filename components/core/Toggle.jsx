import React, { useState } from 'react';

export function Toggle({ checked: checkedProp, defaultChecked = false, onChange, label }) {
  const [uncontrolled, setUncontrolled] = useState(defaultChecked);
  const checked = checkedProp !== undefined ? checkedProp : uncontrolled;
  const toggle = () => {
    const next = !checked;
    if (checkedProp === undefined) setUncontrolled(next);
    onChange && onChange(next);
  };
  return (
    <label style={{ display: 'inline-flex', alignItems: 'center', gap: 12, cursor: 'pointer' }}>
      {label && <span style={{ font: 'var(--text-body)', color: 'var(--color-text-primary)' }}>{label}</span>}
      <span
        onClick={toggle}
        style={{
          width: 52,
          height: 32,
          borderRadius: 'var(--radius-pill)',
          background: checked ? 'var(--color-primary)' : 'var(--gray-300)',
          position: 'relative',
          transition: 'background var(--duration-base) var(--ease-standard)',
          flexShrink: 0,
        }}
      >
        <span
          style={{
            position: 'absolute',
            top: 3,
            left: checked ? 23 : 3,
            width: 26,
            height: 26,
            borderRadius: '50%',
            background: '#fff',
            boxShadow: 'var(--shadow-sm)',
            transition: 'left var(--duration-base) var(--ease-bounce)',
          }}
        />
      </span>
    </label>
  );
}
