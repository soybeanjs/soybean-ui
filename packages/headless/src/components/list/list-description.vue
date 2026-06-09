<script setup lang="ts">
import { useListUi } from './context';
import type { ListDescriptionProps } from './types';

defineOptions({
  name: 'ListDescription'
});

defineProps<ListDescriptionProps>();

const cls = useListUi('description');
</script>

<template>
  <p data-soybean-list-description :class="cls">
    <slot />
  </p>
</template>
