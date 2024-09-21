import type { ToggleProps as $ToggleProps } from 'radix-vue';
import type { ToggleSize, ToggleVariant } from '@soybean-ui/variants';
import type { ClassValue } from '../../types';

export type ToggleProps = $ToggleProps & {
  class?: ClassValue;
  size?: ToggleSize;
  variant?: ToggleVariant;
};

export type { ToggleSize, ToggleVariant };
