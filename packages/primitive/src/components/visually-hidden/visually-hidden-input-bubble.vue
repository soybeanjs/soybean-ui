<script setup lang="ts" generic="T">
import { computed, watch } from 'vue';
import { usePrimitiveElement } from '../../composables';
import VisuallyHidden from './visually-hidden.vue';
import type { VisuallyHiddenInputBubbleProps } from './types';

defineOptions({
  name: 'VisuallyHiddenInputBubble',
  inheritAttrs: false
});

const props = withDefaults(defineProps<VisuallyHiddenInputBubbleProps<T>>(), {
  feature: 'fully-hidden',
  checked: undefined
});

const { primitiveElement, currentElement } = usePrimitiveElement();

const valueState = computed(() => props.checked ?? props.value);

function handleOnStateChange(cur: T | boolean, prev: T | boolean) {
  if (!currentElement.value) return;

  const input = currentElement.value as HTMLInputElement;
  const inputProto = window.HTMLInputElement.prototype;
  const descriptor = Object.getOwnPropertyDescriptor(inputProto, 'value') as PropertyDescriptor;
  const setValue = descriptor.set;
  if (setValue && cur !== prev) {
    const inputEvent = new Event('input', { bubbles: true });
    const changeEvent = new Event('change', { bubbles: true });
    setValue.call(input, cur);
    input.dispatchEvent(inputEvent);
    input.dispatchEvent(changeEvent);
  }
}

watch(valueState, (cur, prev) => {
  handleOnStateChange(cur, prev);
});
</script>

<template>
  <VisuallyHidden
    ref="primitiveElement"
    v-bind="$attrs"
    :class="props.class"
    as="input"
    :as-child="asChild"
    :feature="feature"
  />
</template>
