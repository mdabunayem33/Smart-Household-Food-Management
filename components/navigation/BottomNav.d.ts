export interface BottomNavProps {
  active?: 'home' | 'inventory' | 'shopping' | 'analytics' | 'profile';
  onChange?: (key: string) => void;
}
