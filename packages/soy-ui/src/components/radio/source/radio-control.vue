<script setup lang="ts">
import { computed } from 'vue';
import { RadioGroupItem, useForwardProps } from '@soybean-ui/primitives';
import { cn, radioVariants } from '@soybean-ui/variants';
import type { RadioControlProps } from '../types';

defineOptions({
  name: 'SRadioControl'
});

const { class: cls, color, size, ...delegatedProps } = defineProps<RadioControlProps>();

const forwardedProps = useForwardProps(delegatedProps);

const mergedCls = computed(() => {
  const { control } = radioVariants({ color, size });

  return cn(control(), cls);
});
</script>

<template>
  <RadioGroupItem v-bind="forwardedProps" :class="mergedCls">
    <slot />
  </RadioGroupItem>
</template>
