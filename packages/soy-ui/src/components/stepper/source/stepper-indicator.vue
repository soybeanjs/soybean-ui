<script setup lang="ts">
import { computed } from 'vue';
import { StepperIndicator } from '@soybean-ui/primitives';
import { cn, stepperVariants } from '@soybean-ui/variants';
import type { StepperIndicatorProps } from '../types';

defineOptions({
  name: 'SStepperIndicator'
});

const { class: cls, size } = defineProps<StepperIndicatorProps>();

const mergedCls = computed(() => {
  const { indicator } = stepperVariants({ size });

  return cn(indicator(), cls);
});
</script>

<template>
  <StepperIndicator :class="mergedCls">
    <slot />
  </StepperIndicator>
</template>
