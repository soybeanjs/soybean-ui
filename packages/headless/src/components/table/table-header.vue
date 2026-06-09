<script setup lang="ts">
import { useTableUi } from './context';
import type { TableHeaderProps } from './types';

defineOptions({
  name: 'TableHeader'
});

defineProps<TableHeaderProps>();

const cls = useTableUi('header');
</script>

<template>
  <thead data-soybean-table-header :class="cls">
    <slot />
  </thead>
</template>
