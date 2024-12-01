import type { ClassValue, ClassValueProp, SeparatorProps as _SeparatorProps } from '@soybean-ui/primitive';
import type { SeparatorBorder } from '@soybean-ui/variants';
import type { ThemeAlign, ThemeOrientation } from '../../types';

export interface SeparatorRootProps extends _SeparatorProps {
  border?: SeparatorBorder;
}

export interface SeparatorLabelProps extends ClassValueProp {
  orientation?: ThemeOrientation;
  align?: ThemeAlign;
}

export interface SeparatorProps extends SeparatorRootProps, SeparatorLabelProps {
  label?: string;
  labelClass?: ClassValue;
}

export type { SeparatorBorder };
