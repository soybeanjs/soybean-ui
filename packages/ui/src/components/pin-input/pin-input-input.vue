<script setup lang="ts">
import { computed } from 'vue';
import { PinInputInput, useForwardProps } from 'radix-vue';
import { cn, pinInputVariants } from '@soybean-ui/variants';
import type { PinInputItemProps } from './types';

defineOptions({
  name: 'SPinInputInput'
});

const { class: cls, size, separate, ...delegatedProps } = defineProps<PinInputItemProps>();

const forwardedProps = useForwardProps(delegatedProps);

const mergedCls = computed(() => {
  const { input } = pinInputVariants({ separate, size });

  return cn(input(), cls);
});
</script>

<template>
  <PinInputInput v-bind="forwardedProps" :class="mergedCls" />
</template>
