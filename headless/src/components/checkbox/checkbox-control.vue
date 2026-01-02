<script setup lang="ts">
import { computed, useAttrs, watchEffect } from 'vue';
import { useForwardElement } from '../../composables';
import { getAriaLabel, isIndeterminate, isNullish, isValueEqualOrExist } from '../../shared';
import { RovingFocusItem } from '../roving-focus';
import { useCheckboxGroupRootContext, useCheckboxRootContext, useCheckboxUi } from './context';
import type { CheckboxControlProps } from './types';

defineOptions({
  name: 'CheckboxControl'
});

const props = defineProps<CheckboxControlProps>();

const attrs = useAttrs();

const cls = useCheckboxUi('control');

const groupContext = useCheckboxGroupRootContext();

const { modelValue, value, disabled, state, ariaChecked, dataDisabled, dataState, required, initControlId } =
  useCheckboxRootContext('CheckboxControl');

const [controlElement, setControlElement] = useForwardElement();

const rovingFocus = computed(() => groupContext?.rovingFocus?.value);

const ariaLabel = computed(() => getAriaLabel(controlElement.value, props.id, attrs['aria-label'] as string));

const focusable = computed(() => (rovingFocus.value ? !disabled.value : undefined));

const onClick = () => {
  if (groupContext) {
    const modelValueArray = [...(groupContext.modelValue.value || [])];
    if (isValueEqualOrExist(modelValueArray, value.value)) {
      const index = modelValueArray.findIndex(i => i === value.value);
      modelValueArray.splice(index, 1);
    } else if (!isNullish(value.value)) {
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
    :id="id"
    :ref="setControlElement"
    :class="cls"
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
    @keydown.enter.prevent
    @click="onClick"
  >
    <slot :model-value="modelValue" :state="state" />
  </component>
</template>
