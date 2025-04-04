import type {
  ClassValue,
  ClassValueProp,
  ScrollAreaRootProps,
  ScrollAreaViewportProps,
  ScrollAreaScrollbarProps as _ScrollAreaScrollbarProps
} from '@soybean-ui/primitives';
import type { ScrollAreaSlots, ThemeSize } from '@soybean-ui/variants';

export interface ScrollAreaThumbProps extends ClassValueProp {}

export interface ScrollAreaScrollbarProps extends _ScrollAreaScrollbarProps {
  size?: ThemeSize;
}

export type ScrollAreaUi = Partial<Record<ScrollAreaSlots, ClassValue>>;

export interface ScrollAreaProps extends ScrollAreaRootProps, ScrollAreaViewportProps, ScrollAreaScrollbarProps {
  ui?: ScrollAreaUi;
}

export type { ScrollAreaRootProps, ScrollAreaViewportProps };
