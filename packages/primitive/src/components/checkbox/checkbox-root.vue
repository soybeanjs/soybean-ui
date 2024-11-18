<script setup lang="ts">
import { computed } from 'vue';
import isEqual from 'fast-deep-equal';
import { useFormControl, useForwardExpose } from '../../composables';
import { isValueEqualOrExist } from '../../shared';
import Primitive from '../primitive/primitive';
import { RovingFocusItem } from '../roving-focus';
import { VisuallyHiddenInput } from '../visually-hidden';
import { injectCheckboxGroupRootContext, provideCheckboxRootContext } from './context';
import { getCheckedState, isIndeterminate } from './shared';
import type { CheckboxRootPropsWithPrimitive, CheckedState } from './types';

defineOptions({
  name: 'CheckboxRoot',
  inheritAttrs: false
});

const {
  class: className,
  as = 'button',
  defaultValue = false,
  value = 'on',
  id,
  ...delegatedProps
} = defineProps<CheckboxRootPropsWithPrimitive>();

const modelValue = defineModel<CheckedState>('modelValue', { default: defaultValue });

const { forwardRef, currentElement } = useForwardExpose();
const checkboxGroupContext = injectCheckboxGroupRootContext(null);

const isFormControl = useFormControl(currentElement);

const ariaLabel = computed(() => {
  if (!id || !currentElement.value) {
    return undefined;
  }

  return (document.querySelector(`[for="${id}"]`) as HTMLLabelElement)?.textContent;
});

const tag = computed(() => (as === 'button' ? 'button' : undefined));

const disabled = computed(() => checkboxGroupContext?.disabled.value || delegatedProps.disabled);

const checkboxState = computed<CheckedState>(() => {
  if (checkboxGroupContext?.modelValue.value) {
    return isValueEqualOrExist(checkboxGroupContext.modelValue.value, value);
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
    if (isValueEqualOrExist(modelValueArray, value)) {
      const index = modelValueArray.findIndex(i => isEqual(i, value));
      modelValueArray.splice(index, 1);
    } else {
      modelValueArray.push(value);
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
    :class="className"
    role="checkbox"
    :as
    :as-child
    :type="tag"
    :aria-checked="isIndeterminate(checkboxState) ? 'mixed' : checkboxState"
    :aria-required="required"
    :aria-label="$attrs['aria-label'] || ariaLabel"
    :data-state="getCheckedState(checkboxState)"
    :data-disabled="disabled ? '' : undefined"
    :disabled="disabled"
    :focusable="checkboxGroupContext?.rovingFocus.value ? !disabled : undefined"
    @keydown.enter.prevent="
      () => {
        // According to WAI ARIA, Checkboxes don't activate on enter keypress
      }
    "
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
