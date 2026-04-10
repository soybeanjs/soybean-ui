import { computed } from 'vue';
import { useContext, useUiContext } from '../../composables';
import type { CarouselRootContext, CarouselUiSlot } from './types';

export const [provideCarouselRootContext, useCarouselRootContext] = useContext<CarouselRootContext>('CarouselRoot');

export const [provideCarouselUi, useCarouselUi] = useUiContext<CarouselUiSlot>('CarouselUi', ui => computed(() => ui.value ?? {}));
