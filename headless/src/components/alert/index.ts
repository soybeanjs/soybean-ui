export { default as AlertRoot } from './alert-root.vue';
export { default as AlertTitle } from './alert-title.vue';
export { default as AlertDescription } from './alert-description.vue';
export { default as AlertContent } from './alert-content.vue';
export { default as AlertClose } from './alert-close.vue';

export { provideAlertUi } from './context';

export type {
  AlertRootProps,
  AlertRootEmits,
  AlertTitleProps,
  AlertDescriptionProps,
  AlertContentProps,
  AlertCloseProps,
  AlertUiSlot,
  AlertUi
} from './types';
