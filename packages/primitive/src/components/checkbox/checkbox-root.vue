<script setup lang="ts">
import { computed } from 'vue';
import type { Ref } from 'vue';
import { useVModel } from '@vueuse/core';
import { isEqual } from 'ohash';
import { useFormControl, useForwardExpose } from '../../composables';
import { isValueEqualOrExist } from '../../shared';
import { Primitive } from '../primitive';
import { RovingFocusItem } from '../roving-focus';
import { VisuallyHiddenInput } from '../visually-hidden';
import { injectCheckboxGroupRootContext, provideCheckboxRootContext } from './context';
import { getCheckedState, isIndeterminate } from './shared';
import type { CheckboxRootEmits, CheckboxRootPropsWithPrimitive, CheckedState } from './types';

defineOptions({
  name: 'CheckboxRoot',
  inheritAttrs: false
});

const props = withDefaults(defineProps<CheckboxRootPropsWithPrimitive>(), {
  modelValue: undefined,
  value: 'on',
  as: 'button'
});

const emit = defineEmits<CheckboxRootEmits>();

const modelValue = useVModel(props, 'modelValue', emit, {
  defaultValue: props.defaultValue ?? undefined,
  passive: (props.modelValue === undefined) as false
}) as Ref<CheckedState>;

const { forwardRef, currentElement } = useForwardExpose();
const checkboxGroupContext = injectCheckboxGroupRootContext(null);

const isFormControl = useFormControl(currentElement);

const ariaLabel = computed(() => {
  if (!props.id || !currentElement.value) {
    return undefined;
  }

  return (document.querySelector(`[for="${props.id}"]`) as HTMLLabelElement)?.textContent;
});

const tag = computed(() => (props.as === 'button' ? 'button' : undefined));

const disabled = computed(() => checkboxGroupContext?.disabled.value || props.disabled);

const checkboxState = computed<CheckedState>(() => {
  if (checkboxGroupContext?.modelValue.value) {
    return isValueEqualOrExist(checkboxGroupContext.modelValue.value, props.value);
  }

  return modelValue.value === 'indeterminate' ? 'indeterminate' : modelValue.value;
});

provideCheckboxRootContext({
  disabled,
  state: checkboxState
});

function handleClick() {
  if (checkboxGroupContext?.modelValue.value) {
    const modelValueArray = [...(checkboxGroupContext.modelValue.value || [])];
    if (isValueEqualOrExist(modelValueArray, props.value)) {
      const index = modelValueArray.findIndex(i => isEqual(i, props.value));
      modelValueArray.splice(index, 1);
    } else {
      modelValueArray.push(props.value);
    }
    checkboxGroupContext.updateModelValue(modelValueArray);
  } else {
    modelValue.value = isIndeterminate(modelValue.value) ? true : !modelValue.value;
  }
}
</script>

<template>
  <component
    v-bind="$attrs"
    :is="checkboxGroupContext?.rovingFocus.value ? RovingFocusItem : Primitive"
    :id="id"
    :ref="forwardRef"
    :class="props.class"
    role="checkbox"
    :as="as"
    :as-child="asChild"
    :type="tag"
    :aria-checked="isIndeterminate(checkboxState) ? 'mixed' : checkboxState"
    :aria-required="required"
    :aria-label="$attrs['aria-label'] || ariaLabel"
    :data-state="getCheckedState(checkboxState)"
    :data-disabled="disabled ? '' : undefined"
    :disabled="disabled"
    :focusable="checkboxGroupContext?.rovingFocus.value ? !disabled : undefined"
    @keydown.enter.prevent
    @click="handleClick"
  >
    <slot :model-value="modelValue" :state="checkboxState" />

    <VisuallyHiddenInput
      v-if="isFormControl && name && !checkboxGroupContext"
      type="checkbox"
      :checked="!!checkboxState"
      :name
      :value
      :disabled
      :required
    />
  </component>
</template>
