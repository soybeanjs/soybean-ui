export { default as CollapsibleRoot } from './collapsible-root.vue';
export { default as CollapsibleContent } from './collapsible-content.vue';
export { default as CollapsibleTrigger } from './collapsible-trigger.vue';

export { provideCollapsibleThemeContext } from './context';

export type {
  CollapsibleRootProps,
  CollapsibleRootEmits,
  CollapsibleContentProps,
  CollapsibleTriggerProps,
  CollapsibleThemeSlot,
  CollapsibleUi
} from './types';
