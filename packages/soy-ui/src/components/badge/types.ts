import type { ClassValueProp } from '@soybean-ui/primitives';
import type { BadgeShape, BadgeVariant, ThemeColor, ThemeSize } from '@soybean-ui/variants';

export interface BadgeProps extends ClassValueProp {
  color?: ThemeColor;
  variant?: BadgeVariant;
  size?: ThemeSize;
  shape?: BadgeShape;
}

export type { BadgeVariant, BadgeShape };
