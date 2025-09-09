<script setup lang="ts">
import { computed } from 'vue';
import { useBreadcrumbThemeContext } from './context';
import type { BreadcrumbItemProps } from './types';

defineOptions({
  name: 'BreadcrumbItem'
});

const props = defineProps<BreadcrumbItemProps>();

const themeContext = useBreadcrumbThemeContext();

const cls = computed(() => themeContext?.ui?.value?.item);
</script>

<template>
  <li v-bind="props" :class="cls">
    <slot />
  </li>
</template>
