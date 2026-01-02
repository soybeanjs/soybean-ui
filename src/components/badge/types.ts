import type { BadgeContentProps, BadgeRootEmits, BadgeRootProps, BadgeUi, ClassValue } from '@soybeanjs/headless';
import type { ThemeColor, ThemeSize } from '@/theme';
import type { BadgePosition } from '@/variants/badge';

export interface BadgeProps extends BadgeRootProps {
  /**
   * root class
   */
  class?: ClassValue;
  color?: ThemeColor;
  size?: ThemeSize;
  ui?: Partial<BadgeUi>;
  position?: BadgePosition;
  content?: string;
  contentProps?: BadgeContentProps;
}

export type BadgeEmits = BadgeRootEmits;

export type { BadgePosition };
