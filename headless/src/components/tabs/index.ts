export { default as TabsRoot } from './tabs-root.vue';
export { default as TabsList } from './tabs-list.vue';
export { default as TabsTrigger } from './tabs-trigger.vue';
export { default as TabsContent } from './tabs-content.vue';
export { default as TabsIndicator } from './tabs-indicator.vue';

export { provideTabsUi } from './context';

export type {
  TabsRootProps,
  TabsRootEmits,
  TabsListProps,
  TabsContentProps,
  TabsIndicatorProps,
  TabsTriggerProps,
  TabsUiSlot,
  TabsUi
} from './types';
