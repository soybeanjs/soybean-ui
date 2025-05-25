<script setup lang="ts">
import { computed, useAttrs } from 'vue';
import { useControllableState, useForwardElement } from '../../composables';
import { isEqual, isFormControl, isNullish, isValueEqualOrExist } from '../../shared';
import type { CheckedState } from '../../types';
import { Primitive } from '../primitive';
import { RovingFocusItem } from '../roving-focus';
import { VisuallyHiddenInput } from '../visually-hidden';
import { provideCheckboxRootContext, useCheckboxGroupRootContext } from './context';
import { isIndeterminate } from './shared';
import type { CheckboxRootEmits, CheckboxRootProps } from './types';

defineOptions({
  name: 'CheckboxRoot'
});

const props = withDefaults(defineProps<CheckboxRootProps>(), {
  modelValue: undefined,
  value: 'on',
  as: 'button'
});

const emit = defineEmits<CheckboxRootEmits>();

const attrs = useAttrs();

const groupContext = useCheckboxGroupRootContext();

const [element, setElement] = useForwardElement();

const modelValue = useControllableState(
  () => props.modelValue,
  value => {
    if (!isNullish(value)) {
      emit('update:modelValue', value);
    }
  },
  props.defaultValue
);

const rovingFocus = computed(() => groupContext?.rovingFocus?.value);

const disabled = computed(() => groupContext?.disabled?.value || props.disabled);

const formControl = computed(() => isFormControl(element.value));

const checkboxState = computed<CheckedState>(() => {
  if (!isNullish(groupContext?.modelValue?.value)) {
    return isValueEqualOrExist(groupContext.modelValue.value, props.value);
  }

  if (isNullish(modelValue.value)) {
    return false;
  }

  return modelValue.value === 'indeterminate' ? 'indeterminate' : modelValue.value;
});

const ariaLabel = computed(() => {
  if (attrs['aria-label']) {
    return attrs['aria-label'];
  }

  if (!props.id || !element.value) {
    return undefined;
  }

  return (document.querySelector(`[for="${props.id}"]`) as HTMLLabelElement)?.textContent;
});

const ariaChecked = computed(() => {
  if (isIndeterminate(checkboxState.value)) {
    return 'mixed';
  }
  return checkboxState.value;
});

const focusable = computed(() => (rovingFocus.value ? !disabled.value : undefined));

const onClick = () => {
  if (!isNullish(groupContext?.modelValue?.value)) {
    const modelValueArray = [...(groupContext.modelValue.value || [])];
    if (isValueEqualOrExist(modelValueArray, props.value)) {
      const index = modelValueArray.findIndex(i => isEqual(i, props.value));
      modelValueArray.splice(index, 1);
    } else {
      modelValueArray.push(props.value);
    }
    groupContext.modelValue.value = modelValueArray;
  } else {
    modelValue.value = isIndeterminate(modelValue.value) ? true : !modelValue.value;
  }
};

const { dataDisabled, dataState } = provideCheckboxRootContext({
  disabled,
  state: checkboxState
});
</script>

<template>
  <Primitive
    :id="id"
    :ref="setElement"
    :class="props.class"
    :as="rovingFocus ? RovingFocusItem : 'button'"
    role="checkbox"
    type="button"
    :disabled="disabled"
    :aria-checked="ariaChecked"
    :data-disabled="dataDisabled"
    :aria-labe="ariaLabel"
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
    <slot :model-value="modelValue" :state="checkboxState" />

    <VisuallyHiddenInput
      v-if="formControl && name && !groupContext"
      type="checkbox"
      :checked="!!checkboxState"
      :name="name"
      :value="value"
      :disabled="disabled"
      :required="required"
    />
  </Primitive>
</template>
