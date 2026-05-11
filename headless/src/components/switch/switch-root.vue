<script setup lang="ts" generic="T extends AcceptableBooleanValue = boolean">
import { computed } from 'vue';
import { useControllableState, useForwardElement } from '../../composables';
import { isFormControl, isNullish, transformPropsToContext } from '../../shared';
import type { AcceptableBooleanValue } from '../../types';
import { useDirection } from '../config-provider/context';
import { VisuallyHiddenInput } from '../visually-hidden';
import { provideSwitchRootContext, useSwitchUi } from './context';
import type { SwitchRootProps, SwitchRootEmits } from './types';

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

const direction = useDirection(() => props.dir);

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
  <div :ref="setRootElement" data-soybean-switch-root :class="cls" :data-state="dataState" :dir="direction">
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
