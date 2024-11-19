<script setup lang="ts" generic="T extends AcceptableValue = AcceptableValue">
import { computed, toRef, toRefs } from 'vue';
import { useDirection, useFormControl, usePrimitiveElement } from '../../composables';
import type { AcceptableValue } from '../../types';
import { Primitive } from '../primitive';
import { RovingFocusGroup } from '../roving-focus';
import { VisuallyHiddenInput } from '../visually-hidden';
import type { CheckboxGroupRootPropsWithPrimitive } from './types';
import { provideCheckboxGroupRootContext } from './context';

defineOptions({
  name: 'CheckboxGroupRoot'
});

const {
  class: className,
  rovingFocus = true,
  defaultValue,
  ...delegatedProps
} = defineProps<CheckboxGroupRootPropsWithPrimitive<T>>();

const modelValue = defineModel<T[]>('modelValue', {
  default: defaultValue
});

const { primitiveElement, currentElement } = usePrimitiveElement();
const isFormControl = useFormControl(currentElement);

const { disabled, dir: propDir } = toRefs(delegatedProps);
const dir = useDirection(propDir);

const rovingFocusProps = computed(() => {
  return rovingFocus ? { loop: delegatedProps.loop, dir: dir.value, orientation: delegatedProps.orientation } : {};
});

provideCheckboxGroupRootContext({
  modelValue,
  rovingFocus: toRef(rovingFocus),
  disabled
});
</script>

<template>
  <component
    :is="rovingFocus ? RovingFocusGroup : Primitive"
    v-bind="rovingFocusProps"
    ref="primitiveElement"
    :class="className"
    :as
    :as-child
  >
    <slot />

    <VisuallyHiddenInput v-if="isFormControl && name" :name :value="modelValue" :required />
  </component>
</template>
