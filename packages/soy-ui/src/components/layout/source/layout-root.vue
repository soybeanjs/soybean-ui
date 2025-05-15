<script setup lang="ts">
import { computed, ref } from 'vue';
import type { CSSProperties, Ref } from 'vue';
import { useMediaQuery, useVModel } from '@vueuse/core';
import { cn, layoutVariants } from '@soybean-ui/variants';
import { themeSizeRatio } from '../../../constant';
import { provideLayoutContext } from '../context';
import type { LayoutRootEmits, LayoutRootProps, SidebarState } from '../types';

defineOptions({
  name: 'SLayoutRoot'
});

const props = withDefaults(defineProps<LayoutRootProps>(), {
  size: 'md',
  open: undefined,
  sidebarWidth: 240,
  collapsedSidebarWidth: 50
});

const emit = defineEmits<LayoutRootEmits>();

const open = useVModel(props, 'open', emit, {
  defaultValue: props.defaultOpen,
  passive: true
}) as Ref<boolean>;

const mergedCls = computed(() => {
  const { root } = layoutVariants({ variant: props.variant });

  return cn(root(), props.class);
});

const isMobile = useMediaQuery('(max-width: 768px)');
const openMobile = ref(false);

const state = computed<SidebarState>(() => (open.value ? 'expanded' : 'collapsed'));

const dataCollapsible = computed(() => (state.value === 'collapsed' ? props.collapsible : ''));

const style = computed<CSSProperties>(() => {
  const sidebarWidth = (props.sidebarWidth * themeSizeRatio[props.size]) / 16;
  const collapsedSidebarWidth = (props.collapsedSidebarWidth * themeSizeRatio[props.size]) / 16;

  return {
    '--sidebar-width': `${sidebarWidth}rem`,
    '--sidebar-width-icon': `${collapsedSidebarWidth}rem`
  };
});

provideLayoutContext({
  isMobile,
  openMobile,
  onOpenMobileChange: (value: boolean) => {
    openMobile.value = value;
  },
  state,
  open,
  onOpenChange: (value: boolean) => {
    open.value = value;
  },
  sidebarWidth: computed(() => props.sidebarWidth),
  collapsedSidebarWidth: computed(() => props.collapsedSidebarWidth),
  toggleSidebar: () => {
    if (isMobile.value) {
      openMobile.value = !openMobile.value;
    } else {
      open.value = !open.value;
    }
  }
});
</script>

<template>
  <div
    :class="mergedCls"
    :style="style"
    :data-state="state"
    :data-collapsible="dataCollapsible"
    :data-variant="variant"
    :data-side="side"
  >
    <slot :open="open" />
  </div>
</template>
