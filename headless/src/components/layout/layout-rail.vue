<script setup lang="ts">
import { useLayoutRootContext, useLayoutUi } from './context';
import type { LayoutRailProps } from './types';

defineOptions({
  name: 'LayoutRail'
});

defineProps<LayoutRailProps>();

const { toggleSidebar } = useLayoutRootContext('LayoutRail');

const cls = useLayoutUi('rail');
</script>

<template>
  <button
    :class="cls"
    data-sidebar="rail"
    data-slot="sidebar-rail"
    aria-label="Toggle Sidebar"
    :tabindex="-1"
    title="Toggle Sidebar"
    @click="toggleSidebar"
  >
    <slot />
  </button>
</template>
