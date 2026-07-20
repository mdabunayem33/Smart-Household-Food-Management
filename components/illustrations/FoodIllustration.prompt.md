Flat, minimal, rounded-shape food illustration with a soft two-tone gradient fill — the app's single
illustration style, used everywhere a real food photo would otherwise go (category tiles, product
tiles, inventory rows, splash/onboarding heroes). No outlines, no per-item mascot faces, no photos.

```jsx
<FoodIllustration type="tomato" size={64} />
<FoodIllustration type="vegetables" />
```

12 keys ship today: `tomato`, `vegetables`, `fruits`, `frozen`, `meat`, `fish`, `milk`, `snacks`,
`drinks`, `rice`, `spices`, `others`. Unmapped product names fall back to their category's illustration
(handled by the UI kit's `food-illustrations.js` lookup, not this component) so the whole app reads
as one consistent illustration set rather than a per-SKU library.
