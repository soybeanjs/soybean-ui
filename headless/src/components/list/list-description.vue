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
  <p :class="cls">
    <slot />
  </p>
</template>
