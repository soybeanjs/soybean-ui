<script setup lang="ts" generic="T extends AcceptableValue = AcceptableValue">
import { computed } from 'vue';
import { useForwardElement } from '../../composables';
import { isFormControl, transformPropsToContext } from '../../shared';
import type { AcceptableValue } from '../../types';
import { Primitive } from '../primitive';
import { RovingFocusGroup } from '../roving-focus';
import type { RovingFocusGroupProps } from '../roving-focus/types';
import { VisuallyHiddenInput } from '../visually-hidden';
import { provideCheckboxGroupRootContext } from './context';
import type { CheckboxGroupRootEmits, CheckboxGroupRootProps } from './types';

defineOptions({
  name: 'CheckboxGroupRoot'
});

const props = withDefaults(defineProps<CheckboxGroupRootProps<T>>(), {
  rovingFocus: true
});

const emit = defineEmits<CheckboxGroupRootEmits<T>>();

provideCheckboxGroupRootContext({
  ...transformPropsToContext(props, ['modelValue', 'defaultValue', 'rovingFocus', 'disabled']),
  onUpdateModelValue: value => {
    emit('update:modelValue', value as NonNullable<T>[]);
  }
});

const [element, setElement] = useForwardElement();

const formControl = computed(() => isFormControl(element.value));

const rovingFocusProps = computed<RovingFocusGroupProps>(() => {
  const { rovingFocus, loop, dir, orientation } = props;

  return rovingFocus ? { loop, dir, orientation } : {};
});
</script>

<template>
  <Primitive
    :ref="setElement"
    :as="rovingFocus ? RovingFocusGroup : 'div'"
    v-bind="rovingFocusProps"
    :class="props.class"
  >
    <slot />

    <VisuallyHiddenInput v-if="formControl && name" :name="name" :value="modelValue" :required="required" />
  </Primitive>
</template>
