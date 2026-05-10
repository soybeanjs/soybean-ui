<script setup lang="ts">
import { useOmitProps } from '../../composables';
import { interpolate } from '../../shared';
import { Primitive } from '../primitive';
import { useStepperItemContext, useStepperUi } from './context';
import { useLocaleMessages } from '../../locale';
import type { StepperIndicatorProps } from './types';

defineOptions({
  name: 'StepperIndicator'
});

const props = withDefaults(defineProps<StepperIndicatorProps>(), {
  as: 'span'
});

const { step } = useStepperItemContext('StepperIndicator');
const messages = useLocaleMessages();

const cls = useStepperUi('indicator');

const forwardedProps = useOmitProps(props, []);
</script>

<template>
  <Primitive v-bind="forwardedProps" :as="as" :as-child="asChild" data-soybean-stepper-indicator :class="cls">
    <slot :step="step">{{ interpolate(messages.stepper.step, { step: String(step) }) }}</slot>
  </Primitive>
</template>
