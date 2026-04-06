export { default as ColorAreaRoot } from './color-area-root.vue';
export { default as ColorAreaArea } from './color-area-area.vue';
export { default as ColorAreaThumb } from './color-area-thumb.vue';

export { provideColorAreaUi } from './context';

export type {
  ColorAreaRootProps,
  ColorAreaRootEmits,
  ColorAreaAreaProps,
  ColorAreaThumbProps,
  ColorAreaAxisChannel,
  ColorAreaUiSlot,
  ColorAreaUi
} from './types';
