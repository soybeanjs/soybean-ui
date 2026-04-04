export { default as SliderRoot } from './slider-root.vue';
export { default as SliderTrack } from './slider-track.vue';
export { default as SliderRange } from './slider-range.vue';
export { default as SliderThumb } from './slider-thumb.vue';

export { provideSliderUi } from './context';

export type {
  SliderRootProps,
  SliderRootEmits,
  SliderTrackProps,
  SliderRangeProps,
  SliderThumbProps,
  SliderRootContext,
  SliderSide,
  SliderSlideDirection,
  SliderUiSlot,
  SliderUi
} from './types';
