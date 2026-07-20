import React, { useEffect, useState } from 'react';

export function SuccessCelebration({ message = 'Nice!', sublabel, onDone }) {
  const [particles] = useState(() => Array.from({ length: 14 }, (_, i) => ({
    id: i,
    angle: (i / 14) * Math.PI * 2,
    dist: 70 + Math.random() * 40,
    color: ['var(--green-500)', 'var(--orange-500)', 'var(--blue-500)'][i % 3],
    delay: Math.random() * 120,
  })));

  useEffect(() => {
    if (!onDone) return;
    const t = setTimeout(onDone, 1600);
    return () => clearTimeout(t);
  }, [onDone]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 24, padding: 40 }}>
      <div style={{ position: 'relative', width: 140, height: 140 }}>
        {particles.map((p) => (
          <span
            key={p.id}
            style={{
              position: 'absolute',
              top: '50%', left: '50%',
              width: 8, height: 8, borderRadius: '50%',
              background: p.color,
              transform: `translate(-50%, -50%) translate(${Math.cos(p.angle) * p.dist}px, ${Math.sin(p.angle) * p.dist}px)`,
              opacity: 0,
              animation: `fk-burst var(--duration-celebration) var(--ease-out-soft) ${p.delay}ms forwards`,
            }}
          />
        ))}
        <div
          style={{
            position: 'absolute', inset: 0, borderRadius: '50%',
            background: 'var(--color-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: 'var(--shadow-primary)',
            animation: 'fk-pop var(--duration-slow) var(--ease-bounce) forwards',
          }}
        >
          <span className="material-symbols-rounded" style={{ fontSize: 56, color: '#fff' }}>check</span>
        </div>
      </div>
      <div style={{ textAlign: 'center' }}>
        <div style={{ font: 'var(--text-display)', fontFamily: 'var(--font-display)', color: 'var(--color-text-primary)' }}>{message}</div>
        {sublabel && <div style={{ font: 'var(--text-body)', color: 'var(--color-text-secondary)', marginTop: 8 }}>{sublabel}</div>}
      </div>
      <style>{`
        @keyframes fk-pop { 0% { transform: scale(0.4); opacity: 0; } 60% { transform: scale(1.08); opacity: 1; } 100% { transform: scale(1); opacity: 1; } }
        @keyframes fk-burst { 0% { opacity: 1; transform: translate(-50%,-50%) translate(0,0); } 100% { opacity: 0; } }
      `}</style>
    </div>
  );
}
