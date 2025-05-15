<script setup lang="ts">
import { computed } from 'vue';
import { alertVariants, cn } from '@soybean-ui/variants';
import type { AlertRootProps } from '../types';

defineOptions({
  name: 'SAlertRoot'
});

const { class: cls, color, variant, size } = defineProps<AlertRootProps>();

const mergedCls = computed(() => {
  const { root } = alertVariants({ color, variant, size });

  return cn(root(), cls);
});
</script>

<template>
  <div :class="mergedCls" role="alert">
    <slot />
  </div>
</template>
