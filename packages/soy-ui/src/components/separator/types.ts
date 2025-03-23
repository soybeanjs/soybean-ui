import type { ClassValue, ClassValueProp, SeparatorProps as _SeparatorProps } from '@soybean-ui/primitives';
import type { SeparatorBorder, SeparatorSlots } from '@soybean-ui/variants';
import type { ThemeAlign, ThemeOrientation } from '../../types';

export interface SeparatorRootProps extends _SeparatorProps {
  border?: SeparatorBorder;
}

export interface SeparatorLabelProps extends ClassValueProp {
  orientation?: ThemeOrientation;
  align?: ThemeAlign;
}

export type SeparatorUi = Partial<Record<SeparatorSlots, ClassValue>>;

export interface SeparatorProps extends SeparatorRootProps, SeparatorLabelProps {
  ui?: SeparatorUi;
  label?: string;
}

export type { SeparatorBorder };
