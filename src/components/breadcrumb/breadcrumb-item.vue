<script setup lang="ts">
import { computed } from 'vue';
import { useBreadcrumbThemeContext } from './context';
import type { BreadcrumbItemProps } from './types';

defineOptions({
  name: 'BreadcrumbItem'
});

defineProps<BreadcrumbItemProps>();

const themeContext = useBreadcrumbThemeContext();

const cls = computed(() => themeContext?.ui?.value?.item);
</script>

<template>
  <li :class="cls">
    <slot />
  </li>
</template>
