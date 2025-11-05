<script setup lang="ts">
import { computed } from 'vue';
import { useBreadcrumbThemeContext } from './context';
import type { BreadcrumbListProps } from './types';

defineOptions({
  name: 'BreadcrumbList'
});

defineProps<BreadcrumbListProps>();

const themeContext = useBreadcrumbThemeContext();

const cls = computed(() => themeContext?.ui?.value?.list);
</script>

<template>
  <ol :class="cls">
    <slot />
  </ol>
</template>
