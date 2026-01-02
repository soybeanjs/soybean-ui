<script setup lang="ts">
import { useCardUi } from './context';
import type { CardRootProps } from './types';

defineOptions({
  name: 'CardRoot'
});

defineProps<CardRootProps>();

const cls = useCardUi('root');
</script>

<template>
  <div :class="cls">
    <slot />
  </div>
</template>
