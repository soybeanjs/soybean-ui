<script setup lang="ts">
import { computed } from 'vue';
import { useBreadcrumbThemeContext } from './context';
import type { BreadcrumbEllipsisProps } from './types';

defineOptions({
  name: 'BreadcrumbEllipsis'
});

defineProps<BreadcrumbEllipsisProps>();

const themeContext = useBreadcrumbThemeContext();

const cls = computed(() => themeContext?.ui?.value?.ellipsis);
</script>

<template>
  <span :class="cls" role="presentation" aria-hidden="true">
    <slot>…</slot>
  </span>
</template>
