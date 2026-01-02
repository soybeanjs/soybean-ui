<script setup lang="ts">
import { useCardUi } from './context';
import type { CardDescriptionProps } from './types';

defineOptions({
  name: 'CardDescription'
});

defineProps<CardDescriptionProps>();

const cls = useCardUi('description');
</script>

<template>
  <p :class="cls">
    <slot />
  </p>
</template>
