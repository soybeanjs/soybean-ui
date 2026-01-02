<script setup lang="ts">
import { useCardUi } from './context';
import type { CardFooterProps } from './types';

defineOptions({
  name: 'CardFooter'
});

defineProps<CardFooterProps>();

const cls = useCardUi('footer');
</script>

<template>
  <div :class="cls">
    <slot />
  </div>
</template>
