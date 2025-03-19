<script setup lang="ts">
import { computed } from 'vue';
import { Primitive } from '@soybean-ui/primitives';
import { alertVariants, cn } from '@soybean-ui/variants';
import type { AlertRootProps } from './types';

defineOptions({
  name: 'SAlertRoot'
});

const { class: cls, color, variant } = defineProps<AlertRootProps>();

const mergedCls = computed(() => {
  const { root } = alertVariants({ color, variant });

  return cn(root(), cls);
});
</script>

<template>
  <Primitive as="div" :class="mergedCls" role="alert">
    <slot />
  </Primitive>
</template>
