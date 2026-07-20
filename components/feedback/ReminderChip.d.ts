export interface ReminderChipProps {
  /** e.g. "7 days before" */
  timing: string;
  tone?: 'gentle' | 'urgent' | 'critical';
  onRemove?: () => void;
}
