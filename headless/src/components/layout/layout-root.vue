<script setup lang="ts">
import { computed, shallowRef } from 'vue';
import type { CSSProperties } from 'vue';
import { useControllableState } from '../../composables';
import { transformPropsToContext } from '../../shared';
import { provideLayoutRootContext, useLayoutUi } from './context';
import { layoutCssVars } from './shared';
import type { LayoutRootEmits, LayoutRootProps, LayoutSidebarState } from './types';

defineOptions({
  name: 'LayoutRoot'
});

const props = withDefaults(defineProps<LayoutRootProps>(), {
  open: undefined,
  defaultOpen: false,
  side: 'left',
  variant: 'sidebar',
  collapsible: 'icon',
  sidebarVisible: true,
  sidebarWidth: 240,
  collapsedSidebarWidth: 50,
  isMobile: false,
  mobileSidebarWidth: 240,
  headerVisible: true,
  headerHeight: 56,
  tabVisible: true,
  tabHeight: 44,
  footerVisible: true,
  footerHeight: 48,
  pxToRem: (px: number) => px / 16
});

const emit = defineEmits<LayoutRootEmits>();

const cls = useLayoutUi('root');

const open = useControllableState(
  () => props.open,
  value => {
    emit('update:open', value ?? false);
  },
  props.defaultOpen
);

const mobileOpen = shallowRef(false);

const sidebarState = computed<LayoutSidebarState>(() => (open.value ? 'expanded' : 'collapsed'));

const dataCollapsible = computed(() => (sidebarState.value === 'collapsed' ? props.collapsible : ''));

const style = computed<CSSProperties>(() => {
  const sidebarWidth = props.pxToRem(props.sidebarWidth);
  const collapsedSidebarWidth = props.pxToRem(props.collapsedSidebarWidth);
  const currentSidebarWidth = open.value ? sidebarWidth : collapsedSidebarWidth;
  const headerHeight = props.pxToRem(props.headerHeight);
  const tabHeight = props.pxToRem(props.tabHeight);
  const footerHeight = props.pxToRem(props.footerHeight);

  return {
    [layoutCssVars.sidebarWidth]: `${sidebarWidth}rem`,
    [layoutCssVars.collapsedSidebarWidth]: `${collapsedSidebarWidth}rem`,
    [layoutCssVars.currentSidebarWidth]: `${currentSidebarWidth}rem`,
    [layoutCssVars.headerHeight]: `${headerHeight}rem`,
    [layoutCssVars.tabHeight]: `${tabHeight}rem`,
    [layoutCssVars.footerHeight]: `${footerHeight}rem`
  };
});

const mobileSidebarWidth = computed(() => props.pxToRem(props.mobileSidebarWidth));

provideLayoutRootContext({
  ...transformPropsToContext(props, [
    'sidebarWidth',
    'collapsedSidebarWidth',
    'isMobile',
    'sidebarVisible',
    'headerVisible',
    'tabVisible',
    'footerVisible'
  ]),
  open,
  mobileOpen,
  mobileSidebarWidth
});
</script>

<template>
  <div
    :class="cls"
    :data-collapsible="dataCollapsible"
    :data-side="side"
    :data-state="sidebarState"
    :data-variant="variant"
    :data-mobile="Boolean(isMobile)"
    :data-sidebar-visible="Boolean(sidebarVisible)"
    :data-header-visible="Boolean(headerVisible)"
    :data-tab-visible="Boolean(tabVisible)"
    :data-footer-visible="Boolean(footerVisible)"
    :data-full-content="Boolean(fullContent)"
    :style="style"
  >
    <slot :open="open" :collapsed-sidebar-width="collapsedSidebarWidth" />
  </div>
</template>
