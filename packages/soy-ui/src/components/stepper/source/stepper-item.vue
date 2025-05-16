<script setup lang="ts">
import { computed } from 'vue';
import { StepperItem, useForwardProps } from '@soybean-ui/primitives';
import { cn, stepperVariants } from '@soybean-ui/variants';
import type { StepperItemProps } from '../types';

defineOptions({
  name: 'SStepperItem'
});

const { class: cls, size, orientation, ...delegatedProps } = defineProps<StepperItemProps>();

const forwardedProps = useForwardProps(delegatedProps);

const mergedCls = computed(() => {
  const { item } = stepperVariants({ size, orientation });

  return cn(item(), cls);
});
</script>

<template>
  <StepperItem v-slot="slotProps" v-bind="forwardedProps" :class="mergedCls">
    <slot v-bind="slotProps" />
  </StepperItem>
</template>
