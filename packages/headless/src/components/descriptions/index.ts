export { default as DescriptionsRoot } from './descriptions-root.vue';
export { default as DescriptionsItem } from './descriptions-item.vue';

export { provideDescriptionsUi } from './context';

export type {
  DescriptionsLayout,
  DescriptionsLabelAlign,
  DescriptionsRootProps,
  DescriptionsItemProps,
  DescriptionsRootContext,
  DescriptionsUiSlot,
  DescriptionsUi
} from './types';
