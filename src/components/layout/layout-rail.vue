<script setup lang="ts">
import { computed } from 'vue';
import { useLayoutRootContext, useLayoutThemeContext } from './context';
import type { LayoutRailProps } from './types';

defineOptions({
  name: 'LayoutRail'
});

defineProps<LayoutRailProps>();

const { toggleSidebar } = useLayoutRootContext('LayoutRail');

const themeContext = useLayoutThemeContext();

const cls = computed(() => themeContext?.ui?.value?.rail);
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
