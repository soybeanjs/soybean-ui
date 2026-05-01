import type { ClassValue, TagEmits, TagProps as _TagProps } from '@soybeanjs/headless';
import type { ThemeColor, ThemeSize } from '@/theme';
import type { TagShape, TagVariant } from './variants';

/**
 * Props for the tag component.
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
