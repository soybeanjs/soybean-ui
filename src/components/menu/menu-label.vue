<script setup lang="ts">
import type { MenuLabelProps } from './types';

defineOptions({
  name: 'MenuLabel'
});

const props = defineProps<MenuLabelProps>();
</script>

<template>
  <div v-bind="props">
    <slot />
  </div>
</template>
