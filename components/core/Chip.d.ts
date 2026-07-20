export interface ChipProps {
  label: string;
  icon?: string;
  selected?: boolean;
  onClick?: () => void;
  tone?: 'neutral' | 'green' | 'orange' | 'red' | 'blue';
}
