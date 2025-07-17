import type { KbdValue, KbdProps as _KbdProps } from '@headless';
import type { ThemeSize } from '@theme';
import type { KbdVariant } from '@variants/kbd';

export interface KbdProps extends _KbdProps {
  size?: ThemeSize;
  variant?: KbdVariant;
  iconization?: boolean;
}

export type { KbdValue, KbdVariant };
