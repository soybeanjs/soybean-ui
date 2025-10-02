<script setup lang="ts">
import { computed } from 'vue';
import { useControllableState, useForwardElement } from '../../composables';
import { isFormControl, transformPropsToContext } from '../../shared';
import VisuallyHiddenInput from '../visually-hidden/visually-hidden-input.vue';
import { provideNumberInputRootContext, useNumberInputThemeContext } from './context';
import type { NumberInputRootEmits, NumberInputRootProps } from './types';

defineOptions({
  name: 'NumberInputRoot'
});

const props = withDefaults(defineProps<NumberInputRootProps>(), {
  defaultValue: undefined,
  step: 1,
  stepSnapping: true
});

const emit = defineEmits<NumberInputRootEmits>();

const [rootElement, setRootElement] = useForwardElement();

const themeContext = useNumberInputThemeContext();

const cls = computed(() => themeContext?.ui?.value?.root);

const modelValue = useControllableState(
  () => props.modelValue,
  value => {
    emit('update:modelValue', value as number);
  },
  props.defaultValue
);

const formControl = computed(() => isFormControl(rootElement.value));

const onClear = () => {
  modelValue.value = null;
};

provideNumberInputRootContext({
  modelValue,
  ...transformPropsToContext(props, [
    'locale',
    'formatOptions',
    'disabled',
    'readonly',
    'max',
    'min',
    'step',
    'stepSnapping',
    'disableWheelChange',
    'invertWheelChange',
    'id',
    'placeholder',
    'autoFocus'
  ])
});
</script>

<template>
  <div
    v-bind="props"
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
