<script setup lang="ts">
import { computed, onMounted, ref, toRefs, watch } from 'vue';
import type { Ref } from 'vue';
import { useEventListener, useVModel } from '@vueuse/core';
import { isEqualDay } from '@internationalized/date';
import { isNullish } from '../../shared';
import { getDefaultDate, handleCalendarInitialFocus, isBefore } from '../../date';
import type { DateRange, DateValue } from '../../date';
import {
  useCalendar,
  useDirection,
  useKbd,
  useLocale,
  usePrimitiveElement,
  useRangeCalendarState
} from '../../composables';
import { Primitive } from '../primitive';
import { provideRangeCalendarRootContext } from './context';
import type { RangeCalendarRootEmits, RangeCalendarRootPropsWithPrimitive } from './types';

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
  isDateHighlightable: undefined,
  allowNonContiguousRanges: false,
  maximumDays: undefined,
  disableDaysOutsideCurrentView: false
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
  isDateHighlightable: propsIsDateHighlightable,
  calendarLabel,
  maxValue,
  minValue,
  dir: propDir,
  locale: propLocale,
  nextPage: propsNextPage,
  prevPage: propsPrevPage,
  allowNonContiguousRanges,
  fixedDate,
  maximumDays,
  disableDaysOutsideCurrentView
} = toRefs(props);

const { primitiveElement, currentElement: parentElement } = usePrimitiveElement();
const dir = useDirection(propDir);
const locale = useLocale(propLocale);

const lastPressedDateValue = ref() as Ref<DateValue | undefined>;
const focusedValue = ref() as Ref<DateValue | undefined>;
const isEditing = ref(false);

const modelValue = useVModel(props, 'modelValue', emit, {
  defaultValue: props.defaultValue,
  passive: (props.modelValue === undefined) as false
}) as Ref<DateRange>;

const currentModelValue = computed(() =>
  isNullish(modelValue.value) ? { start: undefined, end: undefined } : modelValue.value
);

const defaultDate = getDefaultDate({
  defaultPlaceholder: props.placeholder,
  defaultValue: currentModelValue.value.start,
  locale: props.locale
});

const startValue = ref(currentModelValue.value.start) as Ref<DateValue | undefined>;
const endValue = ref(currentModelValue.value.end) as Ref<DateValue | undefined>;

const placeholder = useVModel(props, 'placeholder', emit, {
  defaultValue: props.defaultPlaceholder ?? defaultDate.copy(),
  passive: (props.placeholder === undefined) as false
}) as Ref<DateValue>;

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
  isDateHighlightable,
  highlightedRange,
  isSelectionStart,
  isSelectionEnd,
  isHighlightedStart,
  isHighlightedEnd,
  isDateDisabled: rangeIsDateDisabled
} = useRangeCalendarState({
  start: startValue,
  end: endValue,
  isDateDisabled,
  isDateUnavailable,
  isDateHighlightable: propsIsDateHighlightable.value,
  focusedValue,
  allowNonContiguousRanges,
  fixedDate,
  maximumDays
});

// eslint-disable-next-line complexity
watch(modelValue, (_modelValue, _prevValue) => {
  if (
    (!_prevValue?.start && _modelValue?.start) ||
    !_modelValue ||
    !_modelValue.start ||
    (startValue.value && !isEqualDay(_modelValue.start, startValue.value))
  ) {
    startValue.value = _modelValue?.start?.copy?.();
  }

  if (
    (!_prevValue?.end && _modelValue.end) ||
    !_modelValue ||
    !_modelValue.end ||
    (endValue.value && !isEqualDay(_modelValue.end, endValue.value))
  ) {
    endValue.value = _modelValue?.end?.copy?.();
  }
});

watch(startValue, _startValue => {
  if (_startValue && !isEqualDay(_startValue, placeholder.value)) onPlaceholderChange(_startValue);

  emit('update:startValue', _startValue);
});

watch([startValue, endValue], ([_startValue, _endValue]) => {
  const value = currentModelValue.value;

  if (
    value &&
    value.start &&
    value.end &&
    _startValue &&
    _endValue &&
    isEqualDay(value.start, _startValue) &&
    isEqualDay(value.end, _endValue)
  ) {
    return;
  }

  isEditing.value = true;

  if (_startValue && _endValue) {
    isEditing.value = false;

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
  }
});

const kbd = useKbd();
useEventListener('keydown', ev => {
  if (ev.key === kbd.ESCAPE && isEditing.value) {
    // Abort start and end selection
    startValue.value = modelValue.value.start?.copy();
    endValue.value = modelValue.value.end?.copy();
  }
});

provideRangeCalendarRootContext({
  isDateUnavailable,
  isDateHighlightable,
  startValue,
  endValue,
  formatter,
  modelValue,
  placeholder,
  disabled,
  initialFocus,
  pagedNavigation,
  grid,
  weekDays: weekdays,
  weekStartsOn,
  weekdayFormat,
  fixedWeeks,
  numberOfMonths,
  readonly,
  preventDeselect,
  fullCalendarLabel,
  headingValue,
  isInvalid,
  isDateDisabled: rangeIsDateDisabled,
  allowNonContiguousRanges,
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
  isHighlightedEnd,
  disableDaysOutsideCurrentView,
  fixedDate,
  maximumDays
});

onMounted(() => {
  if (initialFocus.value) {
    handleCalendarInitialFocus(parentElement.value);
  }
});
</script>

<template>
  <Primitive
    ref="primitiveElement"
    :class="props.class"
    :as="as"
    :as-child="asChild"
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
      :model-value="modelValue"
    />
  </Primitive>
</template>
