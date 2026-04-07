import type {
  ClassValue,
  ScrollAreaCornerProps,
  ScrollAreaRootEmits,
  ScrollAreaRootProps,
  ScrollAreaScrollbarProps,
  ScrollAreaThumbProps,
  ScrollAreaUi,
  ScrollAreaViewportProps
} from '@soybeanjs/headless';

export interface ScrollAreaProps extends ScrollAreaRootProps {
  class?: ClassValue;
  ui?: Partial<ScrollAreaUi>;
  viewportProps?: ScrollAreaViewportProps;
  verticalScrollbarProps?: Omit<ScrollAreaScrollbarProps, 'orientation'>;
  horizontalScrollbarProps?: Omit<ScrollAreaScrollbarProps, 'orientation'>;
  thumbProps?: ScrollAreaThumbProps;
  cornerProps?: ScrollAreaCornerProps;
}

export type ScrollAreaEmits = ScrollAreaRootEmits;
