<script setup lang="ts" generic="T extends DefinedValue = DefinedValue">
import { computed } from 'vue';
import { useControllableState, useForwardElement, useOmitProps } from '../../composables';
import { isFormControl, transformPropsToContext } from '../../shared';
import type { DefinedValue } from '../../types';
import { RovingFocusGroup } from '../roving-focus';
import type { RovingFocusGroupProps } from '../roving-focus/types';
import { VisuallyHiddenInput } from '../visually-hidden';
import { provideCheckboxGroupRootContext } from './context';
import type { CheckboxGroupRootEmits, CheckboxGroupRootProps } from './types';

defineOptions({
  name: 'CheckboxGroupRoot'
});

const props = withDefaults(defineProps<CheckboxGroupRootProps<T>>(), {
  modelValue: undefined,
  rovingFocus: true
});

const emit = defineEmits<CheckboxGroupRootEmits<T>>();

const rovingFocusProps = computed<RovingFocusGroupProps>(() => {
  const { rovingFocus, loop, dir, orientation } = props;

  return rovingFocus ? { loop, dir, orientation } : {};
});

const forwardedProps = useOmitProps(
  props,
  ['modelValue', 'defaultValue', 'rovingFocus', 'disabled', 'loop', 'dir', 'orientation', 'name', 'required'],
  rovingFocusProps
);

const modelValue = useControllableState(
  () => props.modelValue,
  value => {
    emit('update:modelValue', value ?? []);
  },
  props.defaultValue
);

provideCheckboxGroupRootContext({
  ...transformPropsToContext(props, ['modelValue', 'defaultValue', 'rovingFocus', 'disabled']),
  modelValue
});

const [groupElement, setGroupElement] = useForwardElement();

const formControl = computed(() => isFormControl(groupElement.value));
</script>

<template>
  <component :is="rovingFocus ? RovingFocusGroup : 'div'" v-bind="forwardedProps" :ref="setGroupElement" as="div">
    <slot />
    <VisuallyHiddenInput v-if="formControl && name" :name="name" :value="modelValue" :required="required" />
  </component>
</template>
