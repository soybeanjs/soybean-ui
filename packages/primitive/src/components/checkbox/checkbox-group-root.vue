<script setup lang="ts" generic="T extends AcceptableValue = AcceptableValue">
import type { Ref } from 'vue';
import { computed, toRefs } from 'vue';
import { useVModel } from '@vueuse/core';
import { useDirection, useFormControl, usePrimitiveElement } from '../../composables';
import type { AcceptableValue } from '../../types';
import { Primitive } from '../primitive';
import { RovingFocusGroup } from '../roving-focus';
import { VisuallyHiddenInput } from '../visually-hidden';
import { provideCheckboxGroupRootContext } from './context';
import type { CheckboxGroupRootPropsWithPrimitive, CheckboxRootEmits } from './types';

defineOptions({
  name: 'CheckboxGroupRoot'
});

const props = withDefaults(defineProps<CheckboxGroupRootPropsWithPrimitive<T>>(), {
  modelValue: undefined,
  rovingFocus: true
});

const emit = defineEmits<CheckboxRootEmits>();

const modelValue = useVModel(props, 'modelValue', emit, {
  defaultValue: props.defaultValue ?? [],
  passive: (props.modelValue === undefined) as false
}) as Ref<T[]>;

const { primitiveElement, currentElement } = usePrimitiveElement();
const isFormControl = useFormControl(currentElement);

const { disabled, dir: propDir, rovingFocus } = toRefs(props);
const dir = useDirection(propDir);

const rovingFocusProps = computed(() => {
  return props.rovingFocus ? { loop: props.loop, dir: dir.value, orientation: props.orientation } : {};
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
    v-bind="rovingFocusProps"
    ref="primitiveElement"
    :class="props.class"
    :as="as"
    :as-child="asChild"
  >
    <slot />
    <VisuallyHiddenInput v-if="isFormControl && name" :name :value="modelValue" :required />
  </component>
</template>
