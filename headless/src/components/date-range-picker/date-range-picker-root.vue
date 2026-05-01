<script setup lang="ts">
import { computed, shallowRef, watch } from 'vue';
import { useControllableState, useForwardElement } from '../../composables';
import { getDefaultDate, isBefore, normalizeDateStep, normalizeHourCycle, useDateFormatter } from '../../date';
import type { DateRange, DateValue } from '../../date';
import { isNullish } from '../../shared';
import { useDirection, useLocale } from '../config-provider/context';
import { Primitive } from '../primitive';
import { provideDateRangePickerRootContext, useDateRangePickerUi } from './context';
import type { DateRangePickerRootEmits, DateRangePickerRootProps } from './types';

defineOptions({
  name: 'DateRangePickerRoot'
});

const props = withDefaults(defineProps<DateRangePickerRootProps>(), {
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

const emit = defineEmits<DateRangePickerRootEmits>();

defineSlots<{
  default?: (props: {
    modelValue: DateRange;
    placeholder: DateValue;
    setPlaceholder: (date: DateValue) => void;
    setRange: (range: DateRange) => void;
    open: boolean;
  }) => any;
}>();

const cls = useDateRangePickerUi('root');
const [_, setRootElement] = useForwardElement();

const locale = useLocale(() => props.locale);
const dir = useDirection(() => props.dir);
const formatter = useDateFormatter(locale.value, {
  hourCycle: normalizeHourCycle(props.hourCycle)
});

const modelValue = useControllableState<DateRange>(
  () => props.modelValue as DateRange,
  value => {
    emit('update:modelValue', value);
    emit('update:startValue', value.start);
    emit('update:endValue', value.end);
  },
  props.defaultValue ?? {}
);

const defaultDate = getDefaultDate({
  defaultPlaceholder: props.placeholder,
  defaultValue: modelValue.value.start,
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

const hoveredDate = shallowRef<DateValue | undefined>();

const step = computed(() => normalizeDateStep(props));

const isInvalid = computed(() => {
  const { start, end } = modelValue.value;

  if (start && end && isBefore(end, start)) {
    return true;
  }

  if (start) {
    if (props.isDateUnavailable?.(start)) {
      return true;
    }

    if (props.minValue && isBefore(start, props.minValue)) {
      return true;
    }

    if (props.maxValue && isBefore(props.maxValue, start)) {
      return true;
    }
  }

  if (end) {
    if (props.isDateUnavailable?.(end)) {
      return true;
    }

    if (props.minValue && isBefore(end, props.minValue)) {
      return true;
    }

    if (props.maxValue && isBefore(props.maxValue, end)) {
      return true;
    }
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
  const { start, end } = modelValue.value;

  if (!start && !end) {
    return false;
  }

  if (start && start.compare(date) === 0) {
    return true;
  }

  if (end && end.compare(date) === 0) {
    return true;
  }

  if (start && end) {
    return !isBefore(date, start) && !isBefore(end, date);
  }

  return false;
};

const isDateHovered = (date: DateValue): boolean => {
  const { start, end } = modelValue.value;

  if (!hoveredDate.value) {
    return false;
  }

  if (start && !end) {
    const earlierDate = isBefore(date, start) ? date : start;
    const laterDate = isBefore(date, start) ? start : date;

    return !isBefore(hoveredDate.value, earlierDate) && !isBefore(laterDate, hoveredDate.value);
  }

  return false;
};

const hasSelectedRange = computed(() => !isNullish(modelValue.value.start) && !isNullish(modelValue.value.end));

const isStartDateDisabled = computed(() => {
  if (!modelValue.value.start) {
    return false;
  }

  return isDateDisabled(modelValue.value.start);
});

const isEndDateDisabled = computed(() => {
  if (!modelValue.value.end) {
    return false;
  }

  return isDateDisabled(modelValue.value.end);
});

const isPlaceholderFocusable = computed(() => {
  return !isDateDisabled(placeholder.value);
});

watch(locale, value => {
  if (formatter.getLocale() !== value) {
    formatter.setLocale(value);
  }
});

watch(
  () => modelValue.value.start,
  value => {
    if (!isNullish(value) && placeholder.value.compare(value) !== 0) {
      placeholder.value = value.copy();
    }
  }
);

const onRangeChange = (range: DateRange) => {
  modelValue.value = range;
  if (range.start && range.end) {
    open.value = false;
  }
};

const onPlaceholderChange = (date: DateValue) => {
  placeholder.value = date.copy();
};

const setHoveredDate = (date: DateValue | undefined) => {
  hoveredDate.value = date;
};

provideDateRangePickerRootContext({
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
  hasSelectedRange,
  isStartDateDisabled,
  isEndDateDisabled,
  minValue,
  maxValue,
  onRangeChange,
  onPlaceholderChange,
  isDateDisabled,
  isDateSelected,
  isDateHovered,
  setOpen(value: boolean) {
    open.value = value;
  },
  setHoveredDate,
  hoveredDate
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
    <slot
      :model-value="modelValue"
      :open="Boolean(open)"
      :placeholder="placeholder"
      :set-placeholder="onPlaceholderChange"
      :set-range="onRangeChange"
    />
  </Primitive>
</template>
