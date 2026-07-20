export interface FoodIllustrationProps {
  /** Illustration key. Falls back to 'others' if unknown. */
  type?: 'tomato' | 'vegetables' | 'fruits' | 'frozen' | 'meat' | 'fish' | 'milk' | 'snacks' | 'drinks' | 'rice' | 'spices' | 'others';
  size?: string | number;
}
