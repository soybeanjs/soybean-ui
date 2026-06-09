<script setup lang="ts">
import { computed } from 'vue';
import { useForwardListeners, useOmitProps } from '@soybeanjs/headless/composables';
import { StepperCompact, provideStepperUi } from '@soybeanjs/headless/stepper';
import { keysOf } from '@soybeanjs/utils';
import { stepperVariants } from '@/styles/stepper';
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

const ui = computed(() =>
  stepperVariants(
    {
      color: props.color,
      size: props.size,
      orientation: props.orientation
    },
    props.ui,
    { root: props.class }
  )
);

provideStepperUi(ui);
</script>

<template>
  <StepperCompact v-bind="forwardedProps" v-on="listeners">
    <template v-for="slotName in slotNames" #[slotName]="slotProps" :key="slotName">
      <slot :name="slotName" v-bind="slotProps" />
    </template>
  </StepperCompact>
</template>
