import type { BadgeCompactProps, BadgeRootEmits, BadgeUi } from '@soybeanjs/headless/badge';
import type { ClassValue } from '@soybeanjs/headless/types';
import type { ThemeColor, ThemeSize } from '@/theme';
import type { BadgePosition } from '@/styles/badge';

/**
 * Properties for the Badge component.
 */
export interface BadgeProps extends BadgeCompactProps {
  /**
   * root class
   */
  class?: ClassValue;
  /**
   * Theme color of the component.
   */
  color?: ThemeColor;
  /**
   * Visual size of the component.
   */
  size?: ThemeSize;
  /**
   * Per-slot class overrides for the component.
   */
  ui?: Partial<BadgeUi>;
  /**
   * Position.
   */
  position?: BadgePosition;
}

/**
 * Events for the Badge component.
 */
export type BadgeEmits = BadgeRootEmits;

export type { BadgePosition };
