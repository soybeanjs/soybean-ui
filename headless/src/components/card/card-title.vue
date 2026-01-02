<script setup lang="ts">
import { useCardUi } from './context';
import type { CardTitleProps } from './types';

defineOptions({
  name: 'CardTitle'
});

defineProps<CardTitleProps>();

const cls = useCardUi('title');
</script>

<template>
  <h3 :class="cls">
    <slot />
  </h3>
</template>
