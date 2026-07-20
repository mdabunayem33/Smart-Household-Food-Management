export interface CategoryCardProps {
  label: string;
  /** Material Symbols glyph name (filled) — fallback if no `illustration`. */
  icon?: string;
  /** FoodIllustration type key. Preferred over `icon` — flat vector illustration, soft gradient. */
  illustration?: string;
  tone?: 'green' | 'orange' | 'red' | 'blue';
  selected?: boolean;
  onClick?: () => void;
}
