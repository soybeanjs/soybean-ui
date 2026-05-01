<script setup lang="ts">
import { computed, useId, watch } from 'vue';
import { useControllableState } from '../../composables';
import { getDefaultTime, isBefore, normalizeHourCycle, useDateFormatter } from '../../date';
import type { TimeValue } from '../../date';
import { isNullish } from '../../shared';
import { createTimeOptions, formatTimeValue } from '../../shared/time-picker';
import { useDirection, useLocale } from '../config-provider/context';
import { Primitive } from '../primitive';
import { provideTimePickerRootContext, useTimePickerUi } from './context';
import type { TimePickerRootEmits, TimePickerRootProps } from './types';

defineOptions({
  name: 'TimePickerRoot'
});

const props = withDefaults(defineProps<TimePickerRootProps>(), {
  defaultValue: undefined,
  defaultPlaceholder: undefined,
  placeholder: undefined,
  disabled: false,
  readonly: false,
  isTimeUnavailable: undefined,
  hideTimeZone: false,
  hourCycle: undefined,
  granularity: undefined,
  step: undefined,
  defaultOpen: false,
  open: undefined,
  modal: false
});

const emit = defineEmits<TimePickerRootEmits>();

defineSlots<{
  default?: (props: { displayValue: string; modelValue: TimeValue | undefined; open: boolean }) => any;
}>();

const cls = useTimePickerUi('root');
const popupId = useId();

const locale = useLocale(() => props.locale);
const dir = useDirection(() => props.dir);
const formatter = useDateFormatter(locale.value, {
  hourCycle: normalizeHourCycle(props.hourCycle)
});

const granularity = computed(() => props.granularity ?? 'minute');
const hideTimeZone = computed(() => props.hideTimeZone);

const modelValue = useControllableState<TimeValue | undefined>(
  () => props.modelValue,
  value => emit('update:modelValue', value),
  props.defaultValue
);

const defaultTime = getDefaultTime({
  defaultPlaceholder: props.placeholder,
  defaultValue: modelValue.value
});

const placeholder = useControllableState<TimeValue>(
  () => props.placeholder as TimeValue,
  value => emit('update:placeholder', value),
  props.defaultPlaceholder ?? defaultTime.copy()
);

const open = useControllableState(
  () => props.open,
  value => emit('update:open', value ?? false),
  props.defaultOpen
);

const focusedTime = computed({
  get: () => placeholder.value,
  set: value => {
    placeholder.value = value.copy();
  }
});

const minValue = computed(() => props.minValue);
const maxValue = computed(() => props.maxValue);

const isTimeDisabled = (time: TimeValue) => {
  if (props.disabled) {
    return true;
  }

  if (props.isTimeUnavailable?.(time)) {
    return true;
  }

  if (minValue.value && isBefore(time, minValue.value)) {
    return true;
  }

  if (maxValue.value && isBefore(maxValue.value, time)) {
    return true;
  }

  return false;
};

const isTimeSelected = (time: TimeValue) => {
  if (!modelValue.value) {
    return false;
  }

  return modelValue.value.toString() === time.toString();
};

const isInvalid = computed(() => {
  if (!modelValue.value) {
    return false;
  }

  return isTimeDisabled(modelValue.value);
});

const displayValue = computed(() => {
  if (!modelValue.value) {
    return '';
  }

  return formatTimeValue({
    formatter,
    granularity: granularity.value,
    hideTimeZone: hideTimeZone.value,
    hourCycle: props.hourCycle,
    value: modelValue.value
  });
});

const options = computed(() =>
  createTimeOptions({
    formatter,
    granularity: granularity.value,
    hideTimeZone: hideTimeZone.value,
    hourCycle: props.hourCycle,
    isTimeUnavailable: props.isTimeUnavailable,
    maxValue: maxValue.value,
    minValue: minValue.value,
    reference: modelValue.value ?? placeholder.value,
    step: props.step
  })
);

const onPlaceholderChange = (time: TimeValue) => {
  placeholder.value = time.copy();
};

const onTimeChange = (time: TimeValue) => {
  if (props.readonly || isTimeDisabled(time)) {
    return;
  }

  modelValue.value = time.copy();
  onPlaceholderChange(time);
  open.value = false;
};

const setFocusedTime = (time: TimeValue) => {
  focusedTime.value = time.copy();
};

watch(locale, value => {
  if (formatter.getLocale() !== value) {
    formatter.setLocale(value);
  }
});

watch(modelValue, value => {
  if (isNullish(value)) {
    focusedTime.value = placeholder.value.copy();
    return;
  }

  if (placeholder.value.toString() !== value.toString()) {
    placeholder.value = value.copy();
  }

  focusedTime.value = value.copy();
});

provideTimePickerRootContext({
  locale,
  dir,
  modelValue,
  placeholder,
  isTimeUnavailable: props.isTimeUnavailable,
  isInvalid,
  formatter,
  granularity,
  hourCycle: props.hourCycle,
  hideTimeZone,
  open,
  popupId,
  displayValue,
  focusedTime,
  options,
  minValue,
  maxValue,
  onTimeChange,
  onPlaceholderChange,
  isTimeDisabled,
  isTimeSelected,
  setOpen(value: boolean) {
    open.value = value;
  },
  setFocusedTime,
  disabled: computed(() => props.disabled),
  readonly: computed(() => props.readonly)
});
</script>

<template>
  <Primitive
    :as="as"
    :as-child="asChild"
    :class="cls"
    :data-disabled="disabled ? '' : undefined"
    :data-invalid="isInvalid ? '' : undefined"
    :data-readonly="readonly ? '' : undefined"
    :dir="dir"
    data-slot="root"
  >
    <slot :display-value="displayValue" :model-value="modelValue" :open="Boolean(open)" />
  </Primitive>
</template>
