<script setup lang="ts" generic="T">
import { computed } from 'vue';
import { isNullish } from '../../shared';
import VisuallyHiddenInputBubble from './visually-hidden-input-bubble.vue';
import type { VisuallyHiddenInputBubbleProps } from './types';

defineOptions({
  name: 'VisuallyHiddenInput',
  inheritAttrs: false
});

const props = defineProps<VisuallyHiddenInputBubbleProps<T>>();

const isFormArrayEmptyAndRequired = computed(
  () => typeof props.value === 'object' && Array.isArray(props.value) && props.value.length === 0 && props.required
);

const parsedValue = computed(() => {
  // if primitive value
  if (
    typeof props.value === 'string' ||
    typeof props.value === 'number' ||
    typeof props.value === 'boolean' ||
    isNullish(props.value)
  ) {
    return [{ name: props.name, value: props.value }];
  }

  // if array value
  else if (typeof props.value === 'object' && Array.isArray(props.value)) {
    return props.value.flatMap((obj, index) => {
      // if item in array is object
      if (typeof obj === 'object')
        return Object.entries(obj).map(([key, value]) => ({ name: `[${props.name}][${index}][${key}]`, value }));
      // if item in array is not object, may be primitive
      return { name: `[${props.name}][${index}]`, value: obj };
    });
  }

  // if object value
  else if (props.value !== null && typeof props.value === 'object' && !Array.isArray(props.value)) {
    return Object.entries(props.value as object).map(([key, value]) => ({ name: `[${props.name}][${key}]`, value }));
  }

  return [];
});
</script>

<template>
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
