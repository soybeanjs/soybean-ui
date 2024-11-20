import type { ToggleEmits, ToggleProps as _ToggleProps } from '@soybean-ui/primitive';
import type { ThemeSize, ToggleVariant } from '@soybean-ui/variants';
import type { ClassValueProp } from '../../types';

export type ToggleProps = ClassValueProp &
  Omit<_ToggleProps, 'as' | 'asChild'> & {
    variant?: ToggleVariant;
    size?: ThemeSize;
  };

export type { ToggleEmits, ToggleVariant };
