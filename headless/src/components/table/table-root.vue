<script setup lang="ts">
import { useTableUi } from './context';
import type { TableRootProps } from './types';

defineOptions({
  name: 'TableRoot'
});

defineProps<TableRootProps>();

const cls = useTableUi('root');
</script>

<template>
  <div :class="cls" :dir="dir">
    <slot />
  </div>
</template>
