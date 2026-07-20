export interface OnboardingSceneProps {
  /** Which onboarding beat this scene illustrates. */
  type?: 'track' | 'reminders' | 'shopping';
  size?: string | number;
}
