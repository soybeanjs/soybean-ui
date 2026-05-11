<script setup lang="ts" generic="T extends DefinedWithBooleanValue">
import { computed, useTemplateRef } from 'vue';
import { useControllableState } from '../../composables';
import { isFormControl, transformPropsToContext } from '../../shared';
import type { DefinedWithBooleanValue } from '../../types';
import { RovingFocusGroup } from '../roving-focus';
import { VisuallyHiddenInput } from '../visually-hidden';
import { provideRadioGroupRootContext, useRadioGroupUi } from './context';
import type { RadioGroupRootProps, RadioGroupRootEmits } from './types';

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

const cls = useRadioGroupUi('root');

const rootElement = useTemplateRef('rootElement');

const modelValue = useControllableState(
  () => props.modelValue,
  value => {
    emit('update:modelValue', value);
  },
  props.defaultValue ?? null
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
      data-soybean-radio-group-root
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
