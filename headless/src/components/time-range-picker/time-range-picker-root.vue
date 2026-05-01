<script setup lang="ts">
import { computed, shallowRef, useId, watch } from 'vue';
import { useControllableState } from '../../composables';
import { getDefaultTime, isBefore, normalizeHourCycle, useDateFormatter } from '../../date';
import type { TimeRange, TimeValue } from '../../date';
import {
  createTimeOptions,
  compareTimeValues,
  formatTimeValue,
  isTimeBetweenInclusive
} from '../../shared/time-picker';
import { useDirection, useLocale } from '../config-provider/context';
import { Primitive } from '../primitive';
import { provideTimeRangePickerRootContext, useTimeRangePickerUi } from './context';
import type { TimeRangePickerRootEmits, TimeRangePickerRootProps } from './types';

defineOptions({
  name: 'TimeRangePickerRoot'
});

const props = withDefaults(defineProps<TimeRangePickerRootProps>(), {
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

const emit = defineEmits<TimeRangePickerRootEmits>();

defineSlots<{
  default?: (props: { displayValue: string; modelValue: TimeRange; open: boolean; placeholder: TimeValue }) => any;
}>();

const cls = useTimeRangePickerUi('root');
const popupId = useId();

const locale = useLocale(() => props.locale);
const dir = useDirection(() => props.dir);
const formatter = useDateFormatter(locale.value, {
  hourCycle: normalizeHourCycle(props.hourCycle)
});

const granularity = computed(() => props.granularity ?? 'minute');
const hideTimeZone = computed(() => props.hideTimeZone);

const modelValue = useControllableState<TimeRange>(
  () => props.modelValue as TimeRange,
  value => {
    emit('update:modelValue', value);
    emit('update:startValue', value.start);
    emit('update:endValue', value.end);
  },
  props.defaultValue ?? {}
);

const defaultTime = getDefaultTime({
  defaultPlaceholder: props.placeholder,
  defaultValue: modelValue.value.start
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

const focusedTime = shallowRef<TimeValue>(
  modelValue.value.end?.copy() ?? modelValue.value.start?.copy() ?? placeholder.value.copy()
);
const hoveredTime = shallowRef<TimeValue | undefined>();

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

const sortRange = (start: TimeValue, end: TimeValue): TimeRange => {
  return compareTimeValues(start, end) <= 0
    ? { start: start.copy(), end: end.copy() }
    : { start: end.copy(), end: start.copy() };
};

const isRangeStart = (time: TimeValue) => {
  if (!modelValue.value.start) {
    return false;
  }

  return modelValue.value.start.toString() === time.toString();
};

const isRangeEnd = (time: TimeValue) => {
  if (!modelValue.value.end) {
    return false;
  }

  return modelValue.value.end.toString() === time.toString();
};

const isTimeSelected = (time: TimeValue) => {
  const { start, end } = modelValue.value;

  if (!start && !end) {
    return false;
  }

  if (start && !end) {
    return start.toString() === time.toString();
  }

  if (start && end) {
    return isTimeBetweenInclusive(time, start, end);
  }

  return false;
};

const isTimeHighlighted = (time: TimeValue) => {
  const { start, end } = modelValue.value;

  if (!start || end || !hoveredTime.value) {
    return false;
  }

  const range = sortRange(start, hoveredTime.value);
  return isTimeBetweenInclusive(time, range.start!, range.end!);
};

const isInvalid = computed(() => {
  const { start, end } = modelValue.value;

  if (start && isTimeDisabled(start)) {
    return true;
  }

  if (end && isTimeDisabled(end)) {
    return true;
  }

  if (start && end && compareTimeValues(end, start) < 0) {
    return true;
  }

  return false;
});

const displayValue = computed(() => {
  const { start, end } = modelValue.value;

  if (start && end) {
    return `${formatTimeValue({
      formatter,
      granularity: granularity.value,
      hideTimeZone: hideTimeZone.value,
      hourCycle: props.hourCycle,
      value: start
    })} – ${formatTimeValue({
      formatter,
      granularity: granularity.value,
      hideTimeZone: hideTimeZone.value,
      hourCycle: props.hourCycle,
      value: end
    })}`;
  }

  if (start) {
    return `${formatTimeValue({
      formatter,
      granularity: granularity.value,
      hideTimeZone: hideTimeZone.value,
      hourCycle: props.hourCycle,
      value: start
    })} – ...`;
  }

  return '';
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
    reference: modelValue.value.start ?? placeholder.value,
    step: props.step
  })
);

const onPlaceholderChange = (time: TimeValue) => {
  placeholder.value = time.copy();
  focusedTime.value = time.copy();
};

const onRangeChange = (time: TimeValue) => {
  if (props.readonly || isTimeDisabled(time)) {
    return;
  }

  const { start, end } = modelValue.value;

  if (!start || end) {
    modelValue.value = { start: time.copy(), end: undefined };
    focusedTime.value = time.copy();
    hoveredTime.value = undefined;
    onPlaceholderChange(time);
    return;
  }

  const nextRange = sortRange(start, time);
  modelValue.value = nextRange;
  focusedTime.value = time.copy();
  hoveredTime.value = undefined;
  onPlaceholderChange(nextRange.start!);
  open.value = false;
};

const setFocusedTime = (time: TimeValue) => {
  focusedTime.value = time.copy();
};

const setHoveredTime = (time: TimeValue | undefined) => {
  hoveredTime.value = time?.copy();
};

watch(locale, value => {
  if (formatter.getLocale() !== value) {
    formatter.setLocale(value);
  }
});

watch(
  () => modelValue.value.start,
  value => {
    if (!value) {
      return;
    }

    if (placeholder.value.toString() !== value.toString()) {
      placeholder.value = value.copy();
    }
  }
);

watch(
  modelValue,
  value => {
    focusedTime.value = value.end?.copy() ?? value.start?.copy() ?? placeholder.value.copy();
  },
  { deep: true }
);

provideTimeRangePickerRootContext({
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
  hoveredTime,
  options,
  minValue,
  maxValue,
  onRangeChange,
  onPlaceholderChange,
  isTimeDisabled,
  isTimeSelected,
  isTimeHighlighted,
  isRangeStart,
  isRangeEnd,
  setOpen(value: boolean) {
    open.value = value;
  },
  setFocusedTime,
  setHoveredTime,
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
    <slot :display-value="displayValue" :model-value="modelValue" :open="Boolean(open)" :placeholder="placeholder" />
  </Primitive>
</template>
