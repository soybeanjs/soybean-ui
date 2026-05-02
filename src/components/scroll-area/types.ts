import type {
  ScrollAreaCornerProps,
  ScrollAreaRootEmits,
  ScrollAreaRootProps,
  ScrollAreaScrollbarProps,
  ScrollAreaThumbProps,
  ScrollAreaUi,
  ScrollAreaViewportProps
} from '@soybeanjs/headless/scroll-area';
import type { ClassValue } from '@soybeanjs/headless/types';

/**
 * Props for the scroll area component.
 */
export interface ScrollAreaProps extends ScrollAreaRootProps {
  /**
   * Additional class names applied to the root element.
   */
  class?: ClassValue;
  /**
   * Per-slot class overrides for the component.
   */
  ui?: Partial<ScrollAreaUi>;
  /**
   * Props forwarded to the viewport element.
   */
  viewportProps?: ScrollAreaViewportProps;
  /**
   * Props forwarded to the vertical scrollbar element.
   */
  verticalScrollbarProps?: Omit<ScrollAreaScrollbarProps, 'orientation'>;
  /**
   * Props forwarded to the horizontal scrollbar element.
   */
  horizontalScrollbarProps?: Omit<ScrollAreaScrollbarProps, 'orientation'>;
  /**
   * Props forwarded to the thumb element.
   */
  thumbProps?: ScrollAreaThumbProps;
  /**
   * Props forwarded to the corner element.
   */
  cornerProps?: ScrollAreaCornerProps;
}

/**
 * Emits for the scroll area component.
 */
export type ScrollAreaEmits = ScrollAreaRootEmits;
