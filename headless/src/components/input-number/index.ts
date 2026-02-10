export { default as InputNumberRoot } from './input-number-root.vue';
export { default as InputNumberControl } from './input-number-control.vue';
export { default as InputNumberIncrement } from './input-number-increment.vue';
export { default as InputNumberDecrement } from './input-number-decrement.vue';

export { provideInputNumberUi } from './context';

export type {
  InputNumberRootProps,
  InputNumberRootEmits,
  InputNumberControlProps,
  InputNumberIncrementProps,
  InputNumberDecrementProps,
  InputNumberUiSlot,
  InputNumberUi
} from './types';
