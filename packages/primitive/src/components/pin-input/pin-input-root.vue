<script setup lang="ts">
import { computed, ref, toRefs, watch } from 'vue';
import type { Ref } from 'vue';
import { useVModel } from '@vueuse/core';
import { VisuallyHiddenInput } from '../visually-hidden';
import { Primitive } from '../primitive';
import { useDirection, useForwardExpose } from '../../composables';
import { providePinInputRootContext } from './context';
import type { PinInputRootEmits, PinInputRootPropsWithPrimitive } from './types';

defineOptions({
  name: 'PinInputRoot',
  inheritAttrs: false
});

const props = withDefaults(defineProps<PinInputRootPropsWithPrimitive>(), {
  placeholder: '',
  type: 'text'
});
const emit = defineEmits<PinInputRootEmits>();

const { mask, otp, placeholder, type, disabled, dir: propDir } = toRefs(props);
const { forwardRef } = useForwardExpose();
const dir = useDirection(propDir);

const modelValue = useVModel(props, 'modelValue', emit, {
  defaultValue: props.defaultValue ?? [],
  passive: (props.modelValue === undefined) as false
}) as Ref<string[]>;

const inputElements = ref<Set<HTMLInputElement>>(new Set());
function onInputElementChange(el: HTMLInputElement) {
  inputElements.value.add(el);
}

const isCompleted = computed(() => {
  const modelValues = modelValue.value.filter(i => Boolean(i));
  return modelValues.length === inputElements.value.size;
});

watch(
  modelValue,
  () => {
    if (isCompleted.value) emit('complete', modelValue.value);
  },
  { deep: true }
);

providePinInputRootContext({
  modelValue,
  mask,
  otp,
  placeholder,
  type,
  dir,
  disabled,
  isCompleted,
  inputElements,
  onInputElementChange
});
</script>

<template>
  <Primitive
    v-bind="$attrs"
    :ref="forwardRef"
    :class="props.class"
    :as="as"
    :as-child="asChild"
    :dir="dir"
    :data-complete="isCompleted ? '' : undefined"
    :data-disabled="disabled ? '' : undefined"
  >
    <slot :model-value="modelValue" />

    <VisuallyHiddenInput
      :id="id"
      as="input"
      feature="focusable"
      tabindex="-1"
      :value="modelValue.join('')"
      :name="name ?? ''"
      :disabled="disabled"
      :required="required"
      @focus="Array.from(inputElements)?.[0]?.focus()"
    />
  </Primitive>
</template>
