<script setup lang="ts">
import { computed } from 'vue';
import { useControllableState, useForwardElement } from '../../composables';
import { isFormControl, transformPropsToContext } from '../../shared';
import VisuallyHiddenInput from '../visually-hidden/visually-hidden-input.vue';
import { provideTextareaRootContext, useTextareaThemeContext } from './context';
import type { TextareaRootEmits, TextareaRootProps } from './types';

defineOptions({
  name: 'TextareaRoot'
});

const props = withDefaults(defineProps<TextareaRootProps>(), {
  modelValue: undefined
});

const emit = defineEmits<TextareaRootEmits>();

const [rootElement, setRootElement] = useForwardElement();

const themeContext = useTextareaThemeContext();

const cls = computed(() => themeContext?.ui?.value?.root);

const modelValue = useControllableState(
  () => props.modelValue,
  value => {
    emit('update:modelValue', value as string);
  },
  props.defaultValue
);

const formControl = computed(() => isFormControl(rootElement.value));

const count = computed(() => modelValue.value?.length ?? 0);

const autosizeOptions = computed(() => {
  if (!props.autosize) return undefined;
  if (typeof props.autosize === 'boolean') {
    return {};
  }
  return props.autosize;
});

const onClear = () => {
  modelValue.value = '';
};

provideTextareaRootContext({
  ...transformPropsToContext(props, [
    'id',
    'autofocus',
    'placeholder',
    'disabled',
    'readonly',
    'maxlength',
    'minlength'
  ]),
  modelValue,
  count,
  autosizeOptions
});
</script>

<template>
  <div
    :ref="setRootElement"
    :class="cls"
    role="group"
    :data-disabled="disabled ? '' : undefined"
    :data-readonly="readonly ? '' : undefined"
  >
    <slot :model-value="modelValue" :clear="onClear" />

    <VisuallyHiddenInput
      v-if="formControl && name"
      type="text"
      :value="modelValue"
      :name="name"
      :disabled="disabled"
      :readonly="readonly"
      :required="required"
    />
  </div>
</template>
