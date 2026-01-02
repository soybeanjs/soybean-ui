<script setup lang="ts">
import { computed } from 'vue';
import {
  NumberInputControl,
  NumberInputDecrement,
  NumberInputIncrement,
  NumberInputRoot,
  provideNumberInputUi
} from '@soybeanjs/headless';
import { useForwardElement, useOmitProps } from '@soybeanjs/headless/composables';
import { mergeSlotVariants } from '@/theme';
import { numberInputVariants } from '@/variants/number-input';
import Icon from '../icon/icon.vue';
import type { NumberInputEmits, NumberInputProps } from './types';

defineOptions({
  name: 'SNumberInput'
});

const props = defineProps<NumberInputProps>();

const emit = defineEmits<NumberInputEmits>();

const [_, setInputElement] = useForwardElement(el => props.inputRef?.(el as HTMLInputElement));

const forwardedProps = useOmitProps(props, [
  'class',
  'size',
  'ui',
  'center',
  'clearable',
  'inputRef',
  'controlProps',
  'incrementProps',
  'decrementProps'
]);

const ui = computed(() => {
  const variants = numberInputVariants({
    size: props.size,
    center: props.center
  });

  return mergeSlotVariants(variants, props.ui, { root: props.class });
});

provideNumberInputUi(ui);
</script>

<template>
  <NumberInputRoot v-slot="{ clear }" v-bind="forwardedProps" @update:model-value="emit('update:modelValue', $event)">
    <slot name="leading" />
    <NumberInputControl v-bind="controlProps" :ref="setInputElement" />
    <Icon v-if="clearable" icon="lucide:x" :class="ui.clearable" @click="clear" />
    <slot name="trailing" />
    <NumberInputDecrement v-bind="decrementProps">
      <slot name="decrement">
        <Icon icon="lucide:minus" />
      </slot>
    </NumberInputDecrement>
    <NumberInputIncrement v-bind="incrementProps">
      <slot name="increment">
        <Icon icon="lucide:plus" />
      </slot>
    </NumberInputIncrement>
  </NumberInputRoot>
</template>
