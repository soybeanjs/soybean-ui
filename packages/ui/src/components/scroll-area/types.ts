import type {
  ClassValue,
  ClassValueProp,
  ScrollAreaRootProps,
  ScrollAreaScrollbarProps,
  ScrollAreaViewportProps
} from '@soybean-ui/primitive';

export interface ScrollAreaThumbProps extends ClassValueProp {}

export interface ScrollAreaProps extends ScrollAreaRootProps, ScrollAreaViewportProps, ScrollAreaScrollbarProps {
  viewportClass?: ClassValue;
  scrollbarClass?: ClassValue;
  thumbClass?: ClassValue;
}

export type { ScrollAreaRootProps, ScrollAreaScrollbarProps, ScrollAreaViewportProps };
