<script setup lang="ts">
import { computed, toRef } from 'vue';
import type { Ref } from 'vue';
import Primitive from '../primitive/primitive';
import { VisuallyHiddenInput } from '../visually-hidden';
import { useFormControl, useForwardExpose } from '../../composables';
import { provideSwitchRootContext } from './context';
import type { SwitchRootPropsWithPrimitive } from './types';

defineOptions({
  name: 'SwitchRoot',
  inheritAttrs: false
});

const {
  class: className,
  as = 'button',
  value = 'on',
  id,
  ...delegatedProps
} = defineProps<SwitchRootPropsWithPrimitive>();

const modelValue = defineModel<boolean>('modelValue');

const { forwardRef, currentElement } = useForwardExpose();
const isFormControl = useFormControl(currentElement);

const disabled = toRef(() => delegatedProps.disabled);

function toggleCheck() {
  if (disabled.value) return;

  modelValue.value = !modelValue.value;
}

const ariaLabel = computed(() => {
  if (!id || !currentElement.value) {
    return undefined;
  }

  return (document.querySelector(`[for="${id}"]`) as HTMLLabelElement)?.textContent;
});

const tag = computed(() => (as === 'button' ? 'button' : undefined));

provideSwitchRootContext({
  modelValue: modelValue as Ref<boolean>,
  disabled
});
</script>

<template>
  <Primitive
    v-bind="$attrs"
    :id="id"
    :ref="forwardRef"
    role="switch"
    :class="className"
    :type="tag"
    :as="as"
    :as-child="as === 'button'"
    :value="value"
    :aria-label="$attrs['aria-label'] || ariaLabel"
    :aria-checked="modelValue"
    :aria-required="required"
    :data-state="modelValue ? 'checked' : 'unchecked'"
    :data-disabled="disabled ? '' : undefined"
    :disabled
    @click="toggleCheck"
    @keydown.enter.prevent="toggleCheck"
  >
    <slot :model-value="modelValue" />

    <VisuallyHiddenInput
      v-if="isFormControl && name"
      type="checkbox"
      :name
      :disabled
      :required
      :value
      :checked="!!modelValue"
    />
  </Primitive>
</template>
