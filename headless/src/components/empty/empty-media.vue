<script setup lang="ts">
import { useEmptyUi } from './context';
import type { EmptyMediaProps } from './types';

defineOptions({
  name: 'EmptyMedia'
});

defineProps<EmptyMediaProps>();

const cls = useEmptyUi('media');
</script>

<template>
  <div :class="cls">
    <slot />
  </div>
</template>
