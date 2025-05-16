<script setup lang="ts">
import { computed } from 'vue';
import { StepperDescription } from '@soybean-ui/primitives';
import { cn, stepperVariants } from '@soybean-ui/variants';
import type { StepperDescriptionProps } from '../types';

defineOptions({
  name: 'SStepperDescription'
});

const { class: cls } = defineProps<StepperDescriptionProps>();

const { description } = stepperVariants();

const mergedCls = computed(() => cn(description(), cls));
</script>

<template>
  <StepperDescription :class="mergedCls">
    <slot />
  </StepperDescription>
</template>
