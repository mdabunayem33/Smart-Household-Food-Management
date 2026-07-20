/* @ds-bundle: {"format":4,"namespace":"SmartHouseholdFoodManagementDesignSystem_8f59ea","components":[{"name":"CategoryCard","sourcePath":"components/cards/CategoryCard.jsx"},{"name":"FoodCard","sourcePath":"components/cards/FoodCard.jsx"},{"name":"StatCard","sourcePath":"components/cards/StatCard.jsx"},{"name":"Badge","sourcePath":"components/core/Badge.jsx"},{"name":"Button","sourcePath":"components/core/Button.jsx"},{"name":"Chip","sourcePath":"components/core/Chip.jsx"},{"name":"IconButton","sourcePath":"components/core/IconButton.jsx"},{"name":"Slider","sourcePath":"components/core/Slider.jsx"},{"name":"TextField","sourcePath":"components/core/TextField.jsx"},{"name":"Toggle","sourcePath":"components/core/Toggle.jsx"},{"name":"FreshnessBar","sourcePath":"components/feedback/FreshnessBar.jsx"},{"name":"ProgressRing","sourcePath":"components/feedback/ProgressRing.jsx"},{"name":"ReminderChip","sourcePath":"components/feedback/ReminderChip.jsx"},{"name":"SuccessCelebration","sourcePath":"components/feedback/SuccessCelebration.jsx"},{"name":"FoodIllustration","sourcePath":"components/illustrations/FoodIllustration.jsx"},{"name":"FOOD_ILLUSTRATION_KEYS","sourcePath":"components/illustrations/FoodIllustration.jsx"},{"name":"OnboardingScene","sourcePath":"components/illustrations/OnboardingScene.jsx"},{"name":"ONBOARDING_SCENE_KEYS","sourcePath":"components/illustrations/OnboardingScene.jsx"},{"name":"BottomNav","sourcePath":"components/navigation/BottomNav.jsx"},{"name":"FAB","sourcePath":"components/navigation/FAB.jsx"},{"name":"TopBar","sourcePath":"components/navigation/TopBar.jsx"}],"sourceHashes":{"components/cards/CategoryCard.jsx":"171fa54c461e","components/cards/FoodCard.jsx":"ad1f3793a7a5","components/cards/StatCard.jsx":"e8a4150c2679","components/core/Badge.jsx":"a726e2336563","components/core/Button.jsx":"ab1f1f5b25b3","components/core/Chip.jsx":"c86ee92f7c4a","components/core/IconButton.jsx":"56ee0fc12ced","components/core/Slider.jsx":"81f33591c1cd","components/core/TextField.jsx":"90db3ab4e61a","components/core/Toggle.jsx":"73b9bf211904","components/feedback/FreshnessBar.jsx":"b8e2bc2592f9","components/feedback/ProgressRing.jsx":"03b9311a496a","components/feedback/ReminderChip.jsx":"24d00a26fca7","components/feedback/SuccessCelebration.jsx":"bbe266d6e857","components/illustrations/FoodIllustration.jsx":"d81818160eb9","components/illustrations/OnboardingScene.jsx":"826af4012159","components/navigation/BottomNav.jsx":"295cea3ffafc","components/navigation/FAB.jsx":"c4a594b5d63a","components/navigation/TopBar.jsx":"f6aa3473efe3","ui_kits/freshkeep-app/App.jsx":"bae0f88e1bfc","ui_kits/freshkeep-app/android-frame.jsx":"24dd1a192853","ui_kits/freshkeep-app/expiry-utils.js":"8afdd38cf0eb","ui_kits/freshkeep-app/food-illustrations.js":"5e590b61a3db","ui_kits/freshkeep-app/screens/AboutApp.jsx":"65225a435087","ui_kits/freshkeep-app/screens/AddFood.jsx":"4650c9b63037","ui_kits/freshkeep-app/screens/AdjustQuantity.jsx":"4f347f8f10aa","ui_kits/freshkeep-app/screens/Analytics.jsx":"30fd793e9e7d","ui_kits/freshkeep-app/screens/EatFirst.jsx":"f400bc0ccf07","ui_kits/freshkeep-app/screens/EditProduct.jsx":"d1485fbba21b","ui_kits/freshkeep-app/screens/FoodDetail.jsx":"63318de7fec3","ui_kits/freshkeep-app/screens/Home.jsx":"27219f2b3e44","ui_kits/freshkeep-app/screens/Inventory.jsx":"f4068ee915ff","ui_kits/freshkeep-app/screens/LanguagePage.jsx":"dd133bcfcbe3","ui_kits/freshkeep-app/screens/Login.jsx":"526454287202","ui_kits/freshkeep-app/screens/Onboarding.jsx":"ba06f6afad4b","ui_kits/freshkeep-app/screens/PrivacyPolicy.jsx":"b099cf97d5f4","ui_kits/freshkeep-app/screens/Profile.jsx":"7ba86dd85018","ui_kits/freshkeep-app/screens/RangeControls.jsx":"7827e022f7bd","ui_kits/freshkeep-app/screens/ReminderPreferences.jsx":"e4c0f0b276c7","ui_kits/freshkeep-app/screens/Shopping.jsx":"3aa2933e28a4","ui_kits/freshkeep-app/screens/Splash.jsx":"8cf9c74dab1b","ui_kits/freshkeep-app/screens/TermsConditions.jsx":"ead14ef0751a","ui_kits/freshkeep-app/screens/UserManual.jsx":"e786c227c435"},"inlinedExternals":[],"unexposedExports":[{"name":"freshnessFromDaysLeft","sourcePath":"components/feedback/FreshnessBar.jsx"}]} */

(() => {

const __ds_ns = (window.SmartHouseholdFoodManagementDesignSystem_8f59ea = window.SmartHouseholdFoodManagementDesignSystem_8f59ea || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// components/cards/StatCard.jsx
try { (() => {
const toneMap = {
  green: {
    bg: 'var(--color-primary-surface)',
    fg: 'var(--green-700)'
  },
  orange: {
    bg: 'var(--color-accent-orange-surface)',
    fg: 'var(--orange-700)'
  },
  blue: {
    bg: 'var(--color-accent-blue-surface)',
    fg: 'var(--blue-700)'
  },
  red: {
    bg: 'var(--color-accent-red-surface)',
    fg: 'var(--red-700)'
  }
};
function StatCard({
  label,
  value,
  icon,
  tone = 'green'
}) {
  const t = toneMap[tone] || toneMap.green;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 12,
      padding: 20,
      borderRadius: 'var(--radius-lg)',
      background: 'var(--color-bg-elevated)',
      boxShadow: 'var(--shadow-sm)',
      minWidth: 150
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 40,
      height: 40,
      borderRadius: '50%',
      background: t.bg,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "material-symbols-rounded",
    style: {
      fontSize: 22,
      color: t.fg
    }
  }, icon)), /*#__PURE__*/React.createElement("div", {
    style: {
      font: 'var(--text-numeral)',
      fontFamily: 'var(--font-display)',
      color: 'var(--color-text-primary)'
    }
  }, value), /*#__PURE__*/React.createElement("div", {
    style: {
      font: 'var(--text-body-sm)',
      color: 'var(--color-text-secondary)'
    }
  }, label));
}
Object.assign(__ds_scope, { StatCard });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/cards/StatCard.jsx", error: String((e && e.message) || e) }); }

// components/core/Badge.jsx
try { (() => {
const toneMap = {
  fresh: {
    bg: 'var(--color-fresh-surface)',
    fg: 'var(--green-700)'
  },
  aging: {
    bg: 'var(--color-aging-surface)',
    fg: '#8a6d1a'
  },
  soon: {
    bg: 'var(--color-soon-surface)',
    fg: 'var(--orange-700)'
  },
  expired: {
    bg: 'var(--color-expired-surface)',
    fg: 'var(--red-700)'
  },
  info: {
    bg: 'var(--color-accent-blue-surface)',
    fg: 'var(--blue-700)'
  }
};
function Badge({
  label,
  tone = 'fresh',
  icon
}) {
  const t = toneMap[tone] || toneMap.fresh;
  return /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 4,
      padding: '4px 10px',
      borderRadius: 'var(--radius-pill)',
      background: t.bg,
      color: t.fg,
      font: 'var(--text-caption)',
      fontFamily: 'var(--font-body)'
    }
  }, icon && /*#__PURE__*/React.createElement("span", {
    className: "material-symbols-rounded",
    style: {
      fontSize: 14
    }
  }, icon), label);
}
Object.assign(__ds_scope, { Badge });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Badge.jsx", error: String((e && e.message) || e) }); }

// components/core/Button.jsx
try { (() => {
const sizeStyles = {
  lg: {
    height: 64,
    padding: '0 32px',
    fontSize: 17
  },
  md: {
    height: 56,
    padding: '0 28px',
    fontSize: 15
  },
  sm: {
    height: 48,
    padding: '0 20px',
    fontSize: 14
  }
};
const variantStyles = {
  primary: {
    background: 'var(--color-primary)',
    color: 'var(--color-text-inverse)',
    boxShadow: 'var(--shadow-primary)'
  },
  secondary: {
    background: 'var(--color-primary-surface)',
    color: 'var(--color-primary-press)',
    boxShadow: 'none'
  },
  ghost: {
    background: 'transparent',
    color: 'var(--color-text-primary)',
    boxShadow: 'none'
  },
  danger: {
    background: 'var(--color-accent-red)',
    color: 'var(--color-text-inverse)',
    boxShadow: '0 10px 24px oklch(from var(--red-500) 0.6 0.16 h / 0.32)'
  }
};
function Button({
  children,
  variant = 'primary',
  size = 'lg',
  fullWidth = false,
  disabled = false,
  icon = null,
  onClick,
  style
}) {
  const v = variantStyles[variant] || variantStyles.primary;
  const s = sizeStyles[size] || sizeStyles.lg;
  return /*#__PURE__*/React.createElement("button", {
    onClick: disabled ? undefined : onClick,
    disabled: disabled,
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 10,
      width: fullWidth ? '100%' : undefined,
      height: s.height,
      padding: s.padding,
      border: 'none',
      borderRadius: 'var(--radius-pill)',
      font: 'var(--text-label)',
      fontSize: s.fontSize,
      fontFamily: 'var(--font-display)',
      letterSpacing: 'var(--tracking-tight)',
      background: v.background,
      color: v.color,
      boxShadow: v.boxShadow,
      opacity: disabled ? 0.45 : 1,
      cursor: disabled ? 'not-allowed' : 'pointer',
      transition: 'transform var(--duration-fast) var(--ease-bounce), filter var(--duration-fast) var(--ease-standard)',
      transform: 'scale(1)',
      ...style
    },
    onPointerDown: e => {
      if (!disabled) e.currentTarget.style.transform = 'scale(0.96)';
    },
    onPointerUp: e => {
      e.currentTarget.style.transform = 'scale(1)';
    },
    onPointerLeave: e => {
      e.currentTarget.style.transform = 'scale(1)';
    }
  }, icon, /*#__PURE__*/React.createElement("span", null, children));
}
Object.assign(__ds_scope, { Button });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Button.jsx", error: String((e && e.message) || e) }); }

// components/core/Chip.jsx
try { (() => {
function Chip({
  label,
  icon,
  selected = false,
  onClick,
  tone = 'neutral'
}) {
  const toneMap = {
    neutral: {
      bg: 'var(--color-bg-section)',
      fg: 'var(--color-text-secondary)'
    },
    green: {
      bg: 'var(--color-primary-surface)',
      fg: 'var(--color-primary-press)'
    },
    orange: {
      bg: 'var(--color-accent-orange-surface)',
      fg: 'var(--orange-700)'
    },
    red: {
      bg: 'var(--color-accent-red-surface)',
      fg: 'var(--red-700)'
    },
    blue: {
      bg: 'var(--color-accent-blue-surface)',
      fg: 'var(--blue-700)'
    }
  };
  const t = toneMap[tone] || toneMap.neutral;
  const bg = selected ? 'var(--color-primary)' : t.bg;
  const fg = selected ? 'var(--color-text-inverse)' : t.fg;
  return /*#__PURE__*/React.createElement("button", {
    onClick: onClick,
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 6,
      height: 40,
      padding: '0 16px',
      borderRadius: 'var(--radius-pill)',
      border: 'none',
      background: bg,
      color: fg,
      font: 'var(--text-label)',
      fontFamily: 'var(--font-body)',
      transition: 'background var(--duration-fast), transform var(--duration-fast) var(--ease-bounce)'
    },
    onPointerDown: e => e.currentTarget.style.transform = 'scale(0.96)',
    onPointerUp: e => e.currentTarget.style.transform = 'scale(1)'
  }, icon && /*#__PURE__*/React.createElement("span", {
    className: "material-symbols-rounded",
    style: {
      fontSize: 18
    }
  }, icon), label);
}
Object.assign(__ds_scope, { Chip });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Chip.jsx", error: String((e && e.message) || e) }); }

// components/core/IconButton.jsx
try { (() => {
const sizes = {
  sm: 40,
  md: 48,
  lg: 56
};
function IconButton({
  icon,
  size = 'md',
  variant = 'ghost',
  onClick,
  ariaLabel,
  style
}) {
  const dim = sizes[size] || sizes.md;
  const bg = variant === 'filled' ? 'var(--color-primary)' : variant === 'surface' ? 'var(--color-bg-section)' : 'transparent';
  const color = variant === 'filled' ? 'var(--color-text-inverse)' : 'var(--color-text-primary)';
  return /*#__PURE__*/React.createElement("button", {
    "aria-label": ariaLabel,
    onClick: onClick,
    style: {
      width: dim,
      height: dim,
      borderRadius: '50%',
      border: 'none',
      background: bg,
      color,
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      transition: 'transform var(--duration-fast) var(--ease-bounce), background var(--duration-fast)',
      ...style
    },
    onPointerDown: e => e.currentTarget.style.transform = 'scale(0.92)',
    onPointerUp: e => e.currentTarget.style.transform = 'scale(1)',
    onPointerLeave: e => e.currentTarget.style.transform = 'scale(1)'
  }, /*#__PURE__*/React.createElement("span", {
    className: "material-symbols-rounded",
    style: {
      fontSize: size === 'lg' ? 28 : 24
    }
  }, icon));
}
Object.assign(__ds_scope, { IconButton });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/IconButton.jsx", error: String((e && e.message) || e) }); }

// components/core/Slider.jsx
try { (() => {
const {
  useRef,
  useState,
  useCallback
} = React;
function Slider({
  value: valueProp,
  defaultValue = 1,
  min = 0,
  max = 10,
  step = 1,
  unit = '',
  onChange
}) {
  const [uncontrolled, setUncontrolled] = useState(defaultValue);
  const value = valueProp !== undefined ? valueProp : uncontrolled;
  const trackRef = useRef(null);
  const pct = (value - min) / (max - min) * 100;
  const setFromClientX = useCallback(clientX => {
    const rect = trackRef.current.getBoundingClientRect();
    const ratio = Math.min(1, Math.max(0, (clientX - rect.left) / rect.width));
    const raw = min + ratio * (max - min);
    const snapped = Math.round(raw / step) * step;
    if (valueProp === undefined) setUncontrolled(snapped);
    onChange && onChange(snapped);
  }, [min, max, step, onChange, valueProp]);
  return /*#__PURE__*/React.createElement("div", {
    style: {
      width: '100%'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: 'center',
      font: 'var(--text-numeral)',
      fontFamily: 'var(--font-display)',
      color: 'var(--color-primary-press)',
      marginBottom: 20
    }
  }, value, unit), /*#__PURE__*/React.createElement("div", {
    ref: trackRef,
    onPointerDown: e => {
      e.currentTarget.setPointerCapture(e.pointerId);
      setFromClientX(e.clientX);
    },
    onPointerMove: e => {
      if (e.buttons === 1) setFromClientX(e.clientX);
    },
    style: {
      position: 'relative',
      height: 56,
      borderRadius: 'var(--radius-pill)',
      background: 'var(--color-primary-surface)',
      cursor: 'pointer'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      borderRadius: 'var(--radius-pill)',
      background: 'var(--color-primary)',
      width: `${pct}%`,
      transition: 'width var(--duration-fast) var(--ease-standard)'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      top: '50%',
      left: `${pct}%`,
      width: 40,
      height: 40,
      marginLeft: -20,
      marginTop: -20,
      borderRadius: '50%',
      background: '#fff',
      boxShadow: 'var(--shadow-md)'
    }
  })));
}
Object.assign(__ds_scope, { Slider });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Slider.jsx", error: String((e && e.message) || e) }); }

// components/core/TextField.jsx
try { (() => {
function TextField({
  label,
  placeholder,
  value,
  onChange,
  icon,
  type = 'text'
}) {
  return /*#__PURE__*/React.createElement("label", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 8
    }
  }, label && /*#__PURE__*/React.createElement("span", {
    style: {
      font: 'var(--text-label)',
      color: 'var(--color-text-secondary)'
    }
  }, label), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 10,
      height: 56,
      padding: '0 18px',
      borderRadius: 'var(--radius-md)',
      background: 'var(--color-bg-section)'
    }
  }, icon && /*#__PURE__*/React.createElement("span", {
    className: "material-symbols-rounded",
    style: {
      fontSize: 20,
      color: 'var(--color-text-tertiary)'
    }
  }, icon), /*#__PURE__*/React.createElement("input", {
    type: type,
    value: value,
    placeholder: placeholder,
    onChange: e => onChange && onChange(e.target.value),
    style: {
      border: 'none',
      outline: 'none',
      background: 'transparent',
      flex: 1,
      font: 'var(--text-body-lg)',
      fontFamily: 'var(--font-body)',
      color: 'var(--color-text-primary)'
    }
  })));
}
Object.assign(__ds_scope, { TextField });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/TextField.jsx", error: String((e && e.message) || e) }); }

// components/core/Toggle.jsx
try { (() => {
const {
  useState
} = React;
function Toggle({
  checked: checkedProp,
  defaultChecked = false,
  onChange,
  label
}) {
  const [uncontrolled, setUncontrolled] = useState(defaultChecked);
  const checked = checkedProp !== undefined ? checkedProp : uncontrolled;
  const toggle = () => {
    const next = !checked;
    if (checkedProp === undefined) setUncontrolled(next);
    onChange && onChange(next);
  };
  return /*#__PURE__*/React.createElement("label", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 12,
      cursor: 'pointer'
    }
  }, label && /*#__PURE__*/React.createElement("span", {
    style: {
      font: 'var(--text-body)',
      color: 'var(--color-text-primary)'
    }
  }, label), /*#__PURE__*/React.createElement("span", {
    onClick: toggle,
    style: {
      width: 52,
      height: 32,
      borderRadius: 'var(--radius-pill)',
      background: checked ? 'var(--color-primary)' : 'var(--gray-300)',
      position: 'relative',
      transition: 'background var(--duration-base) var(--ease-standard)',
      flexShrink: 0
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'absolute',
      top: 3,
      left: checked ? 23 : 3,
      width: 26,
      height: 26,
      borderRadius: '50%',
      background: '#fff',
      boxShadow: 'var(--shadow-sm)',
      transition: 'left var(--duration-base) var(--ease-bounce)'
    }
  })));
}
Object.assign(__ds_scope, { Toggle });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Toggle.jsx", error: String((e && e.message) || e) }); }

// components/feedback/FreshnessBar.jsx
try { (() => {
const levelMap = {
  fresh: {
    pct: 100,
    color: 'var(--color-fresh)'
  },
  aging: {
    pct: 70,
    color: 'var(--color-aging)'
  },
  soon: {
    pct: 40,
    color: 'var(--color-soon)'
  },
  expired: {
    pct: 12,
    color: 'var(--color-expired)'
  }
};

// Map remaining shelf life (days until expiry) to a precise bar fill + color.
// The bar shrinks and shifts green→yellow→orange→red as expiry approaches.
//   >7d  green ~95% · 4–7d yellow 60–80% · 2–3d orange 35–48% · 1d red ~15% · 0d solid red ~8%
function freshnessFromDaysLeft(daysLeft) {
  const d = daysLeft;
  if (d > 7) return {
    pct: 95,
    color: 'var(--color-fresh)'
  };
  if (d >= 4) return {
    pct: 60 + (d - 4) / 3 * 20,
    color: 'var(--color-aging)'
  }; // 4→60, 7→80
  if (d >= 2) return {
    pct: 35 + (d - 2) * 13,
    color: 'var(--color-soon)'
  }; // 2→35, 3→48
  if (d === 1) return {
    pct: 15,
    color: 'var(--color-expired)'
  };
  return {
    pct: 8,
    color: 'var(--color-expired)'
  }; // 0 → expires today
}
function FreshnessBar({
  level = 'fresh',
  label,
  expiredDays,
  daysLeft
}) {
  const isExpired = level === 'expired';
  // Expired: solid red bar that fills from the RIGHT edge, growing leftward the
  // longer the item has been expired (newly expired ≈ small sliver, ~7+ days = full).
  const expiredPct = isExpired ? Math.min(100, 15 + Math.max(0, expiredDays || 0) * 14) : 0;
  // Prefer precise day-based fill when daysLeft is known; else fall back to the coarse level map.
  const l = !isExpired && typeof daysLeft === 'number' ? freshnessFromDaysLeft(daysLeft) : levelMap[level] || levelMap.fresh;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 4
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      height: 6,
      borderRadius: 'var(--radius-pill)',
      background: 'var(--gray-100)',
      overflow: 'hidden'
    }
  }, isExpired ? /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      top: 0,
      right: 0,
      height: '100%',
      width: `${expiredPct}%`,
      background: 'var(--color-expired)',
      borderRadius: 'var(--radius-pill)',
      transition: 'width var(--duration-slow) var(--ease-out-soft)'
    }
  }) : /*#__PURE__*/React.createElement("div", {
    style: {
      height: '100%',
      width: `${l.pct}%`,
      background: l.color,
      borderRadius: 'var(--radius-pill)',
      transition: 'width var(--duration-slow) var(--ease-out-soft)'
    }
  })), label && /*#__PURE__*/React.createElement("span", {
    style: {
      font: 'var(--text-caption)',
      color: isExpired ? 'var(--red-700)' : 'var(--color-text-tertiary)',
      fontWeight: isExpired ? 700 : 400
    }
  }, label));
}
Object.assign(__ds_scope, { freshnessFromDaysLeft, FreshnessBar });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/feedback/FreshnessBar.jsx", error: String((e && e.message) || e) }); }

// components/feedback/ProgressRing.jsx
try { (() => {
function ProgressRing({
  value = 0.6,
  size = 120,
  stroke = 12,
  color = 'var(--color-primary)',
  label,
  sublabel
}) {
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const offset = c * (1 - value);
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      width: size,
      height: size
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: size,
    height: size,
    style: {
      transform: 'rotate(-90deg)'
    }
  }, /*#__PURE__*/React.createElement("circle", {
    cx: size / 2,
    cy: size / 2,
    r: r,
    fill: "none",
    stroke: "var(--gray-100)",
    strokeWidth: stroke
  }), /*#__PURE__*/React.createElement("circle", {
    cx: size / 2,
    cy: size / 2,
    r: r,
    fill: "none",
    stroke: color,
    strokeWidth: stroke,
    strokeLinecap: "round",
    strokeDasharray: c,
    strokeDashoffset: offset,
    style: {
      transition: 'stroke-dashoffset var(--duration-slow) var(--ease-out-soft)'
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      font: 'var(--text-numeral)',
      fontFamily: 'var(--font-display)',
      color: 'var(--color-text-primary)'
    }
  }, label), sublabel && /*#__PURE__*/React.createElement("span", {
    style: {
      font: 'var(--text-caption)',
      color: 'var(--color-text-secondary)'
    }
  }, sublabel)));
}
Object.assign(__ds_scope, { ProgressRing });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/feedback/ProgressRing.jsx", error: String((e && e.message) || e) }); }

// components/feedback/ReminderChip.jsx
try { (() => {
const styleMap = {
  gentle: {
    bg: 'var(--color-primary-surface)',
    fg: 'var(--green-700)',
    icon: 'notifications'
  },
  urgent: {
    bg: 'var(--color-accent-orange-surface)',
    fg: 'var(--orange-700)',
    icon: 'priority_high'
  },
  critical: {
    bg: 'var(--color-accent-red-surface)',
    fg: 'var(--red-700)',
    icon: 'error'
  }
};
function ReminderChip({
  timing,
  tone = 'gentle',
  onRemove
}) {
  const s = styleMap[tone] || styleMap.gentle;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 8,
      height: 44,
      padding: '0 8px 0 14px',
      borderRadius: 'var(--radius-pill)',
      background: s.bg,
      color: s.fg
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "material-symbols-rounded",
    style: {
      fontSize: 18
    }
  }, s.icon), /*#__PURE__*/React.createElement("span", {
    style: {
      font: 'var(--text-label)',
      fontFamily: 'var(--font-body)'
    }
  }, timing), onRemove && /*#__PURE__*/React.createElement("button", {
    onClick: onRemove,
    style: {
      width: 28,
      height: 28,
      borderRadius: '50%',
      border: 'none',
      background: 'transparent',
      color: s.fg,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "material-symbols-rounded",
    style: {
      fontSize: 16
    }
  }, "close")));
}
Object.assign(__ds_scope, { ReminderChip });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/feedback/ReminderChip.jsx", error: String((e && e.message) || e) }); }

// components/feedback/SuccessCelebration.jsx
try { (() => {
const {
  useEffect,
  useState
} = React;
function SuccessCelebration({
  message = 'Nice!',
  sublabel,
  onDone
}) {
  const [particles] = useState(() => Array.from({
    length: 14
  }, (_, i) => ({
    id: i,
    angle: i / 14 * Math.PI * 2,
    dist: 70 + Math.random() * 40,
    color: ['var(--green-500)', 'var(--orange-500)', 'var(--blue-500)'][i % 3],
    delay: Math.random() * 120
  })));
  useEffect(() => {
    if (!onDone) return;
    const t = setTimeout(onDone, 1600);
    return () => clearTimeout(t);
  }, [onDone]);
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: 24,
      padding: 40
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      width: 140,
      height: 140
    }
  }, particles.map(p => /*#__PURE__*/React.createElement("span", {
    key: p.id,
    style: {
      position: 'absolute',
      top: '50%',
      left: '50%',
      width: 8,
      height: 8,
      borderRadius: '50%',
      background: p.color,
      transform: `translate(-50%, -50%) translate(${Math.cos(p.angle) * p.dist}px, ${Math.sin(p.angle) * p.dist}px)`,
      opacity: 0,
      animation: `fk-burst var(--duration-celebration) var(--ease-out-soft) ${p.delay}ms forwards`
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      borderRadius: '50%',
      background: 'var(--color-primary)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      boxShadow: 'var(--shadow-primary)',
      animation: 'fk-pop var(--duration-slow) var(--ease-bounce) forwards'
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "material-symbols-rounded",
    style: {
      fontSize: 56,
      color: '#fff'
    }
  }, "check"))), /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: 'center'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      font: 'var(--text-display)',
      fontFamily: 'var(--font-display)',
      color: 'var(--color-text-primary)'
    }
  }, message), sublabel && /*#__PURE__*/React.createElement("div", {
    style: {
      font: 'var(--text-body)',
      color: 'var(--color-text-secondary)',
      marginTop: 8
    }
  }, sublabel)), /*#__PURE__*/React.createElement("style", null, `
        @keyframes fk-pop { 0% { transform: scale(0.4); opacity: 0; } 60% { transform: scale(1.08); opacity: 1; } 100% { transform: scale(1); opacity: 1; } }
        @keyframes fk-burst { 0% { opacity: 1; transform: translate(-50%,-50%) translate(0,0); } 100% { opacity: 0; } }
      `));
}
Object.assign(__ds_scope, { SuccessCelebration });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/feedback/SuccessCelebration.jsx", error: String((e && e.message) || e) }); }

// components/illustrations/FoodIllustration.jsx
try { (() => {
/**
 * Flat, minimal, rounded-shape food illustrations with soft two-tone gradients.
 * Vector-drawn (no photography) — consistent single illustration style across
 * the whole app: soft gradient fill, no outlines, no per-illustration face/mascot.
 */
const DEFS_ID_PREFIX = 'fi';
function grad(id, from, to) {
  return /*#__PURE__*/React.createElement("linearGradient", {
    id: id,
    x1: "0",
    y1: "0",
    x2: "1",
    y2: "1"
  }, /*#__PURE__*/React.createElement("stop", {
    offset: "0%",
    stopColor: from
  }), /*#__PURE__*/React.createElement("stop", {
    offset: "100%",
    stopColor: to
  }));
}
const ILLUSTRATIONS = {
  tomato: id => /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 100 100",
    width: "100%",
    height: "100%"
  }, /*#__PURE__*/React.createElement("defs", null, grad(id, '#EF9A9A', '#E53935')), /*#__PURE__*/React.createElement("circle", {
    cx: "50",
    cy: "58",
    r: "32",
    fill: `url(#${id})`
  }), /*#__PURE__*/React.createElement("path", {
    d: "M50 26c-4-6-13-8-18-4 4 6 12 8 18 4Z",
    fill: "#66BB6A"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M50 26c4-6 13-8 18-4-4 6-12 8-18 4Z",
    fill: "#81C784"
  }), /*#__PURE__*/React.createElement("ellipse", {
    cx: "38",
    cy: "46",
    rx: "7",
    ry: "5",
    fill: "#ffffff",
    opacity: "0.35"
  })),
  vegetables: id => /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 100 100",
    width: "100%",
    height: "100%"
  }, /*#__PURE__*/React.createElement("defs", null, grad(id, '#A5D6A7', '#43A047')), /*#__PURE__*/React.createElement("circle", {
    cx: "36",
    cy: "60",
    r: "20",
    fill: `url(#${id})`
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "62",
    cy: "52",
    r: "24",
    fill: `url(#${id})`,
    opacity: "0.9"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "60",
    cy: "30",
    r: "9",
    fill: "#66BB6A"
  }), /*#__PURE__*/React.createElement("rect", {
    x: "57",
    y: "18",
    width: "6",
    height: "14",
    rx: "3",
    fill: "#388E3C"
  })),
  fruits: id => /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 100 100",
    width: "100%",
    height: "100%"
  }, /*#__PURE__*/React.createElement("defs", null, grad(id, '#FFAB91', '#FB8C00')), /*#__PURE__*/React.createElement("circle", {
    cx: "48",
    cy: "58",
    r: "30",
    fill: `url(#${id})`
  }), /*#__PURE__*/React.createElement("rect", {
    x: "45",
    y: "22",
    width: "6",
    height: "14",
    rx: "3",
    fill: "#6D4C41"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M50 26c4-6 12-8 17-5-4 6-11 8-17 5Z",
    fill: "#66BB6A"
  })),
  frozen: id => /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 100 100",
    width: "100%",
    height: "100%"
  }, /*#__PURE__*/React.createElement("defs", null, grad(id, '#81D4FA', '#0288D1')), /*#__PURE__*/React.createElement("rect", {
    x: "24",
    y: "24",
    width: "52",
    height: "52",
    rx: "14",
    fill: `url(#${id})`
  }), /*#__PURE__*/React.createElement("g", {
    stroke: "#ffffff",
    strokeWidth: "4",
    strokeLinecap: "round"
  }, /*#__PURE__*/React.createElement("line", {
    x1: "50",
    y1: "36",
    x2: "50",
    y2: "64"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "38",
    y1: "42",
    x2: "62",
    y2: "58"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "62",
    y1: "42",
    x2: "38",
    y2: "58"
  }))),
  meat: id => /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 100 100",
    width: "100%",
    height: "100%"
  }, /*#__PURE__*/React.createElement("defs", null, grad(id, '#EF9A9A', '#C62828')), /*#__PURE__*/React.createElement("path", {
    d: "M30 40c8-12 34-12 40 4 5 13-4 28-19 30-14 2-24-10-24-20 0-6 1-10 3-14Z",
    fill: `url(#${id})`
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "42",
    cy: "52",
    r: "4",
    fill: "#ffffff",
    opacity: "0.4"
  })),
  fish: id => /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 100 100",
    width: "100%",
    height: "100%"
  }, /*#__PURE__*/React.createElement("defs", null, grad(id, '#90CAF9', '#1E88E5')), /*#__PURE__*/React.createElement("path", {
    d: "M22 54c14-16 42-16 54 0-12 16-40 16-54 0Z",
    fill: `url(#${id})`
  }), /*#__PURE__*/React.createElement("path", {
    d: "M76 54l12-10v20l-12-10Z",
    fill: "#1565C0"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "34",
    cy: "50",
    r: "3",
    fill: "#ffffff"
  })),
  milk: id => /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 100 100",
    width: "100%",
    height: "100%"
  }, /*#__PURE__*/React.createElement("defs", null, grad(id, '#E3F2FD', '#64B5F6')), /*#__PURE__*/React.createElement("path", {
    d: "M40 24h20l4 12v40a4 4 0 0 1-4 4H40a4 4 0 0 1-4-4V36l4-12Z",
    fill: `url(#${id})`
  }), /*#__PURE__*/React.createElement("path", {
    d: "M40 24h20l-6 8H46l-6-8Z",
    fill: "#1E88E5"
  }), /*#__PURE__*/React.createElement("rect", {
    x: "36",
    y: "50",
    width: "28",
    height: "8",
    fill: "#ffffff",
    opacity: "0.55"
  })),
  snacks: id => /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 100 100",
    width: "100%",
    height: "100%"
  }, /*#__PURE__*/React.createElement("defs", null, grad(id, '#FFE0B2', '#FB8C00')), /*#__PURE__*/React.createElement("path", {
    d: "M32 30h36l6 44a6 6 0 0 1-6 6H32a6 6 0 0 1-6-6l6-44Z",
    fill: `url(#${id})`
  }), /*#__PURE__*/React.createElement("path", {
    d: "M38 30c0-8 6-14 12-14s12 6 12 14",
    fill: "none",
    stroke: "#EF6C00",
    strokeWidth: "4"
  })),
  drinks: id => /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 100 100",
    width: "100%",
    height: "100%"
  }, /*#__PURE__*/React.createElement("defs", null, grad(id, '#FFCC80', '#FB8C00')), /*#__PURE__*/React.createElement("rect", {
    x: "38",
    y: "26",
    width: "24",
    height: "50",
    rx: "6",
    fill: `url(#${id})`
  }), /*#__PURE__*/React.createElement("rect", {
    x: "44",
    y: "18",
    width: "12",
    height: "10",
    rx: "3",
    fill: "#8D6E63"
  })),
  rice: id => /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 100 100",
    width: "100%",
    height: "100%"
  }, /*#__PURE__*/React.createElement("defs", null, grad(id, '#FFF3E0', '#FFB74D')), /*#__PURE__*/React.createElement("path", {
    d: "M24 52a26 14 0 0 1 52 0Z",
    fill: `url(#${id})`
  }), /*#__PURE__*/React.createElement("path", {
    d: "M24 52h52l-4 18a6 6 0 0 1-6 5H34a6 6 0 0 1-6-5l-4-18Z",
    fill: "#FFA726"
  })),
  spices: id => /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 100 100",
    width: "100%",
    height: "100%"
  }, /*#__PURE__*/React.createElement("defs", null, grad(id, '#FFCDD2', '#E53935')), /*#__PURE__*/React.createElement("circle", {
    cx: "38",
    cy: "60",
    r: "16",
    fill: `url(#${id})`
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "64",
    cy: "56",
    r: "20",
    fill: "#8D6E63",
    opacity: "0.85"
  })),
  others: id => /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 100 100",
    width: "100%",
    height: "100%"
  }, /*#__PURE__*/React.createElement("defs", null, grad(id, '#C8E6C9', '#4CAF50')), /*#__PURE__*/React.createElement("rect", {
    x: "26",
    y: "30",
    width: "48",
    height: "40",
    rx: "10",
    fill: `url(#${id})`
  }), /*#__PURE__*/React.createElement("path", {
    d: "M26 40h48",
    stroke: "#2E7D32",
    strokeWidth: "4"
  }))
};
let uid = 0;
function FoodIllustration({
  type = 'others',
  size = '100%'
}) {
  const id = React.useMemo(() => `${DEFS_ID_PREFIX}-${type}-${uid++}`, [type]);
  const render = ILLUSTRATIONS[type] || ILLUSTRATIONS.others;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      width: size,
      height: size
    }
  }, render(id));
}
const FOOD_ILLUSTRATION_KEYS = Object.keys(ILLUSTRATIONS);
Object.assign(__ds_scope, { FoodIllustration, FOOD_ILLUSTRATION_KEYS });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/illustrations/FoodIllustration.jsx", error: String((e && e.message) || e) }); }

// components/cards/CategoryCard.jsx
try { (() => {
const palette = {
  green: {
    bg: 'var(--color-primary-surface)',
    fg: 'var(--green-700)'
  },
  orange: {
    bg: 'var(--color-accent-orange-surface)',
    fg: 'var(--orange-700)'
  },
  red: {
    bg: 'var(--color-accent-red-surface)',
    fg: 'var(--red-700)'
  },
  blue: {
    bg: 'var(--color-accent-blue-surface)',
    fg: 'var(--blue-700)'
  }
};
function CategoryCard({
  label,
  icon,
  illustration,
  tone = 'green',
  selected = false,
  onClick
}) {
  const t = palette[tone] || palette.green;
  return /*#__PURE__*/React.createElement("button", {
    onClick: onClick,
    style: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 10,
      width: '100%',
      aspectRatio: '1 / 1',
      border: 'none',
      borderRadius: 'var(--radius-lg)',
      background: t.bg,
      boxShadow: selected ? 'var(--shadow-md)' : 'var(--shadow-xs)',
      outline: selected ? `3px solid ${t.fg}` : 'none',
      outlineOffset: -3,
      transition: 'transform var(--duration-fast) var(--ease-bounce), box-shadow var(--duration-base)'
    },
    onPointerDown: e => e.currentTarget.style.transform = 'scale(0.96)',
    onPointerUp: e => e.currentTarget.style.transform = 'scale(1)'
  }, illustration ? /*#__PURE__*/React.createElement("div", {
    style: {
      width: '48%',
      filter: 'drop-shadow(0 6px 10px rgba(0,0,0,0.12))'
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.FoodIllustration, {
    type: illustration
  })) : icon && /*#__PURE__*/React.createElement("span", {
    className: "material-symbols-rounded",
    style: {
      fontSize: 40,
      color: t.fg,
      fontVariationSettings: "'FILL' 1"
    }
  }, icon), /*#__PURE__*/React.createElement("span", {
    style: {
      font: 'var(--text-h3)',
      fontFamily: 'var(--font-display)',
      color: 'var(--color-text-primary)',
      fontSize: 15
    }
  }, label));
}
Object.assign(__ds_scope, { CategoryCard });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/cards/CategoryCard.jsx", error: String((e && e.message) || e) }); }

// components/cards/FoodCard.jsx
try { (() => {
function FoodCard({
  name,
  quantity,
  icon,
  illustration,
  freshness = 'fresh',
  expiryLabel,
  expiredDays,
  daysLeft,
  onClick
}) {
  const iconTone = {
    fresh: 'var(--color-primary-surface)',
    aging: 'var(--color-aging-surface)',
    soon: 'var(--color-soon-surface)',
    expired: 'var(--color-expired-surface)'
  }[freshness];
  const isExpired = freshness === 'expired';
  return /*#__PURE__*/React.createElement("button", {
    onClick: onClick,
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 16,
      width: '100%',
      padding: 16,
      border: 'none',
      borderRadius: 'var(--radius-lg)',
      background: 'var(--color-bg-elevated)',
      boxShadow: 'var(--shadow-sm)',
      textAlign: 'left'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 56,
      height: 56,
      borderRadius: 'var(--radius-md)',
      background: iconTone,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexShrink: 0,
      padding: illustration ? 8 : 0
    }
  }, illustration ? /*#__PURE__*/React.createElement(__ds_scope.FoodIllustration, {
    type: illustration
  }) : /*#__PURE__*/React.createElement("span", {
    className: "material-symbols-rounded",
    style: {
      fontSize: 28,
      color: 'var(--color-text-primary)',
      fontVariationSettings: "'FILL' 1"
    }
  }, icon)), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      gap: 8
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'baseline',
      gap: 8
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      font: 'var(--text-h3)',
      fontFamily: 'var(--font-display)',
      fontSize: 16,
      display: 'flex',
      alignItems: 'center',
      gap: 8
    }
  }, name, isExpired && /*#__PURE__*/React.createElement("span", {
    style: {
      font: 'var(--text-caption)',
      fontSize: 10,
      fontWeight: 700,
      color: '#fff',
      background: 'var(--color-expired)',
      borderRadius: 'var(--radius-pill)',
      padding: '2px 8px',
      textTransform: 'uppercase',
      letterSpacing: '0.04em'
    }
  }, "Expired")), /*#__PURE__*/React.createElement("span", {
    style: {
      font: 'var(--text-body-sm)',
      color: 'var(--color-text-secondary)',
      flexShrink: 0
    }
  }, quantity)), /*#__PURE__*/React.createElement(__ds_scope.FreshnessBar, {
    level: freshness,
    label: expiryLabel,
    expiredDays: expiredDays,
    daysLeft: daysLeft
  })));
}
Object.assign(__ds_scope, { FoodCard });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/cards/FoodCard.jsx", error: String((e && e.message) || e) }); }

// components/illustrations/OnboardingScene.jsx
try { (() => {
/**
 * Flat vector "scene" illustrations for onboarding — richer multi-element
 * compositions (phone + person/family + food) built from the same rounded,
 * soft-gradient shape language as FoodIllustration, one per onboarding beat.
 * Human figures are abstract silhouettes (no facial detail) to stay clean,
 * minimal and premium rather than cartoonish.
 */

function grad(id, from, to) {
  return /*#__PURE__*/React.createElement("linearGradient", {
    id: id,
    x1: "0",
    y1: "0",
    x2: "1",
    y2: "1"
  }, /*#__PURE__*/React.createElement("stop", {
    offset: "0%",
    stopColor: from
  }), /*#__PURE__*/React.createElement("stop", {
    offset: "100%",
    stopColor: to
  }));
}
function Person({
  x,
  y,
  scale = 1,
  color = '#4CAF50'
}) {
  return /*#__PURE__*/React.createElement("g", {
    transform: `translate(${x} ${y}) scale(${scale})`
  }, /*#__PURE__*/React.createElement("circle", {
    cx: "0",
    cy: "0",
    r: "10",
    fill: color
  }), /*#__PURE__*/React.createElement("path", {
    d: "M-14 40c0-14 6.5-22 14-22s14 8 14 22Z",
    fill: color
  }));
}
const SCENES = {
  track: id => /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 220 220",
    width: "100%",
    height: "100%"
  }, /*#__PURE__*/React.createElement("defs", null, grad(`${id}-bg`, '#E8F5E9', '#C8E6C9'), grad(`${id}-phone`, '#FFFFFF', '#F1F8F1')), /*#__PURE__*/React.createElement("circle", {
    cx: "110",
    cy: "110",
    r: "100",
    fill: `url(#${id}-bg)`
  }), /*#__PURE__*/React.createElement("rect", {
    x: "34",
    y: "118",
    width: "70",
    height: "52",
    rx: "10",
    fill: "#A5D6A7"
  }), /*#__PURE__*/React.createElement("rect", {
    x: "42",
    y: "128",
    width: "18",
    height: "18",
    rx: "5",
    fill: "#43A047"
  }), /*#__PURE__*/React.createElement("rect", {
    x: "64",
    y: "128",
    width: "18",
    height: "18",
    rx: "5",
    fill: "#FFA726"
  }), /*#__PURE__*/React.createElement("rect", {
    x: "42",
    y: "150",
    width: "18",
    height: "12",
    rx: "5",
    fill: "#EF5350"
  }), /*#__PURE__*/React.createElement("rect", {
    x: "64",
    y: "150",
    width: "18",
    height: "12",
    rx: "5",
    fill: "#42A5F5"
  }), /*#__PURE__*/React.createElement(Person, {
    x: 40,
    y: 92,
    scale: 0.62,
    color: "#388E3C"
  }), /*#__PURE__*/React.createElement("rect", {
    x: "112",
    y: "70",
    width: "72",
    height: "118",
    rx: "18",
    fill: `url(#${id}-phone)`,
    stroke: "#C8E6C9",
    strokeWidth: "2"
  }), /*#__PURE__*/React.createElement("rect", {
    x: "122",
    y: "84",
    width: "52",
    height: "10",
    rx: "5",
    fill: "#4CAF50"
  }), /*#__PURE__*/React.createElement("rect", {
    x: "122",
    y: "102",
    width: "22",
    height: "22",
    rx: "6",
    fill: "#A5D6A7"
  }), /*#__PURE__*/React.createElement("rect", {
    x: "150",
    y: "102",
    width: "22",
    height: "22",
    rx: "6",
    fill: "#FFCC80"
  }), /*#__PURE__*/React.createElement("rect", {
    x: "122",
    y: "130",
    width: "22",
    height: "22",
    rx: "6",
    fill: "#90CAF9"
  }), /*#__PURE__*/React.createElement("rect", {
    x: "150",
    y: "130",
    width: "22",
    height: "22",
    rx: "6",
    fill: "#EF9A9A"
  }), /*#__PURE__*/React.createElement("rect", {
    x: "122",
    y: "158",
    width: "50",
    height: "14",
    rx: "7",
    fill: "#4CAF50"
  })),
  reminders: id => /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 220 220",
    width: "100%",
    height: "100%"
  }, /*#__PURE__*/React.createElement("defs", null, grad(`${id}-bg`, '#FFF3E0', '#FFE0B2'), grad(`${id}-phone`, '#FFFFFF', '#FFF8F0')), /*#__PURE__*/React.createElement("circle", {
    cx: "110",
    cy: "110",
    r: "100",
    fill: `url(#${id}-bg)`
  }), /*#__PURE__*/React.createElement("rect", {
    x: "66",
    y: "46",
    width: "88",
    height: "140",
    rx: "20",
    fill: `url(#${id}-phone)`,
    stroke: "#FFE0B2",
    strokeWidth: "2"
  }), /*#__PURE__*/React.createElement("rect", {
    x: "78",
    y: "60",
    width: "64",
    height: "10",
    rx: "5",
    fill: "#FB8C00"
  }), /*#__PURE__*/React.createElement("rect", {
    x: "76",
    y: "82",
    width: "68",
    height: "24",
    rx: "10",
    fill: "#E8F5E9"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "90",
    cy: "94",
    r: "6",
    fill: "#4CAF50"
  }), /*#__PURE__*/React.createElement("rect", {
    x: "102",
    y: "90",
    width: "34",
    height: "8",
    rx: "4",
    fill: "#A5D6A7"
  }), /*#__PURE__*/React.createElement("rect", {
    x: "76",
    y: "112",
    width: "68",
    height: "24",
    rx: "10",
    fill: "#FFF8E1"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "90",
    cy: "124",
    r: "6",
    fill: "#FDD835"
  }), /*#__PURE__*/React.createElement("rect", {
    x: "102",
    y: "120",
    width: "34",
    height: "8",
    rx: "4",
    fill: "#FFECB3"
  }), /*#__PURE__*/React.createElement("rect", {
    x: "76",
    y: "142",
    width: "68",
    height: "24",
    rx: "10",
    fill: "#FFEBEE"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "90",
    cy: "154",
    r: "6",
    fill: "#EF5350"
  }), /*#__PURE__*/React.createElement("rect", {
    x: "102",
    y: "150",
    width: "34",
    height: "8",
    rx: "4",
    fill: "#EF9A9A"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "168",
    cy: "70",
    r: "18",
    fill: "#FFA726"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M168 62c-5 0-8 4-8 9v5l-3 4h22l-3-4v-5c0-5-3-9-8-9Z",
    fill: "#ffffff"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "168",
    cy: "82",
    r: "2.5",
    fill: "#ffffff"
  })),
  shopping: id => /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 220 220",
    width: "100%",
    height: "100%"
  }, /*#__PURE__*/React.createElement("defs", null, grad(`${id}-bg`, '#E3F2FD', '#BBDEFB'), grad(`${id}-card`, '#FFFFFF', '#F2F8FF')), /*#__PURE__*/React.createElement("circle", {
    cx: "110",
    cy: "110",
    r: "100",
    fill: `url(#${id}-bg)`
  }), /*#__PURE__*/React.createElement(Person, {
    x: 52,
    y: 130,
    scale: 0.85,
    color: "#1E88E5"
  }), /*#__PURE__*/React.createElement(Person, {
    x: 78,
    y: 140,
    scale: 0.55,
    color: "#42A5F5"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M92 110h60l-8 34a6 6 0 0 1-6 5h-32a6 6 0 0 1-6-5l-8-34Z",
    fill: "#64B5F6"
  }), /*#__PURE__*/React.createElement("rect", {
    x: "86",
    y: "100",
    width: "70",
    height: "10",
    rx: "5",
    fill: "#1E88E5"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "106",
    cy: "156",
    r: "6",
    fill: "#0D47A1"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "140",
    cy: "156",
    r: "6",
    fill: "#0D47A1"
  }), /*#__PURE__*/React.createElement("rect", {
    x: "120",
    y: "50",
    width: "66",
    height: "60",
    rx: "14",
    fill: `url(#${id}-card)`
  }), /*#__PURE__*/React.createElement("rect", {
    x: "130",
    y: "62",
    width: "46",
    height: "8",
    rx: "4",
    fill: "#42A5F5"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "134",
    cy: "82",
    r: "5",
    fill: "#4CAF50"
  }), /*#__PURE__*/React.createElement("rect", {
    x: "144",
    y: "79",
    width: "32",
    height: "6",
    rx: "3",
    fill: "#B0BEC5"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "134",
    cy: "96",
    r: "5",
    fill: "#4CAF50"
  }), /*#__PURE__*/React.createElement("rect", {
    x: "144",
    y: "93",
    width: "24",
    height: "6",
    rx: "3",
    fill: "#B0BEC5"
  }))
};
function OnboardingScene({
  type = 'track',
  size = '100%'
}) {
  const render = SCENES[type] || SCENES.track;
  const id = React.useMemo(() => `os-${type}-${Math.random().toString(36).slice(2, 8)}`, [type]);
  return /*#__PURE__*/React.createElement("div", {
    style: {
      width: size,
      height: size
    }
  }, render(id));
}
const ONBOARDING_SCENE_KEYS = Object.keys(SCENES);
Object.assign(__ds_scope, { OnboardingScene, ONBOARDING_SCENE_KEYS });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/illustrations/OnboardingScene.jsx", error: String((e && e.message) || e) }); }

// components/navigation/BottomNav.jsx
try { (() => {
const items = [{
  key: 'home',
  label: 'Home',
  icon: 'home'
}, {
  key: 'inventory',
  label: 'Inventory',
  icon: 'kitchen'
}, {
  key: 'shopping',
  label: 'Shopping',
  icon: 'shopping_cart'
}, {
  key: 'analytics',
  label: 'Analytics',
  icon: 'donut_large'
}, {
  key: 'profile',
  label: 'Profile',
  icon: 'person'
}];
function BottomNav({
  active = 'home',
  onChange
}) {
  return /*#__PURE__*/React.createElement("nav", {
    style: {
      display: 'flex',
      justifyContent: 'space-around',
      alignItems: 'center',
      height: 'var(--nav-bar-height)',
      background: 'color-mix(in oklab, var(--color-bg-elevated) 88%, transparent)',
      backdropFilter: 'blur(16px)',
      borderTop: '1px solid var(--color-divider)',
      position: 'absolute',
      left: 0,
      right: 0,
      bottom: 0
    }
  }, items.map(it => {
    const isActive = it.key === active;
    return /*#__PURE__*/React.createElement("button", {
      key: it.key,
      onClick: () => onChange && onChange(it.key),
      style: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 4,
        border: 'none',
        background: 'transparent',
        color: isActive ? 'var(--color-primary)' : 'var(--color-text-tertiary)',
        minWidth: 48,
        minHeight: 48,
        justifyContent: 'center'
      }
    }, /*#__PURE__*/React.createElement("span", {
      className: "material-symbols-rounded",
      style: {
        fontSize: 26,
        fontVariationSettings: isActive ? "'FILL' 1" : "'FILL' 0"
      }
    }, it.icon), /*#__PURE__*/React.createElement("span", {
      style: {
        font: 'var(--text-caption)',
        fontSize: 11,
        fontFamily: 'var(--font-body)'
      }
    }, it.label));
  }));
}
Object.assign(__ds_scope, { BottomNav });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/BottomNav.jsx", error: String((e && e.message) || e) }); }

// components/navigation/FAB.jsx
try { (() => {
function FAB({
  icon = 'add',
  onClick,
  label
}) {
  return /*#__PURE__*/React.createElement("button", {
    onClick: onClick,
    style: {
      position: 'absolute',
      right: 20,
      bottom: 'calc(var(--nav-bar-height) + 20px)',
      width: label ? 'auto' : 'var(--fab-size)',
      height: 'var(--fab-size)',
      padding: label ? '0 24px 0 20px' : 0,
      borderRadius: 'var(--radius-pill)',
      border: 'none',
      background: 'var(--color-primary)',
      color: '#fff',
      display: 'flex',
      alignItems: 'center',
      gap: 8,
      justifyContent: 'center',
      boxShadow: 'var(--shadow-primary)',
      transition: 'transform var(--duration-fast) var(--ease-bounce)'
    },
    onPointerDown: e => e.currentTarget.style.transform = 'scale(0.94)',
    onPointerUp: e => e.currentTarget.style.transform = 'scale(1)'
  }, /*#__PURE__*/React.createElement("span", {
    className: "material-symbols-rounded",
    style: {
      fontSize: 28
    }
  }, icon), label && /*#__PURE__*/React.createElement("span", {
    style: {
      font: 'var(--text-label)',
      fontFamily: 'var(--font-display)'
    }
  }, label));
}
Object.assign(__ds_scope, { FAB });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/FAB.jsx", error: String((e && e.message) || e) }); }

// components/navigation/TopBar.jsx
try { (() => {
function TopBar({
  title,
  onBack,
  action
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      height: 64,
      padding: '0 8px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 48
    }
  }, onBack && /*#__PURE__*/React.createElement("button", {
    onClick: onBack,
    style: {
      width: 48,
      height: 48,
      borderRadius: '50%',
      border: 'none',
      background: 'transparent',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "material-symbols-rounded",
    style: {
      fontSize: 24
    }
  }, "arrow_back"))), /*#__PURE__*/React.createElement("span", {
    style: {
      font: 'var(--text-h2)',
      fontFamily: 'var(--font-display)',
      fontSize: 18
    }
  }, title), /*#__PURE__*/React.createElement("div", {
    style: {
      width: 48,
      display: 'flex',
      justifyContent: 'flex-end'
    }
  }, action));
}
Object.assign(__ds_scope, { TopBar });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/TopBar.jsx", error: String((e && e.message) || e) }); }

// ui_kits/freshkeep-app/App.jsx
try { (() => {
function App() {
  const {
    useState
  } = React;
  const {
    AndroidDevice
  } = window;
  function isoDaysFromNow(n) {
    const d = new Date();
    d.setDate(d.getDate() + n);
    return d.toISOString();
  }
  const [stage, setStage] = useState('splash'); // splash -> onboarding -> login -> app
  const [tab, setTab] = useState('home');
  const [addFoodOpen, setAddFoodOpen] = useState(false);
  const [detailItem, setDetailItem] = useState(null);
  const [adjustQtyItem, setAdjustQtyItem] = useState(null);
  const [editProductItem, setEditProductItem] = useState(null);
  const [inventory, setInventory] = useState([{
    id: 1,
    name: 'Tomato',
    category: 'vegetables',
    icon: 'nutrition',
    illustration: 'tomato',
    quantity: '6 pcs',
    freshness: 'soon',
    expiryLabel: 'Expires in 2 days',
    low: false,
    daysLeft: 2,
    addedDate: isoDaysFromNow(-5),
    expiryDate: isoDaysFromNow(2)
  }, {
    id: 2,
    name: 'Milk',
    category: 'milk',
    icon: 'water_drop',
    illustration: 'milk',
    quantity: '1 L',
    freshness: 'expired',
    expiryLabel: 'Expired yesterday',
    low: true,
    daysLeft: -1,
    expiredDays: 1,
    addedDate: isoDaysFromNow(-6),
    expiryDate: isoDaysFromNow(-1)
  }, {
    id: 3,
    name: 'Rice',
    category: 'rice',
    icon: 'rice_bowl',
    illustration: 'rice',
    quantity: '500 g',
    freshness: 'fresh',
    expiryLabel: 'Fresh for 300+ days',
    low: true,
    daysLeft: 300,
    addedDate: isoDaysFromNow(-65),
    expiryDate: isoDaysFromNow(300)
  }, {
    id: 4,
    name: 'Frozen Chicken',
    category: 'frozen',
    icon: 'ac_unit',
    illustration: 'frozen',
    quantity: '1 kg',
    freshness: 'fresh',
    expiryLabel: 'Fresh for 88 days',
    low: false,
    daysLeft: 88,
    addedDate: isoDaysFromNow(-2),
    expiryDate: isoDaysFromNow(88)
  }, {
    id: 5,
    name: 'Apple',
    category: 'fruits',
    icon: 'eco',
    illustration: 'fruits',
    quantity: '4 pcs',
    freshness: 'aging',
    expiryLabel: 'Expires in 6 days',
    low: false,
    daysLeft: 6,
    addedDate: isoDaysFromNow(-15),
    expiryDate: isoDaysFromNow(6)
  }, {
    id: 6,
    name: 'Broccoli',
    category: 'vegetables',
    icon: 'nutrition',
    illustration: 'vegetables',
    quantity: '1 pc',
    freshness: 'soon',
    expiryLabel: 'Expires tomorrow',
    low: false,
    daysLeft: 1,
    addedDate: isoDaysFromNow(-6),
    expiryDate: isoDaysFromNow(1)
  }]);
  const [nextId, setNextId] = useState(7);
  const [eatFirstOpen, setEatFirstOpen] = useState(false);
  const [reminderPrefsOpen, setReminderPrefsOpen] = useState(false);
  const [shoppingFrequency, setShoppingFrequency] = useState(() => {
    try {
      return localStorage.getItem('fk-shop-frequency') || null;
    } catch (e) {
      return null;
    }
  });
  const [manualAddOpen, setManualAddOpen] = useState(false);
  function changeShoppingFrequency(key) {
    setShoppingFrequency(key);
    try {
      localStorage.setItem('fk-shop-frequency', key);
    } catch (e) {}
  }
  const [customFoodCategories, setCustomFoodCategories] = useState([]);
  const [language, setLanguage] = useState('English');
  const [languageOpen, setLanguageOpen] = useState(false);
  const [helpOpen, setHelpOpen] = useState(false);
  const [aboutOpen, setAboutOpen] = useState(false);
  const [reminderPrefs, setReminderPrefs] = useState({
    vegetables: [1, 3, 7],
    fruits: [1, 3, 7],
    dairy: [1, 3, 7],
    meatFish: [1, 3, 7],
    packaged: [1, 3, 7],
    frozen: [1, 3, 7],
    beverages: [1, 3, 7]
  });
  function setReminderPref(key, daysArray) {
    setReminderPrefs(prev => ({
      ...prev,
      [key]: daysArray
    }));
  }
  function addInventoryItem() {
    setInventory([{
      id: nextId,
      name: 'Cucumber',
      category: 'vegetables',
      icon: 'nutrition',
      illustration: 'vegetables',
      quantity: '2 pcs',
      freshness: 'fresh',
      expiryLabel: 'Expires in 10 days',
      low: false,
      addedDate: isoDaysFromNow(0),
      expiryDate: isoDaysFromNow(10)
    }, ...inventory]);
    setNextId(nextId + 1);
  }
  function updateInventoryQuantity(id, quantity) {
    setInventory(prev => prev.map(i => i.id === id ? {
      ...i,
      quantity
    } : i));
  }
  function deriveFreshness(expiryDateStr) {
    const remain = Math.ceil((new Date(expiryDateStr) - new Date()) / 86400000);
    if (remain < 0) {
      const past = -remain;
      return {
        freshness: 'expired',
        daysLeft: remain,
        expiredDays: past,
        expiryLabel: past === 1 ? 'Expired yesterday' : `Expired ${past} days ago`
      };
    }
    if (remain === 0) return {
      freshness: 'soon',
      daysLeft: 0,
      expiredDays: 0,
      expiryLabel: 'Expires today'
    };
    if (remain === 1) return {
      freshness: 'soon',
      daysLeft: 1,
      expiredDays: 0,
      expiryLabel: 'Expires tomorrow'
    };
    if (remain <= 3) return {
      freshness: 'soon',
      daysLeft: remain,
      expiredDays: 0,
      expiryLabel: `Expires in ${remain} days`
    };
    if (remain <= 7) return {
      freshness: 'aging',
      daysLeft: remain,
      expiredDays: 0,
      expiryLabel: `Expires in ${remain} days`
    };
    return {
      freshness: 'fresh',
      daysLeft: remain,
      expiredDays: 0,
      expiryLabel: `Fresh for ${remain}+ days`
    };
  }
  function updateInventoryItem(id, patch) {
    setInventory(prev => prev.map(i => {
      if (i.id !== id) return i;
      const merged = {
        ...i,
        ...patch
      };
      if (patch.expiryDate) Object.assign(merged, deriveFreshness(patch.expiryDate));
      return merged;
    }));
  }
  function deleteItem(id) {
    setInventory(inventory.filter(i => i.id !== id));
  }
  function consumeItem(id) {
    setInventory(inventory.filter(i => i.id !== id));
    setDetailItem(null);
  }
  let screen;
  if (stage === 'splash') screen = /*#__PURE__*/React.createElement(window.Splash, {
    onDone: () => setStage('onboarding')
  });else if (stage === 'onboarding') screen = /*#__PURE__*/React.createElement(window.Onboarding, {
    onDone: () => setStage('login'),
    onSetFrequency: changeShoppingFrequency
  });else if (stage === 'login') screen = /*#__PURE__*/React.createElement(window.Login, {
    onDone: () => setStage('app')
  });else if (stage === 'app' && !shoppingFrequency) {
    // Fallback: if frequency was never set during onboarding (e.g. returning guest), ask once.
    screen = /*#__PURE__*/React.createElement(window.ShoppingSetup, {
      onSave: key => {
        changeShoppingFrequency(key);
        setTab('home');
      }
    });
  } else {
    screen = /*#__PURE__*/React.createElement(React.Fragment, null, tab === 'home' && /*#__PURE__*/React.createElement(window.Home, {
      inventory: inventory,
      onOpenAddFood: () => setAddFoodOpen(true),
      onOpenFood: setDetailItem,
      goTab: setTab,
      onOpenEatFirst: () => setEatFirstOpen(true),
      shoppingFrequency: shoppingFrequency
    }), tab === 'inventory' && /*#__PURE__*/React.createElement(window.Inventory, {
      inventory: inventory,
      onOpenFood: setDetailItem,
      onDelete: deleteItem,
      goTab: setTab,
      onOpenAddFood: () => setAddFoodOpen(true),
      onEditProduct: setEditProductItem
    }), tab === 'shopping' && /*#__PURE__*/React.createElement(window.Shopping, {
      inventory: inventory,
      goTab: setTab,
      frequency: shoppingFrequency,
      onChangeFrequency: changeShoppingFrequency,
      onOpenManualAdd: () => setManualAddOpen(true)
    }), tab === 'analytics' && /*#__PURE__*/React.createElement(window.Analytics, {
      goTab: setTab
    }), tab === 'profile' && /*#__PURE__*/React.createElement(window.Profile, {
      goTab: setTab,
      onLogout: () => setStage('login'),
      reminderPrefs: reminderPrefs,
      onOpenReminderPrefs: () => setReminderPrefsOpen(true),
      language: language,
      onOpenLanguage: () => setLanguageOpen(true),
      onOpenHelp: () => setHelpOpen(true),
      onOpenAbout: () => setAboutOpen(true),
      email: "rohim@example.com"
    }), detailItem && /*#__PURE__*/React.createElement(window.FoodDetail, {
      item: detailItem,
      onClose: () => setDetailItem(null),
      onConsume: () => consumeItem(detailItem.id),
      onAdjust: () => {
        setAdjustQtyItem(detailItem);
        setDetailItem(null);
      },
      onDiscard: () => consumeItem(detailItem.id)
    }), addFoodOpen && /*#__PURE__*/React.createElement("div", {
      style: {
        position: 'absolute',
        inset: 0,
        zIndex: 20
      }
    }, /*#__PURE__*/React.createElement(window.AddFood, {
      onCancel: () => setAddFoodOpen(false),
      onFinish: () => {
        addInventoryItem();
        setAddFoodOpen(false);
      },
      customCategories: customFoodCategories,
      onCustomCategoriesChange: setCustomFoodCategories
    })), eatFirstOpen && /*#__PURE__*/React.createElement("div", {
      style: {
        position: 'absolute',
        inset: 0,
        zIndex: 20
      }
    }, /*#__PURE__*/React.createElement(window.EatFirst, {
      inventory: inventory,
      onBack: () => setEatFirstOpen(false),
      onConsume: consumeItem,
      onOpenFood: item => {
        setEatFirstOpen(false);
        setDetailItem(item);
      }
    })), reminderPrefsOpen && /*#__PURE__*/React.createElement("div", {
      style: {
        position: 'absolute',
        inset: 0,
        zIndex: 20
      }
    }, /*#__PURE__*/React.createElement(window.ReminderPreferences, {
      onBack: () => setReminderPrefsOpen(false),
      reminderPrefs: reminderPrefs,
      onChangeReminderPref: setReminderPref,
      customCategories: customFoodCategories
    })), languageOpen && /*#__PURE__*/React.createElement("div", {
      style: {
        position: 'absolute',
        inset: 0,
        zIndex: 20
      }
    }, /*#__PURE__*/React.createElement(window.LanguagePage, {
      onBack: () => setLanguageOpen(false),
      language: language,
      onChangeLanguage: setLanguage
    })), helpOpen && /*#__PURE__*/React.createElement("div", {
      style: {
        position: 'absolute',
        inset: 0,
        zIndex: 20
      }
    }, /*#__PURE__*/React.createElement(window.UserManual, {
      onBack: () => setHelpOpen(false)
    })), aboutOpen && /*#__PURE__*/React.createElement("div", {
      style: {
        position: 'absolute',
        inset: 0,
        zIndex: 20
      }
    }, /*#__PURE__*/React.createElement(window.AboutApp, {
      onBack: () => setAboutOpen(false)
    })), adjustQtyItem && /*#__PURE__*/React.createElement("div", {
      style: {
        position: 'absolute',
        inset: 0,
        zIndex: 20
      }
    }, /*#__PURE__*/React.createElement(window.AdjustQuantity, {
      item: adjustQtyItem,
      onCancel: () => setAdjustQtyItem(null),
      onSave: quantity => {
        updateInventoryQuantity(adjustQtyItem.id, quantity);
        setAdjustQtyItem(null);
      }
    })), editProductItem && /*#__PURE__*/React.createElement("div", {
      style: {
        position: 'absolute',
        inset: 0,
        zIndex: 20
      }
    }, /*#__PURE__*/React.createElement(window.EditProduct, {
      item: editProductItem,
      onCancel: () => setEditProductItem(null),
      onSave: patch => {
        updateInventoryItem(editProductItem.id, patch);
        setEditProductItem(null);
      }
    })), manualAddOpen && /*#__PURE__*/React.createElement("div", {
      style: {
        position: 'absolute',
        inset: 0,
        zIndex: 25
      }
    }, /*#__PURE__*/React.createElement(window.ManualAddShopping, {
      inventory: inventory,
      customCategories: customFoodCategories,
      onClose: () => setManualAddOpen(false),
      onAdd: entry => {
        if (window.__fkShoppingAddManual) window.__fkShoppingAddManual(entry);
      }
    })));
  }
  return /*#__PURE__*/React.createElement(AndroidDevice, null, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      width: '100%',
      height: '100%',
      overflow: 'hidden'
    }
  }, screen));
}
ReactDOM.createRoot(document.getElementById('root')).render(/*#__PURE__*/React.createElement(App, null));
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/freshkeep-app/App.jsx", error: String((e && e.message) || e) }); }

// ui_kits/freshkeep-app/android-frame.jsx
try { (() => {
// @ds-adherence-ignore -- omelette starter scaffold (raw elements/hex/px by design)
// Copied omelette starter. Re-running copy_starter_component with this kind overwrites this file with the latest version (page content is unaffected).

/* BEGIN USAGE */
// Android.jsx — Simplified Android (Material 3) device frame
// Status bar + top app bar + content + gesture nav + keyboard.
// Based on Figma M3 spec. No dependencies, no image assets.
// Exports (to window): AndroidDevice, AndroidStatusBar, AndroidAppBar, AndroidListItem, AndroidNavBar, AndroidKeyboard
//
// Usage — wrap your screen content in <AndroidDevice> to get the bezel, status
// bar and gesture nav (props: title, large, keyboard, dark):
//
//   <AndroidDevice title="Inbox" large>
//     ...your screen content...
//   </AndroidDevice>
//   <AndroidDevice title="Compose" keyboard>…</AndroidDevice>
/* END USAGE */

const MD_C = {
  surface: '#f4fbf8',
  surfaceVariant: '#dae5e1',
  inverseOnSurface: '#ecf2ef',
  secondaryContainer: '#cde8e1',
  primaryFixedDim: '#83d5c6',
  onSurface: '#171d1b',
  onSurfaceVar: '#49454f',
  onPrimaryContainer: '#00201c',
  primary: '#006a60',
  frameBorder: 'rgba(116,119,117,0.5)'
};

// ─────────────────────────────────────────────────────────────
// Status bar (time left, wifi/cell/battery right)
// ─────────────────────────────────────────────────────────────
function AndroidStatusBar({
  dark = false
}) {
  const c = dark ? '#fff' : MD_C.onSurface;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      height: 40,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 16px',
      position: 'relative',
      fontFamily: 'Roboto, system-ui, sans-serif'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 128,
      display: 'flex',
      alignItems: 'center',
      gap: 8
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 14,
      fontWeight: 400,
      letterSpacing: 0.25,
      lineHeight: '20px',
      color: c
    }
  }, "9:30")), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      left: '50%',
      top: 8,
      transform: 'translateX(-50%)',
      width: 24,
      height: 24,
      borderRadius: 100,
      background: '#2e2e2e'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      paddingRight: 2
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: "16",
    height: "16",
    viewBox: "0 0 16 16",
    style: {
      marginRight: -2
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M8 13.3L.67 5.97a10.37 10.37 0 0114.66 0L8 13.3z",
    fill: c
  })), /*#__PURE__*/React.createElement("svg", {
    width: "16",
    height: "16",
    viewBox: "0 0 16 16",
    style: {
      marginRight: -2
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M14.67 14.67V1.33L1.33 14.67h13.34z",
    fill: c
  }))), /*#__PURE__*/React.createElement("svg", {
    width: "16",
    height: "16",
    viewBox: "0 0 16 16"
  }, /*#__PURE__*/React.createElement("rect", {
    x: "3.75",
    y: "2",
    width: "8.5",
    height: "13",
    rx: "1.5",
    fill: c
  }), /*#__PURE__*/React.createElement("rect", {
    x: "5.5",
    y: "0.9",
    width: "5",
    height: "2",
    rx: "0.5",
    fill: c
  }))));
}

// ─────────────────────────────────────────────────────────────
// Top app bar (Material 3 small/medium)
// ─────────────────────────────────────────────────────────────
function AndroidAppBar({
  title = 'Title',
  large = false
}) {
  const iconDot = /*#__PURE__*/React.createElement("div", {
    style: {
      width: 48,
      height: 48,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 22,
      height: 22,
      borderRadius: '50%',
      background: MD_C.onSurfaceVar,
      opacity: 0.3
    }
  }));
  return /*#__PURE__*/React.createElement("div", {
    style: {
      background: MD_C.surface,
      padding: '4px 4px 0'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      height: 56,
      display: 'flex',
      alignItems: 'center',
      gap: 4
    }
  }, iconDot, !large && /*#__PURE__*/React.createElement("span", {
    style: {
      flex: 1,
      fontSize: 22,
      fontWeight: 400,
      color: MD_C.onSurface,
      fontFamily: 'Roboto, system-ui, sans-serif'
    }
  }, title), large && /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }), iconDot), large && /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '16px 16px 20px',
      fontSize: 28,
      fontWeight: 400,
      color: MD_C.onSurface,
      fontFamily: 'Roboto, system-ui, sans-serif'
    }
  }, title));
}

// ─────────────────────────────────────────────────────────────
// List item (Material 3)
// ─────────────────────────────────────────────────────────────
function AndroidListItem({
  headline,
  supporting,
  leading
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 16,
      padding: '12px 16px',
      minHeight: 56,
      boxSizing: 'border-box',
      fontFamily: 'Roboto, system-ui, sans-serif'
    }
  }, leading && /*#__PURE__*/React.createElement("div", {
    style: {
      width: 40,
      height: 40,
      borderRadius: '50%',
      background: MD_C.primary,
      color: '#fff',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: 18,
      fontWeight: 500,
      flexShrink: 0
    }
  }, leading), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 16,
      color: MD_C.onSurface,
      lineHeight: '24px'
    }
  }, headline), supporting && /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 14,
      color: MD_C.onSurfaceVar,
      lineHeight: '20px'
    }
  }, supporting)));
}

// ─────────────────────────────────────────────────────────────
// Gesture nav bar (pill)
// ─────────────────────────────────────────────────────────────
function AndroidNavBar({
  dark = false
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      height: 24,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 108,
      height: 4,
      borderRadius: 2,
      background: dark ? '#fff' : MD_C.onSurface,
      opacity: 0.4
    }
  }));
}

// ─────────────────────────────────────────────────────────────
// Device frame — wraps everything
// ─────────────────────────────────────────────────────────────
function AndroidDevice({
  children,
  width = 412,
  height = 892,
  dark = false,
  title,
  large = false,
  keyboard = false
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      width,
      height,
      borderRadius: 18,
      overflow: 'hidden',
      background: dark ? '#1d1b20' : MD_C.surface,
      border: `8px solid ${MD_C.frameBorder}`,
      boxShadow: '0 30px 80px rgba(0,0,0,0.25)',
      display: 'flex',
      flexDirection: 'column',
      boxSizing: 'border-box'
    }
  }, /*#__PURE__*/React.createElement(AndroidStatusBar, {
    dark: dark
  }), title !== undefined && /*#__PURE__*/React.createElement(AndroidAppBar, {
    title: title,
    large: large
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      overflow: 'auto'
    }
  }, children), keyboard && /*#__PURE__*/React.createElement(AndroidKeyboard, null), /*#__PURE__*/React.createElement(AndroidNavBar, {
    dark: dark
  }));
}

// ─────────────────────────────────────────────────────────────
// Keyboard — Gboard (Material 3)
// ─────────────────────────────────────────────────────────────
function AndroidKeyboard() {
  let _k = 0;
  const key = (l, {
    flex = 1,
    bg = MD_C.surface,
    r = 6,
    minW,
    fs = 21
  } = {}) => /*#__PURE__*/React.createElement("div", {
    key: _k++,
    style: {
      height: 46,
      borderRadius: r,
      flex,
      minWidth: minW,
      background: bg,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: 'Roboto, system-ui',
      fontSize: fs,
      color: MD_C.onPrimaryContainer
    }
  }, l);
  const row = (keys, style = {}) => /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 6,
      justifyContent: 'center',
      ...style
    }
  }, keys.map(l => key(l)));
  return /*#__PURE__*/React.createElement("div", {
    style: {
      background: MD_C.inverseOnSurface,
      padding: '0 8px 8px',
      display: 'flex',
      flexDirection: 'column',
      gap: 4
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      height: 44
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 12
    }
  }, row(['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p']), row(['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'], {
    padding: '0 20px'
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 6
    }
  }, key('', {
    bg: MD_C.surfaceVariant
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 6,
      flex: 7,
      minWidth: 274
    }
  }, ['z', 'x', 'c', 'v', 'b', 'n', 'm'].map(l => key(l))), key('', {
    bg: MD_C.surfaceVariant
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 6
    }
  }, key('?123', {
    bg: MD_C.secondaryContainer,
    r: 100,
    minW: 58,
    fs: 14
  }), key(',', {
    bg: MD_C.surfaceVariant
  }), key('', {
    flex: 3,
    minW: 154
  }), key('.', {
    bg: MD_C.surfaceVariant
  }), key('', {
    bg: MD_C.primaryFixedDim,
    r: 100,
    minW: 58
  }))));
}
Object.assign(window, {
  AndroidDevice,
  AndroidStatusBar,
  AndroidAppBar,
  AndroidListItem,
  AndroidNavBar,
  AndroidKeyboard
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/freshkeep-app/android-frame.jsx", error: String((e && e.message) || e) }); }

// ui_kits/freshkeep-app/expiry-utils.js
try { (() => {
// Expiry progress math shared by Inventory screen — computes remaining shelf life
// percentage, color tier, and (for expired items) a reversed right-to-left red fill.
// Non-expired fill/color follow fixed day-based bands (not a ratio of total shelf life)
// so the bar communicates urgency consistently: >7d green ~95%, 4–7d yellow 60–80%,
// 2–3d orange 35–48%, 1d red ~15%, today solid red ~8%.
function fkExpiryProgress(addedDateStr, expiryDateStr) {
  const msPerDay = 86400000;
  const now = new Date();
  const expiry = new Date(expiryDateStr);
  const remainingDays = Math.ceil((expiry - now) / msPerDay);
  if (remainingDays < 0) {
    const daysExpired = Math.max(1, Math.floor((now - expiry) / msPerDay));
    const capDays = Math.min(daysExpired, 14);
    const fillPct = Math.min(100, 15 + capDays / 14 * 85);
    const label = daysExpired === 1 ? 'Expired yesterday' : `Expired ${daysExpired} days ago`;
    return {
      expired: true,
      daysExpired,
      label,
      fillPct,
      color: 'var(--color-expired)'
    };
  }
  let fillPct;
  let color;
  if (remainingDays > 7) {
    fillPct = 95;
    color = 'var(--color-fresh)';
  } else if (remainingDays >= 4) {
    fillPct = 60 + (remainingDays - 4) / 3 * 20;
    color = 'var(--color-aging)';
  } else if (remainingDays >= 2) {
    fillPct = 35 + (remainingDays - 2) * 13;
    color = 'var(--color-soon)';
  } else if (remainingDays === 1) {
    fillPct = 15;
    color = 'var(--color-expired)';
  } else {
    fillPct = 8;
    color = 'var(--color-expired)';
  }
  const label = remainingDays === 0 ? 'Expires today' : remainingDays === 1 ? 'Expires tomorrow' : `Expires in ${remainingDays} days`;
  return {
    expired: false,
    remainingDays,
    label,
    fillPct,
    color
  };
}
window.fkExpiryProgress = fkExpiryProgress;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/freshkeep-app/expiry-utils.js", error: String((e && e.message) || e) }); }

// ui_kits/freshkeep-app/food-illustrations.js
try { (() => {
// Product name -> FoodIllustration type key. Unmapped names fall back to their
// category's illustration key so the whole app reads as one consistent flat
// vector illustration set instead of per-photo assets.

const FK_PRODUCT_ILLUSTRATION = {
  'Tomato': 'tomato',
  'Potato': 'vegetables',
  'Onion': 'vegetables',
  'Carrot': 'vegetables',
  'Broccoli': 'vegetables',
  'Cucumber': 'vegetables',
  'Apple': 'fruits',
  'Banana': 'fruits',
  'Orange': 'fruits',
  'Grapes': 'fruits',
  'Frozen Chicken': 'frozen',
  'Frozen Peas': 'frozen',
  'Ice Cream': 'frozen',
  'Chicken Breast': 'meat',
  'Ground Beef': 'meat',
  'Bacon': 'meat',
  'Salmon': 'fish',
  'Shrimp': 'fish',
  'Tuna': 'fish',
  'Milk': 'milk',
  'Yogurt': 'milk',
  'Cheese': 'milk',
  'Chips': 'snacks',
  'Cookies': 'snacks',
  'Crackers': 'snacks',
  'Orange Juice': 'drinks',
  'Soda': 'drinks',
  'Sparkling Water': 'drinks',
  'White Rice': 'rice',
  'Basmati Rice': 'rice',
  'Cumin': 'spices',
  'Paprika': 'spices',
  'Black Pepper': 'spices',
  'Bread': 'others',
  'Eggs': 'others'
};
function fkIllustration(name) {
  return FK_PRODUCT_ILLUSTRATION[name] || 'others';
}
window.fkIllustration = fkIllustration;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/freshkeep-app/food-illustrations.js", error: String((e && e.message) || e) }); }

// ui_kits/freshkeep-app/screens/AboutApp.jsx
try { (() => {
const WHATS_NEW = ['Improved expiry reminders', 'Faster inventory loading', 'Bug fixes and performance improvements'];
const ABOUT_LINKS = [{
  icon: 'privacy_tip',
  label: 'Privacy Policy',
  key: 'privacy'
}, {
  icon: 'gavel',
  label: 'Terms & Conditions',
  key: 'terms'
}];
function AboutApp({
  onBack
}) {
  const {
    useState
  } = React;
  const {
    TopBar
  } = window.SmartHouseholdFoodManagementDesignSystem_8f59ea;
  const [legalPage, setLegalPage] = useState(null); // 'privacy' | 'terms' | null

  if (legalPage === 'privacy') return /*#__PURE__*/React.createElement(window.PrivacyPolicy, {
    onBack: () => setLegalPage(null)
  });
  if (legalPage === 'terms') return /*#__PURE__*/React.createElement(window.TermsConditions, {
    onBack: () => setLegalPage(null)
  });
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      background: 'var(--color-bg)',
      display: 'flex',
      flexDirection: 'column',
      animation: 'page-in 220ms var(--ease-out-soft)'
    }
  }, /*#__PURE__*/React.createElement(TopBar, {
    title: "About App",
    onBack: onBack
  }), /*#__PURE__*/React.createElement("div", {
    className: "fk-no-scrollbar",
    style: {
      flex: 1,
      overflowY: 'auto',
      padding: '4px 20px 24px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: 10,
      marginBottom: 28
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: "../../assets/logo/freshkeep-app-icon.png",
    alt: "FreshKeep",
    style: {
      width: 72,
      height: 72,
      borderRadius: 'var(--radius-lg)'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      font: 'var(--text-h2)',
      fontFamily: 'var(--font-display)'
    }
  }, "FreshKeep"), /*#__PURE__*/React.createElement("div", {
    style: {
      font: 'var(--text-body-sm)',
      color: 'var(--color-text-secondary)'
    }
  }, "Version 1.2.0 (Build 108)"), /*#__PURE__*/React.createElement("div", {
    style: {
      font: 'var(--text-caption)',
      color: 'var(--color-text-tertiary)'
    }
  }, "Released July 1, 2026")), /*#__PURE__*/React.createElement("div", {
    style: {
      background: 'var(--color-bg-elevated)',
      borderRadius: 'var(--radius-lg)',
      boxShadow: 'var(--shadow-xs)',
      padding: 18,
      marginBottom: 20
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      font: 'var(--text-h3)',
      fontFamily: 'var(--font-display)',
      marginBottom: 10
    }
  }, "What's New"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 8
    }
  }, WHATS_NEW.map(w => /*#__PURE__*/React.createElement("div", {
    key: w,
    style: {
      display: 'flex',
      alignItems: 'flex-start',
      gap: 8
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "material-symbols-rounded",
    style: {
      fontSize: 16,
      color: 'var(--color-primary)',
      marginTop: 2
    }
  }, "check_circle"), /*#__PURE__*/React.createElement("span", {
    style: {
      font: 'var(--text-body-sm)',
      color: 'var(--color-text-secondary)'
    }
  }, w))))), /*#__PURE__*/React.createElement("div", {
    style: {
      background: 'var(--color-bg-elevated)',
      borderRadius: 'var(--radius-lg)',
      boxShadow: 'var(--shadow-xs)',
      padding: 18,
      marginBottom: 20
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      font: 'var(--text-h3)',
      fontFamily: 'var(--font-display)',
      marginBottom: 10
    }
  }, "Features Overview"), /*#__PURE__*/React.createElement("div", {
    style: {
      font: 'var(--text-body-sm)',
      color: 'var(--color-text-secondary)'
    }
  }, "Track your kitchen inventory, get smart expiry reminders, and reduce food waste \u2014 all in one simple app.")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 2,
      background: 'var(--color-bg-section)',
      borderRadius: 'var(--radius-lg)',
      overflow: 'hidden'
    }
  }, ABOUT_LINKS.map(l => /*#__PURE__*/React.createElement("button", {
    key: l.label,
    onClick: l.key === 'privacy' ? () => setLegalPage('privacy') : () => setLegalPage('terms'),
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 14,
      padding: '14px 16px',
      background: 'var(--color-bg-elevated)',
      border: 'none',
      textAlign: 'left',
      width: '100%'
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "material-symbols-rounded",
    style: {
      fontSize: 20,
      color: 'var(--color-text-secondary)'
    }
  }, l.icon), /*#__PURE__*/React.createElement("span", {
    style: {
      flex: 1,
      font: 'var(--text-body)'
    }
  }, l.label), /*#__PURE__*/React.createElement("span", {
    className: "material-symbols-rounded",
    style: {
      fontSize: 18,
      color: 'var(--color-text-tertiary)'
    }
  }, "chevron_right"))))), /*#__PURE__*/React.createElement("style", null, `
        @keyframes page-in { from { opacity: 0; transform: translateX(16px); } to { opacity: 1; transform: translateX(0); } }
        .fk-no-scrollbar { scrollbar-width: none; -ms-overflow-style: none; }
        .fk-no-scrollbar::-webkit-scrollbar { display: none; width: 0; height: 0; }
      `));
}
window.AboutApp = AboutApp;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/freshkeep-app/screens/AboutApp.jsx", error: String((e && e.message) || e) }); }

// ui_kits/freshkeep-app/screens/AddFood.jsx
try { (() => {
const FK_CATEGORIES = [{
  key: 'vegetables',
  label: 'Vegetables',
  icon: 'nutrition',
  tone: 'green'
}, {
  key: 'fruits',
  label: 'Fruits',
  icon: 'eco',
  tone: 'green'
}, {
  key: 'frozen',
  label: 'Frozen',
  icon: 'ac_unit',
  tone: 'blue'
}, {
  key: 'meat',
  label: 'Meat',
  icon: 'kebab_dining',
  tone: 'red'
}, {
  key: 'fish',
  label: 'Fish',
  icon: 'set_meal',
  tone: 'blue'
}, {
  key: 'milk',
  label: 'Milk',
  icon: 'water_drop',
  tone: 'blue'
}, {
  key: 'snacks',
  label: 'Snacks',
  icon: 'cookie',
  tone: 'orange'
}, {
  key: 'drinks',
  label: 'Drinks',
  icon: 'local_bar',
  tone: 'orange'
}, {
  key: 'rice',
  label: 'Rice',
  icon: 'rice_bowl',
  tone: 'orange'
}, {
  key: 'spices',
  label: 'Spices',
  icon: 'spa',
  tone: 'red'
}, {
  key: 'others',
  label: 'Others',
  icon: 'category',
  tone: 'green'
}];
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
  others: [['Bread', 5], ['Eggs', 21]]
};
const FK_DEFAULT_UNIT = {
  'Tomato': 'Kg',
  'Potato': 'Kg',
  'Onion': 'Kg',
  'Carrot': 'Kg',
  'Broccoli': 'Kg',
  'Cucumber': 'Piece',
  'Apple': 'Piece',
  'Banana': 'Piece',
  'Orange': 'Piece',
  'Grapes': 'Kg',
  'Frozen Chicken': 'Kg',
  'Frozen Peas': 'Packet',
  'Ice Cream': 'Packet',
  'Chicken Breast': 'Kg',
  'Ground Beef': 'Kg',
  'Bacon': 'Packet',
  'Salmon': 'Kg',
  'Shrimp': 'Kg',
  'Tuna': 'Kg',
  'Milk': 'Liter',
  'Yogurt': 'Packet',
  'Cheese': 'Packet',
  'Chips': 'Packet',
  'Cookies': 'Packet',
  'Crackers': 'Packet',
  'Orange Juice': 'Bottle',
  'Soda': 'Bottle',
  'Sparkling Water': 'Bottle',
  'White Rice': 'Kg',
  'Basmati Rice': 'Kg',
  'Cumin': 'Packet',
  'Paprika': 'Packet',
  'Black Pepper': 'Packet',
  'Bread': 'Packet',
  'Eggs': 'Piece'
};
function defaultUnitFor(name) {
  return FK_DEFAULT_UNIT[name] || 'Kg';
}
const UNIT_STEP = {
  Kg: 0.5,
  Gram: 50,
  Piece: 1,
  Bottle: 1,
  Packet: 1,
  Liter: 0.5
};
const UNIT_DEFAULT_QTY = {
  Kg: 1,
  Gram: 500,
  Piece: 1,
  Bottle: 1,
  Packet: 1,
  Liter: 1
};
const WHEEL_TICK_W = 56;
const WHEEL_FRICTION = 0.94; // velocity decay per ~16ms frame
const WHEEL_MIN_VELOCITY = 0.01; // index/ms below which momentum stops

function formatQtyValue(value) {
  return Number.isInteger(value) ? String(value) : value.toFixed(1).replace(/\.0$/, '');
}
function InfiniteQuantityWheel({
  value,
  onChange,
  step,
  unit
}) {
  const {
    useRef,
    useState,
    useEffect
  } = React;
  const trackRef = useRef(null);
  const [pos, setPos] = useState(value / step);
  const drag = useRef({
    dragging: false,
    lastX: 0,
    lastT: 0,
    velocity: 0
  });
  const rafRef = useRef(null);
  const lastHapticIdx = useRef(Math.round(value / step));
  const posRef = useRef(pos);
  posRef.current = pos;

  // Keep wheel in sync if parent value/step changes externally (e.g. unit switch)
  useEffect(() => {
    const target = value / step;
    if (Math.abs(target - posRef.current) > 0.01) setPos(target);
  }, [value, step]);
  function haptic() {
    try {
      navigator.vibrate && navigator.vibrate(3);
    } catch (e) {}
  }
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
      if (t < 1) rafRef.current = requestAnimationFrame(tick);else rafRef.current = null;
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
    try {
      trackRef.current.setPointerCapture(e.pointerId);
    } catch (err) {}
    drag.current = {
      dragging: true,
      lastX: e.clientX,
      lastT: performance.now(),
      velocity: 0
    };
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
    if (Math.abs(drag.current.velocity) > WHEEL_MIN_VELOCITY) runMomentum();else snapTo(Math.round(posRef.current));
  }
  function onWheelEvent(e) {
    e.preventDefault();
    stopMomentum();
    const delta = e.deltaX || e.deltaY;
    commit(posRef.current + delta / WHEEL_TICK_W);
    clearTimeout(onWheelEvent._t);
    onWheelEvent._t = setTimeout(() => snapTo(Math.round(posRef.current)), 140);
  }
  const centerIdx = Math.round(pos);
  const RANGE = 10;
  const ticks = [];
  for (let i = Math.max(0, centerIdx - RANGE); i <= centerIdx + RANGE; i++) ticks.push(i);
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: 20,
      width: '100%'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      font: 'var(--text-numeral-lg)',
      fontFamily: 'var(--font-display)',
      fontSize: 44,
      color: 'var(--color-text-primary)',
      transition: 'opacity 100ms'
    }
  }, formatQtyValue(value), " ", unit), /*#__PURE__*/React.createElement("div", {
    ref: trackRef,
    onPointerDown: onPointerDown,
    onPointerMove: onPointerMove,
    onPointerUp: onPointerUp,
    onPointerCancel: onPointerUp,
    onWheel: onWheelEvent,
    style: {
      position: 'relative',
      width: '100%',
      height: 90,
      overflow: 'hidden',
      touchAction: 'none',
      cursor: 'grab',
      borderRadius: 'var(--radius-lg)',
      background: 'var(--color-bg-section)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      left: '50%',
      top: 14,
      bottom: 14,
      width: WHEEL_TICK_W,
      marginLeft: -WHEEL_TICK_W / 2,
      background: 'var(--color-primary-surface)',
      borderRadius: 'var(--radius-md)'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      top: 0,
      left: '50%',
      height: '100%',
      transform: `translateX(${-pos * WHEEL_TICK_W}px)`
    }
  }, ticks.map(i => {
    const isCenter = i === centerIdx;
    const dist = Math.abs(i - pos);
    return /*#__PURE__*/React.createElement("div", {
      key: i,
      style: {
        position: 'absolute',
        left: i * WHEEL_TICK_W - WHEEL_TICK_W / 2,
        top: 0,
        width: WHEEL_TICK_W,
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'var(--font-display)',
        fontWeight: isCenter ? 700 : 500,
        fontSize: isCenter ? 22 : 16,
        color: isCenter ? 'var(--color-text-primary)' : 'var(--color-text-tertiary)',
        opacity: Math.max(0.25, 1 - dist * 0.18)
      }
    }, formatQtyValue(i * step));
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      pointerEvents: 'none',
      background: 'linear-gradient(to right, var(--color-bg-section), transparent 20%, transparent 80%, var(--color-bg-section))'
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      font: 'var(--text-caption)',
      color: 'var(--color-text-tertiary)'
    }
  }, "Drag to scroll \xB7 flick for momentum"));
}
function WheelWithLimit({
  label,
  unitLabel,
  value,
  onChange,
  max,
  onExpandLimit,
  expandTo,
  capMax
}) {
  const items = Array.from({
    length: max + 1
  }, (_, i) => i);
  const atCap = capMax !== undefined && max >= capMax;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minWidth: 0,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: 8,
      animation: 'wheel-in 240ms var(--ease-out-soft)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      font: 'var(--text-label)',
      color: 'var(--color-text-secondary)'
    }
  }, label), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      width: '100%'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      left: 4,
      right: 4,
      top: WHEEL_ITEM_H * 2,
      height: WHEEL_ITEM_H,
      background: 'var(--color-primary-surface)',
      borderRadius: 'var(--radius-md)',
      zIndex: -1
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      zIndex: 1,
      pointerEvents: 'none',
      background: 'linear-gradient(var(--color-bg-section), transparent 34%, transparent 66%, var(--color-bg-section))'
    }
  }), /*#__PURE__*/React.createElement(WheelColumn, {
    items: items,
    index: value,
    onChange: onChange
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 6
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      font: 'var(--text-caption)',
      color: 'var(--color-text-tertiary)'
    }
  }, "Maximum: ", max, " ", label), !atCap && /*#__PURE__*/React.createElement("button", {
    onClick: () => onExpandLimit(Math.min(capMax || Infinity, max + expandTo)),
    style: {
      width: 26,
      height: 26,
      borderRadius: '50%',
      border: 'none',
      background: 'var(--color-primary-surface)',
      color: 'var(--color-primary-press)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexShrink: 0
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "material-symbols-rounded",
    style: {
      fontSize: 15
    }
  }, "add"))));
}
function DateWheelSheet({
  initialDate,
  onCancel,
  onConfirm
}) {
  const {
    useState
  } = React;
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const days = Array.from({
    length: 31
  }, (_, i) => i + 1);
  const thisYear = new Date().getFullYear();
  const years = Array.from({
    length: 11
  }, (_, i) => thisYear + i);
  const [dayIdx, setDayIdx] = useState(initialDate.getDate() - 1);
  const [monthIdx, setMonthIdx] = useState(initialDate.getMonth());
  const [yearIdx, setYearIdx] = useState(Math.max(0, years.indexOf(initialDate.getFullYear())));
  function confirm() {
    onConfirm(new Date(years[yearIdx], monthIdx, days[dayIdx]));
  }
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      background: 'var(--color-overlay-scrim)',
      display: 'flex',
      alignItems: 'flex-end',
      zIndex: 40
    },
    onClick: onCancel
  }, /*#__PURE__*/React.createElement("div", {
    onClick: e => e.stopPropagation(),
    style: {
      width: '100%',
      background: 'var(--color-bg)',
      borderRadius: 'var(--radius-xl) var(--radius-xl) 0 0',
      padding: '0 0 24px',
      display: 'flex',
      flexDirection: 'column',
      gap: 8,
      animation: 'sheet-up 220ms var(--ease-out-soft)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 40,
      height: 4,
      borderRadius: 'var(--radius-pill)',
      background: 'var(--gray-200)',
      alignSelf: 'center',
      marginTop: 12
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '12px 20px 4px'
    }
  }, /*#__PURE__*/React.createElement("button", {
    onClick: onCancel,
    style: {
      border: 'none',
      background: 'transparent',
      font: 'var(--text-label)',
      color: 'var(--color-text-secondary)',
      padding: 8
    }
  }, "Cancel"), /*#__PURE__*/React.createElement("span", {
    style: {
      font: 'var(--text-h3)',
      fontFamily: 'var(--font-display)'
    }
  }, "Exact Expiry Date"), /*#__PURE__*/React.createElement("button", {
    onClick: confirm,
    style: {
      border: 'none',
      background: 'transparent',
      font: 'var(--text-label)',
      color: 'var(--color-primary-press)',
      fontWeight: 700,
      padding: 8
    }
  }, "Done")), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      padding: '8px 20px 0'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      left: 20,
      right: 20,
      top: WHEEL_ITEM_H * 2 + 8,
      height: WHEEL_ITEM_H,
      background: 'var(--color-primary-surface)',
      borderRadius: 'var(--radius-md)',
      zIndex: -1
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      left: 20,
      right: 20,
      top: 8,
      height: WHEEL_ITEM_H * WHEEL_VISIBLE,
      zIndex: 1,
      pointerEvents: 'none',
      background: 'linear-gradient(var(--color-bg), transparent 30%, transparent 70%, var(--color-bg))'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex'
    }
  }, /*#__PURE__*/React.createElement(WheelColumn, {
    items: days,
    index: dayIdx,
    onChange: setDayIdx
  }), /*#__PURE__*/React.createElement(WheelColumn, {
    items: months,
    index: monthIdx,
    onChange: setMonthIdx
  }), /*#__PURE__*/React.createElement(WheelColumn, {
    items: years,
    index: yearIdx,
    onChange: setYearIdx
  })))));
}
function FullScreenCalendar({
  initialDate,
  onCancel,
  onConfirm
}) {
  const {
    useState
  } = React;
  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const [viewMonth, setViewMonth] = useState(initialDate.getMonth());
  const [viewYear, setViewYear] = useState(initialDate.getFullYear());
  const [selected, setSelected] = useState(initialDate);
  const years = Array.from({
    length: 10
  }, (_, i) => new Date().getFullYear() + i);
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
    let m = viewMonth + delta,
      y = viewYear;
    if (m < 0) {
      m = 11;
      y -= 1;
    }
    if (m > 11) {
      m = 0;
      y += 1;
    }
    setViewMonth(m);
    setViewYear(y);
  }
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      background: 'var(--color-bg)',
      zIndex: 40,
      display: 'flex',
      flexDirection: 'column',
      animation: 'sheet-up 260ms var(--ease-out-soft)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '20px 16px 8px'
    }
  }, /*#__PURE__*/React.createElement("button", {
    onClick: onCancel,
    style: {
      border: 'none',
      background: 'transparent',
      font: 'var(--text-label)',
      color: 'var(--color-text-secondary)',
      padding: 10
    }
  }, "Cancel"), /*#__PURE__*/React.createElement("span", {
    style: {
      font: 'var(--text-h3)',
      fontFamily: 'var(--font-display)'
    }
  }, "Exact Expiry Date"), /*#__PURE__*/React.createElement("button", {
    onClick: () => onConfirm(selected),
    style: {
      border: 'none',
      background: 'transparent',
      font: 'var(--text-label)',
      color: 'var(--color-primary-press)',
      padding: 10,
      fontWeight: 700
    }
  }, "Done")), /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: 'center',
      padding: '8px 0 16px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      font: 'var(--text-display)',
      fontFamily: 'var(--font-display)',
      color: 'var(--color-primary-press)'
    }
  }, selected.toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      overflowY: 'auto',
      padding: '0 20px 24px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: 8
    }
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => shiftMonth(-1),
    style: {
      width: 40,
      height: 40,
      borderRadius: '50%',
      border: 'none',
      background: 'var(--color-bg-section)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "material-symbols-rounded",
    style: {
      fontSize: 20
    }
  }, "chevron_left")), /*#__PURE__*/React.createElement("span", {
    style: {
      font: 'var(--text-h3)',
      fontFamily: 'var(--font-display)'
    }
  }, monthNames[viewMonth], " ", viewYear), /*#__PURE__*/React.createElement("button", {
    onClick: () => shiftMonth(1),
    style: {
      width: 40,
      height: 40,
      borderRadius: '50%',
      border: 'none',
      background: 'var(--color-bg-section)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "material-symbols-rounded",
    style: {
      fontSize: 20
    }
  }, "chevron_right"))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(7, 1fr)',
      gap: 6,
      marginBottom: 8
    }
  }, ['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((d, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      textAlign: 'center',
      font: 'var(--text-caption)',
      color: 'var(--color-text-tertiary)'
    }
  }, d))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(7, 1fr)',
      gap: 6,
      marginBottom: 20
    }
  }, daysInGrid().map((d, i) => {
    const isSelected = d && selected.getDate() === d && selected.getMonth() === viewMonth && selected.getFullYear() === viewYear;
    return /*#__PURE__*/React.createElement("button", {
      key: i,
      disabled: !d,
      onClick: () => setSelected(new Date(viewYear, viewMonth, d)),
      style: {
        aspectRatio: '1/1',
        border: 'none',
        borderRadius: '50%',
        background: isSelected ? 'var(--color-primary)' : 'transparent',
        color: isSelected ? '#fff' : d ? 'var(--color-text-primary)' : 'transparent',
        font: 'var(--text-body)',
        fontWeight: isSelected ? 700 : 500
      }
    }, d || '');
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      font: 'var(--text-label)',
      color: 'var(--color-text-secondary)',
      marginBottom: 10
    }
  }, "Year"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 8,
      overflowX: 'auto',
      paddingBottom: 4
    }
  }, years.map(y => /*#__PURE__*/React.createElement("button", {
    key: y,
    onClick: () => setViewYear(y),
    style: {
      flexShrink: 0,
      border: 'none',
      padding: '8px 16px',
      borderRadius: 'var(--radius-pill)',
      background: y === viewYear ? 'var(--color-primary)' : 'var(--color-bg-section)',
      color: y === viewYear ? '#fff' : 'var(--color-text-secondary)',
      font: 'var(--text-label)'
    }
  }, y)))));
}
function DYSlider({
  label,
  value,
  onChange,
  rangeMax,
  onExpand,
  step: expandStep,
  unitLabel,
  capMax
}) {
  const {
    useRef,
    useState
  } = React;
  const trackRef = useRef(null);
  const [dragging, setDragging] = useState(false);
  const atCap = capMax !== undefined && rangeMax >= capMax;
  function setFromClientX(clientX) {
    const rect = trackRef.current.getBoundingClientRect();
    const ratio = Math.min(1, Math.max(0, (clientX - rect.left) / rect.width));
    onChange(Math.round(ratio * rangeMax));
  }
  const pct = rangeMax > 0 ? Math.min(100, value / rangeMax * 100) : 0;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      background: 'var(--color-bg-elevated)',
      borderRadius: 'var(--radius-lg)',
      boxShadow: 'var(--shadow-xs)',
      padding: '18px 18px 20px',
      display: 'flex',
      flexDirection: 'column',
      gap: 14,
      animation: 'wheel-in 240ms var(--ease-out-soft)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      font: 'var(--text-h3)',
      fontFamily: 'var(--font-display)',
      color: 'var(--color-primary-press)',
      transition: 'all 150ms var(--ease-out-soft)'
    }
  }, value, " ", label), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 12
    }
  }, /*#__PURE__*/React.createElement("div", {
    ref: trackRef,
    onPointerDown: e => {
      e.currentTarget.setPointerCapture(e.pointerId);
      setDragging(true);
      setFromClientX(e.clientX);
    },
    onPointerMove: e => {
      if (e.buttons === 1) setFromClientX(e.clientX);
    },
    onPointerUp: () => setDragging(false),
    style: {
      position: 'relative',
      flex: 1,
      height: 40,
      display: 'flex',
      alignItems: 'center',
      cursor: 'pointer'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      left: 0,
      right: 0,
      height: 8,
      borderRadius: 'var(--radius-pill)',
      background: 'var(--gray-200)'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      left: 0,
      height: 8,
      borderRadius: 'var(--radius-pill)',
      background: 'var(--color-primary)',
      width: `${pct}%`,
      transition: dragging ? 'none' : 'width 260ms var(--ease-out-soft)'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      left: `${pct}%`,
      width: 26,
      height: 26,
      marginLeft: -13,
      borderRadius: '50%',
      background: '#fff',
      border: '3px solid var(--color-primary)',
      boxShadow: 'var(--shadow-md)',
      transition: dragging ? 'none' : 'left 260ms var(--ease-out-soft)'
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 8,
      flexShrink: 0,
      alignItems: 'flex-start'
    }
  }, /*#__PURE__*/React.createElement(RangeExpandControls, {
    rangeMax: rangeMax,
    onExpand: onExpand,
    step: expandStep,
    capMax: capMax,
    floor: expandStep,
    unitLabel: label
  }))));
}
function InfiniteDurationWheel({
  value,
  onChange
}) {
  const {
    useRef,
    useState,
    useEffect
  } = React;
  const trackRef = useRef(null);
  const [pos, setPos] = useState(value);
  const drag = useRef({
    dragging: false,
    lastX: 0,
    lastT: 0,
    velocity: 0
  });
  const rafRef = useRef(null);
  const lastHapticIdx = useRef(Math.round(value));
  const posRef = useRef(pos);
  posRef.current = pos;
  useEffect(() => {
    if (Math.abs(value - posRef.current) > 0.01) setPos(value);
  }, [value]);
  function haptic() {
    try {
      navigator.vibrate && navigator.vibrate(3);
    } catch (e) {}
  }
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
      if (t < 1) rafRef.current = requestAnimationFrame(tick);else rafRef.current = null;
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
    try {
      trackRef.current.setPointerCapture(e.pointerId);
    } catch (err) {}
    drag.current = {
      dragging: true,
      lastX: e.clientX,
      lastT: performance.now(),
      velocity: 0
    };
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
    if (Math.abs(drag.current.velocity) > WHEEL_MIN_VELOCITY) runMomentum();else snapTo(Math.round(posRef.current));
  }
  function onWheelEvent(e) {
    e.preventDefault();
    stopMomentum();
    const delta = e.deltaX || e.deltaY;
    commit(posRef.current + delta / WHEEL_TICK_W);
    clearTimeout(onWheelEvent._t);
    onWheelEvent._t = setTimeout(() => snapTo(Math.round(posRef.current)), 140);
  }
  const centerIdx = Math.round(pos);
  const RANGE = 10;
  const ticks = [];
  for (let i = Math.max(0, centerIdx - RANGE); i <= centerIdx + RANGE; i++) ticks.push(i);
  return /*#__PURE__*/React.createElement("div", {
    ref: trackRef,
    onPointerDown: onPointerDown,
    onPointerMove: onPointerMove,
    onPointerUp: onPointerUp,
    onPointerCancel: onPointerUp,
    onWheel: onWheelEvent,
    style: {
      position: 'relative',
      width: '100%',
      height: 90,
      overflow: 'hidden',
      touchAction: 'none',
      cursor: 'grab',
      borderRadius: 'var(--radius-lg)',
      background: 'var(--color-bg-section)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      left: '50%',
      top: 14,
      bottom: 14,
      width: WHEEL_TICK_W,
      marginLeft: -WHEEL_TICK_W / 2,
      background: 'var(--color-primary-surface)',
      borderRadius: 'var(--radius-md)'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      top: 0,
      left: '50%',
      height: '100%',
      transform: `translateX(${-pos * WHEEL_TICK_W}px)`
    }
  }, ticks.map(i => {
    const isCenter = i === centerIdx;
    const dist = Math.abs(i - pos);
    return /*#__PURE__*/React.createElement("div", {
      key: i,
      style: {
        position: 'absolute',
        left: i * WHEEL_TICK_W - WHEEL_TICK_W / 2,
        top: 0,
        width: WHEEL_TICK_W,
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'var(--font-display)',
        fontWeight: isCenter ? 700 : 500,
        fontSize: isCenter ? 22 : 16,
        color: isCenter ? 'var(--color-text-primary)' : 'var(--color-text-tertiary)',
        opacity: Math.max(0.25, 1 - dist * 0.18)
      }
    }, i);
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      pointerEvents: 'none',
      background: 'linear-gradient(to right, var(--color-bg-section), transparent 20%, transparent 80%, var(--color-bg-section))'
    }
  }));
}
function QuantityStepper({
  value,
  onChange
}) {
  const {
    useRef
  } = React;
  const timerRef = useRef(null);
  const delayRef = useRef(null);
  function haptic() {
    try {
      navigator.vibrate && navigator.vibrate(8);
    } catch (e) {}
  }
  function step(delta) {
    haptic();
    onChange(v => Math.max(1, v + delta));
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
  function StepButton({
    icon,
    delta
  }) {
    const [pressed, setPressed] = React.useState(false);
    return /*#__PURE__*/React.createElement("button", {
      onPointerDown: () => {
        setPressed(true);
        startRepeat(delta);
      },
      onPointerUp: () => {
        setPressed(false);
        stopRepeat();
      },
      onPointerLeave: () => {
        setPressed(false);
        stopRepeat();
      },
      style: {
        width: 64,
        height: 64,
        borderRadius: '50%',
        border: 'none',
        background: 'var(--color-primary-surface)',
        color: 'var(--color-primary-press)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        transform: pressed ? 'scale(0.9)' : 'scale(1)',
        transition: 'transform 120ms var(--ease-bounce)'
      }
    }, /*#__PURE__*/React.createElement("span", {
      className: "material-symbols-rounded",
      style: {
        fontSize: 32
      }
    }, icon));
  }
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: 16
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      font: 'var(--text-label)',
      color: 'var(--color-text-secondary)'
    }
  }, "Quantity"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 32
    }
  }, /*#__PURE__*/React.createElement(StepButton, {
    icon: "remove",
    delta: -1
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      font: 'var(--text-numeral-lg)',
      fontFamily: 'var(--font-display)',
      fontSize: 40,
      color: 'var(--color-text-primary)',
      minWidth: 56,
      textAlign: 'center'
    }
  }, value), /*#__PURE__*/React.createElement(StepButton, {
    icon: "add",
    delta: 1
  })));
}
const FK_DEFAULT_EXPIRY = {
  'Tomato': 7,
  'Potato': 30,
  'Onion': 30,
  'Carrot': 21,
  'Broccoli': 7,
  'Cucumber': 10,
  'Apple': 21,
  'Banana': 6,
  'Orange': 14,
  'Grapes': 7,
  'Frozen Chicken': 90,
  'Frozen Peas': 180,
  'Ice Cream': 120,
  'Chicken Breast': 3,
  'Ground Beef': 3,
  'Bacon': 7,
  'Salmon': 2,
  'Shrimp': 2,
  'Tuna': 3,
  'Milk': 5,
  'Yogurt': 14,
  'Cheese': 21,
  'Chips': 60,
  'Cookies': 45,
  'Crackers': 90,
  'Biscuits': 180,
  'Orange Juice': 10,
  'Soda': 180,
  'Sparkling Water': 270,
  'Juice': 180,
  'White Rice': 365,
  'Basmati Rice': 365,
  'Rice': 365,
  'Cumin': 730,
  'Paprika': 730,
  'Black Pepper': 730,
  'Bread': 4,
  'Eggs': 21,
  'Egg': 21,
  'Chocolate': 365
};
const FK_PACKAGED_PRODUCTS = new Set(['Milk', 'Yogurt', 'Butter', 'Cheese', 'Bread', 'Biscuits', 'Cookies', 'Chips', 'Chocolate', 'Juice', 'Orange Juice', 'Soda', 'Sparkling Water', 'Soft Drink', 'Frozen Chicken', 'Frozen Peas', 'Ice Cream', 'Bacon', 'Sauce', 'Ketchup', 'Mayonnaise', 'Jam', 'Baby Food', 'Canned Food', 'White Rice', 'Basmati Rice', 'Rice', 'Cumin', 'Paprika', 'Black Pepper', 'Crackers']);
function isPackagedProduct(name) {
  return FK_PACKAGED_PRODUCTS.has(name);
}
const WHEEL_ITEM_H = 40;
const WHEEL_VISIBLE = 5;
function WheelColumn({
  items,
  index,
  onChange
}) {
  const {
    useRef,
    useEffect
  } = React;
  const ref = useRef(null);
  const scrollTimer = useRef(null);
  const padding = WHEEL_ITEM_H * (WHEEL_VISIBLE - 1) / 2;
  useEffect(() => {
    if (ref.current) ref.current.scrollTop = index * WHEEL_ITEM_H;
  }, []);
  function handleScroll() {
    clearTimeout(scrollTimer.current);
    scrollTimer.current = setTimeout(() => {
      if (!ref.current) return;
      const i = Math.round(ref.current.scrollTop / WHEEL_ITEM_H);
      const clamped = Math.max(0, Math.min(items.length - 1, i));
      ref.current.scrollTo({
        top: clamped * WHEEL_ITEM_H,
        behavior: 'smooth'
      });
      onChange(clamped);
    }, 120);
  }
  return /*#__PURE__*/React.createElement("div", {
    ref: ref,
    onScroll: handleScroll,
    style: {
      height: WHEEL_ITEM_H * WHEEL_VISIBLE,
      overflowY: 'auto',
      scrollSnapType: 'y mandatory',
      padding: `${padding}px 0`,
      width: '100%'
    }
  }, items.map((it, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      height: WHEEL_ITEM_H,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      scrollSnapAlign: 'center',
      fontFamily: 'var(--font-display)',
      fontWeight: i === index ? 700 : 500,
      fontSize: i === index ? 20 : 16,
      color: i === index ? 'var(--color-text-primary)' : 'var(--color-text-tertiary)',
      transition: 'color 120ms, font-size 120ms'
    }
  }, it)));
}
function WheelDatePicker({
  initialDate,
  onCancel,
  onConfirm
}) {
  const {
    useState
  } = React;
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const days = Array.from({
    length: 31
  }, (_, i) => i + 1);
  const thisYear = initialDate.getFullYear();
  const years = Array.from({
    length: 6
  }, (_, i) => thisYear + i);
  const [dayIdx, setDayIdx] = useState(initialDate.getDate() - 1);
  const [monthIdx, setMonthIdx] = useState(initialDate.getMonth());
  const [yearIdx, setYearIdx] = useState(0);
  function confirm() {
    const d = new Date(years[yearIdx], monthIdx, days[dayIdx]);
    onConfirm(d);
  }
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      background: 'var(--color-overlay-scrim)',
      display: 'flex',
      alignItems: 'flex-end',
      zIndex: 35
    },
    onClick: onCancel
  }, /*#__PURE__*/React.createElement("div", {
    onClick: e => e.stopPropagation(),
    style: {
      width: '100%',
      background: 'var(--color-bg)',
      borderRadius: 'var(--radius-xl) var(--radius-xl) 0 0',
      padding: 24,
      display: 'flex',
      flexDirection: 'column',
      gap: 16,
      animation: 'sheet-up 220ms var(--ease-out-soft)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 40,
      height: 4,
      borderRadius: 'var(--radius-pill)',
      background: 'var(--gray-200)',
      alignSelf: 'center'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      font: 'var(--text-h2)',
      fontFamily: 'var(--font-display)',
      textAlign: 'center'
    }
  }, "Select expiry date"), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      left: 0,
      right: 0,
      top: WHEEL_ITEM_H * 2,
      height: WHEEL_ITEM_H,
      background: 'var(--color-primary-surface)',
      borderRadius: 'var(--radius-md)',
      zIndex: -1
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex'
    }
  }, /*#__PURE__*/React.createElement(WheelColumn, {
    items: days,
    index: dayIdx,
    onChange: setDayIdx
  }), /*#__PURE__*/React.createElement(WheelColumn, {
    items: months,
    index: monthIdx,
    onChange: setMonthIdx
  }), /*#__PURE__*/React.createElement(WheelColumn, {
    items: years,
    index: yearIdx,
    onChange: setYearIdx
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 10
    }
  }, /*#__PURE__*/React.createElement(Button2, {
    variant: "ghost",
    onClick: onCancel,
    style: {
      flex: 1
    }
  }, "Cancel"), /*#__PURE__*/React.createElement(Button2, {
    variant: "primary",
    onClick: confirm,
    style: {
      flex: 1
    }
  }, "Confirm"))));
}
function Button2(props) {
  const {
    Button
  } = window.SmartHouseholdFoodManagementDesignSystem_8f59ea;
  return /*#__PURE__*/React.createElement(Button, props);
}
function AddFood({
  onFinish,
  onCancel,
  customCategories: customCategoriesProp,
  onCustomCategoriesChange
}) {
  const {
    useState
  } = React;
  const {
    Button,
    IconButton,
    TopBar,
    Chip,
    Slider,
    SuccessCelebration,
    TextField
  } = window.SmartHouseholdFoodManagementDesignSystem_8f59ea;
  const FK_CATEGORY_ILLUSTRATION = {
    vegetables: 'vegetables',
    fruits: 'fruits',
    frozen: 'frozen',
    meat: 'meat',
    fish: 'fish',
    milk: 'milk',
    snacks: 'snacks',
    drinks: 'drinks',
    rice: 'rice',
    spices: 'spices',
    others: 'others'
  };
  const CUSTOM_ICON_CHOICES = ['category', 'star', 'bakery_dining', 'icecream', 'liquor', 'egg', 'grass', 'ramen_dining', 'cake', 'coffee'];
  const CUSTOM_COLOR_CHOICES = [{
    tone: 'green',
    swatch: 'var(--green-500)'
  }, {
    tone: 'orange',
    swatch: 'var(--orange-500)'
  }, {
    tone: 'red',
    swatch: 'var(--red-500)'
  }, {
    tone: 'blue',
    swatch: 'var(--blue-500)'
  }];
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
    setHiddenCategoryKeys(prev => new Set([...prev, key]));
  }
  function hideProduct(categoryKey, name) {
    setHiddenProductNames(prev => {
      const set = new Set(prev[categoryKey] || []);
      set.add(name);
      return {
        ...prev,
        [categoryKey]: set
      };
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
    try {
      return JSON.parse(localStorage.getItem('fk-custom-products') || '{}');
    } catch (e) {
      return {};
    }
  });
  React.useEffect(() => {
    try {
      localStorage.setItem('fk-custom-products', JSON.stringify(customProducts));
    } catch (e) {}
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
      if ((customProducts[key] || []).some(p => p.name.toLowerCase() === norm)) {
        return FK_CATEGORIES.find(c => c.key === key) || customCategories.find(c => c.key === key) || null;
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
    if (durationType === 'days') setDaysVal(v);else if (durationType === 'months') setMonthsVal(v);else setYearsVal(v);
  }
  const durationTypeLabel = durationType === 'days' ? durationVal === 1 ? 'Day' : 'Days' : durationType === 'months' ? durationVal === 1 ? 'Month' : 'Months' : durationVal === 1 ? 'Year' : 'Years';
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
    if (type === 'days') d.setDate(d.getDate() + val);else if (type === 'months') d.setMonth(d.getMonth() + val);else d.setFullYear(d.getFullYear() + val);
    return d;
  }
  const estimatedExpiryDate = computeEstimatedDate(durationType, durationVal);
  function openCreateProductSheet() {
    setEditingProductName(null);
    setDraftProductName('');
    setDraftProductImageMode('icon');
    setDraftProductUnit(category ? category.units ? category.units[0] : 'Kg' : 'Kg');
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
      custom: true
    };
    setCustomProducts(prev => {
      const list = prev[key] || [];
      const filtered = list.filter(p => p.name !== editingProductName);
      return {
        ...prev,
        [key]: [...filtered, entry]
      };
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
    setCustomProducts(prev => ({
      ...prev,
      [category.key]: (prev[category.key] || []).filter(p => p.name !== name)
    }));
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
      setCustomCategories(customCategories.map(c => c.key === editingKey ? {
        ...c,
        label: name,
        icon: draftIcon,
        tone: draftTone
      } : c));
      setToast('Category updated.');
    } else {
      const key = 'custom-' + Date.now();
      setCustomCategories([...customCategories, {
        key,
        label: name,
        icon: draftIcon,
        tone: draftTone,
        custom: true
      }]);
      setJustAddedKey(key);
      setToast('Custom category created successfully.');
      setTimeout(() => setJustAddedKey(null), 500);
    }
    setSheetOpen(false);
    setTimeout(() => setToast(null), 2200);
  }
  function deleteCategory(key) {
    setCustomCategories(customCategories.filter(c => c.key !== key));
    setSheetOpen(false);
    setToast('Category deleted.');
    setTimeout(() => setToast(null), 2200);
  }
  const stepTitles = {
    1: 'Choose a category',
    2: 'Choose a product',
    3: 'How much?',
    4: 'Expiry date'
  };
  if (step === 5) {
    return /*#__PURE__*/React.createElement("div", {
      style: {
        position: 'absolute',
        inset: 0,
        background: 'var(--color-bg)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }
    }, /*#__PURE__*/React.createElement(SuccessCelebration, {
      message: "Food added!",
      sublabel: `We'll remind you before your ${product || 'item'} expires`,
      onDone: onFinish
    }));
  }
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      background: 'var(--color-bg)',
      display: 'flex',
      flexDirection: 'column'
    }
  }, /*#__PURE__*/React.createElement(TopBar, {
    title: stepTitles[step],
    onBack: () => step === 1 ? onCancel() : setStep(step - 1),
    action: step === 1 ? /*#__PURE__*/React.createElement("button", {
      onClick: skipCategory,
      style: {
        border: 'none',
        background: 'transparent',
        font: 'var(--text-label)',
        color: 'var(--color-text-tertiary)',
        padding: 8
      }
    }, "Skip") : undefined
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 6,
      padding: '0 20px 16px'
    }
  }, [1, 2, 3, 4].map(n => /*#__PURE__*/React.createElement("div", {
    key: n,
    style: {
      flex: 1,
      height: 4,
      borderRadius: 'var(--radius-pill)',
      background: n <= step ? 'var(--color-primary)' : 'var(--gray-200)'
    }
  }))), /*#__PURE__*/React.createElement("div", {
    className: "fk-no-scrollbar",
    style: {
      flex: 1,
      overflowY: 'auto',
      padding: '4px 20px 20px'
    }
  }, step === 1 && /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(3, 1fr)',
      gap: 14
    }
  }, FK_CATEGORIES.filter(c => !hiddenCategoryKeys.has(c.key)).map(c => /*#__PURE__*/React.createElement(RemovableCard, {
    key: c.key,
    onSelect: () => selectCategory(c),
    onRemove: () => hideCategory(c.key),
    removeTitle: "Remove Category?",
    removeMessage: "Are you sure you want to remove this category?"
  }, /*#__PURE__*/React.createElement(FKCategoryCard, {
    label: c.label,
    icon: c.icon,
    illustration: FK_CATEGORY_ILLUSTRATION[c.key],
    tone: c.tone
  }))), customCategories.filter(c => !hiddenCategoryKeys.has(c.key)).map(c => /*#__PURE__*/React.createElement(RemovableCard, {
    key: c.key,
    onSelect: () => selectCategory(c),
    onRemove: () => hideCategory(c.key),
    popIn: justAddedKey === c.key,
    removeTitle: "Remove Category?",
    removeMessage: "Are you sure you want to remove this category?",
    secondaryAction: /*#__PURE__*/React.createElement("button", {
      onClick: e => {
        e.stopPropagation();
        openEditSheet(c);
      },
      style: {
        width: 24,
        height: 24,
        borderRadius: '50%',
        border: 'none',
        background: 'rgba(255,255,255,0.92)',
        boxShadow: 'var(--shadow-xs)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      },
      "aria-label": "Edit category"
    }, /*#__PURE__*/React.createElement("span", {
      className: "material-symbols-rounded",
      style: {
        fontSize: 14,
        color: 'var(--color-text-secondary)'
      }
    }, "edit"))
  }, /*#__PURE__*/React.createElement(FKCategoryCard, {
    label: c.label,
    icon: c.icon,
    tone: c.tone
  }))), /*#__PURE__*/React.createElement("button", {
    onClick: openCreateSheet,
    style: {
      cursor: 'pointer',
      border: 'none',
      background: 'transparent',
      padding: 0,
      width: '100%'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 10,
      width: '100%',
      aspectRatio: '1 / 1',
      borderRadius: 'var(--radius-lg)',
      background: 'var(--color-bg-section)',
      border: '2px dashed var(--color-border-strong)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "material-symbols-rounded",
    style: {
      fontSize: 32,
      color: 'var(--color-text-secondary)'
    }
  }, "add"), /*#__PURE__*/React.createElement("span", {
    style: {
      font: 'var(--text-h3)',
      fontFamily: 'var(--font-display)',
      fontSize: 14,
      color: 'var(--color-text-secondary)'
    }
  }, "Custom Category")))), step === 2 && category && !category.custom && /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(2, 1fr)',
      gap: 14,
      marginBottom: 20
    }
  }, (FK_PRODUCTS[category.key] || []).filter(([name]) => !(hiddenProductNames[category.key] || new Set()).has(name)).map(([name, days]) => /*#__PURE__*/React.createElement(RemovableCard, {
    key: name,
    onSelect: () => selectProduct(name, days),
    onRemove: () => hideProduct(category.key, name),
    removeTitle: "Remove Product?",
    removeMessage: "Are you sure you want to remove this product?"
  }, /*#__PURE__*/React.createElement(FKCategoryCard, {
    label: name,
    icon: category.icon,
    illustration: window.fkIllustration ? window.fkIllustration(name) : category.key,
    tone: category.tone
  }))), (customProducts[category.key] || []).filter(p => !(hiddenProductNames[category.key] || new Set()).has(p.name)).map(p => /*#__PURE__*/React.createElement(RemovableCard, {
    key: p.name,
    onSelect: () => selectProduct(p.name, p.expiryDays, p.unit),
    onRemove: () => hideProduct(category.key, p.name),
    popIn: justAddedProduct === p.name,
    removeTitle: "Remove Product?",
    removeMessage: "Are you sure you want to remove this product?",
    secondaryAction: /*#__PURE__*/React.createElement("button", {
      onClick: e => {
        e.stopPropagation();
        openEditProductSheet(p);
      },
      style: {
        width: 24,
        height: 24,
        borderRadius: '50%',
        border: 'none',
        background: 'rgba(255,255,255,0.92)',
        boxShadow: 'var(--shadow-xs)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      },
      "aria-label": "Edit product"
    }, /*#__PURE__*/React.createElement("span", {
      className: "material-symbols-rounded",
      style: {
        fontSize: 14,
        color: 'var(--color-text-secondary)'
      }
    }, "edit"))
  }, /*#__PURE__*/React.createElement(FKCategoryCard, {
    label: p.name,
    icon: category.icon,
    illustration: window.fkIllustration ? window.fkIllustration(p.name) : category.key,
    tone: category.tone
  }))), /*#__PURE__*/React.createElement("button", {
    onClick: openCreateProductSheet,
    style: {
      cursor: 'pointer',
      border: 'none',
      background: 'transparent',
      padding: 0,
      width: '100%'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 10,
      width: '100%',
      aspectRatio: '1 / 1',
      borderRadius: 'var(--radius-lg)',
      background: 'var(--color-bg-section)',
      border: '2px dashed var(--color-border-strong)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "material-symbols-rounded",
    style: {
      fontSize: 32,
      color: 'var(--color-text-secondary)'
    }
  }, "add"), /*#__PURE__*/React.createElement("span", {
    style: {
      font: 'var(--text-h3)',
      fontFamily: 'var(--font-display)',
      fontSize: 14,
      color: 'var(--color-text-secondary)',
      textAlign: 'center'
    }
  }, "Add Custom Product")))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 12,
      color: 'var(--color-text-tertiary)',
      marginBottom: 16
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      height: 1,
      background: 'var(--color-divider)'
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      font: 'var(--text-caption)'
    }
  }, "OR"), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      height: 1,
      background: 'var(--color-divider)'
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 10
    }
  }, /*#__PURE__*/React.createElement(TextField, {
    placeholder: "Type a food name",
    value: manualStep2Name,
    onChange: setManualStep2Name,
    style: {
      flex: 1
    }
  }), /*#__PURE__*/React.createElement(Button, {
    variant: "secondary",
    disabled: !manualStep2Name.trim(),
    onClick: () => selectProduct(manualStep2Name.trim(), 14)
  }, "Use"))), step === 2 && !category && /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 20,
      paddingTop: 12
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      font: 'var(--text-body)',
      color: 'var(--color-text-secondary)'
    }
  }, "No category chosen \u2014 just tell us what you got and we'll figure out the rest."), /*#__PURE__*/React.createElement(TextField, {
    label: "Food name",
    placeholder: "e.g. Tomato, Milk, Hilsa\u2026",
    value: manualStep2Name,
    onChange: setManualStep2Name,
    icon: "restaurant"
  }), /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    fullWidth: true,
    disabled: !manualStep2Name.trim(),
    onClick: () => selectProduct(manualStep2Name.trim(), 14)
  }, "Continue"), /*#__PURE__*/React.createElement("button", {
    onClick: () => setStep(1),
    style: {
      border: 'none',
      background: 'transparent',
      color: 'var(--color-primary-press)',
      font: 'var(--text-label)',
      alignSelf: 'center'
    }
  }, "Choose a category instead")), step === 2 && category && category.custom && /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 20,
      paddingTop: 12
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      font: 'var(--text-body)',
      color: 'var(--color-text-secondary)'
    }
  }, "No preset products yet for \"", category.label, "\" \u2014 name your item."), /*#__PURE__*/React.createElement(TextField, {
    label: "Item name",
    placeholder: "e.g. Homemade pickle",
    value: customProductName,
    onChange: setCustomProductName,
    icon: category.icon
  }), /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    fullWidth: true,
    disabled: !customProductName.trim(),
    onClick: () => selectProduct(customProductName.trim(), 7)
  }, "Continue")), step === 3 && /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 32,
      paddingTop: 20
    }
  }, category && /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 8
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      font: 'var(--text-caption)',
      color: 'var(--color-text-tertiary)'
    }
  }, "Category: ", category.label), /*#__PURE__*/React.createElement("button", {
    onClick: () => setStep(1),
    style: {
      border: 'none',
      background: 'transparent',
      color: 'var(--color-primary-press)',
      font: 'var(--text-caption)'
    }
  }, "Change")), /*#__PURE__*/React.createElement(InfiniteQuantityWheel, {
    value: qty,
    onChange: setQty,
    step: UNIT_STEP[unit] || 1,
    unit: unit
  }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      font: 'var(--text-label)',
      color: 'var(--color-text-secondary)',
      marginBottom: 10
    }
  }, "Unit"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: 10
    }
  }, units.map(u => /*#__PURE__*/React.createElement(Chip, {
    key: u,
    label: u,
    selected: unit === u,
    onClick: () => setUnit(u),
    tone: "green"
  }))))), step === 4 && /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 24,
      paddingTop: 4
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: 'center'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      font: '500 17px var(--font-body)',
      color: '#666666'
    }
  }, "Expires after"), /*#__PURE__*/React.createElement("div", {
    style: {
      font: '700 40px var(--font-display)',
      color: '#1A1A1A',
      marginTop: 4,
      transition: 'all 150ms var(--ease-out-soft)'
    }
  }, expiryMode === 'date' ? selectedDate && selectedDate.toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  }) : friendlyDuration)), expiryMode === 'duration' && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      font: 'var(--text-label)',
      color: 'var(--color-text-secondary)',
      marginBottom: 10,
      textAlign: 'center'
    }
  }, "Expiry Duration Type"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 10,
      justifyContent: 'center'
    }
  }, [['days', 'Days'], ['months', 'Months'], ['years', 'Years']].map(([key, label]) => /*#__PURE__*/React.createElement(Chip, {
    key: key,
    label: label,
    selected: durationType === key,
    onClick: () => toggleDurationType(key),
    tone: "green"
  })))), /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: 'center'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      font: 'var(--text-numeral)',
      fontFamily: 'var(--font-display)',
      color: 'var(--color-primary-press)',
      marginBottom: 10
    }
  }, durationVal, " ", durationTypeLabel), /*#__PURE__*/React.createElement(InfiniteDurationWheel, {
    key: durationType,
    value: durationVal,
    onChange: setDurationVal
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      background: 'var(--color-bg-section)',
      borderRadius: 'var(--radius-lg)',
      padding: 18,
      display: 'flex',
      flexDirection: 'column',
      gap: 8
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      font: 'var(--text-body-sm)',
      color: 'var(--color-text-secondary)'
    }
  }, "Today's date"), /*#__PURE__*/React.createElement("span", {
    style: {
      font: 'var(--text-body-sm)',
      fontWeight: 600
    }
  }, new Date().toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      font: 'var(--text-body-sm)',
      color: 'var(--color-text-secondary)'
    }
  }, "Selected duration"), /*#__PURE__*/React.createElement("span", {
    style: {
      font: 'var(--text-body-sm)',
      fontWeight: 600
    }
  }, durationVal, " ", durationTypeLabel)), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      font: 'var(--text-body-sm)',
      color: 'var(--color-text-secondary)'
    }
  }, "Estimated expiry date"), /*#__PURE__*/React.createElement("span", {
    style: {
      font: 'var(--text-body-sm)',
      fontWeight: 700,
      color: 'var(--color-primary-press)'
    }
  }, estimatedExpiryDate.toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  })))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 12,
      color: 'var(--color-text-tertiary)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      height: 1,
      background: 'var(--color-divider)'
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      font: 'var(--text-caption)'
    }
  }, "OR"), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      height: 1,
      background: 'var(--color-divider)'
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      background: 'var(--color-bg-elevated)',
      borderRadius: 'var(--radius-lg)',
      boxShadow: 'var(--shadow-sm)',
      padding: 20,
      display: 'flex',
      flexDirection: 'column',
      gap: 12,
      alignItems: 'center',
      textAlign: 'center'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      font: 'var(--text-h3)',
      fontFamily: 'var(--font-display)'
    }
  }, "Exact Expiry Date"), /*#__PURE__*/React.createElement("div", {
    style: {
      font: 'var(--text-body-sm)',
      color: 'var(--color-text-secondary)'
    }
  }, "Choose the exact calendar date."), /*#__PURE__*/React.createElement(Button, {
    variant: "secondary",
    fullWidth: true,
    icon: /*#__PURE__*/React.createElement("span", {
      className: "material-symbols-rounded",
      style: {
        fontSize: 18
      }
    }, "calendar_month"),
    onClick: () => setDatePickerOpen(true)
  }, selectedDate ? selectedDate.toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  }) : 'Add Date'))), expiryMode === 'date' && /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: 'center',
      background: 'var(--color-primary-surface)',
      borderRadius: 'var(--radius-lg)',
      padding: 24,
      display: 'flex',
      flexDirection: 'column',
      gap: 6
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      font: 'var(--text-body-lg)',
      color: 'var(--color-text-primary)'
    }
  }, "Expires in ", selectedDate ? Math.max(0, Math.ceil((selectedDate - new Date().setHours(0, 0, 0, 0)) / 86400000)) : 0, " days"), /*#__PURE__*/React.createElement("button", {
    onClick: () => setExpiryMode('duration'),
    style: {
      border: 'none',
      background: 'transparent',
      color: 'var(--color-primary-press)',
      font: 'var(--text-label)',
      marginTop: 8
    }
  }, "Use duration instead")))), (step === 3 || step === 4) && /*#__PURE__*/React.createElement("div", {
    style: {
      padding: 20
    }
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    fullWidth: true,
    onClick: () => step === 4 ? setStep(5) : setStep(step + 1)
  }, step === 4 ? 'Save' : 'Continue')), datePickerOpen && /*#__PURE__*/React.createElement(DateWheelSheet, {
    initialDate: selectedDate || new Date(Date.now() + daysVal * 86400000),
    onCancel: () => setDatePickerOpen(false),
    onConfirm: d => {
      setSelectedDate(d);
      setExpiryMode('date');
      setDatePickerOpen(false);
    }
  }), productCelebration && /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      background: 'var(--color-bg)',
      zIndex: 40,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }
  }, /*#__PURE__*/React.createElement(SuccessCelebration, {
    message: "Custom product added successfully.",
    onDone: () => setProductCelebration(false)
  })), productSheetOpen && /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      background: 'var(--color-overlay-scrim)',
      display: 'flex',
      alignItems: 'flex-end',
      zIndex: 30
    },
    onClick: () => setProductSheetOpen(false)
  }, /*#__PURE__*/React.createElement("div", {
    onClick: e => e.stopPropagation(),
    style: {
      width: '100%',
      maxHeight: '86%',
      overflowY: 'auto',
      background: 'var(--color-bg)',
      borderRadius: 'var(--radius-xl) var(--radius-xl) 0 0',
      padding: 24,
      display: 'flex',
      flexDirection: 'column',
      gap: 18,
      animation: 'sheet-up 220ms var(--ease-out-soft)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 40,
      height: 4,
      borderRadius: 'var(--radius-pill)',
      background: 'var(--gray-200)',
      alignSelf: 'center'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      font: 'var(--text-h2)',
      fontFamily: 'var(--font-display)'
    }
  }, editingProductName ? 'Edit product' : 'Add New Product'), /*#__PURE__*/React.createElement("div", {
    style: {
      font: 'var(--text-caption)',
      color: 'var(--color-text-tertiary)'
    }
  }, "Category: ", category?.label), /*#__PURE__*/React.createElement(TextField, {
    label: "Product name",
    placeholder: "e.g. Hilsa",
    value: draftProductName,
    onChange: setDraftProductName
  }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      font: 'var(--text-label)',
      color: 'var(--color-text-secondary)',
      marginBottom: 10
    }
  }, "Product image"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 10,
      flexWrap: 'wrap'
    }
  }, [['icon', 'category', 'Default Icon'], ['camera', 'photo_camera', 'Take Photo'], ['gallery', 'photo_library', 'Gallery']].map(([mode, ic, label]) => /*#__PURE__*/React.createElement("button", {
    key: mode,
    onClick: () => setDraftProductImageMode(mode),
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 6,
      padding: '10px 14px',
      borderRadius: 'var(--radius-pill)',
      border: 'none',
      background: draftProductImageMode === mode ? 'var(--color-primary-surface)' : 'var(--color-bg-section)',
      color: draftProductImageMode === mode ? 'var(--color-primary-press)' : 'var(--color-text-secondary)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "material-symbols-rounded",
    style: {
      fontSize: 18
    }
  }, ic), /*#__PURE__*/React.createElement("span", {
    style: {
      font: 'var(--text-label)'
    }
  }, label))))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      font: 'var(--text-label)',
      color: 'var(--color-text-secondary)',
      marginBottom: 10
    }
  }, "Default unit"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: 10
    }
  }, units.map(u => /*#__PURE__*/React.createElement(Chip, {
    key: u,
    label: u,
    selected: draftProductUnit === u,
    onClick: () => setDraftProductUnit(u),
    tone: "green"
  })))), /*#__PURE__*/React.createElement(TextField, {
    label: "Default expiry duration (days, optional)",
    placeholder: "e.g. 14",
    value: draftProductExpiry,
    onChange: setDraftProductExpiry,
    type: "number"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 10
    }
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "ghost",
    onClick: () => setProductSheetOpen(false),
    style: {
      flex: 1
    }
  }, "Cancel"), /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    onClick: saveCustomProduct,
    disabled: !draftProductName.trim(),
    style: {
      flex: 1
    }
  }, "Save")), editingProductName && /*#__PURE__*/React.createElement(Button, {
    variant: "danger",
    fullWidth: true,
    onClick: () => deleteCustomProduct(editingProductName)
  }, "Delete product"))), sheetOpen && /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      background: 'var(--color-overlay-scrim)',
      display: 'flex',
      alignItems: 'flex-end',
      zIndex: 30
    },
    onClick: () => setSheetOpen(false)
  }, /*#__PURE__*/React.createElement("div", {
    onClick: e => e.stopPropagation(),
    style: {
      width: '100%',
      background: 'var(--color-bg)',
      borderRadius: 'var(--radius-xl) var(--radius-xl) 0 0',
      padding: 24,
      display: 'flex',
      flexDirection: 'column',
      gap: 20,
      animation: 'sheet-up 220ms var(--ease-out-soft)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 40,
      height: 4,
      borderRadius: 'var(--radius-pill)',
      background: 'var(--gray-200)',
      alignSelf: 'center'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      font: 'var(--text-h2)',
      fontFamily: 'var(--font-display)'
    }
  }, editingKey ? 'Edit category' : 'Create custom category'), /*#__PURE__*/React.createElement(TextField, {
    label: "Category name",
    placeholder: "e.g. Baby Food",
    value: draftName,
    onChange: setDraftName
  }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      font: 'var(--text-label)',
      color: 'var(--color-text-secondary)',
      marginBottom: 10
    }
  }, "Icon"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: 10
    }
  }, CUSTOM_ICON_CHOICES.map(ic => /*#__PURE__*/React.createElement("button", {
    key: ic,
    onClick: () => setDraftIcon(ic),
    style: {
      width: 44,
      height: 44,
      borderRadius: 'var(--radius-md)',
      border: draftIcon === ic ? '2px solid var(--color-primary)' : '2px solid transparent',
      background: 'var(--color-bg-section)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "material-symbols-rounded",
    style: {
      fontSize: 22,
      color: 'var(--color-text-primary)'
    }
  }, ic))))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      font: 'var(--text-label)',
      color: 'var(--color-text-secondary)',
      marginBottom: 10
    }
  }, "Color"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 12
    }
  }, CUSTOM_COLOR_CHOICES.map(c => /*#__PURE__*/React.createElement("button", {
    key: c.tone,
    onClick: () => setDraftTone(c.tone),
    style: {
      width: 40,
      height: 40,
      borderRadius: '50%',
      background: c.swatch,
      border: draftTone === c.tone ? '3px solid var(--color-text-primary)' : '3px solid transparent'
    },
    "aria-label": c.tone
  })))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 10
    }
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "ghost",
    onClick: () => setSheetOpen(false),
    style: {
      flex: 1
    }
  }, "Cancel"), /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    onClick: saveCategory,
    disabled: !draftName.trim(),
    style: {
      flex: 1
    }
  }, editingKey ? 'Save' : 'Create Category')), editingKey && /*#__PURE__*/React.createElement(Button, {
    variant: "danger",
    fullWidth: true,
    onClick: () => deleteCategory(editingKey)
  }, "Delete category"))), toast && /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      bottom: 24,
      left: '50%',
      transform: 'translateX(-50%)',
      background: 'var(--gray-900)',
      color: '#fff',
      padding: '12px 20px',
      borderRadius: 'var(--radius-pill)',
      font: 'var(--text-label)',
      fontFamily: 'var(--font-body)',
      boxShadow: 'var(--shadow-lg)',
      animation: 'toast-in 220ms var(--ease-out-soft)',
      zIndex: 40,
      whiteSpace: 'nowrap'
    }
  }, toast), /*#__PURE__*/React.createElement("style", null, `
        @keyframes cat-pop { from { transform: scale(0.7); opacity: 0; } to { transform: scale(1); opacity: 1; } }
        .fk-no-scrollbar { scrollbar-width: none; -ms-overflow-style: none; }
        .fk-no-scrollbar::-webkit-scrollbar { display: none; width: 0; height: 0; }
        @keyframes wheel-in { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes sheet-up { from { transform: translateY(40px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
        @keyframes toast-in { from { transform: translate(-50%, 12px); opacity: 0; } to { transform: translate(-50%, 0); opacity: 1; } }
      `));
}
function FKCategoryCard({
  label,
  icon,
  illustration,
  tone
}) {
  const {
    CategoryCard
  } = window.SmartHouseholdFoodManagementDesignSystem_8f59ea;
  return /*#__PURE__*/React.createElement(CategoryCard, {
    label: label,
    icon: icon,
    illustration: illustration,
    tone: tone
  });
}
function RemoveConfirmDialog({
  title,
  message,
  onCancel,
  onConfirm
}) {
  const dialog = /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'fixed',
      inset: 0,
      background: 'var(--color-overlay-scrim)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 999
    },
    onClick: onCancel
  }, /*#__PURE__*/React.createElement("div", {
    onClick: e => e.stopPropagation(),
    style: {
      width: '82%',
      maxWidth: 340,
      background: 'var(--color-bg)',
      borderRadius: 'var(--radius-lg)',
      padding: 22,
      display: 'flex',
      flexDirection: 'column',
      gap: 16,
      animation: 'rc-dialog-in 200ms var(--ease-out-soft)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      font: 'var(--text-h3)',
      fontFamily: 'var(--font-display)'
    }
  }, title), /*#__PURE__*/React.createElement("div", {
    style: {
      font: 'var(--text-body-sm)',
      color: 'var(--color-text-secondary)'
    }
  }, message), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 10
    }
  }, /*#__PURE__*/React.createElement("button", {
    onClick: onCancel,
    style: {
      flex: 1,
      border: 'none',
      background: 'var(--color-bg-section)',
      color: 'var(--color-text-primary)',
      borderRadius: 'var(--radius-pill)',
      padding: '12px',
      font: 'var(--text-label)'
    }
  }, "Cancel"), /*#__PURE__*/React.createElement("button", {
    onClick: onConfirm,
    style: {
      flex: 1,
      border: 'none',
      background: 'var(--color-accent-red)',
      color: '#fff',
      borderRadius: 'var(--radius-pill)',
      padding: '12px',
      font: 'var(--text-label)'
    }
  }, "Remove"))), /*#__PURE__*/React.createElement("style", null, `@keyframes rc-dialog-in { from { opacity: 0; transform: scale(0.92); } to { opacity: 1; transform: scale(1); } }`));
  // Portal to <body> so this overlay is never subject to an ancestor's CSS
  // transform (a transformed ancestor becomes the containing block for
  // position:fixed descendants, which would shrink/clip the dialog).
  return ReactDOM.createPortal(dialog, document.body);
}
function RemovableCard({
  onSelect,
  onRemove,
  secondaryAction,
  children,
  popIn,
  removeTitle,
  removeMessage
}) {
  const {
    useState
  } = React;
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
  return /*#__PURE__*/React.createElement("div", {
    onClick: removing ? undefined : onSelect,
    style: {
      position: 'relative',
      cursor: 'pointer',
      ...(removing ? {
        transform: 'scale(0.85)'
      } : null),
      opacity: removing ? 0 : 1,
      transition: 'transform 180ms var(--ease-out-soft), opacity 180ms var(--ease-out-soft)',
      animation: popIn ? 'cat-pop 420ms var(--ease-bounce)' : 'none'
    }
  }, children, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      top: 6,
      right: 6,
      display: 'flex',
      gap: 4,
      zIndex: 2
    }
  }, secondaryAction, /*#__PURE__*/React.createElement("button", {
    onClick: requestRemove,
    "aria-label": "Remove",
    style: {
      width: 24,
      height: 24,
      borderRadius: '50%',
      border: 'none',
      background: 'rgba(255,255,255,0.92)',
      boxShadow: 'var(--shadow-xs)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "material-symbols-rounded",
    style: {
      fontSize: 14,
      color: 'var(--color-text-secondary)'
    }
  }, "close"))), confirmOpen && /*#__PURE__*/React.createElement(RemoveConfirmDialog, {
    title: removeTitle,
    message: removeMessage,
    onCancel: () => setConfirmOpen(false),
    onConfirm: confirmRemove
  }));
}
window.AddFood = AddFood;

// ---- Shared master catalog (single source of truth for Add Food + Shopping) ----
window.FK_CATEGORIES = FK_CATEGORIES;
window.FK_PRODUCTS = FK_PRODUCTS;
window.FK_CATEGORY_ILLUSTRATION = {
  vegetables: 'vegetables',
  fruits: 'fruits',
  frozen: 'frozen',
  meat: 'meat',
  fish: 'fish',
  milk: 'milk',
  snacks: 'snacks',
  drinks: 'drinks',
  rice: 'rice',
  spices: 'spices',
  others: 'others'
};
// Returns { categories:[{key,label,icon,tone,custom?}], productsByCat:{key:[{name,unit,illustration}]} }
// merging built-in + custom categories/products so both modules render identical data.
window.fkGetCatalog = function (customCategories) {
  const categories = [...FK_CATEGORIES, ...(customCategories || [])];
  let customProducts = {};
  try {
    customProducts = JSON.parse(localStorage.getItem('fk-custom-products') || '{}');
  } catch (e) {}
  const productsByCat = {};
  categories.forEach(c => {
    const builtin = (FK_PRODUCTS[c.key] || []).map(([name, days]) => ({
      name,
      expiryDays: days,
      illustration: window.fkIllustration ? window.fkIllustration(name) : window.FK_CATEGORY_ILLUSTRATION[c.key] || c.key,
      unit: 'Piece'
    }));
    const custom = (customProducts[c.key] || []).map(p => ({
      name: p.name,
      expiryDays: p.expiryDays,
      unit: p.unit || 'Piece',
      illustration: p.illustration || (window.fkIllustration ? window.fkIllustration(p.name) : window.FK_CATEGORY_ILLUSTRATION[c.key] || c.key),
      custom: true
    }));
    productsByCat[c.key] = [...builtin, ...custom];
  });
  return {
    categories,
    productsByCat
  };
};
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/freshkeep-app/screens/AddFood.jsx", error: String((e && e.message) || e) }); }

// ui_kits/freshkeep-app/screens/AdjustQuantity.jsx
try { (() => {
const AQ_UNIT_STEP = {
  Kg: 0.5,
  Gram: 50,
  Piece: 1,
  Bottle: 1,
  Packet: 1,
  Liter: 0.5
};
const AQ_TICK_W = 56;
const AQ_FRICTION = 0.94;
const AQ_MIN_VELOCITY = 0.01;
function aqFormat(v) {
  return Number.isInteger(v) ? String(v) : v.toFixed(1).replace(/\.0$/, '');
}

// Same infinite-wheel physics as the Add Food quantity picker (momentum, friction,
// snap-to-center, haptic tick feedback) — duplicated locally so this screen has no
// cross-file dependency on AddFood.jsx.
function AdjustQuantityWheel({
  value,
  onChange,
  step
}) {
  const {
    useRef,
    useState,
    useEffect
  } = React;
  const trackRef = useRef(null);
  const [pos, setPos] = useState(value / step);
  const drag = useRef({
    dragging: false,
    lastX: 0,
    lastT: 0,
    velocity: 0
  });
  const rafRef = useRef(null);
  const lastHapticIdx = useRef(Math.round(value / step));
  const posRef = useRef(pos);
  posRef.current = pos;
  useEffect(() => {
    const target = value / step;
    if (Math.abs(target - posRef.current) > 0.01) setPos(target);
  }, [value, step]);
  function haptic() {
    try {
      navigator.vibrate && navigator.vibrate(3);
    } catch (e) {}
  }
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
      commit(start + (target - start) * eased);
      if (t < 1) rafRef.current = requestAnimationFrame(tick);else rafRef.current = null;
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
      if (Math.abs(drag.current.velocity) < AQ_MIN_VELOCITY) {
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
    try {
      trackRef.current.setPointerCapture(e.pointerId);
    } catch (err) {}
    drag.current = {
      dragging: true,
      lastX: e.clientX,
      lastT: performance.now(),
      velocity: 0
    };
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
    if (Math.abs(drag.current.velocity) > AQ_MIN_VELOCITY) runMomentum();else snapTo(Math.round(posRef.current));
  }
  function onWheelEvent(e) {
    e.preventDefault();
    stopMomentum();
    const delta = e.deltaX || e.deltaY;
    commit(posRef.current + delta / AQ_TICK_W);
    clearTimeout(onWheelEvent._t);
    onWheelEvent._t = setTimeout(() => snapTo(Math.round(posRef.current)), 140);
  }
  const centerIdx = Math.round(pos);
  const RANGE = 10;
  const ticks = [];
  for (let i = Math.max(0, centerIdx - RANGE); i <= centerIdx + RANGE; i++) ticks.push(i);
  return /*#__PURE__*/React.createElement("div", {
    ref: trackRef,
    onPointerDown: onPointerDown,
    onPointerMove: onPointerMove,
    onPointerUp: onPointerUp,
    onPointerCancel: onPointerUp,
    onWheel: onWheelEvent,
    style: {
      position: 'relative',
      width: '100%',
      height: 90,
      overflow: 'hidden',
      touchAction: 'none',
      cursor: 'grab',
      borderRadius: 'var(--radius-lg)',
      background: 'var(--color-bg-section)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      left: '50%',
      top: 14,
      bottom: 14,
      width: AQ_TICK_W,
      marginLeft: -AQ_TICK_W / 2,
      background: 'var(--color-primary-surface)',
      borderRadius: 'var(--radius-md)'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      top: 0,
      left: '50%',
      height: '100%',
      transform: `translateX(${-pos * AQ_TICK_W}px)`
    }
  }, ticks.map(i => {
    const isCenter = i === centerIdx;
    const dist = Math.abs(i - pos);
    return /*#__PURE__*/React.createElement("div", {
      key: i,
      style: {
        position: 'absolute',
        left: i * AQ_TICK_W - AQ_TICK_W / 2,
        top: 0,
        width: AQ_TICK_W,
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'var(--font-display)',
        fontWeight: isCenter ? 700 : 500,
        fontSize: isCenter ? 22 : 16,
        color: isCenter ? 'var(--color-text-primary)' : 'var(--color-text-tertiary)',
        opacity: Math.max(0.25, 1 - dist * 0.18)
      }
    }, aqFormat(i * step));
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      pointerEvents: 'none',
      background: 'linear-gradient(to right, var(--color-bg-section), transparent 20%, transparent 80%, var(--color-bg-section))'
    }
  }));
}
function AdjustQuantity({
  item,
  onCancel,
  onSave
}) {
  const {
    useState
  } = React;
  const {
    Button,
    TopBar,
    Chip,
    FoodIllustration
  } = window.SmartHouseholdFoodManagementDesignSystem_8f59ea;
  const parsed = (() => {
    const m = String(item.quantity || '1 Piece').match(/^(\d+(?:\.\d+)?)\s*(.*)$/);
    return m ? {
      num: parseFloat(m[1]),
      unit: m[2] || 'Piece'
    } : {
      num: 1,
      unit: 'Piece'
    };
  })();
  const unitAliasMap = {
    pcs: 'Piece',
    kg: 'Kg',
    g: 'Gram',
    L: 'Liter',
    ml: 'Gram',
    pack: 'Packet',
    pc: 'Piece',
    pieces: 'Piece'
  };
  const [unit, setUnit] = useState(unitAliasMap[parsed.unit] || (AQ_UNIT_STEP[parsed.unit] ? parsed.unit : 'Piece'));
  const [qty, setQty] = useState(parsed.num);
  const units = ['Kg', 'Gram', 'Piece', 'Bottle', 'Packet', 'Liter'];
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      background: 'var(--color-bg)',
      zIndex: 30,
      display: 'flex',
      flexDirection: 'column',
      animation: 'aq-in 220ms var(--ease-out-soft)'
    }
  }, /*#__PURE__*/React.createElement(TopBar, {
    title: "Adjust Quantity",
    onBack: onCancel
  }), /*#__PURE__*/React.createElement("div", {
    className: "fk-no-scrollbar",
    style: {
      flex: 1,
      overflowY: 'auto',
      padding: '8px 20px 20px',
      display: 'flex',
      flexDirection: 'column',
      gap: 24
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 14,
      padding: 16,
      background: 'var(--color-bg-elevated)',
      borderRadius: 'var(--radius-lg)',
      boxShadow: 'var(--shadow-xs)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 48,
      height: 48,
      borderRadius: 'var(--radius-md)',
      background: 'var(--color-primary-surface)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: item.illustration ? 8 : 0,
      flexShrink: 0
    }
  }, item.illustration ? /*#__PURE__*/React.createElement(FoodIllustration, {
    type: item.illustration
  }) : /*#__PURE__*/React.createElement("span", {
    className: "material-symbols-rounded",
    style: {
      fontSize: 24,
      color: 'var(--color-primary-press)'
    }
  }, item.icon)), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      font: 'var(--text-h3)',
      fontFamily: 'var(--font-display)'
    }
  }, item.name), /*#__PURE__*/React.createElement("div", {
    style: {
      font: 'var(--text-body-sm)',
      color: 'var(--color-text-secondary)'
    }
  }, "Current quantity: ", item.quantity))), /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: 'center',
      font: 'var(--text-numeral-lg)',
      fontFamily: 'var(--font-display)',
      fontSize: 40,
      color: 'var(--color-primary-press)'
    }
  }, aqFormat(qty), " ", unit), /*#__PURE__*/React.createElement(AdjustQuantityWheel, {
    value: qty,
    onChange: setQty,
    step: AQ_UNIT_STEP[unit] || 1
  }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      font: 'var(--text-label)',
      color: 'var(--color-text-secondary)',
      marginBottom: 10
    }
  }, "Unit"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: 10
    }
  }, units.map(u => /*#__PURE__*/React.createElement(Chip, {
    key: u,
    label: u,
    selected: unit === u,
    onClick: () => setUnit(u),
    tone: "green"
  }))))), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: 20,
      display: 'flex',
      gap: 10
    }
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "ghost",
    onClick: onCancel,
    style: {
      flex: 1
    }
  }, "Cancel"), /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    onClick: () => onSave(`${aqFormat(qty)} ${unit}`),
    style: {
      flex: 2
    }
  }, "Save")), /*#__PURE__*/React.createElement("style", null, `
        @keyframes aq-in { from { opacity: 0; transform: translateX(16px); } to { opacity: 1; transform: translateX(0); } }
        .fk-no-scrollbar { scrollbar-width: none; -ms-overflow-style: none; }
        .fk-no-scrollbar::-webkit-scrollbar { display: none; width: 0; height: 0; }
      `));
}
window.AdjustQuantity = AdjustQuantity;
window.AdjustQuantityWheel = AdjustQuantityWheel;
window.aqFormat = aqFormat;
window.AQ_UNIT_STEP = AQ_UNIT_STEP;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/freshkeep-app/screens/AdjustQuantity.jsx", error: String((e && e.message) || e) }); }

// ui_kits/freshkeep-app/screens/Analytics.jsx
try { (() => {
const FILTERS = ['This Month', 'Last Month', 'Last 3 Months', 'Last 6 Months', 'This Year'];
const DASHBOARD_DATA = {
  'This Month': [{
    key: 'fresh',
    label: 'Fresh Food',
    icon: 'nutrition',
    color: 'var(--color-primary)',
    pct: 45
  }, {
    key: 'frozen',
    label: 'Frozen Food',
    icon: 'ac_unit',
    color: 'var(--blue-500)',
    pct: 20
  }, {
    key: 'pantry',
    label: 'Pantry Items',
    icon: 'inventory_2',
    color: 'var(--orange-500)',
    pct: 15
  }, {
    key: 'expiring',
    label: 'Expiring Soon',
    icon: 'schedule',
    color: '#FFD54F',
    pct: 10
  }, {
    key: 'wasted',
    label: 'Wasted',
    icon: 'delete',
    color: 'var(--red-500)',
    pct: 10
  }],
  'Last Month': [{
    key: 'fresh',
    label: 'Fresh Food',
    icon: 'nutrition',
    color: 'var(--color-primary)',
    pct: 40
  }, {
    key: 'frozen',
    label: 'Frozen Food',
    icon: 'ac_unit',
    color: 'var(--blue-500)',
    pct: 22
  }, {
    key: 'pantry',
    label: 'Pantry Items',
    icon: 'inventory_2',
    color: 'var(--orange-500)',
    pct: 16
  }, {
    key: 'expiring',
    label: 'Expiring Soon',
    icon: 'schedule',
    color: '#FFD54F',
    pct: 9
  }, {
    key: 'wasted',
    label: 'Wasted',
    icon: 'delete',
    color: 'var(--red-500)',
    pct: 13
  }],
  'Last 3 Months': [{
    key: 'fresh',
    label: 'Fresh Food',
    icon: 'nutrition',
    color: 'var(--color-primary)',
    pct: 42
  }, {
    key: 'frozen',
    label: 'Frozen Food',
    icon: 'ac_unit',
    color: 'var(--blue-500)',
    pct: 21
  }, {
    key: 'pantry',
    label: 'Pantry Items',
    icon: 'inventory_2',
    color: 'var(--orange-500)',
    pct: 16
  }, {
    key: 'expiring',
    label: 'Expiring Soon',
    icon: 'schedule',
    color: '#FFD54F',
    pct: 10
  }, {
    key: 'wasted',
    label: 'Wasted',
    icon: 'delete',
    color: 'var(--red-500)',
    pct: 11
  }],
  'Last 6 Months': [{
    key: 'fresh',
    label: 'Fresh Food',
    icon: 'nutrition',
    color: 'var(--color-primary)',
    pct: 44
  }, {
    key: 'frozen',
    label: 'Frozen Food',
    icon: 'ac_unit',
    color: 'var(--blue-500)',
    pct: 19
  }, {
    key: 'pantry',
    label: 'Pantry Items',
    icon: 'inventory_2',
    color: 'var(--orange-500)',
    pct: 17
  }, {
    key: 'expiring',
    label: 'Expiring Soon',
    icon: 'schedule',
    color: '#FFD54F',
    pct: 9
  }, {
    key: 'wasted',
    label: 'Wasted',
    icon: 'delete',
    color: 'var(--red-500)',
    pct: 11
  }],
  'This Year': [{
    key: 'fresh',
    label: 'Fresh Food',
    icon: 'nutrition',
    color: 'var(--color-primary)',
    pct: 46
  }, {
    key: 'frozen',
    label: 'Frozen Food',
    icon: 'ac_unit',
    color: 'var(--blue-500)',
    pct: 18
  }, {
    key: 'pantry',
    label: 'Pantry Items',
    icon: 'inventory_2',
    color: 'var(--orange-500)',
    pct: 18
  }, {
    key: 'expiring',
    label: 'Expiring Soon',
    icon: 'schedule',
    color: '#FFD54F',
    pct: 9
  }, {
    key: 'wasted',
    label: 'Wasted',
    icon: 'delete',
    color: 'var(--red-500)',
    pct: 9
  }]
};
const WASTE_DATA = {
  'This Month': [2, 4, 1.5, 3],
  'Last Month': [3, 3.5, 5, 2.5],
  'Last 3 Months': [2.8, 3.2, 3.6, 2.9],
  'Last 6 Months': [3.1, 2.7, 3.4, 3.0],
  'This Year': [2.9, 3.1, 3.3, 3.2]
};
const ITEM_COUNTS = {
  fresh: 18,
  frozen: 8,
  pantry: 6,
  expiring: 4,
  wasted: 4
};
function PieChart({
  data,
  size = 180
}) {
  const [animated, setAnimated] = React.useState(false);
  React.useEffect(() => {
    const t = setTimeout(() => setAnimated(true), 30);
    return () => clearTimeout(t);
  }, [data]);
  let cursor = 0;
  const stops = data.map(d => {
    const start = cursor;
    const end = cursor + (animated ? d.pct : 0);
    cursor = start + d.pct;
    return `${d.color} ${start}% ${animated ? end : start}%`;
  });
  return /*#__PURE__*/React.createElement("div", {
    style: {
      width: size,
      height: size,
      borderRadius: '50%',
      flexShrink: 0,
      background: `conic-gradient(${stops.join(', ')})`,
      transition: 'background 900ms var(--ease-out-soft)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: size * 0.6,
      height: size * 0.6,
      borderRadius: '50%',
      background: 'var(--color-bg-elevated)'
    }
  }));
}
function BarChart({
  values,
  maxVal
}) {
  const [grown, setGrown] = React.useState(false);
  React.useEffect(() => {
    setGrown(false);
    const t = setTimeout(() => setGrown(true), 30);
    return () => clearTimeout(t);
  }, [values]);
  const highest = Math.max(...values);
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'flex-end',
      gap: 16,
      height: 160,
      padding: '0 4px'
    }
  }, values.map((v, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: 8,
      height: '100%',
      justifyContent: 'flex-end'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      font: 'var(--text-label)',
      fontFamily: 'var(--font-display)',
      color: v === highest ? 'var(--orange-700)' : 'var(--color-text-secondary)',
      transition: 'all 300ms'
    }
  }, v, " kg"), /*#__PURE__*/React.createElement("div", {
    style: {
      width: '100%',
      maxWidth: 44,
      borderRadius: 'var(--radius-sm)',
      background: v === highest ? 'var(--orange-600)' : 'var(--color-primary)',
      height: grown ? `${v / maxVal * 110}px` : '0px',
      transition: 'height 600ms var(--ease-out-soft)'
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      font: 'var(--text-caption)',
      color: 'var(--color-text-tertiary)'
    }
  }, "Week ", i + 1))));
}
function computeInsight(waste, filter) {
  const total = waste.reduce((a, b) => a + b, 0);
  const highestIdx = waste.indexOf(Math.max(...waste));
  if (filter === 'Last Month') {
    return {
      positive: false,
      text: `Food waste increased during Week ${highestIdx + 1}. Consider consuming Expiring Soon items earlier.`
    };
  }
  return {
    positive: true,
    text: 'Great job! Food waste decreased by 20% compared to last month.'
  };
}
function computeMonthlyInsight() {
  const currentTotal = WASTE_DATA['This Month'].reduce((a, b) => a + b, 0);
  const previousTotal = WASTE_DATA['Last Month'].reduce((a, b) => a + b, 0);
  const rawPct = previousTotal === 0 ? 0 : (currentTotal - previousTotal) / previousTotal * 100;
  const pct = Math.round(rawPct);
  if (Math.abs(pct) < 3) {
    return {
      type: 'neutral',
      icon: 'info',
      sign: '≈',
      pct: 0,
      bg: 'var(--color-accent-blue-surface)',
      fg: 'var(--blue-700)',
      tooltip: 'Food waste remained nearly the same as last month.'
    };
  }
  if (pct < 0) {
    return {
      type: 'success',
      icon: 'check_circle',
      sign: '-',
      pct: Math.abs(pct),
      bg: 'var(--color-primary-surface)',
      fg: 'var(--green-700)',
      tooltip: `Food waste decreased by ${Math.abs(pct)}% compared to last month.`
    };
  }
  return {
    type: 'warning',
    icon: 'warning',
    sign: '+',
    pct,
    bg: 'var(--color-accent-orange-surface)',
    fg: 'var(--orange-700)',
    tooltip: `Food waste increased by ${pct}% compared to last month.`
  };
}
function MonthlyInsightBadge() {
  const {
    useState,
    useEffect
  } = React;
  const [visible, setVisible] = useState(false);
  const [tooltipOpen, setTooltipOpen] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 30);
    return () => clearTimeout(t);
  }, []);
  const insight = computeMonthlyInsight();
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative'
    }
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => setTooltipOpen(v => !v),
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 4,
      border: 'none',
      cursor: 'pointer',
      background: insight.bg,
      color: insight.fg,
      borderRadius: 'var(--radius-pill)',
      padding: '6px 12px',
      font: 'var(--text-caption)',
      fontFamily: 'var(--font-body)',
      fontWeight: 700,
      opacity: visible ? 1 : 0,
      transform: visible ? 'scale(1)' : 'scale(0.85)',
      transition: 'opacity 320ms var(--ease-out-soft), transform 320ms var(--ease-out-soft)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "material-symbols-rounded",
    style: {
      fontSize: 15
    }
  }, insight.icon), insight.sign, insight.pct, "%"), tooltipOpen && /*#__PURE__*/React.createElement("div", {
    onClick: () => setTooltipOpen(false),
    style: {
      position: 'absolute',
      top: 'calc(100% + 8px)',
      right: 0,
      zIndex: 20,
      background: 'var(--gray-900)',
      color: '#fff',
      borderRadius: 'var(--radius-md)',
      padding: '10px 14px',
      font: 'var(--text-body-sm)',
      width: 200,
      boxShadow: 'var(--shadow-lg)',
      animation: 'rc-dialog-in 160ms var(--ease-out-soft)'
    }
  }, insight.tooltip));
}
function Analytics({
  goTab
}) {
  const {
    useState
  } = React;
  const {
    BottomNav
  } = window.SmartHouseholdFoodManagementDesignSystem_8f59ea;
  const [filter, setFilter] = useState('This Month');
  const [filterOpen, setFilterOpen] = useState(false);
  const dashboard = DASHBOARD_DATA[filter];
  const waste = WASTE_DATA[filter];
  const maxVal = Math.max(...Object.values(WASTE_DATA).flat());
  const totalWaste = waste.reduce((a, b) => a + b, 0);
  const avgWaste = totalWaste / waste.length;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      background: 'var(--color-bg)',
      display: 'flex',
      flexDirection: 'column'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "fk-no-scrollbar",
    style: {
      flex: 1,
      overflowY: 'auto',
      padding: '28px 20px 100px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 20,
      position: 'relative'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      font: 'var(--text-h1)',
      fontFamily: 'var(--font-display)'
    }
  }, "Analytics"), /*#__PURE__*/React.createElement("button", {
    onClick: () => setFilterOpen(!filterOpen),
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 6,
      border: 'none',
      background: 'var(--color-bg-section)',
      borderRadius: 'var(--radius-pill)',
      padding: '8px 14px',
      color: 'var(--color-text-secondary)',
      font: 'var(--text-label)'
    }
  }, filter, /*#__PURE__*/React.createElement("span", {
    className: "material-symbols-rounded",
    style: {
      fontSize: 18
    }
  }, "expand_more")), filterOpen && /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      top: 44,
      right: 0,
      background: 'var(--color-bg-elevated)',
      borderRadius: 'var(--radius-lg)',
      boxShadow: 'var(--shadow-lg)',
      padding: 8,
      zIndex: 10,
      minWidth: 170
    }
  }, FILTERS.map(f => /*#__PURE__*/React.createElement("button", {
    key: f,
    onClick: () => {
      setFilter(f);
      setFilterOpen(false);
    },
    style: {
      display: 'flex',
      width: '100%',
      border: 'none',
      background: f === filter ? 'var(--color-primary-surface)' : 'transparent',
      color: f === filter ? 'var(--color-primary-press)' : 'var(--color-text-primary)',
      borderRadius: 'var(--radius-md)',
      padding: '10px 12px',
      font: 'var(--text-body)',
      textAlign: 'left'
    }
  }, f)))), /*#__PURE__*/React.createElement("div", {
    style: {
      background: 'var(--color-bg-elevated)',
      borderRadius: 'var(--radius-lg)',
      boxShadow: 'var(--shadow-sm)',
      padding: 20,
      marginBottom: 20
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      font: 'var(--text-h2)',
      fontFamily: 'var(--font-display)',
      marginBottom: 4
    }
  }, "Monthly Food Waste"), /*#__PURE__*/React.createElement("div", {
    style: {
      font: 'var(--text-body-sm)',
      color: 'var(--color-text-secondary)',
      marginBottom: 16
    }
  }, "Track how much food was wasted each week during this month."), /*#__PURE__*/React.createElement(BarChart, {
    values: waste,
    maxVal: maxVal
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 12,
      marginTop: 20
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      textAlign: 'center',
      background: 'var(--color-bg-section)',
      borderRadius: 'var(--radius-md)',
      padding: '12px 8px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      font: 'var(--text-h3)',
      fontFamily: 'var(--font-display)',
      color: 'var(--red-700)'
    }
  }, totalWaste.toFixed(1), " kg"), /*#__PURE__*/React.createElement("div", {
    style: {
      font: 'var(--text-caption)',
      color: 'var(--color-text-tertiary)'
    }
  }, "Total Wasted This Month")), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      textAlign: 'center',
      background: 'var(--color-bg-section)',
      borderRadius: 'var(--radius-md)',
      padding: '12px 8px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      font: 'var(--text-h3)',
      fontFamily: 'var(--font-display)',
      color: 'var(--color-primary-press)'
    }
  }, avgWaste.toFixed(1), " kg"), /*#__PURE__*/React.createElement("div", {
    style: {
      font: 'var(--text-caption)',
      color: 'var(--color-text-tertiary)'
    }
  }, "Average Waste Per Week")))), /*#__PURE__*/React.createElement("div", {
    style: {
      background: 'var(--color-bg-elevated)',
      borderRadius: 'var(--radius-lg)',
      boxShadow: 'var(--shadow-sm)',
      padding: 20
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      marginBottom: 16
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      font: 'var(--text-h2)',
      fontFamily: 'var(--font-display)'
    }
  }, "Food Management Dashboard"), /*#__PURE__*/React.createElement(MonthlyInsightBadge, null)), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'center',
      marginBottom: 20
    }
  }, /*#__PURE__*/React.createElement(PieChart, {
    data: dashboard
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 10
    }
  }, dashboard.map(d => /*#__PURE__*/React.createElement("div", {
    key: d.key,
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 10
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 12,
      height: 12,
      borderRadius: '50%',
      background: d.color,
      flexShrink: 0
    }
  }), /*#__PURE__*/React.createElement("span", {
    className: "material-symbols-rounded",
    style: {
      fontSize: 16,
      color: 'var(--color-text-secondary)'
    }
  }, d.icon), /*#__PURE__*/React.createElement("span", {
    style: {
      flex: 1,
      font: 'var(--text-body)'
    }
  }, d.label), /*#__PURE__*/React.createElement("span", {
    style: {
      font: 'var(--text-caption)',
      color: 'var(--color-text-tertiary)'
    }
  }, ITEM_COUNTS[d.key], " items"), /*#__PURE__*/React.createElement("span", {
    style: {
      font: 'var(--text-label)',
      fontFamily: 'var(--font-display)',
      minWidth: 36,
      textAlign: 'right'
    }
  }, d.pct, "%")))))), /*#__PURE__*/React.createElement(BottomNav, {
    active: "analytics",
    onChange: goTab
  }), /*#__PURE__*/React.createElement("style", null, `
        .fk-no-scrollbar { scrollbar-width: none; -ms-overflow-style: none; }
        .fk-no-scrollbar::-webkit-scrollbar { display: none; width: 0; height: 0; }
      `));
}
window.Analytics = Analytics;
window.computeMonthlyInsight = computeMonthlyInsight;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/freshkeep-app/screens/Analytics.jsx", error: String((e && e.message) || e) }); }

// ui_kits/freshkeep-app/screens/EatFirst.jsx
try { (() => {
function bucketFor(daysLeft) {
  if (daysLeft <= 0) return 'Expiring Today';
  if (daysLeft === 1) return 'Tomorrow';
  if (daysLeft <= 3) return 'Within 3 Days';
  return 'Within 7 Days';
}
function EatFirst({
  inventory,
  onBack,
  onConsume,
  onOpenFood
}) {
  const {
    TopBar,
    FoodIllustration,
    Button,
    FreshnessBar
  } = window.SmartHouseholdFoodManagementDesignSystem_8f59ea;
  const urgent = inventory.filter(i => (i.daysLeft ?? 99) <= 7).sort((a, b) => (a.daysLeft ?? 99) - (b.daysLeft ?? 99));
  const order = ['Expiring Today', 'Tomorrow', 'Within 3 Days', 'Within 7 Days'];
  const groups = order.map(label => ({
    label,
    items: urgent.filter(i => bucketFor(i.daysLeft) === label)
  })).filter(g => g.items.length > 0);
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      background: 'var(--color-bg)',
      display: 'flex',
      flexDirection: 'column',
      animation: 'ef-in 220ms var(--ease-out-soft)'
    }
  }, /*#__PURE__*/React.createElement(TopBar, {
    title: "Eat First",
    onBack: onBack
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      overflowY: 'auto',
      padding: '4px 20px 32px'
    }
  }, groups.length === 0 && /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: 'center',
      color: 'var(--color-text-tertiary)',
      padding: 40
    }
  }, "Nothing urgent \u2014 you're all caught up \uD83C\uDF89"), groups.map(g => {
    const isUrgent = g.label === 'Expiring Today' || g.label === 'Tomorrow';
    return /*#__PURE__*/React.createElement("div", {
      key: g.label,
      style: {
        marginBottom: 24
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'inline-flex',
        alignItems: 'center',
        gap: 6,
        marginBottom: 12,
        padding: '4px 12px',
        borderRadius: 'var(--radius-pill)',
        background: isUrgent ? 'var(--color-accent-red-surface)' : 'var(--color-accent-orange-surface)',
        color: isUrgent ? 'var(--red-700)' : 'var(--orange-700)'
      }
    }, /*#__PURE__*/React.createElement("span", {
      className: "material-symbols-rounded",
      style: {
        fontSize: 16
      }
    }, isUrgent ? 'warning' : 'schedule'), /*#__PURE__*/React.createElement("span", {
      style: {
        font: 'var(--text-label)',
        fontFamily: 'var(--font-body)'
      }
    }, g.label)), /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        flexDirection: 'column',
        gap: 10
      }
    }, g.items.map(item => /*#__PURE__*/React.createElement("div", {
      key: item.id,
      style: {
        display: 'flex',
        alignItems: 'center',
        gap: 14,
        padding: 14,
        borderRadius: 'var(--radius-lg)',
        background: 'var(--color-bg-elevated)',
        boxShadow: 'var(--shadow-sm)',
        borderLeft: isUrgent ? '4px solid var(--color-accent-red)' : '4px solid var(--color-accent-orange)'
      }
    }, /*#__PURE__*/React.createElement("button", {
      onClick: () => onOpenFood(item),
      style: {
        display: 'flex',
        alignItems: 'center',
        gap: 14,
        flex: 1,
        border: 'none',
        background: 'transparent',
        textAlign: 'left',
        padding: 0
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        width: 52,
        height: 52,
        borderRadius: 'var(--radius-md)',
        background: 'var(--color-bg-section)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
        padding: 8
      }
    }, item.illustration ? /*#__PURE__*/React.createElement(FoodIllustration, {
      type: item.illustration
    }) : /*#__PURE__*/React.createElement("span", {
      className: "material-symbols-rounded"
    }, item.icon)), /*#__PURE__*/React.createElement("div", {
      style: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        gap: 6
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        justifyContent: 'space-between'
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        font: 'var(--text-h3)',
        fontFamily: 'var(--font-display)',
        fontSize: 15
      }
    }, item.name), /*#__PURE__*/React.createElement("span", {
      style: {
        font: 'var(--text-body-sm)',
        color: 'var(--color-text-secondary)'
      }
    }, item.quantity)), /*#__PURE__*/React.createElement(FreshnessBar, {
      level: item.freshness,
      label: item.expiryLabel,
      expiredDays: item.expiredDays,
      daysLeft: item.daysLeft
    }))), /*#__PURE__*/React.createElement(Button, {
      variant: "secondary",
      size: "sm",
      onClick: () => onConsume(item.id)
    }, "Mark as Consumed")))));
  })), /*#__PURE__*/React.createElement("style", null, `@keyframes ef-in { from { opacity: 0; transform: translateY(12px); } to { opacity: 1; transform: translateY(0); } }`));
}
window.EatFirst = EatFirst;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/freshkeep-app/screens/EatFirst.jsx", error: String((e && e.message) || e) }); }

// ui_kits/freshkeep-app/screens/EditProduct.jsx
try { (() => {
const EP_CATEGORIES = [{
  key: 'vegetables',
  label: 'Vegetables',
  icon: 'nutrition'
}, {
  key: 'fruits',
  label: 'Fruits',
  icon: 'eco'
}, {
  key: 'frozen',
  label: 'Frozen',
  icon: 'ac_unit'
}, {
  key: 'meat',
  label: 'Meat',
  icon: 'kebab_dining'
}, {
  key: 'fish',
  label: 'Fish',
  icon: 'set_meal'
}, {
  key: 'milk',
  label: 'Milk',
  icon: 'water_drop'
}, {
  key: 'snacks',
  label: 'Snacks',
  icon: 'cookie'
}, {
  key: 'drinks',
  label: 'Drinks',
  icon: 'local_bar'
}, {
  key: 'rice',
  label: 'Rice',
  icon: 'rice_bowl'
}, {
  key: 'spices',
  label: 'Spices',
  icon: 'spa'
}, {
  key: 'others',
  label: 'Others',
  icon: 'category'
}];
function EditProduct({
  item,
  onCancel,
  onSave
}) {
  const {
    useState
  } = React;
  const {
    Button,
    TopBar,
    Chip,
    TextField,
    FoodIllustration
  } = window.SmartHouseholdFoodManagementDesignSystem_8f59ea;
  const AdjustQuantityWheel = window.AdjustQuantityWheel;
  const aqFormat = window.aqFormat;
  const AQ_UNIT_STEP = window.AQ_UNIT_STEP;
  const parsedQty = (() => {
    const m = String(item.quantity || '1 Piece').match(/^(\d+(?:\.\d+)?)\s*(.*)$/);
    return m ? {
      num: parseFloat(m[1]),
      unit: m[2] || 'Piece'
    } : {
      num: 1,
      unit: 'Piece'
    };
  })();
  const unitAliasMap = {
    pcs: 'Piece',
    kg: 'Kg',
    g: 'Gram',
    L: 'Liter',
    ml: 'Gram',
    pack: 'Packet',
    pc: 'Piece',
    pieces: 'Piece'
  };
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
      expiryDate: estimatedExpiry.toISOString()
    });
  }
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      background: 'var(--color-bg)',
      zIndex: 30,
      display: 'flex',
      flexDirection: 'column',
      animation: 'ep-in 220ms var(--ease-out-soft)'
    }
  }, /*#__PURE__*/React.createElement(TopBar, {
    title: "Edit Product",
    onBack: onCancel
  }), /*#__PURE__*/React.createElement("div", {
    className: "fk-no-scrollbar",
    style: {
      flex: 1,
      overflowY: 'auto',
      overflowX: 'hidden',
      padding: '8px 20px 20px',
      display: 'flex',
      flexDirection: 'column',
      gap: 26
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 14,
      padding: 16,
      background: 'var(--color-bg-elevated)',
      borderRadius: 'var(--radius-lg)',
      boxShadow: 'var(--shadow-xs)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 48,
      height: 48,
      borderRadius: 'var(--radius-md)',
      background: 'var(--color-primary-surface)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: item.illustration ? 8 : 0,
      flexShrink: 0
    }
  }, item.illustration ? /*#__PURE__*/React.createElement(FoodIllustration, {
    type: item.illustration
  }) : /*#__PURE__*/React.createElement("span", {
    className: "material-symbols-rounded",
    style: {
      fontSize: 24,
      color: 'var(--color-primary-press)'
    }
  }, item.icon)), /*#__PURE__*/React.createElement(TextField, {
    label: "Product name",
    value: name,
    onChange: setName,
    style: {
      flex: 1
    }
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      font: 'var(--text-label)',
      color: 'var(--color-text-secondary)',
      marginBottom: 10
    }
  }, "Category"), /*#__PURE__*/React.createElement("div", {
    className: "fk-no-scrollbar",
    style: {
      display: 'flex',
      gap: 10,
      overflowX: 'auto',
      paddingBottom: 4
    }
  }, EP_CATEGORIES.map(c => /*#__PURE__*/React.createElement(Chip, {
    key: c.key,
    label: c.label,
    icon: c.icon,
    selected: category === c.key,
    onClick: () => setCategory(c.key),
    tone: "green"
  })))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      font: 'var(--text-label)',
      color: 'var(--color-text-secondary)',
      marginBottom: 10
    }
  }, "Quantity"), /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: 'center',
      font: 'var(--text-numeral)',
      fontFamily: 'var(--font-display)',
      color: 'var(--color-primary-press)',
      marginBottom: 10
    }
  }, aqFormat(qty), " ", unit), /*#__PURE__*/React.createElement(AdjustQuantityWheel, {
    value: qty,
    onChange: setQty,
    step: AQ_UNIT_STEP[unit] || 1
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: 10,
      marginTop: 12
    }
  }, units.map(u => /*#__PURE__*/React.createElement(Chip, {
    key: u,
    label: u,
    selected: unit === u,
    onClick: () => setUnit(u),
    tone: "green"
  })))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      font: 'var(--text-label)',
      color: 'var(--color-text-secondary)',
      marginBottom: 10
    }
  }, "Expiry Duration"), /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: 'center',
      font: 'var(--text-numeral)',
      fontFamily: 'var(--font-display)',
      color: 'var(--color-primary-press)',
      marginBottom: 10
    }
  }, durationDays, " Day", durationDays === 1 ? '' : 's'), /*#__PURE__*/React.createElement(AdjustQuantityWheel, {
    value: durationDays,
    onChange: setDurationDays,
    step: 1
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      marginTop: 14,
      background: 'var(--color-bg-section)',
      borderRadius: 'var(--radius-md)',
      padding: '12px 16px'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      font: 'var(--text-body-sm)',
      color: 'var(--color-text-secondary)'
    }
  }, "Expiry date"), /*#__PURE__*/React.createElement("span", {
    style: {
      font: 'var(--text-body-sm)',
      fontWeight: 700,
      color: 'var(--color-primary-press)'
    }
  }, estimatedExpiry.toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  }))))), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: 20,
      display: 'flex',
      gap: 10
    }
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "ghost",
    onClick: onCancel,
    style: {
      flex: 1
    }
  }, "Cancel"), /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    onClick: handleSave,
    style: {
      flex: 2
    }
  }, "Save Changes")), /*#__PURE__*/React.createElement("style", null, `
        @keyframes ep-in { from { opacity: 0; transform: translateX(16px); } to { opacity: 1; transform: translateX(0); } }
        .fk-no-scrollbar { scrollbar-width: none; -ms-overflow-style: none; }
        .fk-no-scrollbar::-webkit-scrollbar { display: none; width: 0; height: 0; }
      `));
}
window.EditProduct = EditProduct;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/freshkeep-app/screens/EditProduct.jsx", error: String((e && e.message) || e) }); }

// ui_kits/freshkeep-app/screens/FoodDetail.jsx
try { (() => {
function FoodDetail({
  item,
  onClose,
  onConsume,
  onDiscard,
  onAdjust
}) {
  const {
    Button,
    IconButton,
    FreshnessBar,
    Badge
  } = window.SmartHouseholdFoodManagementDesignSystem_8f59ea;
  const {
    FoodIllustration
  } = window.SmartHouseholdFoodManagementDesignSystem_8f59ea;
  const {
    useState
  } = React;
  const [discardOpen, setDiscardOpen] = useState(false);
  if (!item) return null;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      background: 'var(--color-overlay-scrim)',
      display: 'flex',
      alignItems: 'flex-end',
      zIndex: 10
    },
    onClick: onClose
  }, /*#__PURE__*/React.createElement("div", {
    onClick: e => e.stopPropagation(),
    style: {
      width: '100%',
      background: 'var(--color-bg)',
      borderRadius: 'var(--radius-xl) var(--radius-xl) 0 0',
      padding: 24,
      display: 'flex',
      flexDirection: 'column',
      gap: 20,
      animation: 'fd-up 260ms var(--ease-out-soft)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 40,
      height: 4,
      borderRadius: 'var(--radius-pill)',
      background: 'var(--gray-200)',
      alignSelf: 'center'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 16
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 64,
      height: 64,
      borderRadius: 'var(--radius-lg)',
      background: 'var(--color-primary-surface)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: item.illustration ? 10 : 0
    }
  }, item.illustration ? /*#__PURE__*/React.createElement(FoodIllustration, {
    type: item.illustration
  }) : /*#__PURE__*/React.createElement("span", {
    className: "material-symbols-rounded",
    style: {
      fontSize: 32,
      color: 'var(--color-primary-press)'
    }
  }, item.icon)), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      font: 'var(--text-h1)',
      fontFamily: 'var(--font-display)'
    }
  }, item.name), /*#__PURE__*/React.createElement("div", {
    style: {
      font: 'var(--text-body)',
      color: 'var(--color-text-secondary)'
    }
  }, item.quantity)), /*#__PURE__*/React.createElement(IconButton, {
    icon: "close",
    variant: "surface",
    onClick: onClose
  })), /*#__PURE__*/React.createElement(FreshnessBar, {
    level: item.freshness,
    label: item.expiryLabel
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 10
    }
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    fullWidth: true,
    onClick: onConsume
  }, "Mark as consumed"), /*#__PURE__*/React.createElement(Button, {
    variant: "secondary",
    fullWidth: true,
    onClick: onAdjust
  }, "Adjust quantity"), /*#__PURE__*/React.createElement(Button, {
    variant: "danger",
    fullWidth: true,
    onClick: () => setDiscardOpen(true)
  }, "Discard"))), discardOpen && ReactDOM.createPortal(/*#__PURE__*/React.createElement("div", {
    style: {
      position: 'fixed',
      inset: 0,
      background: 'var(--color-overlay-scrim)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 999
    },
    onClick: () => setDiscardOpen(false)
  }, /*#__PURE__*/React.createElement("div", {
    onClick: e => e.stopPropagation(),
    style: {
      width: '82%',
      maxWidth: 340,
      background: 'var(--color-bg)',
      borderRadius: 'var(--radius-lg)',
      padding: 22,
      display: 'flex',
      flexDirection: 'column',
      gap: 16,
      animation: 'rc-dialog-in 200ms var(--ease-out-soft)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      font: 'var(--text-h3)',
      fontFamily: 'var(--font-display)'
    }
  }, "Discard product?"), /*#__PURE__*/React.createElement("div", {
    style: {
      font: 'var(--text-body-sm)',
      color: 'var(--color-text-secondary)'
    }
  }, "This action will permanently remove ", item.name, " from your inventory."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 10
    }
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => setDiscardOpen(false),
    style: {
      flex: 1,
      border: 'none',
      background: 'var(--color-bg-section)',
      color: 'var(--color-text-primary)',
      borderRadius: 'var(--radius-pill)',
      padding: 12,
      font: 'var(--text-label)'
    }
  }, "Cancel"), /*#__PURE__*/React.createElement("button", {
    onClick: () => {
      setDiscardOpen(false);
      onDiscard();
    },
    style: {
      flex: 1,
      border: 'none',
      background: 'var(--color-accent-red)',
      color: '#fff',
      borderRadius: 'var(--radius-pill)',
      padding: 12,
      font: 'var(--text-label)'
    }
  }, "Discard"))), /*#__PURE__*/React.createElement("style", null, `@keyframes rc-dialog-in { from { opacity: 0; transform: scale(0.92); } to { opacity: 1; transform: scale(1); } }`)), document.body), /*#__PURE__*/React.createElement("style", null, `@keyframes fd-up { from { transform: translateY(40px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }`));
}
window.FoodDetail = FoodDetail;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/freshkeep-app/screens/FoodDetail.jsx", error: String((e && e.message) || e) }); }

// ui_kits/freshkeep-app/screens/Home.jsx
try { (() => {
function StatCardButton({
  label,
  value,
  icon,
  onClick,
  preview,
  more,
  emptyText
}) {
  const {
    useState,
    useRef
  } = React;
  const [ripples, setRipples] = useState([]);
  const [pressed, setPressed] = useState(false);
  const idRef = useRef(0);
  function handleClick(e) {
    const rect = e.currentTarget.getBoundingClientRect();
    const id = idRef.current++;
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setRipples(r => [...r, {
      id,
      x,
      y
    }]);
    setTimeout(() => setRipples(r => r.filter(rp => rp.id !== id)), 600);
    onClick && onClick();
  }
  return /*#__PURE__*/React.createElement("button", {
    onClick: handleClick,
    onPointerDown: () => setPressed(true),
    onPointerUp: () => setPressed(false),
    onPointerLeave: () => setPressed(false),
    style: {
      position: 'relative',
      overflow: 'hidden',
      flex: 1,
      minWidth: 0,
      background: 'rgba(255,255,255,0.16)',
      borderRadius: 'var(--radius-lg)',
      padding: '14px 12px',
      display: 'flex',
      flexDirection: 'column',
      gap: 6,
      border: 'none',
      textAlign: 'left',
      cursor: 'pointer',
      transform: pressed ? 'scale(0.96) translateY(1px)' : 'scale(1)',
      boxShadow: pressed ? 'none' : '0 6px 16px rgba(0,0,0,0.12)',
      transition: 'transform 140ms var(--ease-bounce), box-shadow 140ms var(--ease-standard)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "material-symbols-rounded",
    style: {
      fontSize: 20
    }
  }, icon), /*#__PURE__*/React.createElement("span", {
    style: {
      font: 'var(--text-numeral)',
      fontFamily: 'var(--font-display)',
      fontSize: 20,
      color: '#FFF3C4'
    }
  }, value), /*#__PURE__*/React.createElement("span", {
    style: {
      font: 'var(--text-caption)',
      color: 'rgba(255,255,255,0.85)'
    }
  }, label), preview !== undefined && /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 2,
      marginTop: 2
    }
  }, preview.length === 0 && emptyText && /*#__PURE__*/React.createElement("span", {
    style: {
      font: 'var(--text-caption)',
      fontSize: 10,
      color: 'rgba(255,255,255,0.75)'
    }
  }, emptyText), preview.map((name, i) => /*#__PURE__*/React.createElement("span", {
    key: i,
    style: {
      font: 'var(--text-caption)',
      fontSize: 10,
      color: 'rgba(255,255,255,0.85)',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap'
    }
  }, name)), more > 0 && /*#__PURE__*/React.createElement("span", {
    style: {
      font: 'var(--text-caption)',
      fontSize: 10,
      fontWeight: 700,
      color: '#FFF3C4'
    }
  }, "+", more, " More")), ripples.map(r => /*#__PURE__*/React.createElement("span", {
    key: r.id,
    style: {
      position: 'absolute',
      left: r.x,
      top: r.y,
      width: 10,
      height: 10,
      marginLeft: -5,
      marginTop: -5,
      borderRadius: '50%',
      background: 'rgba(255,255,255,0.5)',
      pointerEvents: 'none',
      animation: 'stat-ripple 600ms ease-out forwards'
    }
  })), /*#__PURE__*/React.createElement("style", null, `@keyframes stat-ripple { to { width: 260px; height: 260px; margin-left: -130px; margin-top: -130px; opacity: 0; } }`));
}
function SmartInsightCard({
  onOpen
}) {
  const {
    useState,
    useEffect
  } = React;
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 60);
    return () => clearTimeout(t);
  }, []);
  const monthly = window.computeMonthlyInsight ? window.computeMonthlyInsight() : {
    type: 'neutral',
    pct: 0,
    sign: '≈'
  };
  const variants = {
    success: {
      icon: 'eco',
      title: 'Great job!',
      subtitle: `Food waste ↓ ${monthly.pct}%`,
      bg: 'rgba(255,255,255,0.95)',
      fg: 'var(--green-700)',
      dot: 'var(--color-primary)'
    },
    warning: {
      icon: 'warning',
      title: 'Reminder',
      subtitle: `Waste increased ${monthly.pct}%`,
      bg: 'rgba(255,255,255,0.95)',
      fg: 'var(--orange-700)',
      dot: 'var(--orange-500)'
    },
    neutral: {
      icon: 'insights',
      title: 'Looking good',
      subtitle: "You're managing food well",
      bg: 'rgba(255,255,255,0.95)',
      fg: 'var(--blue-700)',
      dot: 'var(--blue-500)'
    }
  };
  const v = variants[monthly.type] || variants.neutral;
  return /*#__PURE__*/React.createElement("button", {
    onClick: onOpen,
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 8,
      border: 'none',
      cursor: 'pointer',
      background: v.bg,
      borderRadius: 'var(--radius-lg)',
      padding: '10px 14px',
      boxShadow: '0 6px 16px rgba(0,0,0,0.12)',
      maxWidth: 168,
      textAlign: 'left',
      opacity: visible ? 1 : 0,
      transform: visible ? 'scale(1)' : 'scale(0.9)',
      transition: 'opacity 320ms var(--ease-out-soft), transform 320ms var(--ease-out-soft)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 30,
      height: 30,
      borderRadius: '50%',
      background: v.dot,
      flexShrink: 0,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "material-symbols-rounded",
    style: {
      fontSize: 16,
      color: '#fff'
    }
  }, v.icon)), /*#__PURE__*/React.createElement("div", {
    style: {
      lineHeight: 1.25
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      font: 'var(--text-caption)',
      fontWeight: 700,
      fontSize: 12,
      color: v.fg
    }
  }, v.title), /*#__PURE__*/React.createElement("div", {
    style: {
      font: 'var(--text-caption)',
      fontSize: 11,
      color: 'var(--color-text-secondary)'
    }
  }, v.subtitle)));
}
function Home({
  inventory,
  onOpenAddFood,
  onOpenFood,
  goTab,
  onOpenEatFirst,
  shoppingFrequency
}) {
  const {
    FoodCard,
    BottomNav,
    FAB,
    FoodIllustration
  } = window.SmartHouseholdFoodManagementDesignSystem_8f59ea;
  const expiringSoon = inventory.filter(i => i.freshness === 'soon' || i.freshness === 'expired').sort((a, b) => (a.freshness === 'expired' ? 0 : 1) - (b.freshness === 'expired' ? 0 : 1)).slice(0, 3);
  function expiredDaysOf(item) {
    if (item.freshness !== 'expired' || !item.expiryDate) return 0;
    return Math.max(0, Math.floor((new Date() - new Date(item.expiryDate)) / 86400000));
  }
  const eatFirstCount = inventory.filter(i => (i.daysLeft ?? 99) <= 7).length;
  const toBuy = window.fkGetActiveShoppingItems ? window.fkGetActiveShoppingItems(inventory, shoppingFrequency) : [];
  const toBuyPreview = toBuy.slice(0, 3);
  const recentlyAdded = [...inventory].sort((a, b) => new Date(b.addedDate || 0) - new Date(a.addedDate || 0)).slice(0, 3);
  const heroStats = [{
    label: 'In Stock',
    value: `${inventory.length} Items`,
    icon: 'inventory_2',
    onClick: () => goTab('inventory')
  }, {
    label: 'Eat First',
    value: `${eatFirstCount} Items`,
    icon: 'restaurant',
    onClick: onOpenEatFirst
  }, {
    label: 'To Buy',
    value: `${toBuy.length} Items`,
    icon: 'shopping_cart',
    onClick: () => goTab('shopping')
  }];
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      background: 'var(--color-bg)',
      display: 'flex',
      flexDirection: 'column'
    }
  }, /*#__PURE__*/React.createElement("style", null, `
        .fk-no-scrollbar { scrollbar-width: none; -ms-overflow-style: none; }
        .fk-no-scrollbar::-webkit-scrollbar { display: none; width: 0; height: 0; }
      `), /*#__PURE__*/React.createElement("div", {
    className: "fk-no-scrollbar",
    style: {
      flex: 1,
      overflowY: 'auto',
      padding: '0 0 100px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      background: 'var(--color-primary)',
      borderRadius: '0 0 var(--radius-xl) var(--radius-xl)',
      padding: '28px 20px 24px',
      color: '#fff'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: 20
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      font: 'var(--text-body)',
      color: 'rgba(255,255,255,0.85)'
    }
  }, "Good morning"), /*#__PURE__*/React.createElement("div", {
    style: {
      font: 'var(--text-display)',
      fontFamily: 'var(--font-display)'
    }
  }, "Rohim")), /*#__PURE__*/React.createElement(SmartInsightCard, {
    onOpen: () => goTab('analytics')
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 10,
      alignItems: 'stretch'
    }
  }, heroStats.map(s => /*#__PURE__*/React.createElement(StatCardButton, {
    key: s.label,
    label: s.label,
    value: s.value,
    icon: s.icon,
    onClick: s.onClick,
    preview: s.preview,
    more: s.more,
    emptyText: s.emptyText
  })))), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '24px 20px 0'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 12
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      font: 'var(--text-h2)',
      fontFamily: 'var(--font-display)'
    }
  }, "Expiring soon"), /*#__PURE__*/React.createElement("button", {
    onClick: () => goTab('inventory'),
    style: {
      border: 'none',
      background: 'transparent',
      font: 'var(--text-label)',
      color: 'var(--color-primary-press)'
    }
  }, "See all")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 10,
      marginBottom: 28
    }
  }, expiringSoon.length === 0 && /*#__PURE__*/React.createElement("div", {
    style: {
      padding: 20,
      borderRadius: 'var(--radius-lg)',
      background: 'var(--color-primary-surface)',
      font: 'var(--text-body)',
      color: 'var(--color-primary-press)'
    }
  }, "Nothing expiring soon \u2014 you're all set \uD83C\uDF89"), expiringSoon.map(f => /*#__PURE__*/React.createElement(FoodCard, {
    key: f.id,
    name: f.name,
    quantity: f.quantity,
    icon: f.icon,
    illustration: f.illustration,
    freshness: f.freshness,
    expiryLabel: f.expiryLabel,
    expiredDays: expiredDaysOf(f),
    daysLeft: f.daysLeft,
    onClick: () => onOpenFood(f)
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 12
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      font: 'var(--text-h2)',
      fontFamily: 'var(--font-display)'
    }
  }, "Recently added"), /*#__PURE__*/React.createElement("button", {
    onClick: () => goTab('inventory'),
    style: {
      border: 'none',
      background: 'transparent',
      font: 'var(--text-label)',
      color: 'var(--color-primary-press)'
    }
  }, "See all")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 8,
      marginBottom: 28
    }
  }, recentlyAdded.length === 0 && /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: 8,
      padding: '28px 20px',
      textAlign: 'center',
      background: 'var(--color-bg-section)',
      borderRadius: 'var(--radius-lg)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 32
    }
  }, "\uD83D\uDCE6"), /*#__PURE__*/React.createElement("div", {
    style: {
      font: 'var(--text-body)',
      color: 'var(--color-text-secondary)'
    }
  }, "No recently added items."), /*#__PURE__*/React.createElement("div", {
    style: {
      font: 'var(--text-caption)',
      color: 'var(--color-text-tertiary)'
    }
  }, "Start by adding your first food item.")), recentlyAdded.map(f => /*#__PURE__*/React.createElement("button", {
    key: f.id,
    onClick: () => onOpenFood(f),
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 12,
      width: '100%',
      height: 56,
      padding: '0 14px',
      border: 'none',
      borderRadius: 'var(--radius-lg)',
      background: 'var(--color-bg-elevated)',
      boxShadow: 'var(--shadow-xs)',
      textAlign: 'left',
      cursor: 'pointer'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 36,
      height: 36,
      borderRadius: 'var(--radius-md)',
      background: 'var(--color-primary-surface)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: f.illustration ? 5 : 0,
      flexShrink: 0
    }
  }, f.illustration ? /*#__PURE__*/React.createElement(FoodIllustration, {
    type: f.illustration
  }) : /*#__PURE__*/React.createElement("span", {
    className: "material-symbols-rounded",
    style: {
      fontSize: 20,
      color: 'var(--color-primary-press)'
    }
  }, f.icon)), /*#__PURE__*/React.createElement("span", {
    style: {
      flex: 1,
      font: 'var(--text-body-lg)',
      color: 'var(--color-text-primary)'
    }
  }, f.name)))))), /*#__PURE__*/React.createElement(FAB, {
    icon: "add",
    label: "Add food",
    onClick: onOpenAddFood
  }), /*#__PURE__*/React.createElement(BottomNav, {
    active: "home",
    onChange: goTab
  }));
}
window.Home = Home;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/freshkeep-app/screens/Home.jsx", error: String((e && e.message) || e) }); }

// ui_kits/freshkeep-app/screens/Inventory.jsx
try { (() => {
function ExpiryProgressBar({
  addedDate,
  expiryDate
}) {
  const {
    useState,
    useEffect
  } = React;
  const [result, setResult] = useState(null);
  useEffect(() => {
    if (window.fkExpiryProgress) setResult(window.fkExpiryProgress(addedDate, expiryDate));
  }, [addedDate, expiryDate]);
  if (!addedDate || !expiryDate) return null;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 4
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      height: 6,
      borderRadius: 'var(--radius-pill)',
      background: 'var(--gray-100)',
      overflow: 'hidden',
      position: 'relative'
    }
  }, result && !result.expired && /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      left: 0,
      top: 0,
      bottom: 0,
      width: `${result.fillPct}%`,
      background: result.color,
      borderRadius: 'var(--radius-pill)',
      transition: 'width 400ms var(--ease-out-soft)'
    }
  }), result && result.expired && /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      right: 0,
      top: 0,
      bottom: 0,
      width: `${result.fillPct}%`,
      background: result.color,
      borderRadius: 'var(--radius-pill)',
      transition: 'width 400ms var(--ease-out-soft)'
    }
  })), result && /*#__PURE__*/React.createElement("span", {
    style: {
      font: 'var(--text-caption)',
      color: result.expired ? 'var(--red-700)' : 'var(--color-text-tertiary)'
    }
  }, result.label));
}
function InventoryItemCard({
  item,
  onOpen,
  onEdit,
  onDelete
}) {
  const {
    FoodIllustration
  } = window.SmartHouseholdFoodManagementDesignSystem_8f59ea;
  const iconTone = {
    fresh: 'var(--color-primary-surface)',
    aging: 'var(--color-aging-surface)',
    soon: 'var(--color-soon-surface)',
    expired: 'var(--color-expired-surface)'
  }[item.freshness] || 'var(--color-primary-surface)';
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      width: '100%',
      padding: 16,
      borderRadius: 'var(--radius-lg)',
      background: 'var(--color-bg-elevated)',
      boxShadow: 'var(--shadow-sm)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      top: 10,
      right: 10,
      display: 'flex',
      gap: 6
    }
  }, /*#__PURE__*/React.createElement("button", {
    onClick: onEdit,
    "aria-label": "Edit product",
    style: {
      border: 'none',
      background: 'var(--color-bg-section)',
      width: 36,
      height: 36,
      borderRadius: '50%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "material-symbols-rounded",
    style: {
      fontSize: 17,
      color: 'var(--color-text-secondary)'
    }
  }, "edit")), /*#__PURE__*/React.createElement("button", {
    onClick: onDelete,
    "aria-label": "Delete product",
    style: {
      border: 'none',
      background: 'var(--color-accent-red-surface)',
      width: 36,
      height: 36,
      borderRadius: '50%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "material-symbols-rounded",
    style: {
      fontSize: 17,
      color: 'var(--red-700)'
    }
  }, "delete"))), /*#__PURE__*/React.createElement("button", {
    onClick: onOpen,
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 16,
      width: '100%',
      paddingRight: 84,
      border: 'none',
      background: 'transparent',
      textAlign: 'left'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 56,
      height: 56,
      borderRadius: 'var(--radius-md)',
      background: iconTone,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexShrink: 0,
      padding: item.illustration ? 8 : 0
    }
  }, item.illustration ? /*#__PURE__*/React.createElement(FoodIllustration, {
    type: item.illustration
  }) : /*#__PURE__*/React.createElement("span", {
    className: "material-symbols-rounded",
    style: {
      fontSize: 28,
      color: 'var(--color-text-primary)',
      fontVariationSettings: "'FILL' 1"
    }
  }, item.icon)), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minWidth: 0,
      display: 'flex',
      flexDirection: 'column',
      gap: 8
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'baseline',
      gap: 8
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      font: 'var(--text-h3)',
      fontFamily: 'var(--font-display)',
      fontSize: 16,
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis'
    }
  }, item.name), /*#__PURE__*/React.createElement("span", {
    style: {
      font: 'var(--text-body-sm)',
      color: 'var(--color-text-secondary)',
      flexShrink: 0
    }
  }, item.quantity)), /*#__PURE__*/React.createElement(ExpiryProgressBar, {
    addedDate: item.addedDate,
    expiryDate: item.expiryDate
  }))));
}

// Lightweight manual virtualization: only mounts the real card (with its icon,
// expiry math) when scrolled near the viewport; off-screen rows render an
// empty placeholder of the same height so scroll position/height stay stable.
function LazyInventoryRow({
  item,
  onOpen,
  onEdit,
  onDelete
}) {
  const {
    useRef,
    useState,
    useEffect
  } = React;
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    if (!ref.current || typeof IntersectionObserver === 'undefined') {
      setVisible(true);
      return;
    }
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) setVisible(true);
    }, {
      rootMargin: '400px 0px'
    });
    obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return /*#__PURE__*/React.createElement("div", {
    ref: ref,
    style: {
      minHeight: 88
    }
  }, visible ? /*#__PURE__*/React.createElement(InventoryItemCard, {
    item: item,
    onOpen: () => onOpen(item),
    onEdit: () => onEdit(item),
    onDelete: () => onDelete(item)
  }) : /*#__PURE__*/React.createElement("div", {
    style: {
      minHeight: 88,
      borderRadius: 'var(--radius-lg)',
      background: 'var(--color-bg-section)'
    }
  }));
}
function DeleteConfirmDialog({
  item,
  onCancel,
  onConfirm
}) {
  const {
    Button
  } = window.SmartHouseholdFoodManagementDesignSystem_8f59ea;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      background: 'var(--color-overlay-scrim)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 40
    },
    onClick: onCancel
  }, /*#__PURE__*/React.createElement("div", {
    onClick: e => e.stopPropagation(),
    style: {
      width: '82%',
      background: 'var(--color-bg)',
      borderRadius: 'var(--radius-lg)',
      padding: 22,
      display: 'flex',
      flexDirection: 'column',
      gap: 16,
      animation: 'inv-dialog-in 180ms var(--ease-out-soft)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      font: 'var(--text-h3)',
      fontFamily: 'var(--font-display)'
    }
  }, "Delete Product?"), /*#__PURE__*/React.createElement("div", {
    style: {
      font: 'var(--text-body-sm)',
      color: 'var(--color-text-secondary)'
    }
  }, "Are you sure you want to remove \"", item.name, "\" from your inventory?"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 10
    }
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "ghost",
    onClick: onCancel,
    style: {
      flex: 1
    }
  }, "Cancel"), /*#__PURE__*/React.createElement(Button, {
    variant: "danger",
    onClick: onConfirm,
    style: {
      flex: 1
    }
  }, "Delete"))));
}
function Inventory({
  inventory,
  onOpenFood,
  onDelete,
  goTab,
  onOpenAddFood,
  onEditProduct
}) {
  const {
    BottomNav,
    FAB,
    Chip
  } = window.SmartHouseholdFoodManagementDesignSystem_8f59ea;
  const {
    useState
  } = React;
  const [filter, setFilter] = useState('all');
  const [query, setQuery] = useState('');
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [snackbar, setSnackbar] = useState(null);
  const filters = ['all', 'vegetables', 'fruits', 'milk', 'frozen'];
  const shown = inventory.filter(i => filter === 'all' || i.category === filter).filter(i => i.name.toLowerCase().includes(query.toLowerCase()));
  function confirmDelete() {
    onDelete(deleteTarget.id);
    setDeleteTarget(null);
    setSnackbar('Product deleted successfully.');
    setTimeout(() => setSnackbar(null), 3000);
  }
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      background: 'var(--color-bg)',
      display: 'flex',
      flexDirection: 'column'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '28px 20px 8px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      font: 'var(--text-h1)',
      fontFamily: 'var(--font-display)',
      marginBottom: 16
    }
  }, "Inventory"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 10,
      height: 48,
      padding: '0 16px',
      borderRadius: 'var(--radius-md)',
      background: 'var(--color-bg-section)',
      marginBottom: 12
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "material-symbols-rounded",
    style: {
      fontSize: 20,
      color: 'var(--color-text-tertiary)'
    }
  }, "search"), /*#__PURE__*/React.createElement("input", {
    value: query,
    onChange: e => setQuery(e.target.value),
    placeholder: "Search inventory",
    style: {
      border: 'none',
      outline: 'none',
      background: 'transparent',
      flex: 1,
      font: 'var(--text-body)',
      fontFamily: 'var(--font-body)',
      color: 'var(--color-text-primary)'
    }
  }), query && /*#__PURE__*/React.createElement("button", {
    onClick: () => setQuery(''),
    style: {
      border: 'none',
      background: 'transparent',
      display: 'flex'
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "material-symbols-rounded",
    style: {
      fontSize: 18,
      color: 'var(--color-text-tertiary)'
    }
  }, "close"))), /*#__PURE__*/React.createElement("div", {
    className: "fk-no-scrollbar",
    style: {
      display: 'flex',
      gap: 8,
      overflowX: 'auto',
      overflowY: 'hidden',
      paddingBottom: 4
    }
  }, filters.map(f => /*#__PURE__*/React.createElement(Chip, {
    key: f,
    label: f === 'all' ? 'All' : f[0].toUpperCase() + f.slice(1),
    selected: filter === f,
    onClick: () => setFilter(f),
    tone: "green"
  })))), /*#__PURE__*/React.createElement("div", {
    className: "fk-no-scrollbar",
    style: {
      flex: 1,
      overflowY: 'auto',
      overflowX: 'hidden',
      padding: '12px 20px 100px',
      display: 'flex',
      flexDirection: 'column',
      gap: 10
    }
  }, shown.map(item => /*#__PURE__*/React.createElement(LazyInventoryRow, {
    key: item.id,
    item: item,
    onOpen: onOpenFood,
    onEdit: onEditProduct,
    onDelete: setDeleteTarget
  })), shown.length === 0 && /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: 'center',
      color: 'var(--color-text-tertiary)',
      padding: 40
    }
  }, "Nothing here yet")), /*#__PURE__*/React.createElement(FAB, {
    icon: "add",
    label: "Add food",
    onClick: onOpenAddFood
  }), /*#__PURE__*/React.createElement(BottomNav, {
    active: "inventory",
    onChange: goTab
  }), deleteTarget && /*#__PURE__*/React.createElement(DeleteConfirmDialog, {
    item: deleteTarget,
    onCancel: () => setDeleteTarget(null),
    onConfirm: confirmDelete
  }), snackbar && /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      bottom: 96,
      left: 20,
      right: 20,
      background: 'var(--gray-900)',
      color: '#fff',
      padding: '14px 18px',
      borderRadius: 'var(--radius-md)',
      font: 'var(--text-label)',
      fontFamily: 'var(--font-body)',
      boxShadow: 'var(--shadow-lg)',
      animation: 'inv-snackbar-in 220ms var(--ease-out-soft)',
      zIndex: 35,
      display: 'flex',
      alignItems: 'center',
      gap: 8
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "material-symbols-rounded",
    style: {
      fontSize: 18,
      color: 'var(--green-300)'
    }
  }, "check_circle"), snackbar), /*#__PURE__*/React.createElement("style", null, `
        .fk-no-scrollbar { scrollbar-width: none; -ms-overflow-style: none; }
        .fk-no-scrollbar::-webkit-scrollbar { display: none; width: 0; height: 0; }
        @keyframes inv-dialog-in { from { opacity: 0; transform: scale(0.94); } to { opacity: 1; transform: scale(1); } }
        @keyframes inv-snackbar-in { from { opacity: 0; transform: translateY(12px); } to { opacity: 1; transform: translateY(0); } }
      `));
}
window.Inventory = Inventory;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/freshkeep-app/screens/Inventory.jsx", error: String((e && e.message) || e) }); }

// ui_kits/freshkeep-app/screens/LanguagePage.jsx
try { (() => {
const LANGUAGES = ['English', 'বাংলা (Bengali)', 'हिन्दी (Hindi)', 'العربية (Arabic)', 'Español (Spanish)', 'Français (French)', 'Deutsch (German)', 'Italiano (Italian)', 'Português (Portuguese)', '中文 (Chinese)', '日本語 (Japanese)', '한국어 (Korean)', 'Русский (Russian)', 'Türkçe (Turkish)'];
function LanguagePage({
  onBack,
  language,
  onChangeLanguage
}) {
  const {
    TopBar
  } = window.SmartHouseholdFoodManagementDesignSystem_8f59ea;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      background: 'var(--color-bg)',
      display: 'flex',
      flexDirection: 'column',
      animation: 'page-in 220ms var(--ease-out-soft)'
    }
  }, /*#__PURE__*/React.createElement(TopBar, {
    title: "Language",
    onBack: onBack
  }), /*#__PURE__*/React.createElement("div", {
    className: "fk-no-scrollbar",
    style: {
      flex: 1,
      overflowY: 'auto',
      padding: '4px 20px 24px',
      display: 'flex',
      flexDirection: 'column',
      gap: 8
    }
  }, LANGUAGES.map(lang => {
    const selected = language === lang;
    return /*#__PURE__*/React.createElement("button", {
      key: lang,
      onClick: () => onChangeLanguage(lang),
      style: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '14px 16px',
        borderRadius: 'var(--radius-lg)',
        border: 'none',
        background: selected ? 'var(--color-primary-surface)' : 'var(--color-bg-elevated)',
        boxShadow: selected ? 'none' : 'var(--shadow-xs)'
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        font: 'var(--text-body-lg)',
        color: selected ? 'var(--color-primary-press)' : 'var(--color-text-primary)'
      }
    }, lang), selected && /*#__PURE__*/React.createElement("span", {
      className: "material-symbols-rounded",
      style: {
        fontSize: 20,
        color: 'var(--color-primary-press)'
      }
    }, "check"));
  })), /*#__PURE__*/React.createElement("style", null, `
        @keyframes page-in { from { opacity: 0; transform: translateX(16px); } to { opacity: 1; transform: translateX(0); } }
        .fk-no-scrollbar { scrollbar-width: none; -ms-overflow-style: none; }
        .fk-no-scrollbar::-webkit-scrollbar { display: none; width: 0; height: 0; }
      `));
}
window.LanguagePage = LanguagePage;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/freshkeep-app/screens/LanguagePage.jsx", error: String((e && e.message) || e) }); }

// ui_kits/freshkeep-app/screens/Login.jsx
try { (() => {
function Login({
  onDone
}) {
  const {
    Button
  } = window.SmartHouseholdFoodManagementDesignSystem_8f59ea;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      background: 'var(--color-bg)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 28,
      padding: 32,
      transform: 'translateY(-5%)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: 10
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: "../../assets/logo/freshkeep-app-icon.png",
    alt: "Smart Household Food Management System",
    style: {
      width: 168,
      height: 168
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 700,
      fontSize: 19,
      lineHeight: 1.3,
      color: 'var(--color-text-primary)',
      textAlign: 'center'
    }
  }, "Welcome to Smart Household Food Management")), /*#__PURE__*/React.createElement("div", {
    style: {
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
      gap: 12
    }
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "secondary",
    fullWidth: true,
    onClick: onDone,
    icon: /*#__PURE__*/React.createElement("svg", {
      width: "20",
      height: "20",
      viewBox: "0 0 48 48"
    }, /*#__PURE__*/React.createElement("path", {
      fill: "#FFC107",
      d: "M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 12.955 4 4 12.955 4 24s8.955 20 20 20 20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z"
    }), /*#__PURE__*/React.createElement("path", {
      fill: "#FF3D00",
      d: "M6.306 14.691l6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 16.318 4 9.656 8.337 6.306 14.691z"
    }), /*#__PURE__*/React.createElement("path", {
      fill: "#4CAF50",
      d: "M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238C29.211 35.091 26.715 36 24 36c-5.202 0-9.619-3.317-11.283-7.946l-6.522 5.025C9.505 39.556 16.227 44 24 44z"
    }), /*#__PURE__*/React.createElement("path", {
      fill: "#1976D2",
      d: "M43.611 20.083H42V20H24v8h11.303a12.04 12.04 0 0 1-4.087 5.571l.003-.002 6.19 5.238C36.971 39.205 44 34 44 24c0-1.341-.138-2.65-.389-3.917z"
    }))
  }, "Continue with Google"), /*#__PURE__*/React.createElement(Button, {
    variant: "ghost",
    fullWidth: true,
    onClick: onDone
  }, "Continue as Guest")));
}
window.Login = Login;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/freshkeep-app/screens/Login.jsx", error: String((e && e.message) || e) }); }

// ui_kits/freshkeep-app/screens/Onboarding.jsx
try { (() => {
function Onboarding({
  onDone,
  onSetFrequency
}) {
  const {
    useState
  } = React;
  const {
    Button,
    OnboardingScene
  } = window.SmartHouseholdFoodManagementDesignSystem_8f59ea;
  const [step, setStep] = useState(0);
  const slides = [{
    scene: 'track',
    tone: 'var(--green-50)',
    title: 'Track Your Food',
    body: 'Keep every food item organized in one place.'
  }, {
    scene: 'reminders',
    tone: 'var(--orange-100)',
    title: 'Waste Less Food',
    body: 'Smart reminders help you use food before it expires.'
  }, {
    scene: 'shopping',
    tone: 'var(--blue-100)',
    title: 'Shop Smart',
    body: 'Buy only what you need and save money every week.'
  }];

  // Screen 4 — full-screen shopping schedule picker (reuses ShoppingSetup).
  if (step === slides.length) {
    return /*#__PURE__*/React.createElement(window.ShoppingSetup, {
      onSave: key => {
        onSetFrequency && onSetFrequency(key);
        onDone();
      }
    });
  }
  const s = slides[step];
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      background: 'var(--color-bg)',
      display: 'flex',
      flexDirection: 'column'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'flex-end',
      padding: '20px 20px 0'
    }
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => setStep(slides.length),
    style: {
      border: 'none',
      background: 'transparent',
      font: 'var(--text-label)',
      fontFamily: 'var(--font-body)',
      color: 'var(--color-text-tertiary)',
      padding: 12
    }
  }, "Skip")), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 32,
      padding: '0 32px',
      textAlign: 'center'
    }
  }, /*#__PURE__*/React.createElement("div", {
    key: step,
    style: {
      width: 240,
      height: 240,
      borderRadius: 'var(--radius-xl)',
      background: s.tone,
      animation: 'ob-in 0.4s var(--ease-out-soft)'
    }
  }, /*#__PURE__*/React.createElement(OnboardingScene, {
    type: s.scene
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      font: 'var(--text-h1)',
      fontFamily: 'var(--font-display)',
      color: 'var(--color-text-primary)',
      marginBottom: 12
    }
  }, s.title), /*#__PURE__*/React.createElement("div", {
    style: {
      font: 'var(--text-body-lg)',
      color: 'var(--color-text-secondary)'
    }
  }, s.body)), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 8
    }
  }, slides.map((_, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      width: i === step ? 24 : 8,
      height: 8,
      borderRadius: 'var(--radius-pill)',
      background: i === step ? 'var(--color-primary)' : 'var(--gray-200)',
      transition: 'width var(--duration-base) var(--ease-out-soft)'
    }
  })))), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: 24
    }
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    fullWidth: true,
    onClick: () => setStep(step + 1)
  }, step === slides.length - 1 ? 'Get Started' : 'Next')), /*#__PURE__*/React.createElement("style", null, `@keyframes ob-in { from { opacity: 0; transform: scale(0.85); } to { opacity: 1; transform: scale(1); } }`));
}
window.Onboarding = Onboarding;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/freshkeep-app/screens/Onboarding.jsx", error: String((e && e.message) || e) }); }

// ui_kits/freshkeep-app/screens/PrivacyPolicy.jsx
try { (() => {
const PRIVACY_SECTIONS = [['Introduction', 'FreshKeep helps your household track food and reduce waste. This policy explains what data we collect and how we use it.'], ['Information We Collect', 'Account details (name, email, profile photo), the food data you enter, and basic device/notification settings.'], ['How We Use Your Information', 'To run core features — inventory tracking, reminders, analytics — and to improve the app experience.'], ['Food Inventory Data', 'Item names, quantities, categories, and expiry dates you add are stored to power reminders and freshness tracking.'], ['Donation Data', 'If you post a food donation, its description, quantity, and pickup details are shared with prospective recipients.'], ['Notification Permissions', 'Used solely to deliver expiry reminders you\'ve opted into.'], ['Camera Permission', 'Used only when you choose Take Photo for your profile picture or a custom item image.'], ['Photo Permission', 'Used only when you choose Choose from Gallery to select an existing image.'], ['Location Permission', 'Requested only for donation pickup coordination — never for tracking outside that feature.'], ['Data Security', 'Data is encrypted in transit and at rest, with access limited to what each feature needs.'], ['Data Sharing Policy', 'We do not sell your data. Limited data is shared with household members you invite or donation recipients you choose to contact.'], ['User Rights', 'You can access, export, or correct your data at any time from Profile settings.'], ['Delete Account & Data', 'Contact Support to permanently delete your account and all associated data.'], ['Contact Information', 'Reach us at privacy@freshkeep.app with any questions about this policy.']];
function LegalAccordion({
  title,
  body
}) {
  const {
    useState
  } = React;
  const [open, setOpen] = useState(false);
  return /*#__PURE__*/React.createElement("div", {
    style: {
      background: 'var(--color-bg-elevated)',
      borderRadius: 'var(--radius-lg)',
      boxShadow: 'var(--shadow-xs)',
      overflow: 'hidden'
    }
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => setOpen(!open),
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 10,
      width: '100%',
      border: 'none',
      background: 'transparent',
      padding: 16,
      textAlign: 'left'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      flex: 1,
      font: 'var(--text-body-lg)',
      fontWeight: 600
    }
  }, title), /*#__PURE__*/React.createElement("span", {
    className: "material-symbols-rounded",
    style: {
      fontSize: 20,
      color: 'var(--color-text-tertiary)',
      transform: open ? 'rotate(180deg)' : 'none',
      transition: 'transform 200ms var(--ease-out-soft)'
    }
  }, "expand_more")), /*#__PURE__*/React.createElement("div", {
    style: {
      maxHeight: open ? 300 : 0,
      opacity: open ? 1 : 0,
      overflow: 'hidden',
      transition: 'max-height 260ms var(--ease-out-soft), opacity 200ms'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '0 16px 16px',
      font: 'var(--text-body-sm)',
      color: 'var(--color-text-secondary)'
    }
  }, body)));
}
function PrivacyPolicy({
  onBack
}) {
  const {
    useState
  } = React;
  const {
    TopBar,
    Button
  } = window.SmartHouseholdFoodManagementDesignSystem_8f59ea;
  const [acked, setAcked] = useState(false);
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      background: 'var(--color-bg)',
      display: 'flex',
      flexDirection: 'column',
      animation: 'legal-in 220ms var(--ease-out-soft)'
    }
  }, /*#__PURE__*/React.createElement(TopBar, {
    title: "Privacy Policy",
    onBack: onBack
  }), /*#__PURE__*/React.createElement("div", {
    className: "fk-no-scrollbar",
    style: {
      flex: 1,
      overflowY: 'auto',
      padding: '0 20px 24px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      font: 'var(--text-caption)',
      color: 'var(--color-text-tertiary)',
      marginBottom: 16
    }
  }, "Last Updated: July 1, 2026"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 8
    }
  }, PRIVACY_SECTIONS.map(([t, b]) => /*#__PURE__*/React.createElement(LegalAccordion, {
    key: t,
    title: t,
    body: b
  }))), /*#__PURE__*/React.createElement("label", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 10,
      marginTop: 20,
      cursor: 'pointer'
    }
  }, /*#__PURE__*/React.createElement("span", {
    onClick: () => setAcked(!acked),
    style: {
      width: 24,
      height: 24,
      borderRadius: 'var(--radius-sm)',
      border: acked ? 'none' : '2px solid var(--color-border-strong)',
      background: acked ? 'var(--color-primary)' : 'transparent',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexShrink: 0
    }
  }, acked && /*#__PURE__*/React.createElement("span", {
    className: "material-symbols-rounded",
    style: {
      fontSize: 16,
      color: '#fff'
    }
  }, "check")), /*#__PURE__*/React.createElement("span", {
    style: {
      font: 'var(--text-body)',
      color: 'var(--color-text-primary)'
    }
  }, "I have read the Privacy Policy"))), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: 20
    }
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "secondary",
    fullWidth: true,
    onClick: onBack
  }, "Back")), /*#__PURE__*/React.createElement("style", null, `
        @keyframes legal-in { from { opacity: 0; transform: translateX(16px); } to { opacity: 1; transform: translateX(0); } }
        .fk-no-scrollbar { scrollbar-width: none; -ms-overflow-style: none; }
        .fk-no-scrollbar::-webkit-scrollbar { display: none; width: 0; height: 0; }
      `));
}
window.PrivacyPolicy = PrivacyPolicy;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/freshkeep-app/screens/PrivacyPolicy.jsx", error: String((e && e.message) || e) }); }

// ui_kits/freshkeep-app/screens/Profile.jsx
try { (() => {
const REMINDER_OPTIONS = [{
  value: 0,
  label: 'On Expiry Day'
}, {
  value: 1,
  label: '1 Day Before'
}, {
  value: 2,
  label: '2 Days Before'
}, {
  value: 3,
  label: '3 Days Before'
}, {
  value: 5,
  label: '5 Days Before'
}, {
  value: 7,
  label: '7 Days Before'
}];
const REMINDER_CATEGORIES = [{
  key: 'vegetables',
  label: 'Vegetables',
  icon: 'nutrition'
}, {
  key: 'fruits',
  label: 'Fruits',
  icon: 'eco'
}, {
  key: 'dairy',
  label: 'Dairy',
  icon: 'water_drop'
}, {
  key: 'meatFish',
  label: 'Meat & Fish',
  icon: 'set_meal'
}, {
  key: 'packaged',
  label: 'Packaged Foods',
  icon: 'inventory_2'
}, {
  key: 'frozen',
  label: 'Frozen Foods',
  icon: 'ac_unit'
}, {
  key: 'beverages',
  label: 'Beverages',
  icon: 'local_bar'
}];
function reminderLabel(days) {
  const opt = REMINDER_OPTIONS.find(o => o.value === days);
  return opt ? opt.label : `${days} Days Before`;
}
function EmailAvatar({
  email
}) {
  const letter = (email || '?').trim().charAt(0).toUpperCase();
  const palette = [{
    bg: 'var(--color-primary-surface)',
    fg: 'var(--color-primary-press)'
  }, {
    bg: 'var(--color-accent-blue-surface)',
    fg: 'var(--blue-700)'
  }, {
    bg: 'var(--color-accent-orange-surface)',
    fg: 'var(--orange-700)'
  }];
  const code = letter.charCodeAt(0) || 0;
  const c = palette[code % palette.length];
  return /*#__PURE__*/React.createElement("div", {
    style: {
      width: 64,
      height: 64,
      borderRadius: '50%',
      background: c.bg,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexShrink: 0
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      font: 'var(--text-h1)',
      fontFamily: 'var(--font-display)',
      color: c.fg
    }
  }, letter));
}
function Profile({
  goTab,
  onLogout,
  reminderPrefs,
  onOpenReminderPrefs,
  language,
  onOpenLanguage,
  onOpenHelp,
  onOpenAbout,
  email
}) {
  const {
    useState
  } = React;
  const {
    BottomNav,
    Toggle,
    Button
  } = window.SmartHouseholdFoodManagementDesignSystem_8f59ea;
  const [dark, setDark] = useState(false);
  const [notif, setNotif] = useState(true);
  const userEmail = email || 'rohim@example.com';
  const rows = [{
    icon: 'language',
    label: 'Language',
    value: language,
    onClick: onOpenLanguage
  }, {
    icon: 'menu_book',
    label: 'User Manual',
    onClick: onOpenHelp
  }, {
    icon: 'info',
    label: 'About',
    onClick: onOpenAbout
  }];
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      background: 'var(--color-bg)',
      display: 'flex',
      flexDirection: 'column'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "fk-no-scrollbar",
    style: {
      flex: 1,
      overflowY: 'auto',
      padding: '28px 20px 100px'
    }
  }, /*#__PURE__*/React.createElement("style", null, `
          .fk-no-scrollbar { scrollbar-width: none; -ms-overflow-style: none; }
          .fk-no-scrollbar::-webkit-scrollbar { display: none; width: 0; height: 0; }
        `), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 16,
      marginBottom: 28
    }
  }, /*#__PURE__*/React.createElement(EmailAvatar, {
    email: userEmail
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      font: 'var(--text-h2)',
      fontFamily: 'var(--font-display)',
      wordBreak: 'break-all'
    }
  }, userEmail)), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 4,
      background: 'var(--color-bg-section)',
      borderRadius: 'var(--radius-lg)',
      padding: 8,
      marginBottom: 20
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '12px 12px'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      font: 'var(--text-body-lg)'
    }
  }, "Notifications"), /*#__PURE__*/React.createElement(Toggle, {
    checked: notif,
    onChange: setNotif
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '12px 12px'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      font: 'var(--text-body-lg)'
    }
  }, "Dark mode"), /*#__PURE__*/React.createElement(Toggle, {
    checked: dark,
    onChange: setDark
  }))), /*#__PURE__*/React.createElement("button", {
    onClick: onOpenReminderPrefs,
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 14,
      padding: '16px',
      width: '100%',
      background: 'var(--color-bg-elevated)',
      borderRadius: 'var(--radius-lg)',
      boxShadow: 'var(--shadow-xs)',
      border: 'none',
      textAlign: 'left',
      marginBottom: 24
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 44,
      height: 44,
      borderRadius: '50%',
      background: 'var(--color-primary-surface)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexShrink: 0
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "material-symbols-rounded",
    style: {
      fontSize: 22,
      color: 'var(--color-primary-press)'
    }
  }, "notifications")), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      font: 'var(--text-body-lg)'
    }
  }, "Reminder Preferences"), /*#__PURE__*/React.createElement("div", {
    style: {
      font: 'var(--text-body-sm)',
      color: 'var(--color-text-secondary)'
    }
  }, "Manage reminder times for each food category")), /*#__PURE__*/React.createElement("span", {
    className: "material-symbols-rounded",
    style: {
      fontSize: 18,
      color: 'var(--color-text-tertiary)'
    }
  }, "chevron_right")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 2,
      background: 'var(--color-bg-section)',
      borderRadius: 'var(--radius-lg)',
      overflow: 'hidden',
      marginBottom: 24
    }
  }, rows.map(r => /*#__PURE__*/React.createElement("button", {
    key: r.label,
    onClick: r.onClick,
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 14,
      padding: '14px 16px',
      background: 'var(--color-bg-elevated)',
      border: 'none',
      textAlign: 'left',
      width: '100%'
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "material-symbols-rounded",
    style: {
      fontSize: 22,
      color: 'var(--color-text-secondary)'
    }
  }, r.icon), /*#__PURE__*/React.createElement("span", {
    style: {
      flex: 1,
      font: 'var(--text-body-lg)'
    }
  }, r.label), r.value && /*#__PURE__*/React.createElement("span", {
    style: {
      font: 'var(--text-body-sm)',
      color: 'var(--color-text-tertiary)'
    }
  }, r.value), /*#__PURE__*/React.createElement("span", {
    className: "material-symbols-rounded",
    style: {
      fontSize: 18,
      color: 'var(--color-text-tertiary)'
    }
  }, "chevron_right")))), /*#__PURE__*/React.createElement(Button, {
    variant: "ghost",
    fullWidth: true,
    onClick: onLogout,
    icon: /*#__PURE__*/React.createElement("span", {
      className: "material-symbols-rounded",
      style: {
        fontSize: 20,
        color: 'var(--color-accent-red)'
      }
    }, "logout")
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--color-accent-red)'
    }
  }, "Log out"))), /*#__PURE__*/React.createElement(BottomNav, {
    active: "profile",
    onChange: goTab
  }));
}
window.Profile = Profile;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/freshkeep-app/screens/Profile.jsx", error: String((e && e.message) || e) }); }

// ui_kits/freshkeep-app/screens/RangeControls.jsx
try { (() => {
// Shared "Range Expansion" control used by every expandable slider in the app
// (Quantity, Expiry Duration Days/Months/Years, Reminder Settings, Shopping unit sliders).
// Renders [ + ] [ − ] side by side, an "Expand Range" caption, and a small pill
// showing the current maximum. Keep this the single source of truth for that pattern.

function RangeExpandControls({
  rangeMax,
  onExpand,
  step,
  capMax,
  floor,
  unitLabel
}) {
  const min = floor !== undefined ? floor : step;
  const atCap = capMax !== undefined && rangeMax >= capMax;
  const atFloor = rangeMax <= min;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: 6,
      flexShrink: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 8
    }
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => onExpand(Math.min(capMax || Infinity, rangeMax + step)),
    disabled: atCap,
    className: "fk-range-btn",
    style: {
      width: 34,
      height: 34,
      borderRadius: '50%',
      border: 'none',
      background: 'var(--color-primary-surface)',
      color: 'var(--color-primary-press)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      opacity: atCap ? 0.5 : 1
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "material-symbols-rounded",
    style: {
      fontSize: 18
    }
  }, "add")), /*#__PURE__*/React.createElement("button", {
    onClick: () => onExpand(Math.max(min, rangeMax - step)),
    disabled: atFloor,
    className: "fk-range-btn",
    style: {
      width: 34,
      height: 34,
      borderRadius: '50%',
      border: 'none',
      background: 'var(--color-bg-section)',
      color: atFloor ? 'var(--color-text-tertiary)' : 'var(--color-text-primary)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      opacity: atFloor ? 0.5 : 1
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "material-symbols-rounded",
    style: {
      fontSize: 18
    }
  }, "remove"))), /*#__PURE__*/React.createElement("span", {
    style: {
      font: 'var(--text-caption)',
      fontSize: 11,
      color: 'var(--color-text-tertiary)',
      textAlign: 'center',
      whiteSpace: 'nowrap'
    }
  }, "Expand Range"), /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-block',
      padding: '3px 10px',
      borderRadius: 'var(--radius-pill)',
      background: 'var(--color-primary-surface)',
      color: 'var(--green-700)',
      fontWeight: 600,
      font: 'var(--text-caption)',
      fontSize: 12,
      textAlign: 'center',
      whiteSpace: 'nowrap',
      transition: 'all 200ms var(--ease-out-soft)'
    }
  }, rangeMax, " ", unitLabel), /*#__PURE__*/React.createElement("style", null, `
        .fk-range-btn { transition: transform 120ms var(--ease-bounce), background 150ms; }
        .fk-range-btn:active:not(:disabled) { transform: scale(0.88); }
      `));
}
window.RangeExpandControls = RangeExpandControls;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/freshkeep-app/screens/RangeControls.jsx", error: String((e && e.message) || e) }); }

// ui_kits/freshkeep-app/screens/ReminderPreferences.jsx
try { (() => {
const REMINDER_DEFAULT_CATEGORIES = [{
  key: 'vegetables',
  label: 'Vegetables',
  icon: 'nutrition'
}, {
  key: 'fruits',
  label: 'Fruits',
  icon: 'eco'
}, {
  key: 'dairy',
  label: 'Dairy',
  icon: 'water_drop'
}, {
  key: 'meatFish',
  label: 'Meat & Fish',
  icon: 'set_meal'
}, {
  key: 'packaged',
  label: 'Packaged Foods',
  icon: 'inventory_2'
}, {
  key: 'frozen',
  label: 'Frozen Foods',
  icon: 'ac_unit'
}, {
  key: 'beverages',
  label: 'Beverages',
  icon: 'local_bar'
}];
const REMINDER_PRESETS = [{
  label: 'Today',
  days: 0
}, {
  label: '1 Day Before',
  days: 1
}, {
  label: '2 Days Before',
  days: 2
}, {
  label: '3 Days Before',
  days: 3
}, {
  label: '5 Days Before',
  days: 5
}, {
  label: '7 Days Before',
  days: 7
}, {
  label: '10 Days Before',
  days: 10
}, {
  label: '14 Days Before',
  days: 14
}, {
  label: '21 Days Before',
  days: 21
}, {
  label: '30 Days Before',
  days: 30
}];
const WHEEL_ITEM_H = 44;
const WHEEL_VISIBLE = 5; // odd number, centered

function WheelPicker({
  items,
  index,
  onChange,
  height = WHEEL_ITEM_H * WHEEL_VISIBLE
}) {
  const {
    useRef,
    useEffect
  } = React;
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
      listRef.current.scrollTo({
        top: snapped * WHEEL_ITEM_H,
        behavior: 'smooth'
      });
      if (snapped !== index) onChange(snapped);
    }, 100);
  }
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      height
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      top: '50%',
      left: 0,
      right: 0,
      height: WHEEL_ITEM_H,
      marginTop: -WHEEL_ITEM_H / 2,
      background: 'var(--color-primary-surface)',
      borderRadius: 'var(--radius-md)',
      pointerEvents: 'none',
      zIndex: 0
    }
  }), /*#__PURE__*/React.createElement("div", {
    ref: listRef,
    className: "fk-no-scrollbar",
    onScroll: handleScroll,
    style: {
      position: 'relative',
      zIndex: 1,
      height: '100%',
      overflowY: 'scroll',
      scrollSnapType: 'y mandatory',
      WebkitOverflowScrolling: 'touch'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      height: WHEEL_ITEM_H * padCount
    }
  }), items.map((it, i) => {
    const dist = Math.abs(i - index);
    return /*#__PURE__*/React.createElement("div", {
      key: i,
      onClick: () => {
        onChange(i);
        if (listRef.current) listRef.current.scrollTo({
          top: i * WHEEL_ITEM_H,
          behavior: 'smooth'
        });
      },
      style: {
        height: WHEEL_ITEM_H,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        scrollSnapAlign: 'center',
        cursor: 'pointer',
        font: dist === 0 ? 'var(--text-h3)' : 'var(--text-body)',
        fontFamily: dist === 0 ? 'var(--font-display)' : 'var(--font-body)',
        color: dist === 0 ? 'var(--color-primary-press)' : 'var(--color-text-tertiary)',
        opacity: Math.max(0.3, 1 - dist * 0.32),
        transition: 'color 150ms, opacity 150ms'
      }
    }, it);
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      height: WHEEL_ITEM_H * padCount
    }
  })));
}

// Horizontal variant — used for the Custom Reminder "number of days" picker.
const HWHEEL_ITEM_W = 64;
const HWHEEL_VISIBLE = 5;
function HorizontalWheelPicker({
  items,
  index,
  onChange,
  width = HWHEEL_ITEM_W * HWHEEL_VISIBLE
}) {
  const {
    useRef,
    useEffect
  } = React;
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
      listRef.current.scrollTo({
        left: snapped * HWHEEL_ITEM_W,
        behavior: 'smooth'
      });
      if (snapped !== index) onChange(snapped);
    }, 100);
  }
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      width,
      maxWidth: '100%',
      height: 64,
      margin: '0 auto',
      overflow: 'hidden'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      left: '50%',
      top: 0,
      bottom: 0,
      width: HWHEEL_ITEM_W,
      marginLeft: -HWHEEL_ITEM_W / 2,
      background: 'var(--color-primary-surface)',
      borderRadius: 'var(--radius-md)',
      pointerEvents: 'none',
      zIndex: 0
    }
  }), /*#__PURE__*/React.createElement("div", {
    ref: listRef,
    className: "fk-no-scrollbar",
    onScroll: handleScroll,
    style: {
      position: 'relative',
      zIndex: 1,
      width: '100%',
      display: 'flex',
      overflowX: 'scroll',
      scrollSnapType: 'x mandatory',
      WebkitOverflowScrolling: 'touch'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: HWHEEL_ITEM_W * padCount,
      flexShrink: 0
    }
  }), items.map((it, i) => {
    const dist = Math.abs(i - index);
    return /*#__PURE__*/React.createElement("div", {
      key: i,
      onClick: () => {
        onChange(i);
        if (listRef.current) listRef.current.scrollTo({
          left: i * HWHEEL_ITEM_W,
          behavior: 'smooth'
        });
      },
      style: {
        width: HWHEEL_ITEM_W,
        height: 64,
        flexShrink: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        scrollSnapAlign: 'center',
        cursor: 'pointer',
        font: dist === 0 ? 'var(--text-h3)' : 'var(--text-body)',
        fontFamily: dist === 0 ? 'var(--font-display)' : 'var(--font-body)',
        color: dist === 0 ? 'var(--color-primary-press)' : 'var(--color-text-tertiary)',
        opacity: Math.max(0.3, 1 - dist * 0.32),
        transition: 'color 150ms, opacity 150ms'
      }
    }, it);
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      width: HWHEEL_ITEM_W * padCount,
      flexShrink: 0
    }
  })));
}
function reminderPreviewList(daysArray) {
  const sorted = [...new Set(daysArray)].sort((a, b) => b - a);
  return sorted;
}
function CustomReminderSheet({
  onClose,
  onSave
}) {
  const {
    useState
  } = React;
  const {
    Button
  } = window.SmartHouseholdFoodManagementDesignSystem_8f59ea;
  const numberItems = Array.from({
    length: 99
  }, (_, i) => i + 1);
  const [numIdx, setNumIdx] = useState(0); // index into numberItems, value = numIdx+1 (starts at 1)

  const num = numberItems[numIdx];
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      background: 'var(--color-overlay-scrim)',
      display: 'flex',
      alignItems: 'flex-end',
      zIndex: 70
    },
    onClick: onClose
  }, /*#__PURE__*/React.createElement("div", {
    onClick: e => e.stopPropagation(),
    style: {
      width: '100%',
      background: 'var(--color-bg)',
      borderRadius: 'var(--radius-xl) var(--radius-xl) 0 0',
      padding: 24,
      display: 'flex',
      flexDirection: 'column',
      gap: 16,
      animation: 'sheet-up 220ms var(--ease-out-soft)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 40,
      height: 4,
      borderRadius: 'var(--radius-pill)',
      background: 'var(--gray-200)',
      alignSelf: 'center'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      font: 'var(--text-h3)',
      fontFamily: 'var(--font-display)',
      textAlign: 'center'
    }
  }, "Custom Reminder"), /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: 'center',
      font: 'var(--text-h2)',
      fontFamily: 'var(--font-display)',
      color: 'var(--color-primary-press)'
    }
  }, num, " Day", num === 1 ? '' : 's', " Before"), /*#__PURE__*/React.createElement(HorizontalWheelPicker, {
    items: numberItems,
    index: numIdx,
    onChange: setNumIdx
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 10
    }
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "ghost",
    onClick: onClose,
    style: {
      flex: 1
    }
  }, "Cancel"), /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    onClick: () => onSave(num),
    style: {
      flex: 1
    }
  }, "Save Reminder"))), /*#__PURE__*/React.createElement("style", null, `@keyframes sheet-up { from { transform: translateY(40px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }`));
}
function ReminderToggleRow({
  label,
  checked,
  onChange
}) {
  const {
    Toggle
  } = window.SmartHouseholdFoodManagementDesignSystem_8f59ea;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '8px 0'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      font: 'var(--text-body)',
      color: 'var(--color-text-primary)'
    }
  }, label), /*#__PURE__*/React.createElement(Toggle, {
    checked: checked,
    onChange: onChange
  }));
}
function ReminderCategoryCard({
  category,
  daysArray,
  onChangeDays,
  settings,
  onChangeSettings,
  expanded,
  onToggleExpand
}) {
  const {
    useState
  } = React;
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
    const next = selected.filter(x => x !== d);
    onChangeDays(next.length ? next : [d]);
  }
  function dayLabel(d) {
    if (d === 0) return 'Today';
    return `${d} Day${d === 1 ? '' : 's'}`;
  }
  return /*#__PURE__*/React.createElement("div", {
    style: {
      background: 'var(--color-bg-elevated)',
      borderRadius: 'var(--radius-lg)',
      boxShadow: 'var(--shadow-xs)',
      overflow: 'hidden',
      animation: 'cat-fade-in 260ms var(--ease-out-soft)',
      position: 'relative'
    }
  }, /*#__PURE__*/React.createElement("button", {
    onClick: onToggleExpand,
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 12,
      width: '100%',
      border: 'none',
      background: 'transparent',
      padding: 16,
      textAlign: 'left'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 40,
      height: 40,
      borderRadius: '50%',
      background: 'var(--color-primary-surface)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexShrink: 0
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "material-symbols-rounded",
    style: {
      fontSize: 20,
      color: 'var(--color-primary-press)'
    }
  }, category.icon)), /*#__PURE__*/React.createElement("span", {
    style: {
      flex: 1,
      font: 'var(--text-h3)',
      fontFamily: 'var(--font-display)'
    }
  }, category.label), /*#__PURE__*/React.createElement("span", {
    style: {
      font: 'var(--text-label)',
      color: 'var(--color-primary-press)'
    }
  }, sortedSelected.map(d => dayLabel(d)).join(', ')), /*#__PURE__*/React.createElement("span", {
    className: "material-symbols-rounded",
    style: {
      fontSize: 20,
      color: 'var(--color-text-tertiary)',
      transform: expanded ? 'rotate(180deg)' : 'none',
      transition: 'transform 200ms var(--ease-out-soft)'
    }
  }, "expand_more")), /*#__PURE__*/React.createElement("div", {
    style: {
      maxHeight: expanded ? 900 : 0,
      opacity: expanded ? 1 : 0,
      overflow: 'hidden',
      transition: 'max-height 320ms var(--ease-out-soft), opacity 240ms var(--ease-out-soft)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '0 18px 18px',
      display: 'flex',
      flexDirection: 'column',
      gap: 14
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      font: 'var(--text-label)',
      color: 'var(--color-text-secondary)',
      marginBottom: 10
    }
  }, "Reminder Before"), /*#__PURE__*/React.createElement(WheelPicker, {
    items: REMINDER_PRESETS.map(p => p.label),
    index: wheelIdx,
    onChange: setWheelIdx
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 10,
      marginTop: 12
    }
  }, /*#__PURE__*/React.createElement("button", {
    onClick: addFromWheel,
    style: {
      flex: 1,
      display: 'flex',
      alignItems: 'center',
      gap: 6,
      justifyContent: 'center',
      border: 'none',
      background: 'var(--color-primary)',
      color: '#fff',
      borderRadius: 'var(--radius-pill)',
      padding: '10px 16px',
      font: 'var(--text-label)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "material-symbols-rounded",
    style: {
      fontSize: 18
    }
  }, "add"), " Add Reminder"), /*#__PURE__*/React.createElement("button", {
    onClick: () => setCustomSheetOpen(true),
    style: {
      flex: 1,
      display: 'flex',
      alignItems: 'center',
      gap: 6,
      justifyContent: 'center',
      border: '1.5px solid var(--color-border-strong)',
      background: 'transparent',
      color: 'var(--color-text-secondary)',
      borderRadius: 'var(--radius-pill)',
      padding: '10px 16px',
      font: 'var(--text-label)'
    }
  }, "Add Custom Reminder"))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      font: 'var(--text-label)',
      color: 'var(--color-text-secondary)',
      marginBottom: 10
    }
  }, "Selected Reminders"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: 8
    }
  }, sortedSelected.map(d => /*#__PURE__*/React.createElement("span", {
    key: d,
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 6,
      background: 'var(--color-primary-surface)',
      color: 'var(--color-primary-press)',
      borderRadius: 'var(--radius-pill)',
      padding: '6px 6px 6px 14px',
      font: 'var(--text-label)'
    }
  }, dayLabel(d), /*#__PURE__*/React.createElement("button", {
    onClick: () => removeReminder(d),
    style: {
      width: 20,
      height: 20,
      borderRadius: '50%',
      border: 'none',
      background: 'rgba(0,0,0,0.08)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "material-symbols-rounded",
    style: {
      fontSize: 13
    }
  }, "close")))))), /*#__PURE__*/React.createElement("div", {
    style: {
      font: 'var(--text-body-sm)',
      color: 'var(--color-text-secondary)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontWeight: 600,
      marginBottom: 4
    }
  }, "Notifications will be sent:"), sortedSelected.map(d => /*#__PURE__*/React.createElement("div", {
    key: d
  }, "\u2022 ", dayLabel(d).toLowerCase(), d === 0 ? '' : ' before expiry'))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 2,
      borderTop: '1px solid var(--color-divider)',
      paddingTop: 8
    }
  }, /*#__PURE__*/React.createElement(ReminderToggleRow, {
    label: "Enable Reminder",
    checked: settings.enabled,
    onChange: v => onChangeSettings({
      ...settings,
      enabled: v
    })
  }), /*#__PURE__*/React.createElement(ReminderToggleRow, {
    label: "Push Notification",
    checked: settings.push,
    onChange: v => onChangeSettings({
      ...settings,
      push: v
    })
  }), /*#__PURE__*/React.createElement(ReminderToggleRow, {
    label: "Sound",
    checked: settings.sound,
    onChange: v => onChangeSettings({
      ...settings,
      sound: v
    })
  }), /*#__PURE__*/React.createElement(ReminderToggleRow, {
    label: "Vibration",
    checked: settings.vibration,
    onChange: v => onChangeSettings({
      ...settings,
      vibration: v
    })
  })))), customSheetOpen && /*#__PURE__*/React.createElement(CustomReminderSheet, {
    onClose: () => setCustomSheetOpen(false),
    onSave: saveCustomReminder
  }), toast && /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      left: 16,
      right: 16,
      bottom: 12,
      background: 'var(--gray-900)',
      color: '#fff',
      borderRadius: 'var(--radius-md)',
      padding: '10px 14px',
      font: 'var(--text-body-sm)',
      textAlign: 'center',
      boxShadow: 'var(--shadow-lg)',
      animation: 'sheet-up 180ms var(--ease-out-soft)',
      zIndex: 5
    }
  }, toast));
}
function ReminderPreferences({
  onBack,
  reminderPrefs,
  onChangeReminderPref,
  customCategories
}) {
  const {
    useState
  } = React;
  const {
    TopBar
  } = window.SmartHouseholdFoodManagementDesignSystem_8f59ea;
  const [settingsMap, setSettingsMap] = useState({});
  const [expandedKey, setExpandedKey] = useState(null);
  const allCategories = [...REMINDER_DEFAULT_CATEGORIES, ...(customCategories || []).map(c => ({
    key: c.key,
    label: c.label,
    icon: c.icon || 'category'
  }))];
  function getDays(key) {
    return reminderPrefs[key] !== undefined ? reminderPrefs[key] : [1, 3, 7];
  }
  function getSettings(key) {
    return settingsMap[key] || {
      enabled: true,
      push: true,
      sound: true,
      vibration: false
    };
  }
  function setSettings(key, next) {
    setSettingsMap(prev => ({
      ...prev,
      [key]: next
    }));
  }
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      background: 'var(--color-bg)',
      display: 'flex',
      flexDirection: 'column',
      animation: 'rp-in 220ms var(--ease-out-soft)'
    }
  }, /*#__PURE__*/React.createElement(TopBar, {
    title: "Reminder Preferences",
    onBack: onBack
  }), /*#__PURE__*/React.createElement("div", {
    className: "fk-no-scrollbar",
    style: {
      flex: 1,
      overflowY: 'auto',
      padding: '4px 20px 32px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      font: 'var(--text-body-sm)',
      color: 'var(--color-text-secondary)',
      marginBottom: 16
    }
  }, "Every category \u2014 including your custom ones \u2014 gets its own reminder schedule."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 14
    }
  }, allCategories.map(c => /*#__PURE__*/React.createElement(ReminderCategoryCard, {
    key: c.key,
    category: c,
    daysArray: getDays(c.key),
    onChangeDays: arr => onChangeReminderPref(c.key, arr),
    settings: getSettings(c.key),
    onChangeSettings: s => setSettings(c.key, s),
    expanded: expandedKey === c.key,
    onToggleExpand: () => setExpandedKey(expandedKey === c.key ? null : c.key)
  })))), /*#__PURE__*/React.createElement("style", null, `
        @keyframes rp-in { from { opacity: 0; transform: translateX(16px); } to { opacity: 1; transform: translateX(0); } }
        @keyframes cat-fade-in { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }
        .fk-no-scrollbar { scrollbar-width: none; -ms-overflow-style: none; }
        .fk-no-scrollbar::-webkit-scrollbar { display: none; width: 0; height: 0; }
      `));
}
window.ReminderPreferences = ReminderPreferences;
window.reminderLabel = function (days) {
  return `${days} Days Before`;
};
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/freshkeep-app/screens/ReminderPreferences.jsx", error: String((e && e.message) || e) }); }

// ui_kits/freshkeep-app/screens/Shopping.jsx
try { (() => {
// ============================================================
// Shopping — Smart Shopping List module
// Single-page: first-time frequency setup → auto-generated list
// (from inventory) + manual add, purchase circle, edit qty, delete.
// ============================================================

const SHOP_FREQ_OPTIONS = [{
  key: 'weekly',
  label: 'Weekly',
  days: 7,
  emoji: '📅',
  desc: 'I usually shop once every week.'
}, {
  key: 'biweekly',
  label: 'Every 15 Days',
  days: 15,
  emoji: '🗓',
  desc: 'I usually shop every two weeks.'
}, {
  key: 'monthly',
  label: 'Monthly',
  days: 30,
  emoji: '📆',
  desc: 'I usually shop once every month.'
}];
function shopFreqDays(key) {
  return (SHOP_FREQ_OPTIONS.find(o => o.key === key) || SHOP_FREQ_OPTIONS[0]).days;
}
function shopFreqLabel(key) {
  return (SHOP_FREQ_OPTIONS.find(o => o.key === key) || SHOP_FREQ_OPTIONS[0]).label;
}
function shopFormatDate(d) {
  return d.toLocaleDateString('en-GB', {
    weekday: 'long',
    day: '2-digit',
    month: 'long',
    year: 'numeric'
  });
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
  return inventory.filter(i => i.low || i.freshness === 'expired' || typeof i.daysLeft === 'number' && i.daysLeft <= horizon).map(i => {
    let reason = 'Low stock';
    if (i.freshness === 'expired') reason = 'Out of stock';else if (typeof i.daysLeft === 'number' && i.daysLeft <= horizon && !i.low) reason = 'Expiring soon';
    return {
      key: `auto-${i.id}`,
      name: i.name,
      category: i.category,
      icon: i.icon,
      illustration: i.illustration,
      quantity: i.quantity,
      reason,
      source: 'auto'
    };
  });
}

// ---------- First-time frequency setup ----------
function ShoppingSetup({
  onSave
}) {
  const {
    useState
  } = React;
  const {
    Button
  } = window.SmartHouseholdFoodManagementDesignSystem_8f59ea;
  const [choice, setChoice] = useState(null);
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      background: 'var(--color-bg)',
      display: 'flex',
      flexDirection: 'column',
      padding: '48px 24px 24px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 72,
      height: 72,
      borderRadius: 'var(--radius-xl)',
      background: 'var(--color-primary-surface)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: 24
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "material-symbols-rounded",
    style: {
      fontSize: 36,
      color: 'var(--color-primary-press)'
    }
  }, "event_repeat")), /*#__PURE__*/React.createElement("div", {
    style: {
      font: 'var(--text-h1)',
      fontFamily: 'var(--font-display)',
      marginBottom: 10
    }
  }, "How often do you usually shop for groceries?"), /*#__PURE__*/React.createElement("div", {
    style: {
      font: 'var(--text-body)',
      color: 'var(--color-text-secondary)',
      marginBottom: 32
    }
  }, "Choose your shopping schedule so we can automatically prepare your shopping list based on your inventory."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 12,
      flex: 1
    }
  }, SHOP_FREQ_OPTIONS.map(opt => {
    const active = choice === opt.key;
    return /*#__PURE__*/React.createElement("button", {
      key: opt.key,
      onClick: () => setChoice(opt.key),
      style: {
        display: 'flex',
        alignItems: 'center',
        gap: 14,
        border: active ? '2px solid var(--color-primary)' : '2px solid var(--color-border)',
        background: active ? 'var(--color-primary-surface)' : 'var(--color-bg-elevated)',
        borderRadius: 'var(--radius-lg)',
        padding: '16px 18px',
        textAlign: 'left',
        minHeight: 72
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 30,
        flexShrink: 0
      }
    }, opt.emoji), /*#__PURE__*/React.createElement("span", {
      style: {
        flex: 1
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        display: 'block',
        font: 'var(--text-h3)',
        fontFamily: 'var(--font-display)',
        fontSize: 16
      }
    }, opt.label), /*#__PURE__*/React.createElement("span", {
      style: {
        display: 'block',
        font: 'var(--text-caption)',
        color: 'var(--color-text-secondary)'
      }
    }, opt.desc)), /*#__PURE__*/React.createElement("span", {
      style: {
        width: 24,
        height: 24,
        borderRadius: '50%',
        flexShrink: 0,
        border: active ? 'none' : '2px solid var(--color-border-strong)',
        background: active ? 'var(--color-primary)' : 'transparent',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }
    }, active && /*#__PURE__*/React.createElement("span", {
      className: "material-symbols-rounded",
      style: {
        fontSize: 16,
        color: '#fff'
      }
    }, "check")));
  })), /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    fullWidth: true,
    disabled: !choice,
    onClick: () => choice && onSave(choice)
  }, "Continue"));
}

// ---------- Shopping item card ----------
function ShoppingItemCard({
  item,
  purchased,
  onTogglePurchase,
  onEdit,
  onDelete
}) {
  const {
    FoodIllustration
  } = window.SmartHouseholdFoodManagementDesignSystem_8f59ea;
  const {
    useState
  } = React;
  const [confirmOpen, setConfirmOpen] = useState(false);
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 12,
      padding: 12,
      background: 'var(--color-bg-elevated)',
      borderRadius: 'var(--radius-lg)',
      boxShadow: 'var(--shadow-xs)',
      opacity: purchased ? 0.55 : 1,
      transition: 'opacity 220ms var(--ease-out-soft)',
      position: 'relative'
    }
  }, /*#__PURE__*/React.createElement("button", {
    onClick: onTogglePurchase,
    "aria-label": purchased ? 'Mark as not purchased' : 'Mark as purchased',
    style: {
      width: 28,
      height: 28,
      borderRadius: '50%',
      flexShrink: 0,
      border: purchased ? 'none' : '2px solid var(--color-border-strong)',
      background: purchased ? 'var(--color-primary)' : 'transparent',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      transition: 'background 200ms var(--ease-out-soft)'
    }
  }, purchased && /*#__PURE__*/React.createElement("span", {
    className: "material-symbols-rounded",
    style: {
      fontSize: 18,
      color: '#fff'
    }
  }, "check")), /*#__PURE__*/React.createElement("div", {
    style: {
      width: 44,
      height: 44,
      borderRadius: 'var(--radius-md)',
      background: 'var(--color-primary-surface)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: item.illustration ? 6 : 0,
      flexShrink: 0
    }
  }, item.illustration ? /*#__PURE__*/React.createElement(FoodIllustration, {
    type: item.illustration
  }) : /*#__PURE__*/React.createElement("span", {
    className: "material-symbols-rounded",
    style: {
      fontSize: 22,
      color: 'var(--color-primary-press)'
    }
  }, item.icon)), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      font: 'var(--text-h3)',
      fontFamily: 'var(--font-display)',
      fontSize: 15,
      textDecoration: purchased ? 'line-through' : 'none',
      color: purchased ? 'var(--color-text-tertiary)' : 'var(--color-text-primary)'
    }
  }, item.name), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 6,
      font: 'var(--text-caption)',
      color: 'var(--color-text-secondary)'
    }
  }, /*#__PURE__*/React.createElement("span", null, item.quantity), item.reason && !purchased && /*#__PURE__*/React.createElement("span", {
    style: {
      padding: '1px 8px',
      borderRadius: 'var(--radius-pill)',
      background: 'var(--color-soon-surface)',
      color: 'var(--orange-700)',
      fontSize: 10,
      fontWeight: 700
    }
  }, item.reason))), /*#__PURE__*/React.createElement("button", {
    onClick: onEdit,
    "aria-label": "Edit quantity",
    style: {
      width: 36,
      height: 36,
      borderRadius: '50%',
      border: 'none',
      background: 'var(--color-bg-section)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexShrink: 0
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "material-symbols-rounded",
    style: {
      fontSize: 18,
      color: 'var(--color-text-secondary)'
    }
  }, "edit")), /*#__PURE__*/React.createElement("button", {
    onClick: () => setConfirmOpen(true),
    "aria-label": "Remove item",
    style: {
      width: 36,
      height: 36,
      borderRadius: '50%',
      border: 'none',
      background: 'transparent',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexShrink: 0
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "material-symbols-rounded",
    style: {
      fontSize: 18,
      color: 'var(--color-text-tertiary)'
    }
  }, "close")), confirmOpen && ReactDOM.createPortal(/*#__PURE__*/React.createElement("div", {
    style: {
      position: 'fixed',
      inset: 0,
      background: 'var(--color-overlay-scrim)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 999
    },
    onClick: () => setConfirmOpen(false)
  }, /*#__PURE__*/React.createElement("div", {
    onClick: e => e.stopPropagation(),
    style: {
      width: '82%',
      maxWidth: 340,
      background: 'var(--color-bg)',
      borderRadius: 'var(--radius-lg)',
      padding: 22,
      display: 'flex',
      flexDirection: 'column',
      gap: 16,
      animation: 'rc-dialog-in 200ms var(--ease-out-soft)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      font: 'var(--text-h3)',
      fontFamily: 'var(--font-display)'
    }
  }, "Remove item?"), /*#__PURE__*/React.createElement("div", {
    style: {
      font: 'var(--text-body-sm)',
      color: 'var(--color-text-secondary)'
    }
  }, "Are you sure you want to remove ", item.name, " from your shopping list?"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 10
    }
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => setConfirmOpen(false),
    style: {
      flex: 1,
      border: 'none',
      background: 'var(--color-bg-section)',
      color: 'var(--color-text-primary)',
      borderRadius: 'var(--radius-pill)',
      padding: 12,
      font: 'var(--text-label)'
    }
  }, "Cancel"), /*#__PURE__*/React.createElement("button", {
    onClick: () => {
      setConfirmOpen(false);
      onDelete();
    },
    style: {
      flex: 1,
      border: 'none',
      background: 'var(--color-accent-red)',
      color: '#fff',
      borderRadius: 'var(--radius-pill)',
      padding: 12,
      font: 'var(--text-label)'
    }
  }, "Remove"))), /*#__PURE__*/React.createElement("style", null, `@keyframes rc-dialog-in { from { opacity: 0; transform: scale(0.92); } to { opacity: 1; transform: scale(1); } }`)), document.body));
}

// ---------- Main Shopping screen ----------
function Shopping({
  inventory,
  goTab,
  frequency,
  onChangeFrequency,
  onOpenManualAdd
}) {
  const {
    useState,
    useMemo
  } = React;
  const {
    BottomNav
  } = window.SmartHouseholdFoodManagementDesignSystem_8f59ea;

  // Persisted per-item state: purchased set + qty overrides + removed set + manual items
  const [purchasedKeys, setPurchasedKeys] = useState(() => {
    try {
      return new Set(JSON.parse(localStorage.getItem('fk-shop-purchased') || '[]'));
    } catch (e) {
      return new Set();
    }
  });
  const [removedKeys, setRemovedKeys] = useState(() => {
    try {
      return new Set(JSON.parse(localStorage.getItem('fk-shop-removed') || '[]'));
    } catch (e) {
      return new Set();
    }
  });
  const [qtyOverrides, setQtyOverrides] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('fk-shop-qty') || '{}');
    } catch (e) {
      return {};
    }
  });
  const [manualItems, setManualItems] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('fk-shop-manual') || '[]');
    } catch (e) {
      return [];
    }
  });
  const [editing, setEditing] = useState(null);
  const [freqSheetOpen, setFreqSheetOpen] = useState(false);
  const [lastShoppingDate, setLastShoppingDate] = useState(() => {
    try {
      return localStorage.getItem('fk-shop-last-date') || null;
    } catch (e) {
      return null;
    }
  });
  React.useEffect(() => {
    try {
      localStorage.setItem('fk-shop-purchased', JSON.stringify([...purchasedKeys]));
    } catch (e) {}
  }, [purchasedKeys]);
  React.useEffect(() => {
    try {
      localStorage.setItem('fk-shop-removed', JSON.stringify([...removedKeys]));
    } catch (e) {}
  }, [removedKeys]);
  React.useEffect(() => {
    try {
      localStorage.setItem('fk-shop-qty', JSON.stringify(qtyOverrides));
    } catch (e) {}
  }, [qtyOverrides]);
  React.useEffect(() => {
    try {
      localStorage.setItem('fk-shop-manual', JSON.stringify(manualItems));
    } catch (e) {}
  }, [manualItems]);
  React.useEffect(() => {
    try {
      if (lastShoppingDate) localStorage.setItem('fk-shop-last-date', lastShoppingDate);
    } catch (e) {}
  }, [lastShoppingDate]);

  // Expose a manual-add hook for App-level flow
  React.useEffect(() => {
    window.__fkShoppingAddManual = entry => {
      setManualItems(prev => {
        if (prev.some(m => m.name === entry.name) || inventory.some(i => i.name === entry.name)) return prev;
        return [...prev, {
          ...entry,
          key: `manual-${Date.now()}`,
          source: 'manual'
        }];
      });
    };
    return () => {
      delete window.__fkShoppingAddManual;
    };
  }, [inventory]);
  const allItems = useMemo(() => {
    const auto = buildAutoShoppingList(inventory, frequency);
    const combined = [...auto, ...manualItems].filter(it => !removedKeys.has(it.key));
    return combined.map(it => ({
      ...it,
      quantity: qtyOverrides[it.key] || it.quantity
    }));
  }, [inventory, frequency, manualItems, removedKeys, qtyOverrides]);
  const pending = allItems.filter(it => !purchasedKeys.has(it.key));
  const purchased = allItems.filter(it => purchasedKeys.has(it.key));
  const total = allItems.length;
  const purchasedCount = purchased.length;
  const progressPct = total ? purchasedCount / total * 100 : 0;
  function togglePurchase(key) {
    setPurchasedKeys(prev => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);else next.add(key);
      return next;
    });
  }
  function removeItem(key) {
    setRemovedKeys(prev => new Set([...prev, key]));
  }
  function saveQty(key, quantity) {
    setQtyOverrides(prev => ({
      ...prev,
      [key]: quantity
    }));
    setEditing(null);
  }

  // Cycle completion: when every item in a non-empty list is purchased, record today
  // as the last shopping date and start a fresh cycle (clear purchased/removed/qty state).
  React.useEffect(() => {
    if (total > 0 && purchasedCount === total) {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
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
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      background: 'var(--color-bg)',
      display: 'flex',
      flexDirection: 'column'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "fk-no-scrollbar",
    style: {
      flex: 1,
      overflowY: 'auto',
      padding: '28px 20px 100px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      gap: 10,
      marginBottom: 8
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      font: 'var(--text-h1)',
      fontFamily: 'var(--font-display)',
      minWidth: 0,
      flex: 1,
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap'
    }
  }, "Shopping list"), /*#__PURE__*/React.createElement("button", {
    onClick: () => setFreqSheetOpen(true),
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 4,
      flexShrink: 0,
      maxWidth: '48%',
      border: 'none',
      background: 'var(--color-bg-section)',
      borderRadius: 'var(--radius-pill)',
      padding: '8px 12px',
      color: 'var(--color-text-secondary)',
      font: 'var(--text-caption)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "material-symbols-rounded",
    style: {
      fontSize: 16,
      flexShrink: 0
    }
  }, "event_repeat"), /*#__PURE__*/React.createElement("span", {
    style: {
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap'
    }
  }, shopFreqLabel(frequency))), /*#__PURE__*/React.createElement("button", {
    onClick: () => setFreqSheetOpen(true),
    "aria-label": "Shopping settings",
    style: {
      width: 40,
      height: 40,
      flexShrink: 0,
      borderRadius: '50%',
      border: 'none',
      background: 'var(--color-bg-section)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: 'var(--color-text-secondary)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "material-symbols-rounded",
    style: {
      fontSize: 20
    }
  }, "settings"))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 14,
      padding: 16,
      marginBottom: 20,
      background: 'var(--color-primary-surface)',
      borderRadius: 'var(--radius-lg)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 44,
      height: 44,
      borderRadius: 'var(--radius-md)',
      background: 'var(--color-bg-elevated)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexShrink: 0
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "material-symbols-rounded",
    style: {
      fontSize: 24,
      color: 'var(--color-primary-press)'
    }
  }, "calendar_month")), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      font: 'var(--text-overline)',
      letterSpacing: 'var(--tracking-overline)',
      textTransform: 'uppercase',
      color: 'var(--color-primary-press)',
      opacity: 0.8
    }
  }, "Next Shopping"), /*#__PURE__*/React.createElement("div", {
    style: {
      font: 'var(--text-h3)',
      fontFamily: 'var(--font-display)',
      color: 'var(--color-text-primary)'
    }
  }, shopFormatDate(nextDate)), /*#__PURE__*/React.createElement("div", {
    style: {
      font: 'var(--text-caption)',
      color: 'var(--color-text-secondary)'
    }
  }, shopFreqLabel(frequency), " schedule"))), total === 0 ? /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: 12,
      padding: '64px 20px',
      textAlign: 'center'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 56
    }
  }, "\uD83C\uDF89"), /*#__PURE__*/React.createElement("div", {
    style: {
      font: 'var(--text-h3)',
      fontFamily: 'var(--font-display)'
    }
  }, "Everything is stocked."), /*#__PURE__*/React.createElement("div", {
    style: {
      font: 'var(--text-body)',
      color: 'var(--color-text-secondary)'
    }
  }, "No shopping needed today."), /*#__PURE__*/React.createElement("button", {
    onClick: onOpenManualAdd,
    style: {
      marginTop: 8,
      border: 'none',
      background: 'var(--color-primary)',
      color: '#fff',
      borderRadius: 'var(--radius-pill)',
      padding: '12px 28px',
      font: 'var(--text-label)',
      fontFamily: 'var(--font-display)',
      boxShadow: 'var(--shadow-primary)'
    }
  }, "Add item")) : /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    style: {
      marginBottom: 20
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      font: 'var(--text-overline)',
      letterSpacing: 'var(--tracking-overline)',
      textTransform: 'uppercase',
      color: 'var(--color-text-tertiary)',
      marginBottom: 4
    }
  }, "Shopping Progress"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      marginBottom: 6
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      font: 'var(--text-caption)',
      color: 'var(--color-text-secondary)'
    }
  }, purchasedCount, " of ", total, " purchased"), /*#__PURE__*/React.createElement("span", {
    style: {
      font: 'var(--text-caption)',
      color: 'var(--color-primary-press)',
      fontWeight: 700
    }
  }, Math.round(progressPct), "%")), /*#__PURE__*/React.createElement("div", {
    style: {
      height: 6,
      borderRadius: 'var(--radius-pill)',
      background: 'var(--color-bg-section)',
      overflow: 'hidden'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      height: '100%',
      width: `${progressPct}%`,
      background: 'var(--color-primary)',
      borderRadius: 'var(--radius-pill)',
      transition: 'width 320ms var(--ease-out-soft)'
    }
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 12
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      font: 'var(--text-h2)',
      fontFamily: 'var(--font-display)'
    }
  }, "To buy"), /*#__PURE__*/React.createElement("button", {
    onClick: onOpenManualAdd,
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 4,
      border: 'none',
      background: 'transparent',
      color: 'var(--color-primary-press)',
      font: 'var(--text-label)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "material-symbols-rounded",
    style: {
      fontSize: 18
    }
  }, "add"), " Add item")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 10
    }
  }, pending.map(it => /*#__PURE__*/React.createElement(ShoppingItemCard, {
    key: it.key,
    item: it,
    purchased: false,
    onTogglePurchase: () => togglePurchase(it.key),
    onEdit: () => setEditing(it),
    onDelete: () => removeItem(it.key)
  })), pending.length === 0 && /*#__PURE__*/React.createElement("div", {
    style: {
      color: 'var(--color-text-tertiary)',
      padding: 16,
      textAlign: 'center',
      font: 'var(--text-body-sm)'
    }
  }, "All items purchased \uD83C\uDF89")), purchased.length > 0 && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    style: {
      font: 'var(--text-h2)',
      fontFamily: 'var(--font-display)',
      margin: '24px 0 12px'
    }
  }, "Purchased"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 10
    }
  }, purchased.map(it => /*#__PURE__*/React.createElement(ShoppingItemCard, {
    key: it.key,
    item: it,
    purchased: true,
    onTogglePurchase: () => togglePurchase(it.key),
    onEdit: () => setEditing(it),
    onDelete: () => removeItem(it.key)
  })))), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 20,
      font: 'var(--text-caption)',
      color: 'var(--color-text-tertiary)',
      textAlign: 'center',
      opacity: 0.7
    }
  }, "Auto-prepared from your inventory \xB7 updates every ", shopFreqLabel(frequency).toLowerCase()))), editing && /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      zIndex: 40
    }
  }, /*#__PURE__*/React.createElement(window.AdjustQuantity, {
    item: editing,
    onCancel: () => setEditing(null),
    onSave: quantity => saveQty(editing.key, quantity)
  })), freqSheetOpen && /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      background: 'var(--color-overlay-scrim)',
      display: 'flex',
      alignItems: 'flex-end',
      zIndex: 60
    },
    onClick: () => setFreqSheetOpen(false)
  }, /*#__PURE__*/React.createElement("div", {
    onClick: e => e.stopPropagation(),
    style: {
      width: '100%',
      background: 'var(--color-bg)',
      borderRadius: 'var(--radius-xl) var(--radius-xl) 0 0',
      padding: 24,
      display: 'flex',
      flexDirection: 'column',
      gap: 12,
      animation: 'sheet-up 220ms var(--ease-out-soft)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      font: 'var(--text-h3)',
      fontFamily: 'var(--font-display)'
    }
  }, "Shopping frequency"), SHOP_FREQ_OPTIONS.map(opt => /*#__PURE__*/React.createElement("button", {
    key: opt.key,
    onClick: () => {
      onChangeFrequency(opt.key);
      setFreqSheetOpen(false);
    },
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 12,
      border: opt.key === frequency ? '2px solid var(--color-primary)' : '2px solid var(--color-border)',
      background: opt.key === frequency ? 'var(--color-primary-surface)' : 'var(--color-bg-elevated)',
      borderRadius: 'var(--radius-lg)',
      padding: '14px 16px',
      minHeight: 48
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      font: 'var(--text-body-lg)'
    }
  }, opt.label)))), /*#__PURE__*/React.createElement("style", null, `@keyframes sheet-up { from { transform: translateY(30px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }`)), /*#__PURE__*/React.createElement(BottomNav, {
    active: "shopping",
    onChange: goTab
  }));
}
window.Shopping = Shopping;
window.ShoppingSetup = ShoppingSetup;

// Compute active (not purchased, not removed) shopping items — shared with Home's "To Buy" card.
window.fkGetActiveShoppingItems = function (inventory, frequency) {
  let purchased = new Set(),
    removed = new Set(),
    qty = {},
    manual = [];
  try {
    purchased = new Set(JSON.parse(localStorage.getItem('fk-shop-purchased') || '[]'));
  } catch (e) {}
  try {
    removed = new Set(JSON.parse(localStorage.getItem('fk-shop-removed') || '[]'));
  } catch (e) {}
  try {
    qty = JSON.parse(localStorage.getItem('fk-shop-qty') || '{}');
  } catch (e) {}
  try {
    manual = JSON.parse(localStorage.getItem('fk-shop-manual') || '[]');
  } catch (e) {}
  const auto = buildAutoShoppingList(inventory, frequency || 'weekly');
  return [...auto, ...manual].filter(it => !removed.has(it.key) && !purchased.has(it.key)).map(it => ({
    ...it,
    quantity: qty[it.key] || it.quantity
  }));
};

// ---------- Manual Add (Category → Product from inventory → Quantity) ----------
const SHOP_CAT_META = {
  vegetables: {
    label: 'Vegetables',
    icon: 'nutrition',
    tone: 'green'
  },
  fruits: {
    label: 'Fruits',
    icon: 'eco',
    tone: 'green'
  },
  frozen: {
    label: 'Frozen',
    icon: 'ac_unit',
    tone: 'blue'
  },
  meat: {
    label: 'Meat',
    icon: 'kebab_dining',
    tone: 'red'
  },
  fish: {
    label: 'Fish',
    icon: 'set_meal',
    tone: 'blue'
  },
  milk: {
    label: 'Dairy',
    icon: 'water_drop',
    tone: 'blue'
  },
  snacks: {
    label: 'Snacks',
    icon: 'cookie',
    tone: 'orange'
  },
  drinks: {
    label: 'Drinks',
    icon: 'local_bar',
    tone: 'orange'
  },
  rice: {
    label: 'Rice',
    icon: 'rice_bowl',
    tone: 'orange'
  },
  spices: {
    label: 'Spices',
    icon: 'spa',
    tone: 'red'
  },
  others: {
    label: 'Others',
    icon: 'category',
    tone: 'green'
  }
};
function ManualAddShopping({
  inventory,
  customCategories,
  onClose,
  onAdd
}) {
  const {
    useState
  } = React;
  const {
    TopBar,
    CategoryCard
  } = window.SmartHouseholdFoodManagementDesignSystem_8f59ea;
  const [category, setCategory] = useState(null);
  const [product, setProduct] = useState(null);

  // Single shared master catalog (same data as Add Food): built-in + custom categories/products.
  const catalog = window.fkGetCatalog ? window.fkGetCatalog(customCategories) : {
    categories: [],
    productsByCat: {}
  };
  const categories = catalog.categories;
  const productsInCat = category ? catalog.productsByCat[category.key] || [] : [];
  if (product) {
    const item = {
      name: product.name,
      category: category.key,
      icon: category.icon,
      illustration: product.illustration,
      quantity: `1 ${product.unit || 'Piece'}`
    };
    return /*#__PURE__*/React.createElement(window.AdjustQuantity, {
      item: item,
      onCancel: () => setProduct(null),
      onSave: quantity => {
        onAdd({
          name: product.name,
          category: category.key,
          icon: category.icon,
          illustration: product.illustration,
          quantity
        });
        onClose();
      }
    });
  }
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      background: 'var(--color-bg)',
      zIndex: 30,
      display: 'flex',
      flexDirection: 'column',
      animation: 'aq-in 220ms var(--ease-out-soft)'
    }
  }, /*#__PURE__*/React.createElement(TopBar, {
    title: category ? 'Choose a product' : 'Choose a category',
    onBack: () => category ? setCategory(null) : onClose()
  }), /*#__PURE__*/React.createElement("div", {
    className: "fk-no-scrollbar",
    style: {
      flex: 1,
      overflowY: 'auto',
      padding: '8px 20px 24px'
    }
  }, !category && /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(3, 1fr)',
      gap: 14
    }
  }, categories.map(c => /*#__PURE__*/React.createElement("div", {
    key: c.key,
    onClick: () => setCategory(c),
    style: {
      cursor: 'pointer'
    }
  }, /*#__PURE__*/React.createElement(CategoryCard, {
    label: c.label,
    icon: c.icon,
    illustration: (window.FK_CATEGORY_ILLUSTRATION || {})[c.key],
    tone: c.tone
  }))), categories.length === 0 && /*#__PURE__*/React.createElement("div", {
    style: {
      gridColumn: '1 / -1',
      textAlign: 'center',
      color: 'var(--color-text-tertiary)',
      padding: 40
    }
  }, "No categories yet.")), category && /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(2, 1fr)',
      gap: 14
    }
  }, productsInCat.map(p => /*#__PURE__*/React.createElement("div", {
    key: p.name,
    onClick: () => setProduct(p),
    style: {
      cursor: 'pointer'
    }
  }, /*#__PURE__*/React.createElement(CategoryCard, {
    label: p.name,
    icon: category.icon,
    illustration: p.illustration,
    tone: category.tone
  }))), productsInCat.length === 0 && /*#__PURE__*/React.createElement("div", {
    style: {
      gridColumn: '1 / -1',
      textAlign: 'center',
      color: 'var(--color-text-tertiary)',
      padding: 40
    }
  }, "No products in this category yet."))));
}
window.ManualAddShopping = ManualAddShopping;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/freshkeep-app/screens/Shopping.jsx", error: String((e && e.message) || e) }); }

// ui_kits/freshkeep-app/screens/Splash.jsx
try { (() => {
function Splash({
  onDone
}) {
  const {
    useEffect
  } = React;
  const {
    FoodIllustration
  } = window.SmartHouseholdFoodManagementDesignSystem_8f59ea;
  useEffect(() => {
    const t = setTimeout(onDone, 2200);
    return () => clearTimeout(t);
  }, []);
  const deco = [{
    type: 'vegetables',
    top: '8%',
    left: '10%',
    size: 64,
    rot: -8
  }, {
    type: 'fruits',
    top: '14%',
    left: '76%',
    size: 56,
    rot: 10
  }, {
    type: 'tomato',
    top: '72%',
    left: '78%',
    size: 60,
    rot: -6
  }, {
    type: 'others',
    top: '70%',
    left: '12%',
    size: 52,
    rot: 8
  }];
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      background: '#ffffff',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 20,
      overflow: 'hidden'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      top: '-18%',
      left: '-22%',
      width: '65%',
      height: '55%',
      borderRadius: '50%',
      background: 'radial-gradient(circle, var(--green-100) 0%, rgba(255,255,255,0) 70%)'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      bottom: '-20%',
      right: '-18%',
      width: '60%',
      height: '50%',
      borderRadius: '50%',
      background: 'radial-gradient(circle, var(--green-100) 0%, rgba(255,255,255,0) 70%)'
    }
  }), deco.map((d, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      position: 'absolute',
      top: d.top,
      left: d.left,
      width: d.size,
      height: d.size,
      opacity: 0.16,
      transform: `rotate(${d.rot}deg)`
    }
  }, /*#__PURE__*/React.createElement(FoodIllustration, {
    type: d.type
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: 24,
      animation: 'splash-fade 900ms var(--ease-out-soft) both'
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: "../../assets/logo/freshkeep-app-icon.png",
    alt: "Smart Household Food Management System",
    style: {
      width: 215,
      height: 215,
      objectFit: 'contain',
      animation: 'splash-float 2.6s ease-in-out infinite'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: 10,
      textAlign: 'center',
      padding: '0 40px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      font: 'var(--text-h1)',
      fontFamily: 'var(--font-display)',
      fontSize: 24,
      lineHeight: 1.25,
      color: 'var(--gray-900)'
    }
  }, "Smart Household", /*#__PURE__*/React.createElement("br", null), "Food Management System"), /*#__PURE__*/React.createElement("div", {
    style: {
      font: 'var(--text-body-lg)',
      fontFamily: 'var(--font-body)',
      color: 'var(--color-primary-press)',
      fontWeight: 700
    }
  }, "Manage. Plan. Save."))), /*#__PURE__*/React.createElement("style", null, `
        @keyframes splash-fade { from { opacity: 0; transform: translateY(14px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes splash-float { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-8px); } }
      `));
}
window.Splash = Splash;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/freshkeep-app/screens/Splash.jsx", error: String((e && e.message) || e) }); }

// ui_kits/freshkeep-app/screens/TermsConditions.jsx
try { (() => {
const TERMS_SECTIONS = [['Acceptance of Terms', 'By using FreshKeep, you agree to these Terms & Conditions and our Privacy Policy.'], ['User Responsibilities', 'Keep your account credentials secure and provide accurate information about your food inventory.'], ['Acceptable Use', 'Use FreshKeep only for personal household food management and community food donation — not for commercial resale.'], ['Inventory Management Rules', 'Freshness indicators and reminders are estimates; always use your own judgment about food safety.'], ['Food Donation Guidelines', 'Only donate food that is safely stored, within its safe-use window, and accurately described to recipients.'], ['Community Rules', 'Be respectful and honest with other household members and donation recipients using the app.'], ['Prohibited Activities', 'No fraudulent listings, harassment, or attempts to disrupt the service.'], ['Privacy & Data Usage', 'Your use of the app is also governed by our Privacy Policy, which explains what data we collect and how.'], ['Account Suspension', 'Accounts that violate these terms may be suspended or terminated.'], ['Disclaimer', 'FreshKeep is provided "as is" — we do our best to keep reminders and data accurate but cannot guarantee zero errors.'], ['Limitation of Liability', 'FreshKeep is not liable for food spoilage, donation outcomes, or losses arising from app use.'], ['Changes to Terms', 'We may update these terms occasionally; continued use after changes means you accept the updated terms.'], ['Contact Information', 'Questions about these terms can be sent to legal@freshkeep.app.']];
function TermsConditions({
  onBack
}) {
  const {
    useState
  } = React;
  const {
    TopBar,
    Button
  } = window.SmartHouseholdFoodManagementDesignSystem_8f59ea;
  const [agreed, setAgreed] = useState(false);
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      background: 'var(--color-bg)',
      display: 'flex',
      flexDirection: 'column',
      animation: 'legal-in 220ms var(--ease-out-soft)'
    }
  }, /*#__PURE__*/React.createElement(TopBar, {
    title: "Terms & Conditions",
    onBack: onBack
  }), /*#__PURE__*/React.createElement("div", {
    className: "fk-no-scrollbar",
    style: {
      flex: 1,
      overflowY: 'auto',
      padding: '0 20px 24px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      font: 'var(--text-caption)',
      color: 'var(--color-text-tertiary)',
      marginBottom: 16
    }
  }, "Effective Date: July 1, 2026"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 8
    }
  }, TERMS_SECTIONS.map(([t, b]) => /*#__PURE__*/React.createElement(LegalAccordion, {
    key: t,
    title: t,
    body: b
  }))), /*#__PURE__*/React.createElement("label", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 10,
      marginTop: 20,
      cursor: 'pointer'
    }
  }, /*#__PURE__*/React.createElement("span", {
    onClick: () => setAgreed(!agreed),
    style: {
      width: 24,
      height: 24,
      borderRadius: 'var(--radius-sm)',
      border: agreed ? 'none' : '2px solid var(--color-border-strong)',
      background: agreed ? 'var(--color-primary)' : 'transparent',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexShrink: 0
    }
  }, agreed && /*#__PURE__*/React.createElement("span", {
    className: "material-symbols-rounded",
    style: {
      fontSize: 16,
      color: '#fff'
    }
  }, "check")), /*#__PURE__*/React.createElement("span", {
    style: {
      font: 'var(--text-body)',
      color: 'var(--color-text-primary)'
    }
  }, "I agree to the Terms & Conditions"))), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: 20
    }
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "secondary",
    fullWidth: true,
    onClick: onBack
  }, "Back")), /*#__PURE__*/React.createElement("style", null, `
        @keyframes legal-in { from { opacity: 0; transform: translateX(16px); } to { opacity: 1; transform: translateX(0); } }
        .fk-no-scrollbar { scrollbar-width: none; -ms-overflow-style: none; }
        .fk-no-scrollbar::-webkit-scrollbar { display: none; width: 0; height: 0; }
      `));
}
window.TermsConditions = TermsConditions;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/freshkeep-app/screens/TermsConditions.jsx", error: String((e && e.message) || e) }); }

// ui_kits/freshkeep-app/screens/UserManual.jsx
try { (() => {
const MANUAL_SECTIONS = [{
  key: 'inventory',
  icon: 'inventory_2',
  label: 'Add Inventory',
  body: 'Learn how to add food items, choose categories, set quantity, and set expiry dates from the green Add food button on Home or Inventory.'
}, {
  key: 'reminders',
  icon: 'notifications',
  label: 'Expiry Reminders',
  body: 'Understand how reminders work per category and how to customize reminder timing from Reminder Preferences.'
}, {
  key: 'grocery',
  icon: 'shopping_cart',
  label: 'Grocery Planning',
  body: 'Learn how grocery planning and shopping recommendations work based on what is running low in your inventory.'
}, {
  key: 'analytics',
  icon: 'donut_large',
  label: 'Analytics',
  body: 'View monthly food waste, food saved, and money saved reports from the Analytics tab.'
}, {
  key: 'notifications',
  icon: 'notifications_active',
  label: 'Notifications',
  body: 'Manage reminder notifications and alerts from the Notifications toggle at the top of Profile.'
}, {
  key: 'family',
  icon: 'diversity_3',
  label: 'Family Sharing',
  body: 'Learn how to share food management with family members so everyone stays in sync.'
}, {
  key: 'faq',
  icon: 'quiz',
  label: 'Frequently Asked Questions',
  faqs: [['How do I add food?', 'Tap the green Add food button on Home or Inventory and follow the quick steps.'], ['How do reminders work?', 'Each category has its own reminder days, set in Profile → Reminder Preferences.'], ['How do I change the language?', 'Profile → Language, then tap any language in the list.'], ['How do I delete my account?', 'Contact Support to request account deletion.'], ['Can I use the app without Wi-Fi?', 'Yes, core tracking works offline; sync happens when you\'re back online.']]
}, {
  key: 'contact',
  icon: 'support_agent',
  label: 'Contact Support',
  contact: [{
    icon: 'mail',
    label: 'Email Support',
    value: 'support@freshkeep.app'
  }, {
    icon: 'info',
    label: 'App Version',
    value: '1.2.0 (Build 108)'
  }]
}];
function ManualAccordion({
  icon,
  label,
  body,
  faqs,
  contact
}) {
  const {
    useState
  } = React;
  const [open, setOpen] = useState(false);
  return /*#__PURE__*/React.createElement("div", {
    style: {
      background: 'var(--color-bg-elevated)',
      borderRadius: 'var(--radius-lg)',
      boxShadow: 'var(--shadow-xs)',
      overflow: 'hidden'
    }
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => setOpen(!open),
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 14,
      width: '100%',
      border: 'none',
      background: 'transparent',
      padding: 16,
      textAlign: 'left',
      minHeight: 44
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 40,
      height: 40,
      borderRadius: '50%',
      background: 'var(--color-primary-surface)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexShrink: 0
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "material-symbols-rounded",
    style: {
      fontSize: 20,
      color: 'var(--color-primary-press)'
    }
  }, icon)), /*#__PURE__*/React.createElement("span", {
    style: {
      flex: 1,
      font: 'var(--text-body-lg)',
      fontWeight: 600
    }
  }, label), /*#__PURE__*/React.createElement("span", {
    className: "material-symbols-rounded",
    style: {
      fontSize: 20,
      color: 'var(--color-text-tertiary)',
      transform: open ? 'rotate(180deg)' : 'none',
      transition: 'transform 200ms var(--ease-out-soft)'
    }
  }, "expand_more")), /*#__PURE__*/React.createElement("div", {
    style: {
      maxHeight: open ? 500 : 0,
      opacity: open ? 1 : 0,
      overflow: 'hidden',
      transition: 'max-height 260ms var(--ease-out-soft), opacity 200ms'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '0 16px 16px',
      display: 'flex',
      flexDirection: 'column',
      gap: 10
    }
  }, body && /*#__PURE__*/React.createElement("div", {
    style: {
      font: 'var(--text-body-sm)',
      color: 'var(--color-text-secondary)'
    }
  }, body), faqs && faqs.map(([q, a]) => /*#__PURE__*/React.createElement("div", {
    key: q,
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 2
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      font: 'var(--text-body)',
      fontWeight: 600
    }
  }, q), /*#__PURE__*/React.createElement("div", {
    style: {
      font: 'var(--text-body-sm)',
      color: 'var(--color-text-secondary)'
    }
  }, a))), contact && contact.map(c => /*#__PURE__*/React.createElement("div", {
    key: c.label,
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 10
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "material-symbols-rounded",
    style: {
      fontSize: 18,
      color: 'var(--color-text-secondary)'
    }
  }, c.icon), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      font: 'var(--text-body-sm)'
    }
  }, c.label), /*#__PURE__*/React.createElement("div", {
    style: {
      font: 'var(--text-caption)',
      color: 'var(--color-text-tertiary)'
    }
  }, c.value)))))));
}
function UserManual({
  onBack
}) {
  const {
    TopBar
  } = window.SmartHouseholdFoodManagementDesignSystem_8f59ea;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      background: 'var(--color-bg)',
      display: 'flex',
      flexDirection: 'column',
      animation: 'manual-in 220ms var(--ease-out-soft)'
    }
  }, /*#__PURE__*/React.createElement(TopBar, {
    title: "User Manual",
    onBack: onBack
  }), /*#__PURE__*/React.createElement("div", {
    className: "fk-no-scrollbar",
    style: {
      flex: 1,
      overflowY: 'auto',
      padding: '4px 20px 24px',
      display: 'flex',
      flexDirection: 'column',
      gap: 10
    }
  }, MANUAL_SECTIONS.map(s => /*#__PURE__*/React.createElement(ManualAccordion, {
    key: s.key,
    icon: s.icon,
    label: s.label,
    body: s.body,
    faqs: s.faqs,
    contact: s.contact
  }))), /*#__PURE__*/React.createElement("style", null, `
        @keyframes manual-in { from { opacity: 0; transform: translateX(16px); } to { opacity: 1; transform: translateX(0); } }
        .fk-no-scrollbar { scrollbar-width: none; -ms-overflow-style: none; }
        .fk-no-scrollbar::-webkit-scrollbar { display: none; width: 0; height: 0; }
      `));
}
window.UserManual = UserManual;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/freshkeep-app/screens/UserManual.jsx", error: String((e && e.message) || e) }); }

__ds_ns.CategoryCard = __ds_scope.CategoryCard;

__ds_ns.FoodCard = __ds_scope.FoodCard;

__ds_ns.StatCard = __ds_scope.StatCard;

__ds_ns.Badge = __ds_scope.Badge;

__ds_ns.Button = __ds_scope.Button;

__ds_ns.Chip = __ds_scope.Chip;

__ds_ns.IconButton = __ds_scope.IconButton;

__ds_ns.Slider = __ds_scope.Slider;

__ds_ns.TextField = __ds_scope.TextField;

__ds_ns.Toggle = __ds_scope.Toggle;

__ds_ns.FreshnessBar = __ds_scope.FreshnessBar;

__ds_ns.ProgressRing = __ds_scope.ProgressRing;

__ds_ns.ReminderChip = __ds_scope.ReminderChip;

__ds_ns.SuccessCelebration = __ds_scope.SuccessCelebration;

__ds_ns.FoodIllustration = __ds_scope.FoodIllustration;

__ds_ns.FOOD_ILLUSTRATION_KEYS = __ds_scope.FOOD_ILLUSTRATION_KEYS;

__ds_ns.OnboardingScene = __ds_scope.OnboardingScene;

__ds_ns.ONBOARDING_SCENE_KEYS = __ds_scope.ONBOARDING_SCENE_KEYS;

__ds_ns.BottomNav = __ds_scope.BottomNav;

__ds_ns.FAB = __ds_scope.FAB;

__ds_ns.TopBar = __ds_scope.TopBar;

})();
