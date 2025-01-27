<script setup lang="ts">
import { computed, ref } from 'vue';
import { useEventListener } from '@vueuse/core';
import { isEqual } from 'ohash';
import { useForwardExpose } from '../../composables';
import { RovingFocusItem } from '../roving-focus';
import { injectRadioGroupRootContext, provideRadioGroupItemContext } from './context';
import Radio from './radio.vue';
import type { RadioGroupItemEmits, RadioGroupItemProps } from './types';

defineOptions({
  name: 'RadioGroupItem',
  inheritAttrs: false
});

const props = withDefaults(defineProps<RadioGroupItemProps>(), {
  disabled: false,
  as: 'button'
});
const emit = defineEmits<RadioGroupItemEmits>();

const { forwardRef, currentElement } = useForwardExpose();

const rootContext = injectRadioGroupRootContext();

const disabled = computed(() => rootContext.disabled.value || props.disabled);
const required = computed(() => rootContext.required.value || props.required);
const checked = computed(() => isEqual(rootContext.modelValue?.value, props.value));

provideRadioGroupItemContext({ disabled, checked });

const isArrowKeyPressed = ref(false);
const ARROW_KEYS = ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'];

useEventListener('keydown', event => {
  if (ARROW_KEYS.includes(event.key)) isArrowKeyPressed.value = true;
});
useEventListener('keyup', () => {
  isArrowKeyPressed.value = false;
});

function handleFocus() {
  setTimeout(() => {
    /**
     * Our `RovingFocusGroup` will focus the radio when navigating with arrow keys and we need to 'check' it in that
     * case. We click it to 'check' it (instead of updating `context.value`) so that the radio change event fires.
     */
    if (isArrowKeyPressed.value) currentElement.value?.click();
  }, 0);
}
</script>

<template>
  <RovingFocusItem :checked="checked" :disabled="disabled" as-child :focusable="!disabled" :active="checked">
    <Radio
      v-bind="{ ...$attrs, ...props }"
      :ref="forwardRef"
      :checked="checked"
      :required="required"
      :disabled="disabled"
      @update:checked="rootContext.changeModelValue(value)"
      @select="emit('select', $event)"
      @keydown.enter.prevent
      @focus="handleFocus"
    >
      <slot :checked="checked" :required="required" :disabled="disabled" />
    </Radio>
  </RovingFocusItem>
</template>
