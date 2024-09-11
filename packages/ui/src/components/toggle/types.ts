import type { ClassValue, ToggleSize, ToggleVariant } from '@soybean-ui/variants';
import type { ToggleProps as $ToggleProps } from 'radix-vue';

export type ToggleProps = $ToggleProps & {
  class?: ClassValue;
  size?: ToggleSize;
  variant?: ToggleVariant;
};

export type { ToggleSize, ToggleVariant };
