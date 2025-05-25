<script setup lang="ts" generic="T">
import { computed } from 'vue';
import type { FormNameValueProps } from '../../types';
import { isArrayValue, parseFormValue } from '../../shared';
import VisuallyHiddenInputBubble from './visually-hidden-input-bubble.vue';
import type { VisuallyHiddenInputProps } from './types';

defineOptions({
  name: 'VisuallyHiddenInput',
  inheritAttrs: false
});

const props = withDefaults(defineProps<VisuallyHiddenInputProps<T>>(), {
  feature: 'fully-hidden',
  checked: undefined
});

const parsedValue = computed<FormNameValueProps[]>(() => {
  const { value, name } = props;

  return parseFormValue(name, value);
});

const isFormArrayEmptyAndRequired = computed(
  () => props.required && isArrayValue(props.value) && props.value.length === 0
);
</script>

<template>
  <!-- We render single input if it's required -->
  <VisuallyHiddenInputBubble
    v-if="isFormArrayEmptyAndRequired"
    :key="name"
    v-bind="{ ...props, ...$attrs }"
    :name="name"
    :value="value"
  />
  <template v-else>
    <VisuallyHiddenInputBubble
      v-for="parsed in parsedValue"
      :key="parsed.name"
      v-bind="{ ...props, ...$attrs }"
      :name="parsed.name"
      :value="parsed.value"
    />
  </template>
</template>
