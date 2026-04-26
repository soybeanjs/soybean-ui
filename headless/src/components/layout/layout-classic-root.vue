<script setup lang="ts">
import { computed, shallowRef } from 'vue';
import type { CSSProperties } from 'vue';
import { useControllableState } from '../../composables';
import { transformPropsToContext } from '../../shared';
import { provideLayoutClassicRootContext, useLayoutUi } from './context';
import { layoutCssVars } from './shared';
import type { LayoutClassicRootEmits, LayoutClassicRootProps, LayoutSidebarState } from './types';

defineOptions({
  name: 'LayoutClassicRoot'
});

const props = withDefaults(defineProps<LayoutClassicRootProps>(), {
  open: undefined,
  defaultOpen: true,
  orientation: 'horizontal',
  baseZIndex: 50,
  scrollBehavior: 'content',
  side: 'left',
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
  fixedTop: true,
  stretchFooter: true,
  pxToRem: (px: number) => px / 16
});

const emit = defineEmits<LayoutClassicRootEmits>();

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

const fixedTop = computed(
  () => Boolean(props.fixedTop) || (props.orientation === 'vertical' && props.scrollBehavior === 'wrapper')
);

const isHorizontal = computed(() => props.orientation === 'horizontal');

const style = computed<CSSProperties>(() => {
  const sidebarWidth = props.pxToRem(props.sidebarWidth);
  const collapsedSidebarWidth = props.pxToRem(props.collapsedSidebarWidth);
  const currentSidebarWidth = open.value ? sidebarWidth : collapsedSidebarWidth;

  const headerHeight = props.pxToRem(props.headerHeight);
  const tabHeight = props.pxToRem(props.tabHeight);
  const footerHeight = props.pxToRem(props.footerHeight);

  const startGap = props.sidebarVisible ? `${currentSidebarWidth}rem` : undefined;
  const headerStartGap = isHorizontal.value ? startGap : undefined;
  const footerStartGap = hasFooterStartGap() ? startGap : undefined;
  const sidebarTopGap = props.headerVisible && !isHorizontal.value ? `${headerHeight}rem` : undefined;
  const sidebarBottomGap = props.footerVisible && !footerStartGap ? `${footerHeight}rem` : undefined;

  const siderZIndex = isHorizontal.value ? props.baseZIndex - 1 : props.baseZIndex - 4;
  const headerZIndex = props.baseZIndex - 3;
  const tabZIndex = props.baseZIndex - 5;
  const footerZIndex = sidebarBottomGap ? siderZIndex + 1 : siderZIndex - 5;

  return {
    [layoutCssVars.sidebarWidth]: `${sidebarWidth}rem`,
    [layoutCssVars.collapsedSidebarWidth]: `${collapsedSidebarWidth}rem`,
    [layoutCssVars.currentSidebarWidth]: `${currentSidebarWidth}rem`,
    [layoutCssVars.baseZIndex]: props.baseZIndex,
    [layoutCssVars.headerHeight]: `${headerHeight}rem`,
    [layoutCssVars.tabHeight]: `${tabHeight}rem`,
    [layoutCssVars.footerHeight]: `${footerHeight}rem`,
    [layoutCssVars.sidebarTopGap]: sidebarTopGap,
    [layoutCssVars.sidebarBottomGap]: sidebarBottomGap,
    [layoutCssVars.startGap]: startGap,
    [layoutCssVars.headerStartGap]: headerStartGap,
    [layoutCssVars.footerStartGap]: footerStartGap,
    [layoutCssVars.sidebarZIndex]: siderZIndex,
    [layoutCssVars.headerZIndex]: headerZIndex,
    [layoutCssVars.tabZIndex]: tabZIndex,
    [layoutCssVars.footerZIndex]: footerZIndex
  };
});

function hasFooterStartGap() {
  if (isHorizontal.value) {
    return true;
  }
  if (props.scrollBehavior === 'wrapper' && !props.fixedFooter) {
    return true;
  }

  return !props.stretchFooter;
}

const mobileSidebarWidth = computed(() => props.pxToRem(props.mobileSidebarWidth));

provideLayoutClassicRootContext({
  ...transformPropsToContext(props, [
    'sidebarWidth',
    'collapsedSidebarWidth',
    'isMobile',
    'sidebarVisible',
    'headerVisible',
    'tabVisible',
    'footerVisible',
    'fixedFooter'
  ]),
  open,
  mobileOpen,
  mobileSidebarWidth,
  fixedTop
});
</script>

<template>
  <div
    :class="cls"
    :data-orientation="orientation"
    :data-side="side"
    :data-state="sidebarState"
    :data-mobile="Boolean(isMobile)"
    :data-scroll-behavior="scrollBehavior"
    :data-full-content="Boolean(fullContent)"
    :data-sidebar-visible="Boolean(sidebarVisible)"
    :data-header-visible="Boolean(headerVisible)"
    :data-tab-visible="Boolean(tabVisible)"
    :data-footer-visible="Boolean(footerVisible)"
    :data-fixed-top="fixedTop"
    :data-fixed-footer="Boolean(fixedFooter)"
    :data-stretch-footer="Boolean(stretchFooter)"
    :style="style"
  >
    <slot :open="open" :collapsed-sidebar-width="collapsedSidebarWidth" />
  </div>
</template>
