<script setup lang="ts">
import { computed } from 'vue';
import { PinInputInput, useForwardProps } from '@soybean-ui/primitives';
import { cn, pinInputVariants } from '@soybean-ui/variants';
import type { PinInputInputProps } from '../types';

defineOptions({
  name: 'SPinInputInput'
});

const { class: cls, size, separate, ...delegatedProps } = defineProps<PinInputInputProps>();

const forwardedProps = useForwardProps(delegatedProps);

const mergedCls = computed(() => {
  const { input } = pinInputVariants({ size, separate });

  return cn(input(), cls);
});
</script>

<template>
  <PinInputInput v-bind="forwardedProps" :class="mergedCls" />
</template>
