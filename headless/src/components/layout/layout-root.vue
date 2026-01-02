<script setup lang="ts">
import { computed, shallowRef } from 'vue';
import type { CSSProperties } from 'vue';
import { useMediaQuery } from '@vueuse/core';
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
  sidebarWidth: 240,
  collapsedSidebarWidth: 50,
  mobileMediaQuery: '(max-width: 768px)',
  mobileSidebarWidth: 240,
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

const isMobile = useMediaQuery(() => props.mobileMediaQuery);

const mobileOpen = shallowRef(false);

const sidebarState = computed<LayoutSidebarState>(() => (open.value ? 'expanded' : 'collapsed'));

const dataCollapsible = computed(() => (sidebarState.value === 'collapsed' ? props.collapsible : ''));

const style = computed<CSSProperties>(() => {
  const sidebarWidth = props.pxToRem(props.sidebarWidth);
  const collapsedSidebarWidth = props.pxToRem(props.collapsedSidebarWidth);

  return {
    [layoutCssVars.sidebarWidth]: `${sidebarWidth}rem`,
    [layoutCssVars.collapsedSidebarWidth]: `${collapsedSidebarWidth}rem`
  };
});

const mobileSidebarWidth = computed(() => props.pxToRem(props.mobileSidebarWidth));

provideLayoutRootContext({
  ...transformPropsToContext(props, ['sidebarWidth', 'collapsedSidebarWidth']),
  open,
  isMobile,
  mobileOpen,
  mobileSidebarWidth,
  sidebarState
});
</script>

<template>
  <div
    :class="cls"
    :data-collapsible="dataCollapsible"
    :data-side="side"
    :data-state="sidebarState"
    :data-variant="variant"
    :style="style"
  >
    <slot :open="open" :collapsed-sidebar-width="collapsedSidebarWidth" />
  </div>
</template>
