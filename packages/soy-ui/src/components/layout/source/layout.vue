<script setup lang="ts">
import { useCombinedPropsEmits, usePickForwardProps } from '@soybean-ui/primitives';
import type { LayoutEmits, LayoutProps } from '../types';
import SLayoutRoot from './layout-root.vue';
import SLayoutMain from './layout-main.vue';
import SLayoutHeader from './layout-header.vue';
import SLayoutSidebar from './layout-sidebar.vue';
import SLayoutRail from './layout-rail.vue';

defineOptions({
  name: 'SLayout'
});

const props = defineProps<LayoutProps>();

const emit = defineEmits<LayoutEmits>();

const forwardedRootProps = usePickForwardProps(props, [
  'variant',
  'side',
  'collapsible',
  'open',
  'defaultOpen',
  'sidebarWidth',
  'collapsedSidebarWidth'
]);

const forwardedRoot = useCombinedPropsEmits(forwardedRootProps, emit);

const delegatedSidebarProps = usePickForwardProps(props, ['side', 'variant', 'collapsible']);
</script>

<template>
  <SLayoutRoot v-slot="slotProps" v-bind="forwardedRoot" :class="ui?.root" :size="size">
    <SLayoutSidebar v-bind="delegatedSidebarProps" :size="size" :ui="ui">
      <template #default="sidebarSlotProps">
        <slot name="sidebar" v-bind="{ ...slotProps, ...sidebarSlotProps }" />
        <SLayoutRail :class="ui?.rail" :side="side" :variant="variant" :collapsible="collapsible" />
      </template>
    </SLayoutSidebar>
    <SLayoutMain :class="ui?.main" :variant="variant" :collapsible="collapsible">
      <SLayoutHeader :class="ui?.header">
        <slot name="header" v-bind="slotProps" />
      </SLayoutHeader>
      <slot v-bind="slotProps" />
    </SLayoutMain>
  </SLayoutRoot>
</template>
