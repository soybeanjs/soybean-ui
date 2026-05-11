<script setup lang="ts">
import { computed } from 'vue';
import { StepperCompact, provideStepperUi } from '@soybeanjs/headless/stepper';
import { useForwardListeners, useOmitProps } from '@soybeanjs/headless/composables';
import { keysOf } from '@soybeanjs/utils';
import { mergeVariants } from '@/theme';
import { stepperVariants } from './variants';
import type { StepperProps, StepperEmits, StepperSlots } from './types';

defineOptions({
  name: 'SStepper'
});

const props = defineProps<StepperProps>();

const emit = defineEmits<StepperEmits>();

const slots = defineSlots<StepperSlots>();

const forwardedProps = useOmitProps(props, ['class', 'color', 'size', 'ui']);

const listeners = useForwardListeners(emit);

const slotNames = computed(() => keysOf(slots));

const ui = computed(() => {
  const variants = stepperVariants({
    color: props.color,
    size: props.size,
    orientation: props.orientation
  });

  return mergeVariants(variants, props.ui, { root: props.class });
});

provideStepperUi(ui);
</script>

<template>
  <StepperCompact v-bind="forwardedProps" v-on="listeners">
    <template v-for="slotName in slotNames" #[slotName]="slotProps" :key="slotName">
      <slot :name="slotName" v-bind="slotProps" />
    </template>
  </StepperCompact>
</template>
