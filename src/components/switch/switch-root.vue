<script setup lang="ts" generic="T extends AcceptableBooleanValue = boolean">
import { computed } from 'vue';
import { useControllableState, useForwardElement } from '../../composables';
import { isFormControl, isNullish, transformPropsToContext } from '../../shared';
import type { AcceptableBooleanValue } from '../../types';
import { VisuallyHiddenInput } from '../visually-hidden';
import { provideSwitchRootContext, useSwitchThemeContext } from './context';
import type { SwitchRootEmits, SwitchRootProps } from './types';

defineOptions({
  name: 'SwitchRoot'
});

const props = withDefaults(defineProps<SwitchRootProps<T>>(), {
  modelValue: undefined,
  value: 'on',
  trueValue: true as any,
  falseValue: false as any
});

const emit = defineEmits<SwitchRootEmits<T>>();

const [rootElement, setRootElement] = useForwardElement();

const themeContext = useSwitchThemeContext();

const cls = computed(() => themeContext?.ui?.value?.root);

const modelValue = useControllableState(
  () => props.modelValue,
  value => {
    if (isNullish(value)) return;

    emit('update:modelValue', value as NonNullable<T>);
  },
  props.defaultValue
);

const formControl = computed(() => isFormControl(rootElement.value));

function checkSwitchValue() {
  if (isNullish(props.trueValue) || isNullish(props.falseValue)) {
    throw new Error('trueValue and falseValue cannot be nullish');
  }
}

checkSwitchValue();

const { dataState } = provideSwitchRootContext({
  ...transformPropsToContext(props, ['modelValue', 'disabled', 'required', 'trueValue', 'falseValue']),
  // @ts-expect-error ignore type
  modelValue
});
</script>

<template>
  <div :ref="setRootElement" :class="cls" :data-state="dataState">
    <slot :model-value="modelValue" />
    <VisuallyHiddenInput
      v-if="formControl && name"
      type="checkbox"
      :name="name"
      :disabled="disabled"
      :required="required"
      :value="value"
      :checked="!!modelValue"
    />
  </div>
</template>
