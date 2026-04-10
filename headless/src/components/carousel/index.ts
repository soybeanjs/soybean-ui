export { default as CarouselContent } from './carousel-content.vue';
export { default as CarouselItem } from './carousel-item.vue';
export { default as CarouselNext } from './carousel-next.vue';
export { default as CarouselPrevious } from './carousel-previous.vue';
export { default as CarouselRoot } from './carousel-root.vue';

export { provideCarouselUi } from './context';

export type {
  CarouselApi,
  CarouselContentProps,
  CarouselItemProps,
  CarouselNextProps,
  CarouselOptions,
  CarouselPlugins,
  CarouselPreviousProps,
  CarouselRootEmits,
  CarouselRootProps,
  CarouselUi,
  CarouselUiSlot
} from './types';
