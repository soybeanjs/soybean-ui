import type { ClassValueProp } from '@soybean-ui/primitives';
import type { BadgeShape, BadgeVariant, ThemeColor, ThemeSize } from '@soybean-ui/variants';

export interface BadgeProps extends ClassValueProp {
  /** The color of the badge. */
  color?: ThemeColor;
  /** The variant of the badge. */
  variant?: BadgeVariant;
  /** The size of the badge. */
  size?: ThemeSize;
  /** The shape of the badge. */
  shape?: BadgeShape;
  /** The content of the badge. */
  content?: string;
}

export type { BadgeVariant, BadgeShape };
