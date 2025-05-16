<script setup lang="ts">
import { computed } from 'vue';
import { StepperTrigger } from '@soybean-ui/primitives';
import { cn, stepperVariants } from '@soybean-ui/variants';
import type { StepperTriggerProps } from '../types';

defineOptions({
  name: 'SStepperTrigger'
});

const { class: cls, size, as, asChild } = defineProps<StepperTriggerProps>();

const mergedCls = computed(() => {
  const { trigger } = stepperVariants({ size });

  return cn(trigger(), cls);
});
</script>

<template>
  <StepperTrigger :class="mergedCls" :as="as" :as-child="asChild">
    <slot />
  </StepperTrigger>
</template>
