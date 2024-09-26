<script setup lang="ts">
import { computed } from 'vue';
import { PinInputInput, useForwardProps } from 'radix-vue';
import { cn, pinInputVariants } from '@soybean-ui/variants';
import type { PinInputItemProps } from './types';

defineOptions({
  name: 'SPinInputItem'
});

const { class: itemCls, size, separate, ...delegatedProps } = defineProps<PinInputItemProps>();

const forwardedProps = useForwardProps(delegatedProps);

const cls = computed(() => {
  const { input } = pinInputVariants({ separate, size });

  return cn(input(), itemCls);
});
</script>

<template>
  <PinInputInput v-bind="forwardedProps" :class="cls" />
</template>
