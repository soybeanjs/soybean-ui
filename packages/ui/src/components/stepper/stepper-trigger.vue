<script setup lang="ts">
import { computed } from 'vue';
import { StepperTrigger } from '@soybean-ui/primitives';
import { cn, stepperVariants } from '@soybean-ui/variants';
import type { StepperTriggerProps } from './types';

defineOptions({
  name: 'SStepperTrigger'
});

const { class: cls, as, asChild } = defineProps<StepperTriggerProps>();

const { trigger } = stepperVariants();

const mergedCls = computed(() => cn(trigger(), cls));
</script>

<template>
  <StepperTrigger :class="mergedCls" :as="as" :as-child="asChild">
    <slot />
  </StepperTrigger>
</template>
