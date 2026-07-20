export interface FreshnessBarProps {
  level?: 'fresh' | 'aging' | 'soon' | 'expired';
  label?: string;
  /** Days since expiry — drives the right-to-left red fill when level is 'expired'. */
  expiredDays?: number;
}
