import type { BadgeVariant, ThemeColor } from '@soybean-ui/variants';
import type { ClassValue, ClassValueProp } from '../../types';

export type BadgeProps = ClassValueProp & {
  color?: ThemeColor;
  variant?: BadgeVariant;
  closable?: boolean;
  closeClass?: ClassValue;
  close?: boolean;
};

export { BadgeVariant };
