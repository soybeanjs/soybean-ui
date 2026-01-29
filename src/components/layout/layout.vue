<script setup lang="ts">
import { computed } from 'vue';
import {
  LayoutFooter,
  LayoutHeader,
  LayoutContent,
  LayoutMain,
  LayoutRail,
  LayoutRoot,
  LayoutSidebar,
  LayoutTab,
  provideLayoutUi
} from '@soybeanjs/headless';
import { useOmitProps } from '@soybeanjs/headless/composables';
import { mergeSlotVariants, provideSizeContext, themeSizeMap, themeSizeRatio } from '@/theme';
import { layoutVariants } from '@/variants/layout';
import { drawerVariants } from '@/variants/drawer';
import type { LayoutEmits, LayoutProps } from './types';

defineOptions({
  name: 'SLayout'
});

const props = withDefaults(defineProps<LayoutProps>(), {
  open: undefined,
  size: 'md'
});

const emit = defineEmits<LayoutEmits>();

const forwardedProps = useOmitProps(props, [
  'class',
  'size',
  'ui',
  'pxToRem',
  'sidebarProps',
  'headerProps',
  'mainProps',
  'tabProps',
  'footerProps',
  'railProps',
  'mobileProps'
]);

const pxToRem = (px: number) => {
  if (props.pxToRem) {
    return props.pxToRem(px);
  }

  return (px * themeSizeRatio[props.size]) / themeSizeMap.md;
};

const ui = computed(() => {
  const variants = layoutVariants({
    size: props.size,
    variant: props.variant,
    side: props.side,
    collapsible: props.collapsible,
    fullContent: props.fullContent
  });

  const drawer = drawerVariants({
    size: props.size,
    side: props.side
  });

  return mergeSlotVariants(
    {
      ...variants,
      mobileDrawer: drawer.content
    },
    props.ui,
    { root: props.class }
  );
});

provideLayoutUi(ui);
provideSizeContext(() => props.size);
</script>

<template>
  <LayoutRoot
    v-slot="slotProps"
    v-bind="forwardedProps"
    :px-to-rem="pxToRem"
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
      <LayoutContent v-bind="contentProps">
        <slot />
      </LayoutContent>
      <LayoutFooter v-bind="footerProps">
        <slot name="footer" />
      </LayoutFooter>
    </LayoutMain>
  </LayoutRoot>
</template>
