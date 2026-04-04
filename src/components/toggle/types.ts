import type { ClassValue, ToggleEmits, ToggleProps as _ToggleProps } from '@soybeanjs/headless';
import type { ToggleSize, ToggleVariant } from './variants';

export interface ToggleProps extends _ToggleProps {
  class?: ClassValue;
  variant?: ToggleVariant;
  size?: ToggleSize;
}

export type { ToggleEmits, ToggleVariant, ToggleSize };
