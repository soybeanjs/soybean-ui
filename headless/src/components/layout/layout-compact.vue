<script setup lang="ts">
import LayoutRoot from './layout-root.vue';
import LayoutSidebar from './layout-sidebar.vue';
import LayoutRail from './layout-rail.vue';
import LayoutMain from './layout-main.vue';
import LayoutHeader from './layout-header.vue';
import LayoutTab from './layout-tab.vue';
import LayoutContent from './layout-content.vue';
import LayoutFooter from './layout-footer.vue';
import { useOmitProps } from '@soybeanjs/headless/composables';
import type { LayoutCompactEmits, LayoutCompactProps, LayoutCompactSlots } from './types';

defineOptions({
  name: 'LayoutCompact'
});

const props = withDefaults(defineProps<LayoutCompactProps>(), {
  open: undefined,
  defaultOpen: true,
  sidebarVisible: true,
  headerVisible: true,
  tabVisible: true,
  footerVisible: true
});

const emit = defineEmits<LayoutCompactEmits>();

defineSlots<LayoutCompactSlots>();

const forwardedProps = useOmitProps(props, [
  'sidebarProps',
  'headerProps',
  'mainProps',
  'tabProps',
  'footerProps',
  'railProps',
  'mobileProps'
]);
</script>

<template>
  <LayoutRoot v-slot="slotProps" v-bind="forwardedProps" @update:open="emit('update:open', $event)">
    <LayoutSidebar v-bind="sidebarProps">
      <slot v-bind="slotProps" name="sidebar" />
      <LayoutRail v-bind="railProps" />
    </LayoutSidebar>
    <LayoutMain v-bind="mainProps">
      <LayoutHeader v-bind="headerProps">
        <slot name="header" />
      </LayoutHeader>
      <LayoutTab v-if="tabVisible" v-bind="tabProps">
        <slot name="tab" />
      </LayoutTab>
      <LayoutContent v-bind="contentProps">
        <slot />
      </LayoutContent>
      <LayoutFooter v-if="footerVisible" v-bind="footerProps">
        <slot name="footer" />
      </LayoutFooter>
    </LayoutMain>
  </LayoutRoot>
</template>
