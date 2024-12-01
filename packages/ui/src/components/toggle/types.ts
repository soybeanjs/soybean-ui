import type { ToggleEmits, ToggleProps as _ToggleProps } from '@soybean-ui/primitive';
import type { ThemeSize, ToggleVariant } from '@soybean-ui/variants';

export interface ToggleProps extends _ToggleProps {
  variant?: ToggleVariant;
  size?: ThemeSize;
}

export type { ToggleEmits, ToggleVariant };
