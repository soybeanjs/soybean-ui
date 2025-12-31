<script setup lang="ts">
import { computed } from 'vue';
import {
  LayoutFooter,
  LayoutHeader,
  LayoutMain,
  LayoutRail,
  LayoutRoot,
  LayoutSidebar,
  LayoutTab,
  provideLayoutThemeContext
} from '@soybeanjs/headless';
import { useOmitProps } from '@soybeanjs/headless/composables';
import { mergeSlotVariants, provideSizeContext, themeSizeRatio } from '@/theme';
import { layoutVariants } from '@/variants/layout';
import { drawerPopupVariants } from '@/variants/drawer';
import type { LayoutEmits, LayoutProps } from './types';

defineOptions({
  name: 'SLayout'
});

const props = withDefaults(defineProps<LayoutProps>(), {
  open: undefined
});

const emit = defineEmits<LayoutEmits>();

const forwardedProps = useOmitProps(props, [
  'size',
  'ui',
  'sidebarProps',
  'headerProps',
  'mainProps',
  'tabProps',
  'footerProps',
  'railProps',
  'mobileProps'
]);

const sizeRatio = computed(() => themeSizeRatio[props.size || 'md']);

const ui = computed(() => {
  const variants = layoutVariants({
    size: props.size,
    variant: props.variant,
    side: props.side,
    collapsible: props.collapsible
  });

  const drawer = drawerPopupVariants({
    size: props.size,
    side: props.side
  });

  variants.mobileDrawer = () => drawer;

  return mergeSlotVariants(variants, props.ui);
});

provideLayoutThemeContext({
  ui
});

provideSizeContext(() => props.size);
</script>

<template>
  <LayoutRoot
    v-slot="slotProps"
    v-bind="forwardedProps"
    :size-ratio="sizeRatio"
    @update:open="emit('update:open', $event)"
  >
    <LayoutSidebar v-bind="sidebarProps">
      <slot v-bind="slotProps" name="sidebar" />
      <LayoutRail v-bind="railProps" />
    </LayoutSidebar>
    <LayoutMain v-bind="mainProps">
      <LayoutHeader v-bind="headerProps">
        <slot name="header" />
      </LayoutHeader>
      <LayoutTab v-bind="tabProps">
        <slot name="tab" />
      </LayoutTab>
      <slot />
      <LayoutFooter v-bind="footerProps">
        <slot name="footer" />
      </LayoutFooter>
    </LayoutMain>
  </LayoutRoot>
</template>
