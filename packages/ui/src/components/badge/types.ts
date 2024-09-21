import type { BadgeVariant, ThemeColor } from '@soybean-ui/variants';
import type { ClassValue } from '../../types';

export type BadgeProps = {
  class?: ClassValue;
  color?: ThemeColor;
  variant?: BadgeVariant;
  closable?: boolean;
  closeClass?: ClassValue;
  close?: boolean;
};

export { BadgeVariant };
