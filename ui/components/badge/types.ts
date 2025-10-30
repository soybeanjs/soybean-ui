import type { BadgeContentProps, BadgeRootEmits, BadgeRootProps, BadgeThemeSlot, ClassValue } from '@headless';
import type { ThemeColor, ThemeSize } from '@theme';
import type { BadgePosition } from '@variants/badge';

export type BadgeUi = Partial<Record<BadgeThemeSlot, ClassValue>>;

export interface BadgeProps extends BadgeRootProps {
  color?: ThemeColor;
  size?: ThemeSize;
  ui?: BadgeUi;
  position?: BadgePosition;
  content?: string;
  contentProps?: BadgeContentProps;
}

export type BadgeEmits = BadgeRootEmits;

export type { BadgePosition };
