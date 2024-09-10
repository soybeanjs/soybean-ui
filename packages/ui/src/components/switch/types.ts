import type { SwitchRootProps as $SwitchRootProps, SwitchThumbProps as $SwitchThumbProps } from 'radix-vue';
import type { ClassValue, SwitchColor, SwitchRound, SwitchSize } from '@soybean-ui/variants';

export type SwitchRootProps = $SwitchRootProps & {
  class?: ClassValue;
  thumbClass?: ClassValue;
  bgColor?: SwitchColor;
  size?: SwitchSize;
  defaultColor?: string;
  round?: SwitchRound;
  loading?: boolean;
};

export type SwitchThumbProps = $SwitchThumbProps & {
  class?: ClassValue;
  color?: string;
  size?: SwitchSize;
  round?: SwitchRound;
};

export type SwitchLoadingProps = {
  loading: boolean;
  bgColor?: SwitchColor;
  size?: SwitchSize;
};

export type { SwitchSize, SwitchRound };
