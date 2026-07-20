export interface FoodCardProps {
  name: string;
  quantity: string;
  /** Material Symbols glyph name (filled) — fallback if no `illustration`. */
  icon?: string;
  /** FoodIllustration type key, shown as a 56px flat vector thumbnail. Preferred over `icon`. */
  illustration?: string;
  freshness?: 'fresh' | 'aging' | 'soon' | 'expired';
  expiryLabel: string;
  onClick?: () => void;
}
