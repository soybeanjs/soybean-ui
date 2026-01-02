<script setup lang="ts">
import { useInputRootContext, useInputUi } from './context';
import type { InputControlProps } from './types';

defineOptions({
  name: 'InputControl'
});

defineProps<InputControlProps>();

const { modelValue, id, autofocus, placeholder, disabled, readonly, maxlength, minlength, pattern } =
  useInputRootContext('InputControl');

const cls = useInputUi('control');

const onInput = (event: Event) => {
  modelValue.value = (event.target as HTMLInputElement).value;
};
</script>

<template>
  <input
    :id="id"
    :class="cls"
    :aria-disabled="disabled ?? undefined"
    aria-roledescription="Input"
    :aria-valuenow="modelValue ?? undefined"
    autocorrect="off"
    :autofocus="autofocus"
    :data-disabled="disabled ? '' : undefined"
    :data-readonly="readonly ? '' : undefined"
    :disabled="disabled"
    :maxlength="maxlength"
    :minlength="minlength"
    :pattern="pattern"
    :placeholder="placeholder"
    :readonly="readonly"
    spellcheck="false"
    tabindex="0"
    :value="modelValue"
    @input="onInput"
  />
</template>
