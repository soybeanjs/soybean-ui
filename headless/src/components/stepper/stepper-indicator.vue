<script setup lang="ts">
import { useOmitProps } from '../../composables';
import { Primitive } from '../primitive';
import { useStepperItemContext, useStepperUi } from './context';
import type { StepperIndicatorProps } from './types';

defineOptions({
  name: 'StepperIndicator'
});

const props = withDefaults(defineProps<StepperIndicatorProps>(), {
  as: 'span'
});

const { step } = useStepperItemContext('StepperIndicator');

const cls = useStepperUi('indicator');

const forwardedProps = useOmitProps(props, []);
</script>

<template>
  <Primitive v-bind="forwardedProps" :as="as" :as-child="asChild" :class="cls">
    <slot :step="step">Step {{ step }}</slot>
  </Primitive>
</template>
