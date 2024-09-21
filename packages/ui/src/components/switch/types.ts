import type { SwitchRootProps as $SwitchRootProps } from 'radix-vue';
import type { ThemeColor, ThemeSize } from '@soybean-ui/variants';
import type { ClassValue } from '../../types';

export type SwitchRootProps = $SwitchRootProps & {
  class?: ClassValue;
  color?: ThemeColor;
  size?: ThemeSize;
};

export type SwitchThumbProps = {
  class?: ClassValue;
  size?: ThemeSize;
};

export type SwitchProps = SwitchRootProps & {
  thumbClass?: ClassValue;
};
