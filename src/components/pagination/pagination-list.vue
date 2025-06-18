<script setup lang="ts">
import { computed } from 'vue';
import { usePaginationRootContext, usePaginationThemeContext } from './context';
import { getRange, transform } from './shared';
import type { PaginationListProps } from './types';

defineOptions({
  name: 'PaginationList'
});

const props = defineProps<PaginationListProps>();

const { page, pageCount, siblingCount, showEdges } = usePaginationRootContext('PaginationList');

const themeContext = usePaginationThemeContext();

const cls = computed(() => [themeContext?.ui?.value?.list, props.class]);

const transformedRange = computed(() =>
  transform(getRange(page.value, pageCount.value, siblingCount.value, showEdges.value))
);
</script>

<template>
  <div v-bind="props" :class="cls">
    <slot :items="transformedRange" />
  </div>
</template>
