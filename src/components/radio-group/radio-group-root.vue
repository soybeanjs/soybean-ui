<script setup lang="ts" generic="T extends AcceptableValue">
import { computed, useTemplateRef } from 'vue';
import { isFormControl, transformPropsToContext } from '../../shared';
import type { AcceptableValue } from '../../types';
import { RovingFocusGroup } from '../roving-focus';
import { VisuallyHiddenInput } from '../visually-hidden';
import { provideRadioGroupRootContext } from './context';
import type { RadioGroupRootEmits, RadioGroupRootProps } from './types';

defineOptions({
  name: 'RadioGroupRoot'
});

const props = withDefaults(defineProps<RadioGroupRootProps<T>>(), {
  modelValue: undefined,
  disabled: false,
  required: false,
  orientation: undefined,
  loop: true
});

const emit = defineEmits<RadioGroupRootEmits<T>>();

const rootElement = useTemplateRef('rootElement');

const formControl = computed(() => isFormControl(rootElement.value));

provideRadioGroupRootContext({
  ...transformPropsToContext(props, [
    'modelValue',
    'defaultValue',
    'disabled',
    'orientation',
    'dir',
    'loop',
    'name',
    'required'
  ]),
  onUpdateModelValue: value => {
    emit('update:modelValue', value as T);
  }
});
</script>

<template>
  <RovingFocusGroup as="template" :orientation="orientation" :dir="dir" :loop="loop">
    <div
      v-bind="props"
      ref="rootElement"
      role="radiogroup"
      :data-disabled="disabled ? '' : undefined"
      :aria-orientation="orientation"
      :aria-required="required"
    >
      <slot :model-value="modelValue" />

      <VisuallyHiddenInput
        v-if="formControl && name"
        :required="required"
        :disabled="disabled"
        :value="modelValue"
        :name="name"
      />
    </div>
  </RovingFocusGroup>
</template>
