import type {
  ClassValue,
  ClassValueProp,
  ScrollAreaRootProps,
  ScrollAreaScrollbarProps,
  ScrollAreaViewportProps
} from '@soybean-ui/primitives';
import type { ScrollAreaSlots } from '@soybean-ui/variants';

export interface ScrollAreaThumbProps extends ClassValueProp {}

export type ScrollAreaUi = Partial<Record<ScrollAreaSlots, ClassValue>>;

export interface ScrollAreaProps extends ScrollAreaRootProps, ScrollAreaViewportProps, ScrollAreaScrollbarProps {
  ui?: ScrollAreaUi;
}

export type { ScrollAreaRootProps, ScrollAreaScrollbarProps, ScrollAreaViewportProps };
