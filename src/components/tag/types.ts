import type { TagEmits, TagProps as _TagProps } from '@soybeanjs/headless/tag';
import type { ClassValue } from '@soybeanjs/headless/types';
import type { TagShape, TagVariant } from '@/styles/tag';
import type { ThemeColor, ThemeSize } from '@/theme';

/**
 * Properties for the Tag component.
 */
export interface TagProps extends _TagProps {
  /**
   * Additional class names applied to the root element.
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
   * Visual variant of the component.
   */
  variant?: TagVariant;
  /**
   * Shape of the component.
   */
  shape?: TagShape;
  /**
   * Content.
   */
  content?: string;
  /**
   * Whether the component can be closed.
   */
  closable?: boolean;
}

export type { TagEmits, TagVariant, TagShape };
