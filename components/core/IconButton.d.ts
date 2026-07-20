export interface IconButtonProps {
  /** Material Symbols glyph name, e.g. "arrow_back", "close", "edit". */
  icon: string;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'ghost' | 'surface' | 'filled';
  onClick?: () => void;
  ariaLabel?: string;
  style?: React.CSSProperties;
}
