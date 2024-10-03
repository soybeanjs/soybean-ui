import type { SwitchRootProps as _SwitchRootProps } from 'radix-vue';
import type { ThemeColor, ThemeSize } from '@soybean-ui/variants';
import type { ClassValue, ClassValueProp } from '../../types';

export type SwitchRootProps = ClassValueProp &
  Omit<_SwitchRootProps, 'as' | 'asChild'> & {
    color?: ThemeColor;
    size?: ThemeSize;
  };

export type SwitchThumbProps = ClassValueProp & {
  size?: ThemeSize;
};

export type SwitchProps = SwitchRootProps & {
  thumbClass?: ClassValue;
};
