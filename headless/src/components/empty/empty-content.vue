<script setup lang="ts">
import { useEmptyUi } from './context';
import type { EmptyContentProps } from './types';

defineOptions({
  name: 'EmptyContent'
});

defineProps<EmptyContentProps>();

const cls = useEmptyUi('content');
</script>

<template>
  <div :class="cls">
    <slot />
  </div>
</template>
