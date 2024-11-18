<script setup lang="ts">
import type { ComputedRef } from 'vue';
import { computed, ref } from 'vue';
import { useEventListener } from '@vueuse/core';
import isEqual from 'fast-deep-equal';
import { RovingFocusItem } from '../roving-focus';
import { createContext, useForwardExpose } from '../../composables';
import type { RadioProps } from './radio.vue';
import type { SelectEvent } from './utils';

import Radio from './radio.vue';
import { injectRadioGroupRootContext } from './radio-group-root.vue';

export interface RadioGroupItemProps extends Omit<RadioProps, 'checked'> {}
export type RadioGroupItemEmits = {
  select: [event: SelectEvent];
};

interface RadioGroupItemContext {
  disabled: ComputedRef<boolean>;
  checked: ComputedRef<boolean>;
}

export const [injectRadioGroupItemContext, provideRadiogroupItemContext] =
  createContext<RadioGroupItemContext>('RadioGroupItem');

defineOptions({
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

provideRadiogroupItemContext({ disabled, checked });

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
      <slot />
    </Radio>
  </RovingFocusItem>
</template>
