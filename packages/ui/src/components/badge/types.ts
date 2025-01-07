import type { BadgeVariant, ThemeColor } from '@soybean-ui/variants';
import type { ClassValueProp } from '@soybean-ui/primitives';

export interface BadgeProps extends ClassValueProp {
  color?: ThemeColor;
  variant?: BadgeVariant;
}

export type { BadgeVariant };
