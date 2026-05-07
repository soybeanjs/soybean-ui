<script setup lang="ts">
import { computed } from 'vue';
import { useForwardElement, useOmitProps } from '../../composables';
import Button from '../button/button.vue';
import Icon from '../_icon/icon.vue';
import InputNumberControl from './input-number-control.vue';
import InputNumberDecrement from './input-number-decrement.vue';
import InputNumberIncrement from './input-number-increment.vue';
import InputNumberRoot from './input-number-root.vue';
import { useInputNumberUi } from './context';
import type { InputNumberCompactEmits, InputNumberCompactProps, InputNumberCompactSlots } from './types';

defineOptions({
  name: 'InputNumberCompact'
});

const props = defineProps<InputNumberCompactProps>();

const emit = defineEmits<InputNumberCompactEmits>();

defineSlots<InputNumberCompactSlots>();

const forwardedProps = useOmitProps(props, [
  'inputRef',
  'controlProps',
  'clearable',
  'clearProps',
  'incrementProps',
  'decrementProps'
]);

const [_, setInputElement] = useForwardElement(el => props.inputRef?.(el as HTMLInputElement));

const ui = useInputNumberUi();

const clearDisabled = computed(() => props.disabled || props.readonly || props.clearProps?.disabled || false);
</script>

<template>
  <InputNumberRoot
    v-slot="{ clear, modelValue }"
    v-bind="forwardedProps"
    @update:model-value="emit('update:modelValue', $event)"
  >
    <slot name="leading" :clear="clear" :model-value="modelValue" />
    <InputNumberControl v-bind="controlProps" :ref="setInputElement" />
    <template v-if="clearable">
      <slot name="clear" :clear="clear" :model-value="modelValue">
        <Button
          v-bind="clearProps"
          data-slot="clearable"
          :class="ui.clearable"
          :disabled="clearDisabled"
          aria-label="Clear input"
          @click="clear"
        >
          <Icon icon="lucide:x" :aria-hidden="true" />
        </Button>
      </slot>
    </template>
    <slot name="trailing" :clear="clear" :model-value="modelValue" />
    <slot name="decrement" :clear="clear" :model-value="modelValue">
      <InputNumberDecrement v-bind="decrementProps">
        <Icon icon="lucide:minus" :aria-hidden="true" />
      </InputNumberDecrement>
    </slot>
    <slot name="increment" :clear="clear" :model-value="modelValue">
      <InputNumberIncrement v-bind="incrementProps">
        <Icon icon="lucide:plus" :aria-hidden="true" />
      </InputNumberIncrement>
    </slot>
  </InputNumberRoot>
</template>
