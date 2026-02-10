<script setup lang="ts">
import { computed } from 'vue';
import { useControllableState, useForwardElement } from '../../composables';
import { isFormControl, transformPropsToContext } from '../../shared';
import VisuallyHiddenInput from '../visually-hidden/visually-hidden-input.vue';
import { provideInputNumberRootContext, useInputNumberUi } from './context';
import type { InputNumberRootEmits, InputNumberRootProps } from './types';

defineOptions({
  name: 'InputNumberRoot'
});

const props = withDefaults(defineProps<InputNumberRootProps>(), {
  modelValue: undefined,
  step: 1,
  stepSnapping: true,
  focusOnChange: true
});

const emit = defineEmits<InputNumberRootEmits>();

const [rootElement, setRootElement] = useForwardElement();

const cls = useInputNumberUi('root');

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

provideInputNumberRootContext({
  modelValue,
  ...transformPropsToContext(props, [
    'id',
    'autofocus',
    'disabled',
    'maxlength',
    'minlength',
    'pattern',
    'placeholder',
    'readonly',
    'locale',
    'focusOnChange',
    'formatOptions',
    'max',
    'min',
    'step',
    'stepSnapping',
    'disableWheelChange',
    'invertWheelChange'
  ])
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
