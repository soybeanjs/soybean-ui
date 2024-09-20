import type { SwitchRootProps as $SwitchRootProps } from 'radix-vue';
import type { SwitchColor, SwitchSize } from '@soybean-ui/variants';
import type { ClassValue } from '../../types';

export type SwitchRootProps = $SwitchRootProps & {
  class?: ClassValue;
  color?: SwitchColor;
  size?: SwitchSize;
};

export type SwitchThumbProps = {
  class?: ClassValue;
  size?: SwitchSize;
};

export type SwitchProps = SwitchRootProps & {
  thumbClass?: ClassValue;
};

export type { SwitchColor, SwitchSize };
