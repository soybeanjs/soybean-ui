<script lang="ts">
import { type Ref, computed, toRefs } from 'vue';
import { useVModel } from '@vueuse/core';
import type { RovingFocusGroupProps } from '../roving-focus';
import { Primitive, usePrimitiveElement } from '../primitive';
</script>

<script setup lang="ts" generic="T extends AcceptableValue = AcceptableValue">
import { RovingFocusGroup } from '../roving-focus';
import { VisuallyHiddenInput } from '../visually-hidden';
import type { AcceptableValue, FormFieldProps } from '../../_shared/types';
import { createContext, useDirection, useFormControl } from '../../_shared';

export interface CheckboxGroupRootProps<T = AcceptableValue>
  extends Pick<RovingFocusGroupProps, 'as' | 'asChild' | 'dir' | 'orientation' | 'loop'>,
    FormFieldProps {
  /** The value of the checkbox when it is initially rendered. Use when you do not need to control its value. */
  defaultValue?: T[];
  /** The controlled value of the checkbox. Can be bound with v-model. */
  modelValue?: T[];
  /** When `false`, navigating through the items using arrow keys will be disabled. */
  rovingFocus?: boolean;
  /** When `true`, prevents the user from interacting with the checkboxes */
  disabled?: boolean;
}

export type CheckboxGroupRootEmits<T = AcceptableValue> = {
  /** Event handler called when the value of the checkbox changes. */
  'update:modelValue': [value: T[]];
};

interface CheckboxGroupRootContext {
  modelValue: Ref<AcceptableValue[]>;
  rovingFocus: Ref<boolean>;
  disabled: Ref<boolean>;
}

export const [injectCheckboxGroupRootContext, provideCheckboxGroupRootContext] =
  createContext<CheckboxGroupRootContext>('CheckboxGroupRoot');

const props = withDefaults(defineProps<CheckboxGroupRootProps<T>>(), {
  rovingFocus: true
});
const emits = defineEmits<CheckboxGroupRootEmits<T>>();

const { disabled, rovingFocus, dir: propDir } = toRefs(props);
const dir = useDirection(propDir);

const { primitiveElement, currentElement } = usePrimitiveElement();
const isFormControl = useFormControl(currentElement);

const modelValue = useVModel(props, 'modelValue', emits, {
  defaultValue: props.defaultValue ?? [],
  passive: (props.modelValue === undefined) as false
}) as Ref<T[]>;

const rovingFocusProps = computed(() => {
  return rovingFocus.value ? { loop: props.loop, dir: dir.value, orientation: props.orientation } : {};
});

provideCheckboxGroupRootContext({
  modelValue,
  rovingFocus,
  disabled
});
</script>

<template>
  <component
    :is="rovingFocus ? RovingFocusGroup : Primitive"
    ref="primitiveElement"
    :as
    :as-child
    v-bind="rovingFocusProps"
  >
    <slot />

    <VisuallyHiddenInput v-if="isFormControl && name" :name="name" :value="modelValue" :required="required" />
  </component>
</template>
