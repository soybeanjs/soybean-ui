<script setup lang="ts">
import { computed } from 'vue';
import { StepperTitle } from '@soybean-ui/primitives';
import { cn, stepperVariants } from '@soybean-ui/variants';
import type { StepperTitleProps } from '../types';

defineOptions({
  name: 'SStepperTitle'
});

const { class: cls, size } = defineProps<StepperTitleProps>();

const mergedCls = computed(() => {
  const { title } = stepperVariants({ size });

  return cn(title(), cls);
});
</script>

<template>
  <StepperTitle :class="mergedCls">
    <slot />
  </StepperTitle>
</template>
