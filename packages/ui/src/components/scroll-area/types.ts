import type {
  ScrollAreaRootProps as $ScrollAreaRootProps,
  ScrollAreaScrollbarProps as $ScrollAreaScrollbarProps,
  ScrollAreaViewportProps as $ScrollAreaViewportProps
} from 'radix-vue';
import type { ClassValue } from '../../types';

export type ScrollAreaRootProps = Omit<$ScrollAreaRootProps, 'as' | 'asChild'> & {
  class?: ClassValue;
};

export type ScrollAreaViewportProps = Omit<$ScrollAreaViewportProps, 'as' | 'asChild'> & {
  class?: ClassValue;
};

export type ScrollAreaScrollbarProps = Omit<$ScrollAreaScrollbarProps, 'as' | 'asChild'> & {
  class?: ClassValue;
};

export type ScrollAreaThumbProps = {
  class?: ClassValue;
};

export type ScrollAreaProps = ScrollAreaRootProps &
  ScrollAreaViewportProps &
  ScrollAreaScrollbarProps & {
    viewportClass?: ClassValue;
    scrollbarClass?: ClassValue;
    thumbClass?: ClassValue;
  };
