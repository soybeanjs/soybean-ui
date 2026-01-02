<script setup lang="ts">
import { useCardUi } from './context';
import type { CardContentProps } from './types';

defineOptions({
  name: 'CardContent'
});

defineProps<CardContentProps>();

const cls = useCardUi('content');
</script>

<template>
  <div :class="cls" tabindex="-1">
    <slot />
  </div>
</template>
