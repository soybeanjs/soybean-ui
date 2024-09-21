import type { ToggleProps as $ToggleProps } from 'radix-vue';
import type { ThemeSize, ToggleVariant } from '@soybean-ui/variants';
import type { ClassValue } from '../../types';

export type ToggleProps = $ToggleProps & {
  class?: ClassValue;
  variant?: ToggleVariant;
  size?: ThemeSize;
};

export type { ToggleVariant };
