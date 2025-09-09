<script setup lang="ts">
import { computed } from 'vue';
import { useBreadcrumbThemeContext } from './context';
import type { BreadcrumbSeparatorProps } from './types';

defineOptions({
  name: 'BreadcrumbSeparator'
});

const props = defineProps<BreadcrumbSeparatorProps>();

const themeContext = useBreadcrumbThemeContext();

const cls = computed(() => themeContext?.ui?.value?.separator);
</script>

<template>
  <li v-bind="props" :class="cls" role="presentation" aria-hidden="true">
    <slot />
  </li>
</template>
