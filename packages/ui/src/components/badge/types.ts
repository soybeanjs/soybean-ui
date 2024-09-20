import type { BadgeColor, BadgeVariant } from '@soybean-ui/variants';
import type { ClassValue } from '../../types';

export type BadgeProps = {
  class?: ClassValue;
  color?: BadgeColor;
  variant?: BadgeVariant;
  closable?: boolean;
  closeClass?: ClassValue;
  close?: boolean;
};

export { BadgeColor, BadgeVariant };
