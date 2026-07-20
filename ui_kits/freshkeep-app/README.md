# FreshKeep — App UI Kit

Interactive click-through recreation of the FreshKeep mobile app (Android, Material 3 sensibility),
covering the full flow from the brief:

Splash → Onboarding (3 slides) → Login → Home Dashboard → Add Food (5-step wizard + celebration) →
Inventory (swipe left/right) → Food Detail (sheet) → Shopping → Analytics → Profile.

Open `index.html`. All primitives (Button, CategoryCard, FoodCard, FreshnessBar, ReminderChip,
SuccessCelebration, BottomNav, FAB, etc.) come from `../../_ds_bundle.js` — this kit composes them,
it doesn't reimplement them. The Android bezel comes from the copied `android-frame.jsx` starter.

State (inventory, shopping list, wizard steps) lives in `App.jsx` as plain React state — this is a
prototype for visual/interaction review, not production data logic.
