export { default as SCarousel } from './carousel.vue';
export { default as SCarouselContent } from './carousel-content.vue';
export { default as SCarouselItem } from './carousel-item.vue';
export { default as SCarouselPrevious } from './carousel-previous.vue';
export { default as SCarouselNext } from './carousel-next.vue';

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
} from '@soybeanjs/headless/carousel';
export type * from './types';
