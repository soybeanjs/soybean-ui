export { default as TreeSelectRoot } from './tree-select-root.vue';
export { default as TreeSelectTrigger } from './tree-select-trigger.vue';
export { default as TreeSelectContent } from './tree-select-content.vue';
export { default as TreeSelectCompact } from './tree-select-compact.vue';

export { provideTreeSelectUi } from './context';

export type {
  TreeSelectBaseItem,
  TreeSelectModelValue,
  TreeSelectRootProps,
  TreeSelectRootEmits,
  TreeSelectTriggerProps,
  TreeSelectContentProps,
  TreeSelectRootContext,
  TreeSelectCompactProps,
  TreeSelectCompactEmits,
  TreeSelectCompactSlots,
  TreeSelectUiSlot,
  TreeSelectUi
} from './types';
