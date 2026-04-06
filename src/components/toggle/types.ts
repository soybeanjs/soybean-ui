import type { ClassValue, ToggleEmits, ToggleProps as _ToggleProps } from '@soybeanjs/headless';
import type { ThemeSize, ThemeColor } from '@/theme';
import type { ToggleVariant, ToggleShape } from './variants';

export interface ToggleProps extends _ToggleProps {
  class?: ClassValue;
  color?: ThemeColor;
  size?: ThemeSize;
  variant?: ToggleVariant;
  shape?: ToggleShape;
}

export type { ToggleEmits, ToggleVariant, ToggleShape };
