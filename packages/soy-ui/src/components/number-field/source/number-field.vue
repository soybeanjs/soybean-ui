<script setup lang="ts">
import { useForwardPropsEmits } from '@soybean-ui/primitives';
import type { NumberFieldEmits, NumberFieldProps } from '../types';
import NumberFieldDecrement from './number-field-decrement.vue';
import NumberFieldIncrement from './number-field-increment.vue';
import NumberFieldInput from './number-field-input.vue';
import NumberFieldRoot from './number-field-root.vue';

defineOptions({
  name: 'SNumberField'
});

const {
  class: cls,
  size,
  center,
  disabledDecrement,
  disabledIncrement,
  ui,
  ...rootProps
} = defineProps<NumberFieldProps>();

const emit = defineEmits<NumberFieldEmits>();

const forwarded = useForwardPropsEmits(rootProps, emit);
</script>

<template>
  <NumberFieldRoot v-bind="forwarded" :class="cls || ui?.root" :size="size">
    <NumberFieldInput :class="ui?.input" :size="size" :center="center" />
    <NumberFieldDecrement
      :class="ui?.decrement"
      :size="size"
      :center="center"
      :disabled="disabled || disabledDecrement"
    >
      <slot name="decrement-icon" />
    </NumberFieldDecrement>
    <NumberFieldIncrement
      :class="ui?.increment"
      :size="size"
      :center="center"
      :disabled="disabled || disabledIncrement"
    >
      <slot name="increment-icon" />
    </NumberFieldIncrement>
  </NumberFieldRoot>
</template>
