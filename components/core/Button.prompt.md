Large, pill-shaped, one-primary-action button used across the whole app.

```jsx
<Button variant="primary" size="lg" fullWidth>Get Started</Button>
<Button variant="secondary" size="md">Continue as Guest</Button>
<Button variant="ghost" size="sm">Skip</Button>
<Button variant="danger">Discard</Button>
```

Variants: `primary` (filled green, glow shadow — the one CTA per screen), `secondary` (light-green
surface, e.g. "Continue as Guest"), `ghost` (transparent, e.g. "Skip"), `danger` (red, e.g. "Discard").
Sizes: `lg` 64px (default, onboarding/CTA), `md` 56px, `sm` 48px (minimum touch target). Pass `icon`
for a leading icon node (e.g. a Google "G" mark for login).
