import { computed } from 'vue';
import { useContext, useUiContext } from '../../composables';
import { useDirection } from '../config-provider/context';
import type {
  ScrollAreaRootContext,
  ScrollAreaRootContextParams,
  ScrollAreaScrollbarContext,
  ScrollAreaUiSlot
} from './types';

export const [provideScrollAreaRootContext, useScrollAreaRootContext] = useContext(
  'ScrollAreaRoot',
  (params: ScrollAreaRootContextParams): ScrollAreaRootContext => {
    const dir = useDirection(() => params.dir.value);

    return {
      ...params,
      dir
    };
  }
);

export const [provideScrollAreaScrollbarContext, useScrollAreaScrollbarContext] =
  useContext<ScrollAreaScrollbarContext>('ScrollAreaScrollbar');

export const [provideScrollAreaUi, useScrollAreaUi] = useUiContext<ScrollAreaUiSlot>('ScrollAreaUi', ui =>
  computed(() => ui.value ?? {})
);
