<script setup lang="ts">
import { computed } from 'vue';
import { cn, pinInputVariants } from '@soybean-ui/variants';
import type { PinInputInputRootProps } from '../types';

defineOptions({
  name: 'SPinInputInputRoot'
});

const { class: cls, size, separate } = defineProps<PinInputInputRootProps>();

const mergedCls = computed(() => {
  const { inputRoot } = pinInputVariants({ size, separate });

  return cn(inputRoot(), cls);
});
</script>

<template>
  <div :class="mergedCls">
    <slot />
  </div>
</template>
