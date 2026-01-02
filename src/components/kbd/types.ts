import type { ClassValue, KbdValue, KbdProps as _KbdProps } from '@soybeanjs/headless';
import type { ThemeSize } from '@/theme';
import type { KbdVariant } from '@/variants/kbd';

export interface KbdProps extends _KbdProps {
  class?: ClassValue;
  size?: ThemeSize;
  variant?: KbdVariant;
}

export type { KbdVariant, KbdValue };
