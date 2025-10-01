<script setup lang="ts">
import { computed, useAttrs } from 'vue';
import { InputControl, InputRoot, provideInputThemeContext } from '@headless';
import { useControllableState, useForwardElement, useOmitProps } from '@headless/composables';
import { mergeSlotVariants } from '@theme';
import { inputVariants } from '@variants/input';
import Icon from '../icon/icon.vue';
import type { InputEmits, InputProps } from './types';

defineOptions({
  name: 'SInput',
  inheritAttrs: false
});

const props = defineProps<InputProps>();

const emit = defineEmits<InputEmits>();

const [_, setInputElement] = useForwardElement(el => props.inputRef?.(el as HTMLInputElement));

const attrs = useAttrs();

const forwardedProps = useOmitProps(props, ['rootProps', 'modelValue', 'clearable'], attrs);

const inputValue = useControllableState(
  () => props.modelValue,
  value => {
    emit('update:modelValue', value as string);
  },
  props.defaultValue
);

const ui = computed(() => {
  const variants = inputVariants({
    size: props.size
  });

  return mergeSlotVariants(variants, props.ui);
});

const onClear = () => {
  inputValue.value = '';
};

provideInputThemeContext({
  ui
});
</script>

<template>
  <InputRoot v-bind="rootProps">
    <slot name="leading" />
    <InputControl v-bind="forwardedProps" :ref="setInputElement" v-model="inputValue" />
    <Icon v-if="clearable" icon="lucide:x" :class="ui.clearable" @click="onClear" />
    <slot name="trailing" />
  </InputRoot>
</template>
