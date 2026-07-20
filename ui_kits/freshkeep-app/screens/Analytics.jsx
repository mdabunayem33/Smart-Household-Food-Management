const FILTERS = ['This Month', 'Last Month', 'Last 3 Months', 'Last 6 Months', 'This Year'];

const DASHBOARD_DATA = {
  'This Month': [
    { key: 'fresh', label: 'Fresh Food', icon: 'nutrition', color: 'var(--color-primary)', pct: 45 },
    { key: 'frozen', label: 'Frozen Food', icon: 'ac_unit', color: 'var(--blue-500)', pct: 20 },
    { key: 'pantry', label: 'Pantry Items', icon: 'inventory_2', color: 'var(--orange-500)', pct: 15 },
    { key: 'expiring', label: 'Expiring Soon', icon: 'schedule', color: '#FFD54F', pct: 10 },
    { key: 'wasted', label: 'Wasted', icon: 'delete', color: 'var(--red-500)', pct: 10 },
  ],
  'Last Month': [
    { key: 'fresh', label: 'Fresh Food', icon: 'nutrition', color: 'var(--color-primary)', pct: 40 },
    { key: 'frozen', label: 'Frozen Food', icon: 'ac_unit', color: 'var(--blue-500)', pct: 22 },
    { key: 'pantry', label: 'Pantry Items', icon: 'inventory_2', color: 'var(--orange-500)', pct: 16 },
    { key: 'expiring', label: 'Expiring Soon', icon: 'schedule', color: '#FFD54F', pct: 9 },
    { key: 'wasted', label: 'Wasted', icon: 'delete', color: 'var(--red-500)', pct: 13 },
  ],
  'Last 3 Months': [
    { key: 'fresh', label: 'Fresh Food', icon: 'nutrition', color: 'var(--color-primary)', pct: 42 },
    { key: 'frozen', label: 'Frozen Food', icon: 'ac_unit', color: 'var(--blue-500)', pct: 21 },
    { key: 'pantry', label: 'Pantry Items', icon: 'inventory_2', color: 'var(--orange-500)', pct: 16 },
    { key: 'expiring', label: 'Expiring Soon', icon: 'schedule', color: '#FFD54F', pct: 10 },
    { key: 'wasted', label: 'Wasted', icon: 'delete', color: 'var(--red-500)', pct: 11 },
  ],
  'Last 6 Months': [
    { key: 'fresh', label: 'Fresh Food', icon: 'nutrition', color: 'var(--color-primary)', pct: 44 },
    { key: 'frozen', label: 'Frozen Food', icon: 'ac_unit', color: 'var(--blue-500)', pct: 19 },
    { key: 'pantry', label: 'Pantry Items', icon: 'inventory_2', color: 'var(--orange-500)', pct: 17 },
    { key: 'expiring', label: 'Expiring Soon', icon: 'schedule', color: '#FFD54F', pct: 9 },
    { key: 'wasted', label: 'Wasted', icon: 'delete', color: 'var(--red-500)', pct: 11 },
  ],
  'This Year': [
    { key: 'fresh', label: 'Fresh Food', icon: 'nutrition', color: 'var(--color-primary)', pct: 46 },
    { key: 'frozen', label: 'Frozen Food', icon: 'ac_unit', color: 'var(--blue-500)', pct: 18 },
    { key: 'pantry', label: 'Pantry Items', icon: 'inventory_2', color: 'var(--orange-500)', pct: 18 },
    { key: 'expiring', label: 'Expiring Soon', icon: 'schedule', color: '#FFD54F', pct: 9 },
    { key: 'wasted', label: 'Wasted', icon: 'delete', color: 'var(--red-500)', pct: 9 },
  ],
};

const WASTE_DATA = {
  'This Month': [2, 4, 1.5, 3],
  'Last Month': [3, 3.5, 5, 2.5],
  'Last 3 Months': [2.8, 3.2, 3.6, 2.9],
  'Last 6 Months': [3.1, 2.7, 3.4, 3.0],
  'This Year': [2.9, 3.1, 3.3, 3.2],
};
const ITEM_COUNTS = { fresh: 18, frozen: 8, pantry: 6, expiring: 4, wasted: 4 };

function PieChart({ data, size = 180 }) {
  const [animated, setAnimated] = React.useState(false);
  React.useEffect(() => { const t = setTimeout(() => setAnimated(true), 30); return () => clearTimeout(t); }, [data]);

  let cursor = 0;
  const stops = data.map((d) => {
    const start = cursor;
    const end = cursor + (animated ? d.pct : 0);
    cursor = start + d.pct;
    return `${d.color} ${start}% ${animated ? end : start}%`;
  });

  return (
    <div style={{
      width: size, height: size, borderRadius: '50%', flexShrink: 0,
      background: `conic-gradient(${stops.join(', ')})`,
      transition: 'background 900ms var(--ease-out-soft)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
    }}>
      <div style={{ width: size * 0.6, height: size * 0.6, borderRadius: '50%', background: 'var(--color-bg-elevated)' }} />
    </div>
  );
}

function BarChart({ values, maxVal }) {
  const [grown, setGrown] = React.useState(false);
  React.useEffect(() => { setGrown(false); const t = setTimeout(() => setGrown(true), 30); return () => clearTimeout(t); }, [values]);
  const highest = Math.max(...values);

  return (
    <div style={{ display: 'flex', alignItems: 'flex-end', gap: 16, height: 160, padding: '0 4px' }}>
      {values.map((v, i) => (
        <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, height: '100%', justifyContent: 'flex-end' }}>
          <span style={{ font: 'var(--text-label)', fontFamily: 'var(--font-display)', color: v === highest ? 'var(--orange-700)' : 'var(--color-text-secondary)', transition: 'all 300ms' }}>{v} kg</span>
          <div
            style={{
              width: '100%', maxWidth: 44, borderRadius: 'var(--radius-sm)',
              background: v === highest ? 'var(--orange-600)' : 'var(--color-primary)',
              height: grown ? `${(v / maxVal) * 110}px` : '0px',
              transition: 'height 600ms var(--ease-out-soft)',
            }}
          />
          <span style={{ font: 'var(--text-caption)', color: 'var(--color-text-tertiary)' }}>Week {i + 1}</span>
        </div>
      ))}
    </div>
  );
}

function computeInsight(waste, filter) {
  const total = waste.reduce((a, b) => a + b, 0);
  const highestIdx = waste.indexOf(Math.max(...waste));
  if (filter === 'Last Month') {
    return { positive: false, text: `Food waste increased during Week ${highestIdx + 1}. Consider consuming Expiring Soon items earlier.` };
  }
  return { positive: true, text: 'Great job! Food waste decreased by 20% compared to last month.' };
}

function computeMonthlyInsight() {
  const currentTotal = WASTE_DATA['This Month'].reduce((a, b) => a + b, 0);
  const previousTotal = WASTE_DATA['Last Month'].reduce((a, b) => a + b, 0);
  const rawPct = previousTotal === 0 ? 0 : ((currentTotal - previousTotal) / previousTotal) * 100;
  const pct = Math.round(rawPct);

  if (Math.abs(pct) < 3) {
    return {
      type: 'neutral', icon: 'info', sign: '≈', pct: 0,
      bg: 'var(--color-accent-blue-surface)', fg: 'var(--blue-700)',
      tooltip: 'Food waste remained nearly the same as last month.',
    };
  }
  if (pct < 0) {
    return {
      type: 'success', icon: 'check_circle', sign: '-', pct: Math.abs(pct),
      bg: 'var(--color-primary-surface)', fg: 'var(--green-700)',
      tooltip: `Food waste decreased by ${Math.abs(pct)}% compared to last month.`,
    };
  }
  return {
    type: 'warning', icon: 'warning', sign: '+', pct,
    bg: 'var(--color-accent-orange-surface)', fg: 'var(--orange-700)',
    tooltip: `Food waste increased by ${pct}% compared to last month.`,
  };
}

function MonthlyInsightBadge() {
  const { useState, useEffect } = React;
  const [visible, setVisible] = useState(false);
  const [tooltipOpen, setTooltipOpen] = useState(false);
  useEffect(() => { const t = setTimeout(() => setVisible(true), 30); return () => clearTimeout(t); }, []);
  const insight = computeMonthlyInsight();

  return (
    <div style={{ position: 'relative' }}>
      <button
        onClick={() => setTooltipOpen((v) => !v)}
        style={{
          display: 'flex', alignItems: 'center', gap: 4, border: 'none', cursor: 'pointer',
          background: insight.bg, color: insight.fg, borderRadius: 'var(--radius-pill)',
          padding: '6px 12px', font: 'var(--text-caption)', fontFamily: 'var(--font-body)', fontWeight: 700,
          opacity: visible ? 1 : 0, transform: visible ? 'scale(1)' : 'scale(0.85)',
          transition: 'opacity 320ms var(--ease-out-soft), transform 320ms var(--ease-out-soft)',
        }}
      >
        <span className="material-symbols-rounded" style={{ fontSize: 15 }}>{insight.icon}</span>
        {insight.sign}{insight.pct}%
      </button>
      {tooltipOpen && (
        <div
          onClick={() => setTooltipOpen(false)}
          style={{
            position: 'absolute', top: 'calc(100% + 8px)', right: 0, zIndex: 20,
            background: 'var(--gray-900)', color: '#fff', borderRadius: 'var(--radius-md)',
            padding: '10px 14px', font: 'var(--text-body-sm)', width: 200, boxShadow: 'var(--shadow-lg)',
            animation: 'rc-dialog-in 160ms var(--ease-out-soft)',
          }}
        >
          {insight.tooltip}
        </div>
      )}
    </div>
  );
}

function Analytics({ goTab }) {
  const { useState } = React;
  const { BottomNav } = window.SmartHouseholdFoodManagementDesignSystem_8f59ea;
  const [filter, setFilter] = useState('This Month');
  const [filterOpen, setFilterOpen] = useState(false);

  const dashboard = DASHBOARD_DATA[filter];
  const waste = WASTE_DATA[filter];
  const maxVal = Math.max(...Object.values(WASTE_DATA).flat());
  const totalWaste = waste.reduce((a, b) => a + b, 0);
  const avgWaste = totalWaste / waste.length;

  return (
    <div style={{ position: 'absolute', inset: 0, background: 'var(--color-bg)', display: 'flex', flexDirection: 'column' }}>
      <div className="fk-no-scrollbar" style={{ flex: 1, overflowY: 'auto', padding: '28px 20px 100px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20, position: 'relative' }}>
          <div style={{ font: 'var(--text-h1)', fontFamily: 'var(--font-display)' }}>Analytics</div>
          <button
            onClick={() => setFilterOpen(!filterOpen)}
            style={{ display: 'flex', alignItems: 'center', gap: 6, border: 'none', background: 'var(--color-bg-section)', borderRadius: 'var(--radius-pill)', padding: '8px 14px', color: 'var(--color-text-secondary)', font: 'var(--text-label)' }}
          >
            {filter}
            <span className="material-symbols-rounded" style={{ fontSize: 18 }}>expand_more</span>
          </button>
          {filterOpen && (
            <div style={{ position: 'absolute', top: 44, right: 0, background: 'var(--color-bg-elevated)', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-lg)', padding: 8, zIndex: 10, minWidth: 170 }}>
              {FILTERS.map((f) => (
                <button
                  key={f}
                  onClick={() => { setFilter(f); setFilterOpen(false); }}
                  style={{
                    display: 'flex', width: '100%', border: 'none', background: f === filter ? 'var(--color-primary-surface)' : 'transparent',
                    color: f === filter ? 'var(--color-primary-press)' : 'var(--color-text-primary)',
                    borderRadius: 'var(--radius-md)', padding: '10px 12px', font: 'var(--text-body)', textAlign: 'left',
                  }}
                >
                  {f}
                </button>
              ))}
            </div>
          )}
        </div>

        <div style={{ background: 'var(--color-bg-elevated)', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-sm)', padding: 20, marginBottom: 20 }}>
          <div style={{ font: 'var(--text-h2)', fontFamily: 'var(--font-display)', marginBottom: 4 }}>Monthly Food Waste</div>
          <div style={{ font: 'var(--text-body-sm)', color: 'var(--color-text-secondary)', marginBottom: 16 }}>Track how much food was wasted each week during this month.</div>
          <BarChart values={waste} maxVal={maxVal} />
          <div style={{ display: 'flex', gap: 12, marginTop: 20 }}>
            <div style={{ flex: 1, textAlign: 'center', background: 'var(--color-bg-section)', borderRadius: 'var(--radius-md)', padding: '12px 8px' }}>
              <div style={{ font: 'var(--text-h3)', fontFamily: 'var(--font-display)', color: 'var(--red-700)' }}>{totalWaste.toFixed(1)} kg</div>
              <div style={{ font: 'var(--text-caption)', color: 'var(--color-text-tertiary)' }}>Total Wasted This Month</div>
            </div>
            <div style={{ flex: 1, textAlign: 'center', background: 'var(--color-bg-section)', borderRadius: 'var(--radius-md)', padding: '12px 8px' }}>
              <div style={{ font: 'var(--text-h3)', fontFamily: 'var(--font-display)', color: 'var(--color-primary-press)' }}>{avgWaste.toFixed(1)} kg</div>
              <div style={{ font: 'var(--text-caption)', color: 'var(--color-text-tertiary)' }}>Average Waste Per Week</div>
            </div>
          </div>
        </div>

        <div style={{ background: 'var(--color-bg-elevated)', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-sm)', padding: 20 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 }}>
            <div style={{ font: 'var(--text-h2)', fontFamily: 'var(--font-display)' }}>Food Management Dashboard</div>
            <MonthlyInsightBadge />
          </div>
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 20 }}>
            <PieChart data={dashboard} />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {dashboard.map((d) => (
              <div key={d.key} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <span style={{ width: 12, height: 12, borderRadius: '50%', background: d.color, flexShrink: 0 }} />
                <span className="material-symbols-rounded" style={{ fontSize: 16, color: 'var(--color-text-secondary)' }}>{d.icon}</span>
                <span style={{ flex: 1, font: 'var(--text-body)' }}>{d.label}</span>
                <span style={{ font: 'var(--text-caption)', color: 'var(--color-text-tertiary)' }}>{ITEM_COUNTS[d.key]} items</span>
                <span style={{ font: 'var(--text-label)', fontFamily: 'var(--font-display)', minWidth: 36, textAlign: 'right' }}>{d.pct}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      <BottomNav active="analytics" onChange={goTab} />
      <style>{`
        .fk-no-scrollbar { scrollbar-width: none; -ms-overflow-style: none; }
        .fk-no-scrollbar::-webkit-scrollbar { display: none; width: 0; height: 0; }
      `}</style>
    </div>
  );
}

window.Analytics = Analytics;
window.computeMonthlyInsight = computeMonthlyInsight;
