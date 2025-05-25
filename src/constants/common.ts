import type { FocusIntent, NavigationKey } from '../types';

export const MAP_KEY_TO_FOCUS_INTENT: Record<NavigationKey, FocusIntent> = {
  ArrowLeft: 'prev',
  ArrowUp: 'prev',
  ArrowRight: 'next',
  ArrowDown: 'next',
  PageUp: 'first',
  Home: 'first',
  PageDown: 'last',
  End: 'last'
};
