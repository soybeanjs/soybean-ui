<script setup lang="ts">
import { computed } from 'vue';
import { useInputRootContext, useInputThemeContext } from './context';
import type { InputControlProps } from './types';

defineOptions({
  name: 'InputControl'
});

defineProps<InputControlProps>();

const { modelValue, id, type, placeholder, autoFocus, disabled, readonly } = useInputRootContext('InputControl');

const themeContext = useInputThemeContext();

const cls = computed(() => themeContext?.ui?.value?.control);

const onInput = (event: Event) => {
  modelValue.value = (event.target as HTMLInputElement).value;
};
</script>

<template>
  <input
    :id="id"
    :class="cls"
    :type="type"
    :value="modelValue"
    tabindex="0"
    :placeholder="placeholder"
    :autofocus="autoFocus"
    :disabled="disabled"
    :data-disabled="disabled ? '' : undefined"
    :readonly="readonly"
    :data-readonly="readonly ? '' : undefined"
    autocomplete="off"
    autocorrect="off"
    spellcheck="false"
    aria-roledescription="Input"
    :aria-valuenow="modelValue ?? undefined"
    @input="onInput"
  />
</template>
