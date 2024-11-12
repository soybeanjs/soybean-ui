import type { BadgeVariant, ThemeColor } from '@soybean-ui/variants';
import type { ClassValueProp } from '../../types';

export type BadgeProps = ClassValueProp & {
  color?: ThemeColor;
  variant?: BadgeVariant;
};

export { BadgeVariant };
