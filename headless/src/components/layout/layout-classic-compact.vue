<script setup lang="ts">
import { useOmitProps } from '@soybeanjs/headless/composables';
import LayoutClassicRoot from './layout-classic-root.vue';
import LayoutSidebar from './layout-sidebar.vue';
import LayoutRail from './layout-rail.vue';
import LayoutMain from './layout-main.vue';
import LayoutHeader from './layout-header.vue';
import LayoutTab from './layout-tab.vue';
import LayoutContent from './layout-content.vue';
import LayoutFooter from './layout-footer.vue';
import LayoutClassicPlaceholder from './layout-classic-placeholder.vue';
import type { LayoutClassicCompactProps, LayoutClassicCompactEmits, LayoutClassicCompactSlots } from './types';

defineOptions({
  name: 'LayoutClassicCompact'
});

const props = withDefaults(defineProps<LayoutClassicCompactProps>(), {
  open: undefined,
  orientation: 'vertical',
  defaultOpen: true,
  scrollId: '__SCROLL_EL_ID',
  sidebarVisible: true,
  headerVisible: true,
  tabVisible: true,
  footerVisible: true,
  fixedTop: true,
  stretchFooter: true
});

const emit = defineEmits<LayoutClassicCompactEmits>();

defineSlots<LayoutClassicCompactSlots>();

const forwardedProps = useOmitProps(props, [
  'sidebarProps',
  'railProps',
  'mainProps',
  'headerProps',
  'tabProps',
  'contentProps',
  'footerProps',
  'mobileProps'
]);
</script>

<template>
  <LayoutClassicRoot v-slot="slotProps" v-bind="forwardedProps" @update:open="emit('update:open', $event)">
    <LayoutMain v-bind="mainProps" :id="scrollBehavior === 'wrapper' ? scrollId : undefined">
      <LayoutHeader v-bind="headerProps">
        <slot name="header" />
      </LayoutHeader>
      <LayoutClassicPlaceholder type="header" />
      <LayoutTab v-bind="tabProps">
        <slot name="tab" />
      </LayoutTab>
      <LayoutClassicPlaceholder type="tab" />
      <LayoutSidebar v-bind="sidebarProps">
        <slot v-bind="slotProps" name="sidebar" />
        <LayoutRail v-bind="railProps" />
      </LayoutSidebar>
      <LayoutContent v-bind="contentProps" :id="scrollBehavior === 'content' ? scrollId : undefined">
        <slot />
      </LayoutContent>
      <LayoutFooter v-if="footerVisible" v-bind="footerProps">
        <slot name="footer" />
      </LayoutFooter>
      <LayoutClassicPlaceholder type="footer" />
    </LayoutMain>
  </LayoutClassicRoot>
</template>
