<script setup lang="ts">
import { computed } from 'vue';
import { Primitive } from 'reka-ui';
import { cn, pinInputVariants } from '@soybean-ui/variants';
import type { PinInputInputRootProps } from './types';

defineOptions({
  name: 'SPinInputInputRoot'
});

const { class: cls, separate } = defineProps<PinInputInputRootProps>();

const mergedCls = computed(() => {
  const { inputRoot } = pinInputVariants({ separate });

  return cn(inputRoot(), cls);
});
</script>

<template>
  <Primitive as="div" :class="mergedCls">
    <slot />
  </Primitive>
</template>
