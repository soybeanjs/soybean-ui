import type { SeparatorProps as _SeparatorProps } from 'reka-ui';
import type { SeparatorBorder } from '@soybean-ui/variants';
import type { ClassValue, ClassValueProp, ThemeAlign, ThemeOrientation } from '../../types';

export type SeparatorRootProps = ClassValueProp &
  Pick<_SeparatorProps, 'orientation' | 'decorative'> & {
    border?: SeparatorBorder;
  };

export type SeparatorLabelProps = ClassValueProp & {
  orientation?: ThemeOrientation;
  align?: ThemeAlign;
};

export type SeparatorProps = SeparatorRootProps &
  SeparatorLabelProps & {
    label?: string;
    labelClass?: ClassValue;
  };

export type { SeparatorBorder };
