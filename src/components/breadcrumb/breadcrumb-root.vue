<script setup lang="ts">
import { computed } from 'vue';
import { useBreadcrumbThemeContext } from './context';
import type { BreadcrumbRootProps } from './types';

defineOptions({
  name: 'BreadcrumbRoot'
});

const props = defineProps<BreadcrumbRootProps>();

const themeContext = useBreadcrumbThemeContext();

const cls = computed(() => themeContext?.ui?.value?.root);
</script>

<template>
  <nav v-bind="props" :class="cls" aria-label="breadcrumb">
    <slot />
  </nav>
</template>
