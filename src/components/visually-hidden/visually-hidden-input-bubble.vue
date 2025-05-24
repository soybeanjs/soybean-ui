<script setup lang="ts" generic="T">
import { computed, watch } from 'vue';
import { useForwardElement } from '../../composables';
import VisuallyHidden from './visually-hidden.vue';
import type { VisuallyHiddenInputBubbleProps } from './types';

defineOptions({
  name: 'VisuallyHiddenInputBubble'
});

const props = withDefaults(defineProps<VisuallyHiddenInputBubbleProps<T>>(), {
  feature: 'fully-hidden',
  checked: undefined
});

const [element, setElement] = useForwardElement<HTMLInputElement>();

const valueState = computed(() => props.checked ?? props.value);

watch(valueState, (newValue, prevValue) => {
  const input = element.value;

  if (!input) return;
  if (newValue === prevValue) return;

  const inputProto = window.HTMLInputElement.prototype;
  const descriptor = Object.getOwnPropertyDescriptor(inputProto, 'value');
  const setValue = descriptor?.set;
  if (!setValue) return;

  const inputEvent = new Event('input', { bubbles: true });
  const changeEvent = new Event('change', { bubbles: true });
  setValue.call(input, newValue);
  input.dispatchEvent(inputEvent);
  input.dispatchEvent(changeEvent);
});
</script>

<template>
  <VisuallyHidden :ref="setElement" v-bind="props" as="input" />
</template>
