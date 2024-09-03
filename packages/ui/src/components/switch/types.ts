import type { SwitchRootProps as $SwitchRootProps, SwitchThumbProps as $SwitchThumbProps } from 'radix-vue';
import type { SwitchColor, SwitchRound, SwitchSize } from '@soybean-ui/variants';
export type SwitchRootProps = $SwitchRootProps & {
  class?: string;
  thumbClass?: string;
  bgColor?: SwitchColor;

  size?: SwitchSize;
  defaultColor?: string;
  round?: SwitchRound;
  loading?: boolean;
};
export type SwitchThumbProps = $SwitchThumbProps & {
  class?: string;
  color?: string;
  size?: SwitchSize;
  round?: SwitchRound;
};
export type SwitchLoadingProps = {
  loading: boolean;
  bgColor?: SwitchColor;
};
export type { SwitchSize, SwitchRound };
