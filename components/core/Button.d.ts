import React from 'react';

export interface ButtonProps {
  children: React.ReactNode;
  /** Visual treatment. Primary = the one CTA per screen. */
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
  size?: 'lg' | 'md' | 'sm';
  fullWidth?: boolean;
  disabled?: boolean;
  icon?: React.ReactNode;
  onClick?: () => void;
  style?: React.CSSProperties;
}
