<script setup lang="ts" generic="T extends AcceptableBooleanValue = boolean">
import { computed } from 'vue';
import { useControllableState, useForwardElement } from '../../composables';
import { isFormControl, isNullish, transformPropsToContext } from '../../shared';
import type { AcceptableBooleanValue } from '../../types';
import { VisuallyHiddenInput } from '../visually-hidden';
import { provideSwitchRootContext, useSwitchUi } from './context';
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

const cls = useSwitchUi('root');

const modelValue = useControllableState(
  () => props.modelValue,
  value => {
    // @ts-expect-error ignore type
    emit('update:modelValue', value);
  },
  // @ts-expect-error defaultValue can be null
  props.defaultValue ?? null
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
  modelValue
});
</script>

<template>
  <div :ref="setRootElement" :class="cls" data-slot="root" :data-state="dataState">
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
