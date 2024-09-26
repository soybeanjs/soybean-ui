<script setup lang="ts">
import { computed } from 'vue';
import { Primitive } from 'radix-vue';
import { cn, pinInputVariants } from '@soybean-ui/variants';
import type { PinInputSeparatorProps } from './types';

defineOptions({
  name: 'SPinInputSeparator'
});

const { class: separatorClass, size } = defineProps<PinInputSeparatorProps>();

const cls = computed(() => {
  const { separator } = pinInputVariants({ size });

  return cn(separator(), separatorClass);
});

const BLANK = ' ';
</script>

<template>
  <Primitive as="span" :class="cls">
    <slot>{{ BLANK }}</slot>
  </Primitive>
</template>
