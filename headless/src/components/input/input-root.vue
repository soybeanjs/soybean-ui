<script setup lang="ts">
import { computed } from 'vue';
import { useControllableState, useForwardElement } from '../../composables';
import { isFormControl, transformPropsToContext } from '../../shared';
import VisuallyHiddenInput from '../visually-hidden/visually-hidden-input.vue';
import { provideInputRootContext, useInputUi } from './context';
import type { InputRootEmits, InputRootProps } from './types';

defineOptions({
  name: 'InputRoot'
});

const props = withDefaults(defineProps<InputRootProps>(), {
  modelValue: undefined
});

const emit = defineEmits<InputRootEmits>();

const [rootElement, setRootElement] = useForwardElement();

const cls = useInputUi('root');

const modelValue = useControllableState(
  () => props.modelValue,
  value => {
    emit('update:modelValue', value as string);
  },
  props.defaultValue
);

const formControl = computed(() => isFormControl(rootElement.value));

const onClear = () => {
  modelValue.value = '';
};

provideInputRootContext({
  ...transformPropsToContext(props, [
    'id',
    'autofocus',
    'placeholder',
    'disabled',
    'readonly',
    'maxlength',
    'minlength',
    'pattern'
  ]),
  modelValue
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
      v-if="formControl && props.name"
      type="text"
      :value="modelValue"
      :name="props.name"
      :disabled="disabled"
      :readonly="readonly"
      :required="required"
    />
  </div>
</template>
