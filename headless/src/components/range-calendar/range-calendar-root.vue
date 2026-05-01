<script setup lang="ts">
import { isSameDay } from '@internationalized/date';
import { computed, onMounted, shallowRef, watch } from 'vue';
import { useControllableState, useForwardElement } from '../../composables';
import { getDefaultDate, getWeekStartsOn, handleCalendarInitialFocus, isBefore, useDateFormatter } from '../../date';
import type { DateRange, DateValue } from '../../date';
import { transformPropsToContext } from '../../shared';
import { useDirection, useLocale } from '../config-provider/context';
import { Primitive } from '../primitive';
import { useCalendar } from '../calendar/use-calendar';
import { provideRangeCalendarRootContext, useRangeCalendarUi } from './context';
import type { RangeCalendarRootEmits, RangeCalendarRootProps } from './types';
import { useRangeCalendarState } from './use-range-calendar';

defineOptions({
  name: 'RangeCalendarRoot'
});

const props = withDefaults(defineProps<RangeCalendarRootProps>(), {
  defaultValue: () => ({ start: undefined, end: undefined }),
  defaultPlaceholder: undefined,
  placeholder: undefined,
  allowNonContiguousRanges: false,
  pagedNavigation: false,
  preventDeselect: false,
  weekdayFormat: 'narrow',
  fixedWeeks: false,
  numberOfMonths: 1,
  disabled: false,
  readonly: false,
  initialFocus: false,
  isDateDisabled: undefined,
  isDateUnavailable: undefined,
  isDateHighlightable: undefined,
  maximumDays: undefined,
  disableDaysOutsideCurrentView: false,
  fixedDate: undefined
});

const emit = defineEmits<RangeCalendarRootEmits>();

defineSlots<{
  default?: (props: {
    date: DateValue;
    grid: ReturnType<typeof useCalendar>['grid']['value'];
    weekDays: string[];
    weekStartsOn: number;
    locale: string;
    fixedWeeks: boolean;
    modelValue: DateRange;
  }) => any;
}>();

const cls = useRangeCalendarUi('root');
const [parentElement, setParentElement] = useForwardElement();

const locale = useLocale(() => props.locale);
const dir = useDirection(() => props.dir);
const weekStartsOn = computed(() => props.weekStartsOn ?? getWeekStartsOn(locale.value));
const formatter = useDateFormatter(locale.value);

const modelValue = useControllableState<DateRange>(
  () => props.modelValue as DateRange,
  value => {
    emit('update:modelValue', value);
    emit('update:startValue', value.start);
  },
  props.defaultValue ?? {}
);

const defaultDate = getDefaultDate({
  defaultPlaceholder: props.placeholder,
  defaultValue: modelValue.value.start,
  locale: props.locale
});

const placeholder = useControllableState<DateValue>(
  () => props.placeholder as DateValue,
  value => {
    emit('update:placeholder', value);
  },
  props.defaultPlaceholder ?? defaultDate.copy()
);

const startValue = computed(() => modelValue.value.start);
const endValue = computed(() => modelValue.value.end);
const hoveredDate = shallowRef<DateValue | undefined>();

const {
  fullCalendarLabel,
  headingValue,
  isDateDisabled,
  isDateUnavailable,
  isNextButtonDisabled,
  isPrevButtonDisabled,
  weekdays,
  isOutsideVisibleView,
  nextPage,
  prevPage,
  grid,
  isPlaceholderFocusable,
  firstFocusableDate
} = useCalendar({
  locale,
  placeholder,
  weekStartsOn,
  fixedWeeks: computed(() => props.fixedWeeks),
  numberOfMonths: computed(() => props.numberOfMonths),
  minValue: computed(() => props.minValue),
  maxValue: computed(() => props.maxValue),
  disabled: computed(() => props.disabled),
  weekdayFormat: computed(() => props.weekdayFormat),
  pagedNavigation: computed(() => props.pagedNavigation),
  isDateDisabled: props.isDateDisabled,
  isDateUnavailable: props.isDateUnavailable,
  calendarLabel: computed(() => props.calendarLabel),
  nextPage: computed(() => props.nextPage),
  prevPage: computed(() => props.prevPage)
});

const {
  highlightedRange,
  isDateSelected,
  isSelectionStart,
  isSelectionEnd,
  isHighlightedStart,
  isHighlightedEnd,
  hasSelectedDate,
  isSelectedDateDisabled,
  selectedFocusableDate,
  isInvalid,
  sortRange,
  getInclusiveRangeDays
} = useRangeCalendarState({
  start: startValue,
  end: endValue,
  hoveredDate,
  isDateDisabled,
  isDateUnavailable,
  isDateHighlightable: props.isDateHighlightable,
  allowNonContiguousRanges: computed(() => props.allowNonContiguousRanges),
  maximumDays: computed(() => props.maximumDays)
});

watch(locale, value => {
  if (formatter.getLocale() !== value) {
    formatter.setLocale(value);
  }
});

watch(
  () => modelValue.value.start,
  value => {
    if (value && !isSameDay(placeholder.value, value)) {
      placeholder.value = value.copy();
    }
  }
);

function onPlaceholderChange(value: DateValue) {
  placeholder.value = value.copy();
}

function onDateChange(value: DateValue) {
  if (props.readonly || isDateDisabled(value) || isDateUnavailable(value)) {
    return;
  }

  const { start, end } = modelValue.value;

  if (!start) {
    modelValue.value = { start: value.copy(), end: undefined };
    return;
  }

  if (!end) {
    if (!props.preventDeselect && isSameDay(start, value)) {
      modelValue.value = { start: undefined, end: undefined };
      placeholder.value = value.copy();
      hoveredDate.value = undefined;
      return;
    }

    const nextRange = sortRange(start, value);

    if (
      props.maximumDays &&
      nextRange.start &&
      nextRange.end &&
      getInclusiveRangeDays(nextRange.start, nextRange.end) > props.maximumDays
    ) {
      modelValue.value = { start: value.copy(), end: undefined };
      return;
    }

    if (!props.allowNonContiguousRanges && nextRange.start && nextRange.end && isInvalid.value) {
      modelValue.value = { start: value.copy(), end: undefined };
      return;
    }

    modelValue.value = nextRange;
    hoveredDate.value = undefined;
    return;
  }

  if (props.fixedDate === 'start') {
    modelValue.value = isBefore(value, start)
      ? { start: value.copy(), end: start.copy() }
      : { start: start.copy(), end: value.copy() };
    hoveredDate.value = undefined;
    return;
  }

  if (props.fixedDate === 'end') {
    modelValue.value = isBefore(end, value)
      ? { start: end.copy(), end: value.copy() }
      : { start: value.copy(), end: end.copy() };
    hoveredDate.value = undefined;
    return;
  }

  modelValue.value = { start: value.copy(), end: undefined };
  hoveredDate.value = undefined;
}

provideRangeCalendarRootContext({
  locale,
  dir,
  weekStartsOn,
  weekdayFormat: computed(() => props.weekdayFormat),
  modelValue,
  placeholder,
  grid,
  parentElement,
  fullCalendarLabel,
  headingValue,
  isInvalid,
  minValue: computed(() => props.minValue),
  maxValue: computed(() => props.maxValue),
  isPlaceholderFocusable,
  firstFocusableDate,
  hasSelectedDate,
  isSelectedDateDisabled,
  selectedFocusableDate,
  formatter,
  highlightedRange,
  fixedDate: computed(() => props.fixedDate),
  maximumDays: computed(() => props.maximumDays),
  isDateUnavailable: props.isDateUnavailable,
  isDateHighlightable: props.isDateHighlightable,
  onDateChange,
  onPlaceholderChange,
  isDateDisabled,
  isDateSelected,
  isSelectionStart,
  isSelectionEnd,
  isHighlightedStart,
  isHighlightedEnd,
  isOutsideVisibleView,
  setHoveredDate(date) {
    hoveredDate.value = date?.copy();
  },
  hoveredDate,
  prevPage,
  nextPage,
  isPrevButtonDisabled,
  isNextButtonDisabled,
  ...transformPropsToContext(props, [
    'allowNonContiguousRanges',
    'disableDaysOutsideCurrentView',
    'disabled',
    'fixedWeeks',
    'initialFocus',
    'numberOfMonths',
    'pagedNavigation',
    'preventDeselect',
    'readonly'
  ])
});

onMounted(() => {
  if (props.initialFocus && parentElement.value) {
    handleCalendarInitialFocus(parentElement.value);
  }
});
</script>

<template>
  <Primitive
    :ref="setParentElement"
    :as="as"
    :as-child="asChild"
    :aria-label="fullCalendarLabel"
    :class="cls"
    :data-disabled="disabled ? '' : undefined"
    :data-invalid="isInvalid ? '' : undefined"
    :data-readonly="readonly ? '' : undefined"
    :dir="dir"
    data-slot="root"
  >
    <slot
      :date="placeholder"
      :fixed-weeks="fixedWeeks"
      :grid="grid"
      :locale="locale"
      :model-value="modelValue"
      :week-days="weekdays"
      :week-starts-on="weekStartsOn"
    />
  </Primitive>
</template>
