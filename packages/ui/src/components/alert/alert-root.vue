<script setup lang="ts">
import { computed } from 'vue';
import { Primitive } from 'radix-vue';
import { alertVariants, cn } from '@soybean-ui/variants';
import type { AlertRootProps } from './types';

defineOptions({
  name: 'SAlertRoot'
});

const props = defineProps<AlertRootProps>();

const cls = computed(() => {
  const { color, variant } = props;

  const { root } = alertVariants({ color, variant });

  return cn(root(), props.class);
});
</script>

<template>
  <Primitive as="div" :class="cls" role="alert">
    <slot />
  </Primitive>
</template>

<style scoped></style>
