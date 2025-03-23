import type { BadgePosition, BadgeSlots, ThemeColor, ThemeSize } from '@soybean-ui/variants';
import type { ClassValue, ClassValueProp } from '@soybean-ui/primitives';

export interface BadgeRootProps extends ClassValueProp {}

export interface BadgeContentProps extends ClassValueProp {
  color?: ThemeColor;
  size?: ThemeSize;
  position?: BadgePosition;
}

export type BadgeUi = Partial<Record<BadgeSlots, ClassValue>>;

export interface BadgeProps extends BadgeContentProps {
  ui?: BadgeUi;
  text?: string;
  show?: boolean;
}

export { BadgePosition };
