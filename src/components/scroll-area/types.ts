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
 * Properties for the scroll area component.
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
   * Properties forwarded to the viewport element.
   */
  viewportProps?: ScrollAreaViewportProps;
  /**
   * Properties forwarded to the vertical scrollbar element.
   */
  verticalScrollbarProps?: Omit<ScrollAreaScrollbarProps, 'orientation'>;
  /**
   * Properties forwarded to the horizontal scrollbar element.
   */
  horizontalScrollbarProps?: Omit<ScrollAreaScrollbarProps, 'orientation'>;
  /**
   * Properties forwarded to the thumb element.
   */
  thumbProps?: ScrollAreaThumbProps;
  /**
   * Properties forwarded to the corner element.
   */
  cornerProps?: ScrollAreaCornerProps;
}

/**
 * Events for the scroll area component.
 */
export type ScrollAreaEmits = ScrollAreaRootEmits;
