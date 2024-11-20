import { createContext } from '../../composables';
import type { ScrollAreaRootContext, ScrollAreaScollbarContext, ScrollAreaScrollbarVisibleContext } from './types';

export const [provideScrollAreaRootContext, injectScrollAreaRootContext] =
  createContext<ScrollAreaRootContext>('ScrollAreaRoot');

export const [provideScrollAreaScrollbarContext, injectScrollAreaScrollbarContext] =
  createContext<ScrollAreaScollbarContext>('ScrollAreaScrollbar');

export const [provideScrollAreaScrollbarVisibleContext, injectScrollAreaScrollbarVisibleContext] =
  createContext<ScrollAreaScrollbarVisibleContext>('ScrollAreaScrollbarVisible');
