<script setup lang="ts">
import { onMounted, ref, toRefs, watch } from 'vue';
import type { Ref } from 'vue';
import { isEqualDay } from '@internationalized/date';
import type { DateRange, DateValue } from '../../date';
import { useCalendar, useDirection, useLocale, usePrimitiveElement, useRangeCalendarState } from '../../composables';
import { Primitive } from '../primitive';
import { getDefaultDate, handleCalendarInitialFocus, isBefore } from '../../date';
import type { RangeCalendarRootEmits, RangeCalendarRootPropsWithPrimitive } from './types';
import { provideRangeCalendarRootContext } from './context';

defineOptions({
  name: 'RangeCalendarRoot'
});

const props = withDefaults(defineProps<RangeCalendarRootPropsWithPrimitive>(), {
  defaultValue: () => ({ start: undefined, end: undefined }),
  as: 'div',
  pagedNavigation: false,
  preventDeselect: false,
  weekStartsOn: 0,
  weekdayFormat: 'narrow',
  fixedWeeks: false,
  numberOfMonths: 1,
  disabled: false,
  readonly: false,
  initialFocus: false,
  placeholder: undefined,
  isDateDisabled: undefined,
  isDateUnavailable: undefined,
  allowNonContiguousRanges: false
});
const emit = defineEmits<RangeCalendarRootEmits>();

const {
  disabled,
  readonly,
  initialFocus,
  pagedNavigation,
  weekStartsOn,
  weekdayFormat,
  fixedWeeks,
  numberOfMonths,
  preventDeselect,
  isDateUnavailable: propsIsDateUnavailable,
  isDateDisabled: propsIsDateDisabled,
  calendarLabel,
  maxValue,
  minValue,
  dir: propDir,
  locale: propLocale,
  nextPage: propsNextPage,
  prevPage: propsPrevPage,
  allowNonContiguousRanges
} = toRefs(props);

const { primitiveElement, currentElement: parentElement } = usePrimitiveElement();
const dir = useDirection(propDir);
const locale = useLocale(propLocale);

const lastPressedDateValue = ref() as Ref<DateValue | undefined>;
const focusedValue = ref() as Ref<DateValue | undefined>;

const modelValue = defineModel<DateRange>('modelValue', {
  default: props.defaultValue ?? { start: undefined, end: undefined }
});

const defaultDate = getDefaultDate({
  defaultPlaceholder: props.placeholder,
  defaultValue: modelValue.value.start
});

const startValue = ref(modelValue.value.start) as Ref<DateValue | undefined>;
const endValue = ref(modelValue.value.end) as Ref<DateValue | undefined>;

const placeholder = defineModel<DateValue>('placeholder', {
  default: props.defaultPlaceholder ?? defaultDate.copy()
});

function onPlaceholderChange(value: DateValue) {
  placeholder.value = value.copy();
}

const {
  fullCalendarLabel,
  headingValue,
  isDateDisabled,
  isDateUnavailable,
  isNextButtonDisabled,
  isPrevButtonDisabled,
  grid,
  weekdays,
  isOutsideVisibleView,
  nextPage,
  prevPage,
  formatter
} = useCalendar({
  locale,
  placeholder,
  weekStartsOn,
  fixedWeeks,
  numberOfMonths,
  minValue,
  maxValue,
  disabled,
  weekdayFormat,
  pagedNavigation,
  isDateDisabled: propsIsDateDisabled.value,
  isDateUnavailable: propsIsDateUnavailable.value,
  calendarLabel,
  nextPage: propsNextPage,
  prevPage: propsPrevPage
});

const {
  isInvalid,
  isSelected,
  highlightedRange,
  isSelectionStart,
  isSelectionEnd,
  isHighlightedStart,
  isHighlightedEnd
} = useRangeCalendarState({
  start: startValue,
  end: endValue,
  isDateDisabled,
  isDateUnavailable,
  focusedValue,
  allowNonContiguousRanges
});

watch(modelValue, _modelValue => {
  if (_modelValue.start) {
    if (!startValue.value || !isEqualDay(startValue.value, _modelValue.start))
      startValue.value = _modelValue.start.copy();
  }
  if (_modelValue.end) {
    if (!endValue.value || !isEqualDay(endValue.value, _modelValue.end)) endValue.value = _modelValue.end.copy();
  }
});

watch(startValue, _startValue => {
  if (_startValue && !isEqualDay(_startValue, placeholder.value)) onPlaceholderChange(_startValue);

  emit('update:startValue', _startValue);
});

watch([startValue, endValue], ([_startValue, _endValue]) => {
  const value = modelValue.value;

  if (
    value &&
    value.start &&
    value.end &&
    _startValue &&
    _endValue &&
    isEqualDay(value.start, _startValue) &&
    isEqualDay(value.end, _endValue)
  )
    return;

  if (_startValue && _endValue) {
    if (value.start && value.end && isEqualDay(value.start, _startValue) && isEqualDay(value.end, _endValue)) return;
    if (isBefore(_endValue, _startValue)) {
      modelValue.value = {
        start: _endValue.copy(),
        end: _startValue.copy()
      };
    } else {
      modelValue.value = {
        start: _startValue.copy(),
        end: _endValue.copy()
      };
    }
  } else if (value.start && value.end) {
    modelValue.value = {
      start: undefined,
      end: undefined
    };
  }
});

provideRangeCalendarRootContext({
  isDateUnavailable,
  startValue,
  endValue,
  formatter,
  modelValue,
  placeholder,
  disabled,
  initialFocus,
  pagedNavigation,
  weekStartsOn,
  weekdayFormat,
  fixedWeeks,
  numberOfMonths,
  readonly,
  preventDeselect,
  fullCalendarLabel,
  headingValue,
  isInvalid,
  isDateDisabled,
  highlightedRange,
  focusedValue,
  lastPressedDateValue,
  isSelected,
  isSelectionEnd,
  isSelectionStart,
  isNextButtonDisabled,
  isPrevButtonDisabled,
  isOutsideVisibleView,
  nextPage,
  prevPage,
  parentElement,
  onPlaceholderChange,
  locale,
  dir,
  isHighlightedStart,
  isHighlightedEnd
});

onMounted(() => {
  if (initialFocus.value) handleCalendarInitialFocus(parentElement.value);
});
</script>

<template>
  <Primitive
    ref="primitiveElement"
    :as
    :as-child
    role="application"
    :aria-label="fullCalendarLabel"
    :data-readonly="readonly ? '' : undefined"
    :data-disabled="disabled ? '' : undefined"
    :data-invalid="isInvalid ? '' : undefined"
    :dir="dir"
  >
    <div
      style="
        border: 0px;
        clip: rect(0px, 0px, 0px, 0px);
        clip-path: inset(50%);
        height: 1px;
        margin: -1px;
        overflow: hidden;
        padding: 0px;
        position: absolute;
        white-space: nowrap;
        width: 1px;
      "
    >
      <div role="heading" aria-level="2">
        {{ fullCalendarLabel }}
      </div>
    </div>

    <slot
      :date="placeholder"
      :grid="grid"
      :week-days="weekdays"
      :week-starts-on="weekStartsOn"
      :locale="locale"
      :fixed-weeks="fixedWeeks"
    />
  </Primitive>
</template>
