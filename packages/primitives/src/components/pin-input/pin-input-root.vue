<script setup lang="ts" generic="T extends PinInputType = 'text'">
import { computed, ref, toRefs, watch } from 'vue';
import type { Ref } from 'vue';
import { useVModel } from '@vueuse/core';
import { useDirection, useForwardExpose } from '../../composables';
import { Primitive } from '../primitive';
import { VisuallyHiddenInput } from '../visually-hidden';
import { providePinInputRootContext } from './context';
import type { PinInputRootEmits, PinInputRootPropsWithPrimitive, PinInputType, PinInputValue } from './types';

defineOptions({
  name: 'PinInputRoot',
  inheritAttrs: false
});

const props = withDefaults(defineProps<PinInputRootPropsWithPrimitive<T>>(), {
  placeholder: '',
  type: 'text' as any
});
const emit = defineEmits<PinInputRootEmits<T>>();

const { mask, otp, placeholder, type, disabled, dir: propDir } = toRefs(props);
const { forwardRef } = useForwardExpose();
const dir = useDirection(propDir);

const modelValue = useVModel(props, 'modelValue', emit, {
  defaultValue: props.defaultValue ?? ([] as any),
  passive: (props.modelValue === undefined) as false
}) as Ref<PinInputValue<T>>;

const currentModelValue = computed(() => (Array.isArray(modelValue.value) ? [...modelValue.value] : []));

const inputElements = ref<Set<HTMLInputElement>>(new Set());
function onInputElementChange(el: HTMLInputElement) {
  inputElements.value.add(el);
}

const isNumericMode = computed(() => props.type === 'number');
const isCompleted = computed(() => {
  const modelValues = currentModelValue.value.filter(i => Boolean(i) || (isNumericMode.value && i === 0));
  return modelValues.length === inputElements.value.size;
});

watch(
  modelValue,
  () => {
    if (isCompleted.value) {
      emit('complete', modelValue.value);
    }
  },
  { deep: true }
);

providePinInputRootContext({
  // @ts-expect-error ignore type
  modelValue,
  // @ts-expect-error ignore type
  currentModelValue,
  mask,
  otp,
  placeholder,
  type,
  dir,
  disabled,
  isCompleted,
  inputElements,
  isNumericMode,
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
      :value="currentModelValue.join('')"
      :name="name ?? ''"
      :disabled="disabled"
      :required="required"
      @focus="Array.from(inputElements)?.[0]?.focus()"
    />
  </Primitive>
</template>
