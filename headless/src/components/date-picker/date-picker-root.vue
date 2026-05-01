<script setup lang="ts">
import { computed, watch } from 'vue';
import { useControllableState, useForwardElement } from '../../composables';
import { getDefaultDate, isBefore, normalizeDateStep, normalizeHourCycle, useDateFormatter } from '../../date';
import type { DateValue } from '../../date';
import { isNullish } from '../../shared';
import { useDirection, useLocale } from '../config-provider/context';
import { Primitive } from '../primitive';
import { provideDatePickerRootContext, useDatePickerUi } from './context';
import type { DatePickerRootEmits, DatePickerRootProps } from './types';

defineOptions({
  name: 'DatePickerRoot'
});

const props = withDefaults(defineProps<DatePickerRootProps>(), {
  defaultValue: undefined,
  defaultPlaceholder: undefined,
  placeholder: undefined,
  disabled: false,
  readonly: false,
  isDateUnavailable: undefined,
  hideTimeZone: false,
  hourCycle: undefined,
  granularity: undefined,
  step: undefined,
  defaultOpen: false,
  open: undefined,
  modal: false
});

const emit = defineEmits<DatePickerRootEmits>();

defineSlots<{
  default?: (props: { modelValue: DateValue | undefined; open: boolean }) => any;
}>();

const cls = useDatePickerUi('root');
const [_, setRootElement] = useForwardElement();

const locale = useLocale(() => props.locale);
const dir = useDirection(() => props.dir);
const formatter = useDateFormatter(locale.value, {
  hourCycle: normalizeHourCycle(props.hourCycle)
});

const modelValue = useControllableState<DateValue | undefined>(
  () => props.modelValue,
  value => emit('update:modelValue', value),
  props.defaultValue
);

const defaultDate = getDefaultDate({
  defaultPlaceholder: props.placeholder,
  defaultValue: modelValue.value,
  granularity: props.granularity,
  locale: props.locale
});

const placeholder = useControllableState<DateValue>(
  () => props.placeholder as DateValue,
  value => emit('update:placeholder', value),
  props.defaultPlaceholder ?? defaultDate.copy()
);

const open = useControllableState(
  () => props.open,
  value => {
    emit('update:open', value ?? false);
  },
  props.defaultOpen
);

const step = computed(() => normalizeDateStep(props));

const isInvalid = computed(() => {
  if (!modelValue.value) {
    return false;
  }

  if (props.isDateUnavailable?.(modelValue.value)) {
    return true;
  }

  if (props.minValue && isBefore(modelValue.value, props.minValue)) {
    return true;
  }

  if (props.maxValue && isBefore(props.maxValue, modelValue.value)) {
    return true;
  }

  return false;
});

const minValue = computed(() => props.minValue);
const maxValue = computed(() => props.maxValue);

const isDateDisabled = (date: DateValue): boolean => {
  if (props.disabled) {
    return true;
  }

  if (props.isDateUnavailable?.(date)) {
    return true;
  }

  if (minValue.value && isBefore(date, minValue.value)) {
    return true;
  }

  if (maxValue.value && isBefore(maxValue.value, date)) {
    return true;
  }

  return false;
};

const isDateSelected = (date: DateValue): boolean => {
  if (!modelValue.value) {
    return false;
  }

  return modelValue.value.compare(date) === 0;
};

const hasSelectedDate = computed(() => !isNullish(modelValue.value));

const isSelectedDateDisabled = computed(() => {
  if (!modelValue.value) {
    return false;
  }

  return isDateDisabled(modelValue.value);
});

const isPlaceholderFocusable = computed(() => {
  return !isDateDisabled(placeholder.value);
});

watch(locale, value => {
  if (formatter.getLocale() !== value) {
    formatter.setLocale(value);
  }
});

watch(modelValue, value => {
  if (!isNullish(value) && placeholder.value.compare(value) !== 0) {
    placeholder.value = value.copy();
  }
});

const onDateChange = (date: DateValue) => {
  modelValue.value = date.copy();
  open.value = false;
};

const onPlaceholderChange = (date: DateValue) => {
  placeholder.value = date.copy();
};

provideDatePickerRootContext({
  locale,
  dir,
  modelValue,
  placeholder,
  isDateUnavailable: props.isDateUnavailable,
  isInvalid,
  disabled: computed(() => props.disabled),
  readonly: computed(() => props.readonly),
  formatter,
  hourCycle: props.hourCycle,
  step,
  open,
  isPlaceholderFocusable,
  hasSelectedDate,
  isSelectedDateDisabled,
  minValue,
  maxValue,
  onDateChange,
  onPlaceholderChange,
  isDateDisabled,
  isDateSelected,
  setOpen(value: boolean) {
    open.value = value;
  }
});
</script>

<template>
  <Primitive
    :ref="setRootElement"
    :as="as"
    :as-child="asChild"
    :class="cls"
    :data-disabled="disabled ? '' : undefined"
    :data-invalid="isInvalid ? '' : undefined"
    :data-readonly="readonly ? '' : undefined"
    :dir="dir"
    data-slot="root"
  >
    <slot :model-value="modelValue" :open="Boolean(open)" />
  </Primitive>
</template>
