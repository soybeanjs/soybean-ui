export { default as SplitMenuCompact } from './split-menu-compact.vue';
export { default as SplitMenuRoot } from './split-menu-root.vue';
export { default as SplitMenuPanel } from './split-menu-panel.vue';
export { default as SplitMenuItem } from './split-menu-item.vue';
export { default as SplitMenuTrigger } from './split-menu-trigger.vue';
export { default as SplitMenuContent } from './split-menu-content.vue';

export { provideSplitMenuUi, provideSplitMenuRootContext, useSplitMenuRootContext } from './context';

export type {
  SplitMenuCompactProps,
  SplitMenuCompactEmits,
  SplitMenuCompactSlots,
  SplitMenuRootProps,
  SplitMenuRootEmits,
  SplitMenuPanelProps,
  SplitMenuPanelEmits,
  SplitMenuItemProps,
  SplitMenuTriggerProps,
  SplitMenuContentProps,
  SplitMenuMode,
  SplitMenuOrientation,
  SplitMenuPanelDescriptor,
  SplitMenuBaseOptionData,
  SplitMenuOptionData,
  SplitMenuUiSlot,
  SplitMenuUi
} from './types';
