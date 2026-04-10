<script setup lang="ts">
import { useEmptyUi } from './context';
import type { EmptyTitleProps } from './types';

defineOptions({
  name: 'EmptyTitle'
});

defineProps<EmptyTitleProps>();

const cls = useEmptyUi('title');
</script>

<template>
  <h3 :class="cls">
    <slot />
  </h3>
</template>
