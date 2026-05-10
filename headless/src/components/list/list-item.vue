<script setup lang="ts">
import { useListUi } from './context';
import type { ListItemProps } from './types';

defineOptions({
  name: 'ListItem'
});

defineProps<ListItemProps>();

const cls = useListUi('item');
</script>

<template>
  <li data-soybean-list-item :class="cls">
    <slot />
  </li>
</template>
