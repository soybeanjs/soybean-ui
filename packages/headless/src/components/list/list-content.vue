<script setup lang="ts">
import { useListUi } from './context';
import type { ListContentProps } from './types';

defineOptions({
  name: 'ListContent'
});

defineProps<ListContentProps>();

const cls = useListUi('content');
</script>

<template>
  <div data-soybean-list-content :class="cls">
    <slot />
  </div>
</template>
