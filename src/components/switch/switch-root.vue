<script setup lang="ts" generic="T extends AcceptableBooleanValue = boolean">
import { computed, useAttrs } from 'vue';
import { useControllableState, useForwardElement } from '../../composables';
import { getAriaLabel, isFormControl, isNullish, transformPropsToContext } from '../../shared';
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

const attrs = useAttrs();

const [rootElement, setRootElement] = useForwardElement();

const themeContext = useSwitchThemeContext();

const cls = computed(() => [themeContext?.ui?.value?.root, props.class]);

const modelValue = useControllableState(
  () => props.modelValue,
  value => {
    if (isNullish(value)) return;

    emit('update:modelValue', value as NonNullable<T>);
  },
  props.defaultValue
);

const formControl = computed(() => isFormControl(rootElement.value));

const ariaLabel = computed(() => getAriaLabel(rootElement.value, props.id, attrs['aria-label'] as string));

function checkSwitchValue() {
  if (isNullish(props.trueValue) || isNullish(props.falseValue)) {
    throw new Error('trueValue and falseValue cannot be nullish');
  }
}

checkSwitchValue();

const { toggleCheck, dataState, dataDisabled } = provideSwitchRootContext({
  ...transformPropsToContext(props, ['modelValue', 'disabled', 'trueValue', 'falseValue']),
  // @ts-expect-error ignore type
  modelValue
});
</script>

<template>
  <button
    v-bind="props"
    :id="id"
    :ref="setRootElement"
    :class="cls"
    :aria-checked="modelValue"
    :aria-label="ariaLabel"
    :aria-required="required"
    :data-disabled="dataDisabled"
    :data-state="dataState"
    role="switch"
    @click="toggleCheck"
    @keydown.enter.prevent="toggleCheck"
  >
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
  </button>
</template>
