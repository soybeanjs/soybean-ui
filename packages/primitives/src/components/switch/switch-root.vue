<script setup lang="ts">
import { computed, toRef } from 'vue';
import type { Ref } from 'vue';
import { useVModel } from '@vueuse/core';
import { useFormControl, useForwardExpose } from '../../composables';
import { Primitive } from '../primitive';
import { VisuallyHiddenInput } from '../visually-hidden';
import { provideSwitchRootContext } from './context';
import type { SwitchRootEmits, SwitchRootPropsWithPrimitive } from './types';

defineOptions({
  name: 'SwitchRoot',
  inheritAttrs: false
});

const props = withDefaults(defineProps<SwitchRootPropsWithPrimitive>(), {
  as: 'button',
  modelValue: undefined,
  value: 'on'
});

const emit = defineEmits<SwitchRootEmits>();

const modelValue = useVModel(props, 'modelValue', emit, {
  defaultValue: props.defaultValue,
  passive: (props.modelValue === undefined) as false
}) as Ref<boolean>;

const { forwardRef, currentElement } = useForwardExpose();
const isFormControl = useFormControl(currentElement);

const disabled = toRef(() => props.disabled);

function toggleCheck() {
  if (disabled.value) return;

  modelValue.value = !modelValue.value;
}

const ariaLabel = computed(() => {
  if (!props.id || !currentElement.value) {
    return undefined;
  }

  return (document.querySelector(`[for="${props.id}"]`) as HTMLLabelElement)?.textContent;
});

const tag = computed(() => (props.as === 'button' ? 'button' : undefined));

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
    :class="props.class"
    :as="as"
    :as-child="asChild"
    :aria-checked="modelValue"
    :aria-label="$attrs['aria-label'] || ariaLabel"
    :aria-required="required"
    :data-disabled="disabled ? '' : undefined"
    :data-state="modelValue ? 'checked' : 'unchecked'"
    :disabled="disabled"
    role="switch"
    :type="tag"
    :value="value"
    @click="toggleCheck"
    @keydown.enter.prevent="toggleCheck"
  >
    <slot :model-value="modelValue" />
    <VisuallyHiddenInput
      v-if="isFormControl && name"
      type="checkbox"
      :name="name"
      :disabled="disabled"
      :required="required"
      :value="value"
      :checked="!!modelValue"
    />
  </Primitive>
</template>
