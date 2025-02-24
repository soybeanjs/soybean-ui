<script setup lang="ts">
import { computed } from 'vue';
import { StepperRoot, useForwardPropsEmits } from '@soybean-ui/primitives';
import { cn, stepperVariants } from '@soybean-ui/variants';
import type { StepperRootEmits, StepperRootProps } from './types';

defineOptions({
  name: 'SStepperRoot'
});

const { class: cls, orientation, ...delegatedProps } = defineProps<StepperRootProps>();

const emit = defineEmits<StepperRootEmits>();

const forwarded = useForwardPropsEmits(delegatedProps, emit);

const mergedCls = computed(() => {
  const { root } = stepperVariants({ orientation });

  return cn(root(), cls);
});
</script>

<template>
  <StepperRoot v-slot="slotProps" v-bind="forwarded" :class="mergedCls">
    <slot v-bind="slotProps" />
  </StepperRoot>
</template>
