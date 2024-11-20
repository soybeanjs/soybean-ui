import type {
  ScrollAreaRootProps as _ScrollAreaRootProps,
  ScrollAreaScrollbarProps as _ScrollAreaScrollbarProps,
  ScrollAreaViewportProps as _ScrollAreaViewportProps
} from '@soybean-ui/primitive';
import type { ClassValue, ClassValueProp } from '../../types';

export type ScrollAreaRootProps = ClassValueProp & Omit<_ScrollAreaRootProps, 'as' | 'asChild'>;

export type ScrollAreaViewportProps = ClassValueProp & Pick<_ScrollAreaViewportProps, 'nonce'>;

export type ScrollAreaScrollbarProps = ClassValueProp & Pick<_ScrollAreaScrollbarProps, 'orientation' | 'forceMount'>;

export type ScrollAreaThumbProps = ClassValueProp;

export type ScrollAreaProps = ScrollAreaRootProps &
  ScrollAreaViewportProps &
  ScrollAreaScrollbarProps & {
    viewportClass?: ClassValue;
    scrollbarClass?: ClassValue;
    thumbClass?: ClassValue;
  };
