<script setup lang="ts">
import { computed } from 'vue';
import {
  InputNumberControl,
  InputNumberDecrement,
  InputNumberIncrement,
  InputNumberRoot,
  provideInputNumberUi
} from '@soybeanjs/headless';
import { useForwardElement, useOmitProps } from '@soybeanjs/headless/composables';
import { mergeSlotVariants } from '@/theme';
import Icon from '../icon/icon.vue';
import { inputNumberVariants } from './variants';
import type { InputNumberEmits, InputNumberProps } from './types';

defineOptions({
  name: 'SInputNumber'
});

const props = defineProps<InputNumberProps>();

const emit = defineEmits<InputNumberEmits>();

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
  const variants = inputNumberVariants({
    size: props.size,
    center: props.center
  });

  return mergeSlotVariants(variants, props.ui, { root: props.class });
});

provideInputNumberUi(ui);
</script>

<template>
  <InputNumberRoot v-slot="{ clear }" v-bind="forwardedProps" @update:model-value="emit('update:modelValue', $event)">
    <slot name="leading" />
    <InputNumberControl v-bind="controlProps" :ref="setInputElement" />
    <Icon v-if="clearable" icon="lucide:x" :class="ui.clearable" @click="clear" />
    <slot name="trailing" />
    <InputNumberDecrement v-bind="decrementProps">
      <slot name="decrement">
        <Icon icon="lucide:minus" />
      </slot>
    </InputNumberDecrement>
    <InputNumberIncrement v-bind="incrementProps">
      <slot name="increment">
        <Icon icon="lucide:plus" />
      </slot>
    </InputNumberIncrement>
  </InputNumberRoot>
</template>
