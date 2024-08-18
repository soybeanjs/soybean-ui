import type { BadgeColor, BadgeVariant } from '@soybean-unify/ui-variants';
import type { PrimitivePropsWithClass } from '../../types';

export type BadgeProps = PrimitivePropsWithClass & {
  color?: BadgeColor;
  variant?: BadgeVariant;
  closable?: boolean;
};

export { BadgeColor, BadgeVariant };
