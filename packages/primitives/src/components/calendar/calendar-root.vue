<script setup lang="ts">
import { onMounted, toRefs, watch } from 'vue';
import type { WritableComputedRef } from 'vue';
import { useVModel } from '@vueuse/core';
import { isEqualDay, isSameDay } from '@internationalized/date';
import { getDefaultDate, handleCalendarInitialFocus } from '../../date';
import type { DateValue } from '../../date';
import { useCalendar, useCalendarState, useDirection, useLocale, usePrimitiveElement } from '../../composables';
import { Primitive } from '../primitive';
import { provideCalendarRootContext } from './context';
import type { CalendarRootEmits, CalendarRootPropsWithPrimitive } from './types';

defineOptions({
  name: 'CalendarRoot'
});

const props = withDefaults(defineProps<CalendarRootPropsWithPrimitive>(), {
  as: 'div',
  defaultValue: undefined,
  modelValue: undefined,
  pagedNavigation: false,
  preventDeselect: false,
  weekStartsOn: 0,
  weekdayFormat: 'narrow',
  fixedWeeks: false,
  multiple: false,
  numberOfMonths: 1,
  disabled: false,
  readonly: false,
  initialFocus: false,
  placeholder: undefined,
  isDateDisabled: undefined,
  isDateUnavailable: undefined,
  disableDaysOutsideCurrentView: false
});

const emit = defineEmits<CalendarRootEmits>();

const { primitiveElement, currentElement: parentElement } = usePrimitiveElement();

const {
  disabled,
  readonly,
  initialFocus,
  pagedNavigation,
  weekStartsOn,
  weekdayFormat,
  fixedWeeks,
  multiple,
  minValue,
  maxValue,
  numberOfMonths,
  preventDeselect,
  isDateDisabled: propsIsDateDisabled,
  isDateUnavailable: propsIsDateUnavailable,
  calendarLabel,
  defaultValue,
  nextPage: propsNextPage,
  prevPage: propsPrevPage,
  dir: propDir,
  locale: propLocale,
  disableDaysOutsideCurrentView
} = toRefs(props);

const locale = useLocale(propLocale);
const dir = useDirection(propDir);

const modelValue = useVModel(props, 'modelValue', emit, {
  defaultValue: defaultValue.value,
  passive: (props.modelValue === undefined) as false
});

const defaultDate = getDefaultDate({
  defaultPlaceholder: props.placeholder,
  defaultValue: modelValue.value,
  locale: props.locale
});

const placeholder = useVModel(props, 'placeholder', emit, {
  defaultValue: props.defaultPlaceholder ?? defaultDate.copy(),
  passive: (props.placeholder === undefined) as false
}) as WritableComputedRef<DateValue>;

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
  weekdays,
  isOutsideVisibleView,
  nextPage,
  prevPage,
  formatter,
  grid
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

const { isInvalid, isDateSelected } = useCalendarState({
  date: modelValue,
  isDateDisabled,
  isDateUnavailable
});

function onDateChange(value: DateValue) {
  if (!multiple.value) {
    if (!modelValue.value) {
      modelValue.value = value.copy();
      return;
    }

    if (!preventDeselect.value && isEqualDay(modelValue.value as DateValue, value)) {
      placeholder.value = value.copy();
      modelValue.value = undefined;
    } else {
      modelValue.value = value.copy();
    }
  } else if (!modelValue.value) {
    modelValue.value = [value.copy()];
  } else if (Array.isArray(modelValue.value)) {
    const index = modelValue.value.findIndex(date => isSameDay(date, value));
    if (index === -1) {
      modelValue.value = [...modelValue.value, value];
    } else if (!preventDeselect.value) {
      const next = modelValue.value.filter(date => !isSameDay(date, value));
      if (!next.length) {
        placeholder.value = value.copy();
        modelValue.value = undefined;
        return;
      }
      modelValue.value = next.map(date => date.copy());
    }
  }
}

watch(modelValue, _modelValue => {
  if (Array.isArray(_modelValue) && _modelValue.length) {
    const lastValue = _modelValue[_modelValue.length - 1];
    if (lastValue && !isEqualDay(placeholder.value, lastValue)) onPlaceholderChange(lastValue);
  } else if (!Array.isArray(_modelValue) && _modelValue && !isEqualDay(placeholder.value, _modelValue)) {
    onPlaceholderChange(_modelValue);
  }
});

onMounted(() => {
  if (initialFocus.value) handleCalendarInitialFocus(parentElement.value);
});

provideCalendarRootContext({
  isDateUnavailable,
  dir,
  isDateDisabled,
  locale,
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
  multiple,
  numberOfMonths,
  readonly,
  preventDeselect,
  fullCalendarLabel,
  headingValue,
  isInvalid,
  isDateSelected,
  isNextButtonDisabled,
  isPrevButtonDisabled,
  isOutsideVisibleView,
  nextPage,
  prevPage,
  parentElement,
  onPlaceholderChange,
  onDateChange,
  disableDaysOutsideCurrentView
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
    <slot
      :date="placeholder"
      :grid="grid"
      :week-days="weekdays"
      :week-starts-on="weekStartsOn"
      :locale="locale"
      :fixed-weeks="fixedWeeks"
      :model-value="modelValue"
    />
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
  </Primitive>
</template>
