<script setup lang="ts">
import { computed, shallowRef } from 'vue';
import type { CSSProperties } from 'vue';
import { transformPropsToContext } from '../../shared';
import { useControllableState } from '../../composables';
import { layoutCssVars } from './shared';
import { provideLayoutRootContext, useLayoutUi } from './context';
import type { LayoutRootProps, LayoutRootEmits, LayoutSidebarState } from './types';

defineOptions({
  name: 'LayoutRoot'
});

const props = withDefaults(defineProps<LayoutRootProps>(), {
  open: undefined,
  defaultOpen: true,
  orientation: 'horizontal',
  baseZIndex: 50,
  scrollBehavior: 'content',
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
  fixedTop: true,
  pxToRem: (px: number) => px / 16
});

const emit = defineEmits<LayoutRootEmits>();

const cls = useLayoutUi('root');

const open = useControllableState(
  () => props.open,
  value => {
    emit('update:open', value);
  },
  props.defaultOpen
);

const mobileOpen = shallowRef(false);

const sidebarState = computed<LayoutSidebarState>(() => (open.value ? 'expanded' : 'collapsed'));

const dataCollapsible = computed(() => (sidebarState.value === 'collapsed' ? props.collapsible : ''));

const isHorizontal = computed(() => props.orientation === 'horizontal');
const isVertical = computed(() => props.orientation === 'vertical');

const fixedTop = computed(() => Boolean(props.fixedTop) || isVertical.value || props.scrollBehavior === 'content');
const fixedFooter = computed(() => Boolean(props.fixedFooter) || props.scrollBehavior === 'content');
const stretchFooter = computed(() => fixedFooter.value && props.stretchFooter);
const isOffcanvas = computed(() => props.collapsible === 'offcanvas');

const style = computed<CSSProperties>(() => {
  const sidebarWidth = props.pxToRem(props.sidebarWidth);
  const collapsedSidebarWidth = isOffcanvas.value ? '0' : props.pxToRem(props.collapsedSidebarWidth);
  const currentSidebarWidth = open.value ? sidebarWidth : collapsedSidebarWidth;

  const headerHeight = props.pxToRem(props.headerHeight);
  const tabHeight = props.pxToRem(props.tabHeight);
  const footerHeight = props.pxToRem(props.footerHeight);

  const startGap = props.sidebarVisible ? `${currentSidebarWidth}rem` : '0px';
  const headerStartGap = isHorizontal.value ? startGap : '0px';
  const footerStartGap = hasFooterStartGap() ? startGap : '0px';
  const sidebarTopGap = props.headerVisible && !isHorizontal.value ? `${headerHeight}rem` : '0px';
  const sidebarBottomGap = props.footerVisible && footerStartGap === '0px' ? `${footerHeight}rem` : '0px';
  const sidebarHeight =
    sidebarTopGap === '0px' && sidebarBottomGap === '0px'
      ? '100%'
      : `calc(100% - ${sidebarTopGap} - ${sidebarBottomGap})`;

  const siderZIndex = isHorizontal.value ? props.baseZIndex - 2 : props.baseZIndex - 5;
  const headerZIndex = props.baseZIndex - 4;
  const tabZIndex = props.baseZIndex - 6;
  const footerZIndex = sidebarBottomGap ? siderZIndex + 1 : siderZIndex - 6;

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
    [layoutCssVars.sidebarHeight]: sidebarHeight,
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
  if (props.scrollBehavior === 'wrapper' && !fixedFooter.value) {
    return true;
  }

  return !stretchFooter.value;
}

const mobileSidebarWidth = computed(() => props.pxToRem(props.mobileSidebarWidth));

provideLayoutRootContext({
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
    data-soybean-layout-root
    :class="cls"
    :data-collapsible="dataCollapsible"
    :data-orientation="orientation"
    :data-side="side"
    :data-state="sidebarState"
    :data-variant="variant"
    :data-mobile="Boolean(isMobile)"
    :data-scroll-behavior="scrollBehavior"
    :data-full-content="Boolean(fullContent)"
    :data-sidebar-visible="Boolean(sidebarVisible)"
    :data-header-visible="Boolean(headerVisible)"
    :data-tab-visible="Boolean(tabVisible)"
    :data-footer-visible="Boolean(footerVisible)"
    :data-fixed-top="Boolean(fixedTop)"
    :data-fixed-footer="Boolean(fixedFooter)"
    :data-stretch-footer="Boolean(stretchFooter)"
    :style="style"
  >
    <slot :open="open" :collapsed-sidebar-width="collapsedSidebarWidth" />
  </div>
</template>
