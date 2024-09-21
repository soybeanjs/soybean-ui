import type { ToggleProps as $ToggleProps } from 'radix-vue';
import type { ToggleSize, ToggleVariant } from '@soybean-ui/variants';
import type { ClassValue } from '../../types';

export type ToggleProps = $ToggleProps & {
  class?: ClassValue;
  variant?: ToggleVariant;
  size?: ToggleSize;
};

export type { ToggleSize, ToggleVariant };
