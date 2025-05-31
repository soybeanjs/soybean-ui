<script setup lang="ts">
import { computed, useAttrs, watchEffect } from 'vue';
import { useForwardElement } from '../../composables';
import { getAriaLabel, isEqual, isNullish, isValueEqualOrExist } from '../../shared';
import { RovingFocusItem } from '../roving-focus';
import { useCheckboxGroupRootContext, useCheckboxRootContext } from './context';
import { isIndeterminate } from './shared';
import type { CheckboxControlProps } from './types';

defineOptions({
  name: 'CheckboxControl'
});

const props = defineProps<CheckboxControlProps>();

const attrs = useAttrs();

const groupContext = useCheckboxGroupRootContext();

const { modelValue, value, disabled, state, ariaChecked, dataDisabled, dataState, required, initControlId } =
  useCheckboxRootContext('CheckboxControl');

const [controlElement, setControlElement] = useForwardElement();

const rovingFocus = computed(() => groupContext?.rovingFocus?.value);

const ariaLabel = computed(() => getAriaLabel(controlElement.value, props.id, attrs['aria-label'] as string));

const focusable = computed(() => (rovingFocus.value ? !disabled.value : undefined));

const onClick = () => {
  if (!isNullish(groupContext?.modelValue?.value)) {
    const modelValueArray = [...(groupContext.modelValue.value || [])];
    if (isValueEqualOrExist(modelValueArray, value.value)) {
      const index = modelValueArray.findIndex(i => isEqual(i, value.value));
      modelValueArray.splice(index, 1);
    } else {
      modelValueArray.push(value.value);
    }
    groupContext.modelValue.value = modelValueArray;
  } else {
    modelValue.value = isIndeterminate(modelValue.value) ? true : !modelValue.value;
  }
};

watchEffect(() => {
  if (props.id) {
    initControlId(props.id);
  }
});
</script>

<template>
  <component
    :is="rovingFocus ? RovingFocusItem : 'button'"
    v-bind="props"
    :ref="setControlElement"
    as="button"
    role="checkbox"
    type="button"
    :disabled="disabled"
    :aria-checked="ariaChecked"
    :data-disabled="dataDisabled"
    :aria-label="ariaLabel"
    :aria-required="required"
    :data-state="dataState"
    :focusable="focusable"
    @keydown.enter.prevent="
      () => {
        // According to WAI ARIA, Checkboxes don't activate on enter keypress
      }
    "
    @click="onClick"
  >
    <slot :model-value="modelValue" :state="state" />
  </component>
</template>
