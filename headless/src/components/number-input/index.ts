export { default as NumberInputRoot } from './number-input-root.vue';
export { default as NumberInputControl } from './number-input-control.vue';
export { default as NumberInputIncrement } from './number-input-increment.vue';
export { default as NumberInputDecrement } from './number-input-decrement.vue';

export { provideNumberInputThemeContext } from './context';

export type {
  NumberInputRootProps,
  NumberInputRootEmits,
  NumberInputControlProps,
  NumberInputIncrementProps,
  NumberInputDecrementProps,
  NumberInputThemeSlot,
  NumberInputUi
} from './types';
