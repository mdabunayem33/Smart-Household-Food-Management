# FreshKeep — Smart Household Food Management System

<p align="center">
  <img src="assets/logo/freshkeep-app-icon.png" width="140" alt="FreshKeep logo" />
</p>

<p align="center"><b>Manage. Plan. Save.</b></p>

**FreshKeep** is a native Android application that helps households track the food they own, get reminded before items expire, reduce food waste, and shop smarter. This repository contains the original HTML/CSS/JavaScript UI prototype and its **pixel-perfect native Android conversion** built with **Kotlin, XML layouts, and SQLite**.

> The Android app is a 1:1 conversion of the existing web UI — same colors, fonts, icons, spacing, animations, and navigation. Nothing is redesigned.

**Architecture in one line:** Firebase Authentication identifies *who* the user is; **all application data lives in on-device SQLite**, scoped per user by Firebase UID. No Firestore, no Realtime Database, no backend.

---

## 📖 Table of Contents

1. [Project Description](#-project-description)
2. [Features](#-features)
3. [Technology Stack](#-technology-stack)
4. [Folder Structure](#-folder-structure)
5. [SQLite Structure](#-sqlite-structure)
6. [Authentication Flow](#-authentication-flow)
7. [Screen Flow](#-screen-flow)
8. [Navigation Flow](#-navigation-flow)
9. [Design System](#-design-system)
10. [Development Plan](#-development-plan)
11. [Build Instructions](#-build-instructions)
12. [APK Build Guide](#-apk-build-guide)
13. [GitHub Structure](#-github-structure)
14. [Known Limitations](#️-known-limitations)
15. [Future Scope](#-future-scope)

---

## 📌 Project Description

Households routinely lose money because food expires unnoticed in fridges and pantries. FreshKeep solves this with a simple loop:

1. **Track** — add every food item with quantity, unit, and expiry (preset shelf-life or exact date).
2. **Remind** — items are ranked by freshness (Fresh → Aging → Soon → Expired) with per-category reminder preferences.
3. **Consume first** — the "Eat First" list groups urgent items (Today / Tomorrow / 3 Days / 7 Days).
4. **Shop smart** — a shopping list is auto-generated from low-stock, expired, and soon-to-expire items based on the user's shopping frequency (Weekly / Every 15 Days / Monthly).
5. **Learn** — an Analytics dashboard shows food distribution (pie chart), waste trend (bar chart), and monthly insights.

All data is stored **locally on the device in SQLite** — no internet connection required after install.

---

## ✨ Features

### Core
- 🥬 **Food Inventory** — searchable, category-filterable list with per-item expiry progress bar, edit and delete (with confirmation dialog + snackbar).
- ➕ **Add Food Wizard (5 steps)** — Category → Product → Quantity/Unit (momentum wheel picker) → Expiry (duration slider or full-screen calendar) → Review, ending with a success celebration animation.
- 🗂 **11 Built-in Categories** (Vegetables, Fruits, Frozen, Meat, Fish, Milk, Snacks, Drinks, Rice, Spices, Others) with a preset product catalog and default shelf-life/unit per product.
- 🎨 **Custom Categories & Products** — user-defined categories (icon + color choices) and products (name, unit, default expiry), persisted locally.
- ⏰ **Freshness Engine** — automatic status from expiry date: `Fresh` (>7 d) / `Aging` (4–7 d) / `Soon` (≤3 d) / `Expired`, with day-band progress colors.
- 🍽 **Eat First** — urgency-grouped list (Expiring Today, Tomorrow, Within 3 Days, Within 7 Days) with one-tap "Mark as Consumed".
- 🛒 **Smart Shopping List** — auto-built from inventory (Low stock / Out of stock / Expiring soon) + manual additions, purchase check-off, edit quantity, delete, next-shopping-date banner.
- 📊 **Analytics Dashboard** — animated pie chart (Fresh / Frozen / Pantry / Expiring / Wasted), waste-trend bar chart, and time filters (This Month → This Year). **All figures are computed live from the signed-in user's SQLite rows** — no demo or placeholder data; a new account starts at zero everywhere.
- 🔔 **Reminder Preferences** — per-category reminder days (On Expiry Day, 1/2/3/5/7 Days Before), multiple selections per category.
- 📬 **Expiry Notifications** — a WorkManager sweep sends reminders exactly on the days each category's preferences ask for ("3 Days Before" fires once, three days out). Tapping a reminder **on the expiry date** opens that product's detail sheet. Expired items get at most 3 follow-up reminders, one per day. Survives app close and reboot.
- 🧾 **History** — every Consume, Discard, and quantity change is logged (product, category, quantity, action, date, time) and feeds the analytics.
- 🌍 **Language Switching** — 14 languages listed, applied app-wide via Android's per-app locales after a confirmation dialog; the choice persists across restarts and applies to notifications too. *(Bengali is fully translated today — see Known Limitations.)*

### App & Profile
- 🚀 **Splash Screen** — animated floating logo with ambient food illustrations (2.2 s).
- 👋 **Onboarding** — 3 slides (Track Your Food / Waste Less Food / Shop Smart) + shopping-frequency setup, with Skip.
- 🔐 **Login** — Continue with Google (Credential Manager + Firebase Auth) or Continue as Guest.
- 👤 **Profile** — Google profile photo/name/email (letter avatar fallback), Edit Profile, Notifications toggle, Dark mode toggle, Reminder Preferences, Language, User Manual, About, Log out.
- 🏠 **Home Dashboard** — green hero header with greeting, Smart Insight card, 3 tappable stat cards (In Stock / Eat First / To Buy), Expiring Soon and Recently Added sections.
- 📄 **Static Pages** — User Manual, About App, Privacy Policy, Terms & Conditions, Language selection.

### UX Details (preserved exactly)
- Ripple press feedback, bounce-scale press animations, slide-up bottom sheets, fade/scale dialogs, snackbars, staggered list entrance, celebration confetti, infinite momentum wheel pickers, pill chips, floating FAB with label, 72 px bottom navigation.

---

## 🛠 Technology Stack

| Layer | Technology |
|---|---|
| Language | **Kotlin** (Java only where unavoidable) |
| UI | **XML layouts**, Material 3 Components, RecyclerView, ViewBinding |
| Database | **SQLite** via `SQLiteOpenHelper` (no Room) — schema v4 |
| Settings / session | SQLite `settings` table (key–value, scoped per user) |
| Authentication | **Firebase Authentication** (auth only) + Credential Manager "Sign in with Google" |
| Background work | **WorkManager** (expiry reminder sweep) + boot receiver |
| Localization | Per-app locales via `AppCompatDelegate.setApplicationLocales` |
| Fonts | Baloo 2 (display) + Nunito (body) via `res/font` |
| Icons | Material Symbols Rounded (font/vector drawables) |
| Build | AGP 8.7.3 · Gradle 8.9 · Kotlin 2.0.21 · JDK 17 |
| Min SDK | 24 (Android 7.0) |
| Compile / Target SDK | 35 |

### Dependencies
```kotlin
androidx.core:core-ktx · androidx.appcompat · com.google.android.material
androidx.constraintlayout · androidx.recyclerview · androidx.viewpager2
androidx.fragment:fragment-ktx · androidx.lifecycle:lifecycle-runtime-ktx
androidx.work:work-runtime-ktx                      // reminder scheduling
platform(com.google.firebase:firebase-bom) + firebase-auth   // AUTH ONLY
androidx.credentials + credentials-play-services-auth
com.google.android.libraries.identity.googleid:googleid      // Sign in with Google
```

**Explicitly not used:** Flutter, Jetpack Compose, Firebase Firestore, Firebase Realtime Database, Room, Retrofit, React Native.

---

## 📂 Folder Structure

```
FreshKeep/
├── app/
│   ├── src/main/
│   │   ├── java/com/freshkeep/app/
│   │   │   ├── activities/
│   │   │   │   ├── SplashActivity.kt
│   │   │   │   ├── OnboardingActivity.kt
│   │   │   │   ├── ShoppingSetupActivity.kt   # shopping-frequency setup
│   │   │   │   ├── LoginActivity.kt
│   │   │   │   ├── MainActivity.kt            # hosts 5 tab fragments + BottomNav + FAB
│   │   │   │   ├── AddFoodActivity.kt         # 5-step wizard + celebration
│   │   │   │   ├── AdjustQuantityActivity.kt  # wheel qty editor (3 modes)
│   │   │   │   ├── EditProductActivity.kt
│   │   │   │   ├── ManualAddShoppingActivity.kt
│   │   │   │   ├── EatFirstActivity.kt
│   │   │   │   ├── ReminderPrefsActivity.kt
│   │   │   │   ├── LanguageActivity.kt
│   │   │   │   ├── UserManualActivity.kt
│   │   │   │   ├── AboutActivity.kt
│   │   │   │   └── LegalActivity.kt           # PrivacyPolicyActivity + TermsActivity
│   │   │   ├── fragments/
│   │   │   │   ├── HomeFragment.kt
│   │   │   │   ├── InventoryFragment.kt
│   │   │   │   ├── ShoppingFragment.kt
│   │   │   │   ├── AnalyticsFragment.kt
│   │   │   │   └── ProfileFragment.kt
│   │   │   ├── sheets/
│   │   │   │   └── FoodDetailSheet.kt         # BottomSheetDialogFragment
│   │   │   ├── adapters/                      # RecyclerView adapters
│   │   │   │   ├── InventoryAdapter.kt
│   │   │   │   ├── CategoryGridAdapter.kt
│   │   │   │   └── AddFoodGridAdapter.kt      # cards + remove/edit badges + add tile
│   │   │   ├── db/                            # every query scoped by user_uid
│   │   │   │   ├── FreshKeepDbHelper.kt       # SQLiteOpenHelper, schema v4, per-profile seeding
│   │   │   │   ├── InventoryDao.kt
│   │   │   │   ├── ShoppingDao.kt             # auto-list rules + cycle state
│   │   │   │   ├── CatalogDao.kt              # categories + products (built-in/custom)
│   │   │   │   ├── AnalyticsDao.kt            # live analytics computed from SQLite
│   │   │   │   ├── HistoryDao.kt              # consumed / discarded / qty-adjusted log
│   │   │   │   ├── NotificationDao.kt
│   │   │   │   ├── ReminderDao.kt
│   │   │   │   ├── ReminderLogDao.kt          # reminder de-duplication + expired cap
│   │   │   │   └── SettingsDao.kt             # key–value settings, session, profiles
│   │   │   ├── notifications/
│   │   │   │   ├── ReminderWorker.kt          # daily sweep honouring reminder prefs
│   │   │   │   ├── ReminderScheduler.kt       # WorkManager periodic scheduling
│   │   │   │   ├── NotificationHelper.kt      # channel + builder + tap intents
│   │   │   │   └── BootReceiver.kt            # re-arm after reboot / app update
│   │   │   ├── FreshKeepApp.kt                # Application: locale, channel, scheduling
│   │   │   ├── models/
│   │   │   │   ├── FoodItem.kt
│   │   │   │   ├── Category.kt
│   │   │   │   ├── Product.kt
│   │   │   │   └── ShoppingItem.kt
│   │   │   ├── views/                         # custom views (1:1 with web components)
│   │   │   │   ├── IconView.kt                # Material Symbols Rounded ligatures
│   │   │   │   ├── FreshnessBarView.kt        # freshness + expiry progress bars
│   │   │   │   ├── PieChartView.kt
│   │   │   │   ├── BarChartView.kt
│   │   │   │   ├── QuantityWheelView.kt       # infinite momentum wheel
│   │   │   │   ├── VerticalWheelView.kt       # snap wheel (reminders, date picker)
│   │   │   │   ├── BottomNavView.kt
│   │   │   │   ├── ToggleView.kt
│   │   │   │   ├── CelebrationView.kt         # confetti success animation
│   │   │   │   ├── FlowLayout.kt / SquareFrameLayout.kt
│   │   │   │   ├── Press.kt                   # bounce press-scale feedback
│   │   │   │   ├── ConfirmDialog.kt / Accordion.kt
│   │   │   │   ├── ChipHelper.kt / CategoryCardBinder.kt
│   │   │   │   └── Illustrations.kt           # illustration key → vector drawable
│   │   │   └── utils/
│   │   │       ├── ExpiryUtils.kt             # port of expiry-utils.js + deriveFreshness
│   │   │       ├── QuantityFormat.kt          # qty parse/format + unit steps
│   │   │       ├── ProductIllustrations.kt    # port of food-illustrations.js
│   │   │       ├── AnalyticsData.kt           # chart metadata + label resources
│   │   │       ├── LocaleHelper.kt            # per-app language switching
│   │   │       └── FoodCardBinder.kt
│   │   ├── res/
│   │   │   ├── layout/                        # one XML per screen/sheet/list-item
│   │   │   ├── drawable/                      # shapes, ripples, food illustration vectors
│   │   │   ├── color/                         # button tint state lists
│   │   │   ├── font/                          # baloo2_*.ttf, nunito_*.ttf
│   │   │   ├── values/                        # colors, styles, themes, dimens, strings
│   │   │   ├── values-bn/                     # Bengali translation
│   │   │   ├── values-night/                  # dark theme colors
│   │   │   ├── anim/                          # slide-up, fade-scale, bounce animations
│   │   │   └── mipmap-*/                      # launcher icons
│   │   └── AndroidManifest.xml
│   ├── google-services.json                   # gitignored — supply your own, see Build Instructions
│   └── build.gradle.kts
├── assets/                                    # original brand assets (logo PNG/SVG)
├── ui_kits/freshkeep-app/                     # original web prototype (reference)
├── components/                                # original design-system components (reference)
├── tokens/                                    # original design tokens (reference)
├── build.gradle.kts
├── settings.gradle.kts
└── README.md
```

---

## 🗄 SQLite Structure

Database: `freshkeep.db` — created and versioned in `FreshKeepDbHelper` (raw `SQLiteOpenHelper`, no ORM). **Current version: 4.**

### Multi-user model
**Every table carries a `user_uid` column and every query filters on it.** The value is the Firebase Authentication UID for Google users, or the literal `"guest"` for guest sessions.

- **First sign-in with a Google account** creates a fresh local profile: its own copy of the category/product catalog and reminder defaults, with an **empty inventory and shopping list** (all dashboard and analytics figures start at 0).
- **Signing in again with the same account** restores everything from SQLite exactly as it was left.
- **A different Google account** has a different UID, so it gets a completely separate profile — one user's data is never visible to another.
- **Logging out clears only the session**; all SQLite data is preserved.

There are no unscoped reads or writes: queries are always `… WHERE user_uid = ?`.

### `users`
| Column | Type | Notes |
|---|---|---|
| id | INTEGER PRIMARY KEY AUTOINCREMENT | |
| user_uid | TEXT UNIQUE | Firebase UID, or `guest` |
| name | TEXT | display name |
| email | TEXT | `NULL` for guest |
| photo_url | TEXT | Google profile photo |
| auth_type | TEXT | `google` / `guest` |
| created_at | TEXT (ISO-8601) | |

### `categories`
| Column | Type | Notes |
|---|---|---|
| id | INTEGER PRIMARY KEY AUTOINCREMENT | |
| user_uid | TEXT | owner |
| key | TEXT | e.g. `vegetables`, `custom_1699…` (unique per user) |
| label | TEXT | display name |
| icon | TEXT | Material Symbols name |
| tone | TEXT | `green` / `orange` / `red` / `blue` |
| illustration | TEXT | illustration key or `NULL` |
| is_custom | INTEGER (0/1) | built-ins seeded on first run |
| is_hidden | INTEGER (0/1) | user removed a built-in |

### `products`  *(preset + custom catalog, per user)*
| Column | Type | Notes |
|---|---|---|
| id | INTEGER PRIMARY KEY AUTOINCREMENT | |
| user_uid | TEXT | owner |
| category_key | TEXT → categories.key | |
| name | TEXT | |
| default_expiry_days | INTEGER | e.g. Tomato = 7 |
| default_unit | TEXT | `Kg` / `Gram` / `Piece` / `Bottle` / `Packet` / `Liter` |
| is_custom | INTEGER (0/1) | |
| is_hidden | INTEGER (0/1) | |

### `inventory`
| Column | Type | Notes |
|---|---|---|
| id | INTEGER PRIMARY KEY AUTOINCREMENT | |
| user_uid | TEXT | owner |
| name | TEXT | |
| category_key | TEXT → categories.key | |
| icon | TEXT | |
| illustration | TEXT | nullable |
| quantity | TEXT | display string, e.g. `6 pcs`, `1 L` (mirrors the web prototype) |
| added_date | TEXT (ISO-8601) | |
| expiry_date | TEXT (ISO-8601) | freshness/labels derived at read time |
| low_stock | INTEGER (0/1) | |
| status | TEXT | `active` / `consumed` / `discarded` (kept for analytics) |
| status_date | TEXT | when consumed/discarded |

> `freshness`, `days_left`, and `expiry_label` are **computed** from `expiry_date` (port of `deriveFreshness()` / `fkExpiryProgress()`), never stored.

### `shopping_items`  *(manual entries; auto entries are derived from inventory at read time)*
| Column | Type | Notes |
|---|---|---|
| id | INTEGER PRIMARY KEY AUTOINCREMENT | |
| user_uid | TEXT | owner |
| name | TEXT | |
| category_key | TEXT | |
| quantity | TEXT | |
| source | TEXT | `manual` (auto rows are computed) |
| purchased | INTEGER (0/1) | |
| created_at | TEXT | |

### `reminder_prefs`
| Column | Type | Notes |
|---|---|---|
| user_uid | TEXT | part of composite PK |
| category_key | TEXT | vegetables, fruits, dairy, meatFish, packaged, frozen, beverages, custom… |
| days_json | TEXT | JSON array e.g. `[1,3,7]` (default) |

### `history` *(action log — Consumed / Discarded / Quantity adjusted)*
| Column | Type | Notes |
|---|---|---|
| id | INTEGER PRIMARY KEY AUTOINCREMENT | |
| user_uid | TEXT | owner |
| product_name | TEXT | |
| category | TEXT | |
| quantity | TEXT | quantity at the time of the action |
| action | TEXT | `CONSUMED` / `DISCARDED` / `QUANTITY_ADJUSTED` |
| date | TEXT | `yyyy-MM-dd` |
| time | TEXT | `HH:mm` |
| created_at | TEXT (ISO-8601) | ordering |

### `notifications` *(per-user notification store)*
| Column | Type | Notes |
|---|---|---|
| id | INTEGER PRIMARY KEY AUTOINCREMENT | |
| user_uid | TEXT | owner |
| title / message | TEXT | |
| is_read | INTEGER (0/1) | |
| created_at | TEXT | |

### `reminder_log` *(reminder delivery tracking)*
| Column | Type | Notes |
|---|---|---|
| id | INTEGER PRIMARY KEY AUTOINCREMENT | |
| user_uid | TEXT | owner |
| item_id | INTEGER | inventory row |
| day_key | TEXT | `yyyy-MM-dd`; unique per (user, item, day) — max one reminder per item per day |
| kind | TEXT | `BEFORE` / `EXPIRY` / `EXPIRED` |
| created_at | TEXT | |

### `settings` *(key–value, mirrors web `localStorage`)*
| Column | Type | Notes |
|---|---|---|
| user_uid | TEXT | `''` = device scope, otherwise the owning user |
| key | TEXT | part of composite PK |
| value | TEXT | |

**Device-scoped keys** (`user_uid = ''`): `session_uid`, `session_email`, `session_auth_type`, `session_name`, `onboarding_done`, `onboarding_frequency`, `dark_mode`, `language`, `notifications`.
**Per-user keys:** `shop_frequency`, `last_shopping_date`, and the shopping-cycle state (`shop_purchased`, `shop_removed`, `shop_qty`).

### Migrations
| From → To | Change |
|---|---|
| v1 → v2 | Per-user schema introduced (`user_uid` everywhere). Tables recreated — v1 held only single-profile demo data. |
| v2 → v3 | `history` table added (**additive** — user data preserved). |
| v3 → v4 | `reminder_log` table added (**additive**). |

---

## 🔐 Authentication Flow

**Firebase Authentication is the source of truth** for signed-in users; application data never leaves the device.

```
App Launch
   ▼
SplashActivity (2.2 s animation — shown exactly once per launch)
   ▼
FirebaseAuth.currentUser != null ? ──yes──▶ MainActivity (Home tab)
   │                                        (local session reconciled to the Firebase UID)
   no
   ▼
Guest session in SQLite? ──yes──▶ MainActivity (Home tab)
   │ no
   ▼
onboarding_done ? ──yes──▶ LoginActivity
   │ no
   ▼
OnboardingActivity (3 slides + Skip)
   ▼
Shopping Frequency Setup (Weekly / Every 15 Days / Monthly)
   ▼
LoginActivity
   ├── "Continue with Google" → Credential Manager sheet → Firebase signInWithCredential
   │                            → profile created/restored under the Firebase UID
   └── "Continue as Guest"    → local guest session (uid = "guest")
   ▼
MainActivity (Home tab)
```

**Session reconciliation (on every launch).** Firebase persists its own session, so the Splash checks it first and keeps SQLite in step:
- Firebase user present but no/stale local session → the local session is rebuilt from the Firebase account, so UID-scoped queries read the right data.
- Local session claims Google but Firebase has no user → the stale session is cleared and the user is sent to Login.
- Guest sessions have no Firebase user and therefore rely on the local session alone.

**Log out** (Profile) performs, in order: clear the local session → reset `onboarding_done` → `FirebaseAuth.signOut()` → clear Credential Manager state → navigate to Onboarding with `NEW_TASK | CLEAR_TASK`. **SQLite data is never deleted.** Onboarding is shown again after an explicit logout; the next launch therefore runs Splash → Onboarding → Login → Home.

**Back-stack guarantees:** Splash is `singleTask` + guarded by `isTaskRoot` and a one-shot navigation flag (it can never appear twice); entering Home clears the task, so Back never returns to Login; after logout Back never returns to Home.

If a returning guest never chose a shopping frequency, the one-time **Shopping Setup** screen appears before the tabs (same fallback as the prototype).

---

## 📱 Screen Flow

| # | Screen | Android component | Purpose |
|---|---|---|---|
| 1 | Splash | `SplashActivity` | Animated logo, auto-advance after 2.2 s |
| 2 | Onboarding | `OnboardingActivity` (ViewPager2) | 3 slides + dots + Skip |
| 3 | Shopping Setup | screen inside Onboarding / fallback | Pick shopping frequency |
| 4 | Login | `LoginActivity` | Google / Guest |
| 5 | Home | `HomeFragment` | Hero stats, insight card, expiring soon, recently added |
| 6 | Inventory | `InventoryFragment` | Search, category chips, item cards, edit/delete |
| 7 | Add Food | `AddFoodActivity` | 5-step wizard + celebration |
| 8 | Food Detail | `FoodDetailSheet` (BottomSheet) | Consume / Adjust / Discard |
| 9 | Adjust Quantity | `AdjustQuantityActivity` | Momentum-wheel quantity edit (3 modes) |
| 10 | Edit Product | `EditProductActivity` | Edit name, category, qty, expiry |
| 11 | Eat First | `EatFirstActivity` | Urgency-grouped consume list |
| 12 | Shopping | `ShoppingFragment` | Auto + manual list, purchase toggle |
| 13 | Manual Add (Shopping) | `ManualAddShoppingActivity` | Add item to shopping list |
| 14 | Analytics | `AnalyticsFragment` | Pie + bar charts, time filters |
| 15 | Profile | `ProfileFragment` | Settings hub, toggles, log out |
| 16 | Reminder Preferences | `ReminderPrefsActivity` | Per-category reminder days |
| 17 | Language | `LanguageActivity` | Language selection |
| 18 | User Manual | `UserManualActivity` | Help content |
| 19 | About | `AboutActivity` | App info → Privacy / Terms |
| 20 | Privacy Policy | `PrivacyPolicyActivity` | Static page |
| 21 | Terms & Conditions | `TermsActivity` | Static page |

---

## 🧭 Navigation Flow

```
Splash ──▶ Onboarding (×3) ──▶ Frequency Setup ──▶ Login ──▶ MainActivity
                                                              │
              ┌───────────┬───────────┬───────────┬───────────┤  BottomNavigationView (72 dp)
              ▼           ▼           ▼           ▼           ▼
            Home      Inventory   Shopping   Analytics    Profile
              │           │           │                       │
              │  [FAB ➕ Add Food — Home & Inventory]         ├─▶ Reminder Preferences
              │           │           │                       ├─▶ Language
              ├─▶ Eat First           └─▶ Manual Add sheet    ├─▶ User Manual
              ├─▶ Food Detail sheet ──▶ Adjust Quantity       ├─▶ About ─▶ Privacy / Terms
              │           └─(edit)──▶ Edit Product sheet      └─▶ Log out ─▶ Login
              └─▶ (stat cards jump to Inventory / Eat First / Shopping / Analytics)

Add Food wizard: Step 1 Category → Step 2 Product → Step 3 Quantity & Unit
                → Step 4 Expiry (duration / calendar) → Step 5 Review → 🎉 Celebration → back to caller
```

- Tab state, FAB, and bottom navigation live in `MainActivity`; every tab keeps the exact bottom-nav highlight and FAB behavior of the prototype.
- Bottom sheets and dialogs use the same scrim, corner radii (32 dp top), and slide-up/fade animations as the web version.

---

## 🎨 Design System

Everything below is transcribed 1:1 from `tokens/` into `res/values`:

| Token | Value |
|---|---|
| Primary green | `#4CAF50` (surface `#E8F5E9`) |
| Semantic | Orange `#FFA726` · Red `#EF5350` · Blue `#42A5F5` · Aging yellow `#FFD54F` |
| Freshness scale | Fresh = green · Aging = yellow · Soon = orange · Expired = red |
| Neutrals | Gray 25 `#FAFBFA` → Gray 900 `#14170F` |
| Display font | **Baloo 2** (headings, numerals) |
| Body font | **Nunito** (body, labels, captions) |
| Radii | 12 / 18 / 24 / 32 dp + pill |
| Spacing | 8 dp grid (4–80 dp), screen margin 24 dp |
| Touch targets | min 48 dp, FAB 64 dp, bottom nav 72 dp |
| Motion | standard `(0.4,0,0.2,1)` · soft-out `(0.16,1,0.3,1)` · bounce `(0.34,1.56,0.64,1)` · 120/220/380/900 ms |
| Dark theme | provided via `values-night` (same tokens as web `[data-theme="dark"]`) |

---

## 🗓 Development Plan

| Phase | Scope | Deliverable |
|---|---|---|
| **1. Project setup** | Gradle project, ViewBinding, Material Components, fonts, full token transcription (colors/dimens/styles/themes, dark theme) | Compiling skeleton with design system |
| **2. Database layer** | `FreshKeepDbHelper`, all tables, DAOs, seed data (11 categories + preset products), `ExpiryUtils` port | Tested data layer |
| **3. Launch flow** | Splash, Onboarding (ViewPager2), Frequency Setup, Login (Google + Guest), session handling | Working entry flow |
| **4. Main shell** | `MainActivity`, BottomNavigationView, FAB, 5 fragment shells | Tab navigation |
| **5. Home** | Hero header, stat cards with ripple, insight card, expiring-soon + recently-added lists | Pixel-perfect Home |
| **6. Inventory** | Search, chips, item cards with expiry progress bar, edit/delete dialog + snackbar | Full inventory CRUD |
| **7. Add Food wizard** | 5 steps, quantity wheel, duration slider, calendar, custom categories/products, celebration | Complete add flow |
| **8. Detail & actions** | Food Detail sheet, Adjust Quantity, Edit Product, Eat First | Consume/discard loop |
| **9. Shopping** | Auto-list builder, manual add sheet, purchase toggle, next-date banner | Smart shopping list |
| **10. Analytics** | Custom `PieChartView` + `BarChartView` with entrance animations, filters | Dashboard |
| **11. Profile & pages** | Profile, Reminder Prefs, Language, Manual, About, Privacy, Terms, dark mode, log out | Settings complete |
| **12. Auth & multi-user** | Firebase Authentication, Credential Manager sign-in, per-user SQLite profiles keyed by UID, session reconciliation | Real accounts, isolated data |
| **13. Notifications** | WorkManager reminder sweep honouring per-category preferences, boot receiver, expiry-day deep link into the detail sheet | Working reminders |
| **14. Localization** | Per-app locales, confirmation dialog, string extraction, Bengali translation | Language switching |
| **15. Polish & QA** | Animation timing pass, pixel comparison against prototype, lint clean, edge cases, release build | Signed APK |

**Status:** phases 1–14 implemented; phase 15 in progress (see [Known Limitations](#️-known-limitations)).

---

## 🔧 Build Instructions

### Prerequisites
- **Android Studio** Ladybug or newer
- **JDK 17** (bundled with Android Studio)
- Android SDK Platform **35**
- An emulator or device on **Android 7.0 (API 24)** or higher

### Steps
1. Clone the repository:
   ```bash
   git clone https://github.com/<your-username>/FreshKeep.git
   cd FreshKeep
   ```
2. Open in Android Studio: **File → Open →** select the project root.
3. Let Gradle sync finish.
4. **Configure Firebase Authentication** (required for Google Sign-In — see below).
5. Select a device/emulator and press **Run ▶** (or `Shift+F10`).

> ### ⚠️ `app/google-services.json` is not in this repository
>
> It is listed in `.gitignore` and deliberately excluded, because it contains **project-specific Firebase identifiers** (`api_key`, `project_id`, `mobilesdk_app_id`) tied to one Firebase project and one set of signing-certificate fingerprints. A committed copy would be useless to you anyway — your debug keystore's SHA-1 will not match it, and Google Sign-In would fail with **status code 10 (`DEVELOPER_ERROR`)**.
>
> **Every developer must generate their own** by following [Firebase setup](#firebase-setup-google-sign-in-only) below, then place it at `app/google-services.json`.
>
> **You do not need it to build or run the app.** The `google-services` plugin is applied conditionally, so the project compiles and installs without the file — only the "Continue with Google" button is disabled. **Continue as Guest exercises the entire app** (inventory, shopping, analytics, reminders, all of it) with zero configuration.

> The database is created and seeded per user profile on first sign-in. **Continue as Guest works with no configuration at all** — the Firebase setup below is only needed for the Google Sign-In button.

### Firebase setup (Google Sign-In only)

Google requires every app using Google Sign-In to be registered with its package name and signing certificate. Without this, sign-in fails with **status code 10 (`DEVELOPER_ERROR`)** — no code change can bypass it.

1. Create a project at [console.firebase.google.com](https://console.firebase.google.com).
2. **Add app → Android**, package name **`com.freshkeep.app`**.
3. Add your signing certificate fingerprints (Project settings → Your apps → Add fingerprint). Get them with:
   ```bash
   keytool -list -v -keystore ~/.android/debug.keystore -alias androiddebugkey -storepass android
   ```
   Add both **SHA-1** and **SHA-256**.
4. **Build → Authentication → Sign-in method → enable Google.** *(Do this before step 5 — it creates the web client ID.)*
5. Download `google-services.json` and place it at **`app/google-services.json`** (next to `app/build.gradle.kts`, not inside `src/`).
6. Rebuild. The `google-services` plugin is applied **conditionally**, so the project still compiles before this file exists; the Google button simply reports that it is not configured.

> **Never commit your `google-services.json`.** It is already covered by `.gitignore`, so it stays untracked automatically — do not force-add it with `git add -f`. If you ever do commit one by mistake, treat the Firebase project as exposed: rotate/restrict the API key in the Google Cloud console and verify your Firebase Security Rules, since GitHub caches and indexes content even after a file is deleted.

---

## 📦 APK Build Guide

### Debug APK (for testing)
```bash
./gradlew assembleDebug
# Output: app/build/outputs/apk/debug/app-debug.apk
```

### Release APK (signed)
1. Create a keystore (one time):
   ```bash
   keytool -genkey -v -keystore freshkeep-release.keystore \
     -alias freshkeep -keyalg RSA -keysize 2048 -validity 10000
   ```
2. Add signing config to `app/build.gradle.kts` (or use **Build → Generate Signed App Bundle / APK…** in Android Studio).
3. Build:
   ```bash
   ./gradlew assembleRelease
   # Output: app/build/outputs/apk/release/app-release.apk
   ```
4. Install on a device:
   ```bash
   adb install app/build/outputs/apk/release/app-release.apk
   ```

---

## 🌿 GitHub Structure

### Branches
| Branch | Purpose |
|---|---|
| `main` | Stable, releasable code only |
| `develop` | Integration branch for finished features |
| `feature/<name>` | One branch per phase/feature (e.g. `feature/add-food-wizard`) |
| `fix/<name>` | Bug fixes |

### Workflow
1. Branch from `develop` → implement → commit with conventional messages (`feat:`, `fix:`, `style:`, `db:`).
2. Open a Pull Request into `develop`; merge to `main` only at phase milestones.
3. Tag releases: `v1.0.0`, `v1.1.0`, …

### Repository hygiene
- `.gitignore` — `build/`, `.gradle/`, `local.properties`, `*.keystore`, `.idea/` (machine-specific files) and **`google-services.json`** (per-developer Firebase config — see [Build Instructions](#-build-instructions))
- `.gitattributes` — normalizes all text files to LF in the repo; keeps `*.bat` CRLF and `gradlew`/`*.sh` LF
- `README.md` — this document
- Web prototype (`ui_kits/`, `components/`, `tokens/`, `assets/`) kept in-repo as the pixel-reference for the conversion
- GitHub Releases — attach the signed APK per version

---

## ⚠️ Known Limitations

Current, honest state of the project:

- **Localization is partial.** The switching system is complete and the string catalogue (~170 entries) is extracted, but only **Bengali** is translated — the other 13 languages switch the locale correctly and fall back to English. A few secondary screens still contain hardcoded text: the Add Food wizard, Reminder Preferences preset/toggle labels, the custom category/product sheets, and the User Manual / legal pages.
- **Notification delivery timing** is governed by WorkManager's periodic scheduling, so the first sweep after install may take a few hours rather than firing immediately (use Android Studio's Background Task Inspector to trigger it during testing).
- **Edit Profile changes the local display name only** — a third-party app cannot rename a Google account, so email and photo are read-only and refresh from Google on each sign-in.
- **Release signing is not configured** in `build.gradle.kts`; only debug builds are produced today.
- **Fixed brand colors** on the food-detail action buttons do not adapt to dark mode by design.

---

## 🚀 Future Scope

- 📷 **Barcode scanning** — add products by scanning packaging (CameraX + ML Kit on-device).
- 🌐 **Complete the remaining 13 translations** and finish extracting the last hardcoded strings.
- ☁️ **Optional cloud sync/backup** — export/import the SQLite database; later, account-based sync.
- 👨‍👩‍👧 **Shared household** — multiple members managing one inventory.
- 🥗 **Recipe suggestions** — recipes prioritizing "Eat First" items.
- 📈 **Money-saved tracking** — estimate savings from reduced waste.
- ⌚ **Widgets** — home-screen widget for expiring-soon items.
- 🗂 **History screen** — surface the existing `history` table in the UI (data layer is already in place).

---

<p align="center">Made with 💚 to fight food waste — <b>FreshKeep</b></p>
