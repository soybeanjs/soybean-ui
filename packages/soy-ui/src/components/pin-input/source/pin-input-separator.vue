<script setup lang="ts">
import { computed } from 'vue';
import { cn, pinInputVariants } from '@soybean-ui/variants';
import type { PinInputSeparatorProps } from '../types';

defineOptions({
  name: 'SPinInputSeparator'
});

const { class: cls, size } = defineProps<PinInputSeparatorProps>();

const mergedCls = computed(() => {
  const { separator } = pinInputVariants({ size });

  return cn(separator(), cls);
});

const BLANK = ' ';
</script>

<template>
  <span :class="mergedCls">
    <slot>{{ BLANK }}</slot>
  </span>
</template>
