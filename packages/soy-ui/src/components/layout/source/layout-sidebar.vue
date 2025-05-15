<script setup lang="ts">
import { computed } from 'vue';
import { cn, layoutVariants } from '@soybean-ui/variants';
import { useLayout } from '../context';
import type { LayoutSidebarProps } from '../types';
import SLayoutMobile from './layout-mobile.vue';

defineOptions({
  name: 'SLayoutSidebar',
  inheritAttrs: false
});

const props = withDefaults(defineProps<LayoutSidebarProps>(), {
  side: 'left',
  variant: 'sidebar',
  collapsible: 'offcanvas'
});

const { isMobile, open, collapsedSidebarWidth } = useLayout();

const mergedCls = computed(() => {
  const { variant, side, collapsible } = props;

  const { sidebarRoot, sidebarWrapper, sidebar, sidebarGapHandler } = layoutVariants({ variant, side, collapsible });

  return {
    cls: cn(sidebar(), props.class || props.ui?.sidebar),
    root: cn(sidebarRoot(), props.ui?.sidebarRoot),
    wrapper: cn(sidebarWrapper(), props.ui?.sidebarWrapper),
    gapHandler: cn(sidebarGapHandler(), props.ui?.sidebarGapHandler)
  };
});
</script>

<template>
  <SLayoutMobile v-if="isMobile" :side="side" :class="props.class" :root-class="ui?.mobileRoot">
    <slot />
  </SLayoutMobile>
  <div v-else :class="mergedCls.root">
    <div :class="mergedCls.gapHandler" />
    <div :class="mergedCls.wrapper">
      <div :class="mergedCls.cls" v-bind="$attrs" data-sidebar="sidebar">
        <slot :size="size" :collapsed="!open" :collapsed-width="collapsedSidebarWidth" />
      </div>
    </div>
  </div>
</template>
