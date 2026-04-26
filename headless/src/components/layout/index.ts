export { default as LayoutCompact } from './layout-compact.vue';
export { default as LayoutClassicCompact } from './layout-classic-compact.vue';
export { default as LayoutRoot } from './layout-root.vue';
export { default as LayoutSidebar } from './layout-sidebar.vue';
export { default as LayoutRail } from './layout-rail.vue';
export { default as LayoutMain } from './layout-main.vue';
export { default as LayoutHeader } from './layout-header.vue';
export { default as LayoutTab } from './layout-tab.vue';
export { default as LayoutContent } from './layout-content.vue';
export { default as LayoutFooter } from './layout-footer.vue';
export { default as LayoutMobile } from './layout-mobile.vue';
export { default as LayoutTrigger } from './layout-trigger.vue';

export { provideLayoutUi, provideLayoutClassicUi } from './context';

export type {
  LayoutClassicCompactProps,
  LayoutClassicCompactEmits,
  LayoutClassicCompactSlots,
  LayoutCompactProps,
  LayoutCompactEmits,
  LayoutCompactSlots,
  LayoutRootProps,
  LayoutRootEmits,
  LayoutSidebarProps,
  LayoutRailProps,
  LayoutMainProps,
  LayoutHeaderProps,
  LayoutTabProps,
  LayoutContentProps,
  LayoutFooterProps,
  LayoutTriggerProps,
  LayoutMobileProps,
  LayoutVariant,
  LayoutSide,
  LayoutCollapsible,
  LayoutSidebarState,
  LayoutClassicScrollBehavior,
  LayoutUiSlot,
  LayoutUi,
  LayoutClassicUiSlot,
  LayoutClassicUi
} from './types';
