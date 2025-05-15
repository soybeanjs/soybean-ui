<script setup lang="ts">
import { computed } from 'vue';
import { StepperSeparator, useForwardProps } from '@soybean-ui/primitives';
import { cn, stepperVariants } from '@soybean-ui/variants';
import type { StepperSeparatorProps } from '../types';

defineOptions({
  name: 'SStepperSeparator'
});

const { class: cls, size, orientation, ...delegatedProps } = defineProps<StepperSeparatorProps>();

const forwardedProps = useForwardProps(delegatedProps);

const mergedCls = computed(() => {
  const { separator } = stepperVariants({ size, orientation });

  return cn(separator(), cls);
});
</script>

<template>
  <StepperSeparator v-bind="forwardedProps" :class="mergedCls">
    <slot />
  </StepperSeparator>
</template>
