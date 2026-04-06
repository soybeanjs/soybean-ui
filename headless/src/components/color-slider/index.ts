export { default as ColorSliderRoot } from './color-slider-root.vue';
export { default as ColorSliderTrack } from './color-slider-track.vue';
export { default as ColorSliderThumb } from './color-slider-thumb.vue';

export { provideColorSliderUi } from './context';

export type {
  ColorSliderRootProps,
  ColorSliderRootEmits,
  ColorSliderTrackProps,
  ColorSliderThumbProps,
  ColorSliderUiSlot,
  ColorSliderUi
} from './types';
