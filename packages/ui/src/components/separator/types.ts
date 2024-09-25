import type { SeparatorProps as $SeparatorProps } from 'radix-vue';
import type { SeparatorBorder } from '@soybean-ui/variants';
import type { ClassValue, ThemeAlign, ThemeOrientation } from '../../types';

export type SeparatorRootProps = Pick<$SeparatorProps, 'orientation' | 'decorative'> & {
  class?: ClassValue;
  border?: SeparatorBorder;
};

export type SeparatorLabelProps = {
  class?: ClassValue;
  orientation?: ThemeOrientation;
  align?: ThemeAlign;
};

export type SeparatorProps = SeparatorRootProps & {
  align?: ThemeAlign;
  label?: string;
  labelClass?: ClassValue;
};

export type { SeparatorBorder };
