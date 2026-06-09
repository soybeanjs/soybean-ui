<script setup lang="ts">
import { useListUi } from './context';
import type { ListRootProps } from './types';

defineOptions({
  name: 'ListRoot'
});

defineProps<ListRootProps>();

const cls = useListUi('root');
</script>

<template>
  <ul data-soybean-list-root :class="cls">
    <slot />
  </ul>
</template>
