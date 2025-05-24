<script setup lang="ts" generic="T extends AcceptableValue = AcceptableValue">
import { watch } from 'vue';
import { useDirection, useVModel } from '../../composables';
import type { AcceptableValue } from '../../types';
import { provideCheckboxGroupRootContext } from './context';
import type { CheckboxGroupRootEmits, CheckboxGroupRootProps } from './types';

const props = withDefaults(defineProps<CheckboxGroupRootProps<T>>(), {
  as: 'div',
  disabled: false,
  required: false,
  rovingFocus: true,
  orientation: 'vertical',
  loop: false
});

const emit = defineEmits<CheckboxGroupRootEmits<T>>();

const modelValue = useVModel(props, 'modelValue', emit, {
  defaultValue: props.defaultValue ?? [],
  passive: props.modelValue === undefined
});

const direction = useDirection(() => props.dir);

const groupContext = provideCheckboxGroupRootContext();

// Update context values
watch(
  () => modelValue.value,
  newValue => {
    groupContext.modelValue.value = newValue as AcceptableValue[];
  },
  { immediate: true }
);

watch(
  () => props.rovingFocus,
  newValue => {
    groupContext.rovingFocus.value = newValue;
  },
  { immediate: true }
);

watch(
  () => props.disabled,
  newValue => {
    groupContext.disabled.value = newValue;
  },
  { immediate: true }
);

watch(
  () => direction.value,
  newValue => {
    groupContext.dir.value = newValue;
  },
  { immediate: true }
);

watch(
  () => props.orientation,
  newValue => {
    groupContext.orientation.value = newValue;
  },
  { immediate: true }
);

watch(
  () => props.loop,
  newValue => {
    groupContext.loop.value = newValue;
  },
  { immediate: true }
);
</script>

<template>
  <div :class="props.class" role="group" :aria-required="required" :data-disabled="disabled ? '' : undefined">
    <slot :model-value="modelValue" />
  </div>
</template>
