<script setup lang="ts">
import { computed } from 'vue';
import { usePaginationThemeContext } from './context';
import type { PaginationEllipsisProps } from './types';

defineOptions({
  name: 'PaginationEllipsis'
});

const props = defineProps<PaginationEllipsisProps>();

const themeContext = usePaginationThemeContext();

const cls = computed(() => themeContext?.ui?.value?.ellipsis);
</script>

<template>
  <div v-bind="props" :class="cls" data-type="ellipsis">
    <slot>...</slot>
  </div>
</template>
