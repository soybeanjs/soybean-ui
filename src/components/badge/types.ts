import type { BadgeContentProps, BadgeRootEmits, BadgeRootProps, BadgeUi } from '@soybeanjs/headless/badge';
import type { ClassValue } from '@soybeanjs/headless/types';
import type { ThemeColor, ThemeSize } from '@/theme';
import type { BadgePosition } from './variants';

/**
 * Props for the badge component.
 */
export interface BadgeProps extends BadgeRootProps {
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
  /**
   * Content.
   */
  content?: string;
  /**
   * Props forwarded to the content element.
   */
  contentProps?: BadgeContentProps;
}

/**
 * Emits for the badge component.
 */
export type BadgeEmits = BadgeRootEmits;

export type { BadgePosition };
