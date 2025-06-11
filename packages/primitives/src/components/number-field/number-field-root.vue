<script setup lang="ts">
import { computed, ref, toRefs } from 'vue';
import type { HTMLAttributes, Ref } from 'vue';
import { useVModel } from '@vueuse/core';
import { useFormControl, useLocale, usePrimitiveElement } from '../../composables';
import { clamp, isNullish, snapValueToStep } from '../../shared';
import { Primitive } from '../primitive';
import { VisuallyHiddenInput } from '../visually-hidden';
import { provideNumberFieldRootContext } from './context';
import { handleDecimalOperation, useNumberFormatter, useNumberParser } from './shared';
import type { NumberFieldRootEmits, NumberFieldRootPropsWithPrimitive } from './types';

defineOptions({
  name: 'NumberFieldRoot',
  inheritAttrs: false
});

const props = withDefaults(defineProps<NumberFieldRootPropsWithPrimitive>(), {
  as: 'div',
  defaultValue: undefined,
  step: 1,
  stepSnapping: true
});

const emit = defineEmits<NumberFieldRootEmits>();

const {
  disabled,
  min,
  max,
  step,
  stepSnapping,
  formatOptions,
  id,
  invertWheelChange,
  disableWheelChange,
  locale: propLocale
} = toRefs(props);

const modelValue = useVModel(props, 'modelValue', emit, {
  defaultValue: props.defaultValue,
  passive: (props.modelValue === undefined) as false
}) as Ref<number | undefined>;

const { primitiveElement, currentElement } = usePrimitiveElement();

const locale = useLocale(propLocale);
const isFormControl = useFormControl(currentElement);
const inputEl = ref<HTMLInputElement>();

const isDecreaseDisabled = computed(
  () =>
    !isNullish(modelValue.value) &&
    (clampInputValue(modelValue.value) === min.value || (min.value && !Number.isNaN(modelValue.value))
      ? handleDecimalOperation('-', modelValue.value, step.value) < min.value
      : false)
);
const isIncreaseDisabled = computed(
  () =>
    !isNullish(modelValue.value) &&
    (clampInputValue(modelValue.value) === max.value || (max.value && !Number.isNaN(modelValue.value))
      ? handleDecimalOperation('+', modelValue.value, step.value) > max.value
      : false)
);

// Formatter
const numberFormatter = useNumberFormatter(locale, formatOptions);
const numberParser = useNumberParser(locale, formatOptions);

function handleChangingValue(type: 'increase' | 'decrease', multiplier = 1) {
  inputEl.value?.focus();
  const currentInputValue = numberParser.parse(inputEl.value?.value ?? '');
  if (props.disabled) return;
  if (Number.isNaN(currentInputValue)) {
    modelValue.value = min.value ?? 0;
  } else if (type === 'increase')
    modelValue.value = clampInputValue(currentInputValue + (step.value ?? 1) * multiplier);
  else modelValue.value = clampInputValue(currentInputValue - (step.value ?? 1) * multiplier);
}

function handleIncrease(multiplier = 1) {
  handleChangingValue('increase', multiplier);
}
function handleDecrease(multiplier = 1) {
  handleChangingValue('decrease', multiplier);
}

function handleMinMaxValue(type: 'min' | 'max') {
  if (type === 'min' && min.value !== undefined) modelValue.value = clampInputValue(min.value);
  else if (type === 'max' && max.value !== undefined) modelValue.value = clampInputValue(max.value);
}

const inputMode = computed<HTMLAttributes['inputmode']>(() => {
  // The inputMode attribute influences the software keyboard that is shown on touch devices.
  // Browsers and operating systems are quite inconsistent about what keys are available, however.
  // We choose between numeric and decimal based on whether we allow negative and fractional numbers,
  // and based on testing on various devices to determine what keys are available in each inputMode.
  const hasDecimals = numberFormatter.resolvedOptions().maximumFractionDigits! > 0;

  return hasDecimals ? 'decimal' : 'numeric';
});
// Replace negative textValue formatted using currencySign: 'accounting'
// with a textValue that can be announced using a minus sign.
const textValueFormatter = useNumberFormatter(locale, formatOptions);
const textValue = computed(() =>
  isNullish(modelValue.value) || Number.isNaN(modelValue.value) ? '' : textValueFormatter.format(modelValue.value)
);

function validate(val: string) {
  return numberParser.isValidPartialNumber(val, min.value, max.value);
}

function setInputValue(val: string) {
  if (inputEl.value) inputEl.value.value = val;
}

function clampInputValue(val: number) {
  // Clamp to min and max, round to the nearest step, and round to specified number of digits
  let clampedValue: number;
  if (step.value === undefined || Number.isNaN(step.value) || !stepSnapping.value) {
    clampedValue = clamp(val, min.value, max.value);
  } else {
    clampedValue = snapValueToStep(val, min.value, max.value, step.value);
  }

  clampedValue = numberParser.parse(numberFormatter.format(clampedValue));
  return clampedValue;
}

function applyInputValue(val: string) {
  const parsedValue = numberParser.parse(val);

  modelValue.value = Number.isNaN(parsedValue) ? undefined : clampInputValue(parsedValue);
  // Set to empty state if input value is empty
  if (!val.length) return setInputValue(val);

  // if it failed to parse, then reset input to formatted version of current number
  if (Number.isNaN(parsedValue)) return setInputValue(textValue.value);

  return setInputValue(textValue.value);
}

provideNumberFieldRootContext({
  modelValue,
  handleDecrease,
  handleIncrease,
  handleMinMaxValue,
  inputMode,
  inputEl,
  onInputElement: el => (inputEl.value = el),
  textValue,
  validate,
  applyInputValue,
  disabled,
  max,
  min,
  isDecreaseDisabled,
  isIncreaseDisabled,
  invertWheelChange,
  disableWheelChange,
  id
});
</script>

<template>
  <Primitive
    v-bind="$attrs"
    ref="primitiveElement"
    :class="props.class"
    :as="as"
    :as-child="asChild"
    role="group"
    :data-disabled="disabled ? '' : undefined"
  >
    <slot :model-value="modelValue" :text-value="textValue" />

    <VisuallyHiddenInput
      v-if="isFormControl && name"
      type="text"
      :value="modelValue"
      :name="name"
      :disabled="disabled"
      :required="required"
    />
  </Primitive>
</template>
