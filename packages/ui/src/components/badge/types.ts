import type { BadgeColor, BadgeVariant, ClassValue } from '@soybean-ui/variants';
import type { PrimitivePropsWithClass } from '../../types';

export type BadgeProps = PrimitivePropsWithClass & {
  color?: BadgeColor;
  variant?: BadgeVariant;
  closable?: boolean;
  closeClass?: ClassValue;
  close?: boolean;
};

export { BadgeColor, BadgeVariant };
