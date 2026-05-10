<script setup lang="ts">
import { useTableUi } from './context';
import type { TableContentProps } from './types';

defineOptions({
  name: 'TableContent'
});

defineProps<TableContentProps>();

const cls = useTableUi('content');
</script>

<template>
  <table data-soybean-table-content :class="cls" role="table">
    <slot />
  </table>
</template>
