<script setup lang="ts">
import { computed } from 'vue';
import { StepperTitle } from '@soybean-ui/primitives';
import { cn, stepperVariants } from '@soybean-ui/variants';
import type { StepperTitleProps } from './types';

defineOptions({
  name: 'SStepperTitle'
});

const { class: cls } = defineProps<StepperTitleProps>();

const { title } = stepperVariants();

const mergedCls = computed(() => cn(title(), cls));
</script>

<template>
  <StepperTitle :class="mergedCls">
    <slot />
  </StepperTitle>
</template>
