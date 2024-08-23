import type { BadgeColor, BadgeVariant, ClassValue } from '@soybean-unify/ui-variants';
import type { PrimitivePropsWithClass } from '../../types';

export type BadgeProps = PrimitivePropsWithClass & {
  color?: BadgeColor;
  variant?: BadgeVariant;
  closable?: boolean;
  closeClass?: ClassValue;
};

export { BadgeColor, BadgeVariant };
