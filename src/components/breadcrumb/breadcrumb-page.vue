<script setup lang="ts">
import { computed } from 'vue';
import { useBreadcrumbThemeContext } from './context';
import type { BreadcrumbPageProps } from './types';

defineOptions({
  name: 'BreadcrumbPage'
});

const props = defineProps<BreadcrumbPageProps>();

const themeContext = useBreadcrumbThemeContext();

const cls = computed(() => themeContext?.ui?.value?.page);
</script>

<template>
  <span v-bind="props" :class="cls" role="link" aria-disabled="true" aria-current="page">
    <slot />
  </span>
</template>
