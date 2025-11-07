<script setup lang="ts" generic="T extends AcceptableBooleanValue">
import { computed, useTemplateRef } from 'vue';
import { useControllableState } from '../../composables';
import { isFormControl, isNullish, transformPropsToContext } from '../../shared';
import type { AcceptableBooleanValue } from '../../types';
import { RovingFocusGroup } from '../roving-focus';
import { VisuallyHiddenInput } from '../visually-hidden';
import { provideRadioGroupRootContext, useRadioGroupThemeContext } from './context';
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

const themeContext = useRadioGroupThemeContext();

const cls = computed(() => themeContext?.ui?.value?.root);

const rootElement = useTemplateRef('rootElement');

const modelValue = useControllableState(
  () => props.modelValue,
  value => {
    if (isNullish(value)) return;
    emit('update:modelValue', value as NonNullable<T>);
  },
  props.defaultValue
);

const formControl = computed(() => isFormControl(rootElement.value));

provideRadioGroupRootContext({
  ...transformPropsToContext(props, ['disabled', 'orientation', 'dir', 'loop', 'name', 'required']),
  modelValue
});
</script>

<template>
  <RovingFocusGroup as-child :orientation="orientation" :dir="dir" :loop="loop">
    <div
      ref="rootElement"
      :class="cls"
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
