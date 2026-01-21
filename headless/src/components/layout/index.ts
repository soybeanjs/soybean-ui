export { default as LayoutRoot } from './layout-root.vue';
export { default as LayoutHeader } from './layout-header.vue';
export { default as LayoutMain } from './layout-main.vue';
export { default as LayoutSidebar } from './layout-sidebar.vue';
export { default as LayoutFooter } from './layout-footer.vue';
export { default as LayoutRail } from './layout-rail.vue';
export { default as LayoutMobile } from './layout-mobile.vue';
export { default as LayoutTab } from './layout-tab.vue';
export { default as LayoutTrigger } from './layout-trigger.vue';

export { provideLayoutUi } from './context';

export type {
  LayoutRootProps,
  LayoutRootEmits,
  LayoutSidebarProps,
  LayoutHeaderProps,
  LayoutMainProps,
  LayoutTabProps,
  LayoutFooterProps,
  LayoutRailProps,
  LayoutTriggerProps,
  LayoutMobileProps,
  LayoutVariant,
  LayoutSide,
  LayoutCollapsible,
  LayoutSidebarState,
  LayoutUiSlot,
  LayoutUi
} from './types';
