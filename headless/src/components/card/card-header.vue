<script setup lang="ts">
import { useCardUi } from './context';
import type { CardHeaderProps } from './types';

defineOptions({
  name: 'CardHeader'
});

defineProps<CardHeaderProps>();

const cls = useCardUi('header');
</script>

<template>
  <div :class="cls">
    <slot />
  </div>
</template>
