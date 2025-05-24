<script setup lang="ts">
import { computed, watch } from 'vue';
import { useVModel } from '../../composables';
import { isEqual, isNullish, isValueEqualOrExist } from '../../shared';
import { provideCheckboxRootContext, useCheckboxGroupRootContext } from './context';
import { getState, isIndeterminate } from './shared';
import type { CheckboxRootEmits, CheckboxRootProps } from './types';
import type { CheckedState } from './shared';

const props = withDefaults(defineProps<CheckboxRootProps>(), {
  as: 'button',
  disabled: false,
  required: false,
  value: 'on'
});

const emit = defineEmits<CheckboxRootEmits>();

// Try to get checkbox group context (optional)
let checkboxGroupContext: ReturnType<typeof useCheckboxGroupRootContext> | null = null;
try {
  checkboxGroupContext = useCheckboxGroupRootContext('CheckboxRoot');
} catch {
  // No context available, checkbox is standalone
  checkboxGroupContext = null;
}

const modelValue = useVModel(props, 'modelValue', emit, {
  defaultValue: props.defaultValue ?? false,
  passive: props.modelValue === undefined
});

const disabled = computed(() => checkboxGroupContext?.disabled.value || props.disabled);

const checkboxState = computed<CheckedState>(() => {
  if (!isNullish(checkboxGroupContext?.modelValue.value)) {
    return isValueEqualOrExist(checkboxGroupContext.modelValue.value, props.value);
  }
  return modelValue.value ?? false;
});

function handleClick() {
  if (!isNullish(checkboxGroupContext?.modelValue.value)) {
    const modelValueArray = [...(checkboxGroupContext.modelValue.value || [])];
    if (isValueEqualOrExist(modelValueArray, props.value)) {
      const index = modelValueArray.findIndex(i => isEqual(i, props.value));
      modelValueArray.splice(index, 1);
    } else {
      modelValueArray.push(props.value);
    }
    checkboxGroupContext.modelValue.value = modelValueArray;
  } else {
    modelValue.value = isIndeterminate(modelValue.value) ? true : !modelValue.value;
  }
}

const rootContext = provideCheckboxRootContext();

// Watch for changes to update context
watch(
  () => disabled.value,
  (newValue: boolean) => {
    rootContext.disabled.value = newValue;
  },
  { immediate: true }
);

watch(
  () => checkboxState.value,
  (newValue: CheckedState) => {
    rootContext.state.value = newValue;
  },
  { immediate: true }
);
</script>

<template>
  <button
    :id="id"
    :class="props.class"
    role="checkbox"
    type="button"
    :aria-checked="isIndeterminate(checkboxState) ? 'mixed' : checkboxState"
    :aria-required="required"
    :data-state="getState(checkboxState)"
    :data-disabled="disabled ? '' : undefined"
    :disabled="disabled"
    @click="handleClick"
    @keydown.enter.prevent="
      () => {
        // According to WAI ARIA, Checkboxes don't activate on enter keypress
      }
    "
  >
    <slot :model-value="modelValue" :state="checkboxState" />
  </button>
</template>
