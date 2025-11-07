<script setup lang="ts">
import { computed, shallowRef } from 'vue';
import type { CSSProperties } from 'vue';
import { useMediaQuery } from '@vueuse/core';
import { useControllableState } from '../../composables';
import { transformPropsToContext } from '../../shared';
import { provideLayoutRootContext, useLayoutThemeContext } from './context';
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
  sizeRatio: 1
});

const emit = defineEmits<LayoutRootEmits>();

const themeContext = useLayoutThemeContext();

const cls = computed(() => themeContext?.ui?.value?.root);

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
  const sidebarWidth = (props.sidebarWidth * props.sizeRatio) / 16;
  const collapsedSidebarWidth = (props.collapsedSidebarWidth * props.sizeRatio) / 16;

  return {
    [layoutCssVars.sidebarWidth]: `${sidebarWidth}rem`,
    [layoutCssVars.collapsedSidebarWidth]: `${collapsedSidebarWidth}rem`
  };
});

const mobileStyle = computed<CSSProperties>(() => {
  const mobileSidebarWidth = (props.mobileSidebarWidth * props.sizeRatio) / 16;
  return {
    [layoutCssVars.sidebarWidth]: `${mobileSidebarWidth}rem`
  };
});

provideLayoutRootContext({
  ...transformPropsToContext(props, ['sidebarWidth', 'collapsedSidebarWidth']),
  open,
  isMobile,
  mobileOpen,
  mobileStyle,
  sidebarState
});
</script>

<template>
  <div
    :class="cls"
    :data-state="sidebarState"
    :data-collapsible="dataCollapsible"
    :data-variant="variant"
    :data-side="side"
    :style="style"
  >
    <slot :open="open" :collapsed-sidebar-width="collapsedSidebarWidth" />
  </div>
</template>
