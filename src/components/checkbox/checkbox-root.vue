<script setup lang="ts">
import { computed, useTemplateRef } from 'vue';
import { isFormControl, transformPropsToContext } from '../../shared';
import { VisuallyHiddenInput } from '../visually-hidden';
import { provideCheckboxRootContext, useCheckboxGroupRootContext } from './context';
import type { CheckboxRootEmits, CheckboxRootProps } from './types';

defineOptions({
  name: 'CheckboxRoot'
});

const props = withDefaults(defineProps<CheckboxRootProps>(), {
  modelValue: undefined,
  value: 'on'
});

const emit = defineEmits<CheckboxRootEmits>();

const rootElement = useTemplateRef<HTMLDivElement>('rootElement');

const groupContext = useCheckboxGroupRootContext();

const formControl = computed(() => isFormControl(rootElement.value));

const disabled = computed(() => groupContext?.disabled?.value || props.disabled);

const { modelValue, state } = provideCheckboxRootContext({
  ...transformPropsToContext(props),
  groupModelValue: groupContext?.modelValue,
  disabled,
  onUpdateModelValue: value => {
    emit('update:modelValue', value);
  }
});
</script>

<template>
  <div ref="rootElement" :class="props.class">
    <slot :model-value="modelValue" :state="state" />

    <VisuallyHiddenInput
      v-if="formControl && name && !groupContext"
      type="checkbox"
      :checked="!!state"
      :name="name"
      :value="value"
      :disabled="disabled"
      :required="required"
    />
  </div>
</template>
