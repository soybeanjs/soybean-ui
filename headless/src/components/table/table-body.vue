<script setup lang="ts">
import { useTableUi } from './context';
import type { TableBodyProps } from './types';

defineOptions({
  name: 'TableBody'
});

defineProps<TableBodyProps>();

const cls = useTableUi('body');
</script>

<template>
  <tbody :class="cls">
    <slot />
  </tbody>
</template>
