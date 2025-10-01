<script setup lang="ts">
import { computed } from 'vue';
import { useControllableState, useOmitProps } from '../../composables';
import { useInputThemeContext } from './context';
import type { InputControlEmits, InputControlProps } from './types';

defineOptions({
  name: 'InputControl'
});

const props = withDefaults(defineProps<InputControlProps>(), {
  modelValue: undefined
});

const emit = defineEmits<InputControlEmits>();

const forwardedProps = useOmitProps(props, ['modelValue', 'defaultValue']);

const themeContext = useInputThemeContext();

const cls = computed(() => themeContext?.ui?.value?.control);

const inputValue = useControllableState(
  () => props.modelValue,
  value => {
    emit('update:modelValue', value as string);
  },
  props.defaultValue
);

const onInput = (event: Event) => {
  inputValue.value = (event.target as HTMLInputElement).value;
};
</script>

<template>
  <input v-bind="forwardedProps" :class="cls" :value="inputValue" @input="onInput" />
</template>
