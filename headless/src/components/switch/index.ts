export { default as SwitchRoot } from './switch-root.vue';
export { default as SwitchControl } from './switch-control.vue';
export { default as SwitchThumb } from './switch-thumb.vue';

export { provideSwitchUi } from './context';

export type {
  SwitchRootProps,
  SwitchRootEmits,
  SwitchControlProps,
  SwitchThumbProps,
  SwitchUiSlot,
  SwitchUi
} from './types';
