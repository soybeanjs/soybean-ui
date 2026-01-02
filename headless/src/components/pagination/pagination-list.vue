<script setup lang="ts">
import { computed } from 'vue';
import { usePaginationRootContext, usePaginationUi } from './context';
import { getRange, transform } from './shared';
import type { PaginationListProps } from './types';

defineOptions({
  name: 'PaginationList'
});

defineProps<PaginationListProps>();

const { page, pageCount, siblingCount, showEdges } = usePaginationRootContext('PaginationList');

const cls = usePaginationUi('list');

const transformedRange = computed(() =>
  transform(getRange(page.value, pageCount.value, siblingCount.value, showEdges.value))
);
</script>

<template>
  <div :class="cls">
    <slot :items="transformedRange" />
  </div>
</template>
