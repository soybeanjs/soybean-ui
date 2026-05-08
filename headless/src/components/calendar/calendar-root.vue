<script setup lang="ts" generic="M extends boolean = false">
import { computed, onMounted, watch } from 'vue';
import { isEqualDay, isSameDay } from '@internationalized/date';
import type { DateValue } from '@internationalized/date';
import { useControllableState, useForwardElement } from '../../composables';
import { getDefaultDate, getWeekStartsOn, handleCalendarInitialFocus } from '../../date';
import { getVueBooleanCasting, transformPropsToContext } from '../../shared';
import { useDirection, useLocale } from '../config-provider/context';
import { Primitive } from '../primitive';
import { VisuallyHidden } from '../visually-hidden';
import { provideCalendarRootContext, useCalendarUi } from './context';
import { useCalendar, useCalendarState } from './use-calendar';
import { getMonthOptions, getYearOptions, handleMonthChange, handleYearChange } from './shared';
import type { CalendarModelValue, CalendarRootEmits, CalendarRootProps, CalendarRootSlots } from './types';

defineOptions({
  name: 'CalendarRoot'
});

const props = withDefaults(defineProps<CalendarRootProps<M>>(), {
  defaultValue: undefined,
  defaultPlaceholder: undefined,
  placeholder: undefined,
  weekdayFormat: 'narrow',
  numberOfMonths: 1,
  isDateDisabled: undefined,
  isDateUnavailable: undefined
});

const emit = defineEmits<CalendarRootEmits<M>>();

defineSlots<CalendarRootSlots<M>>();

const cls = useCalendarUi('root');
const [parentElement, setParentElement] = useForwardElement();

const locale = useLocale(() => props.locale);
const dir = useDirection(() => props.dir);
const weekStartsOn = computed(() => props.weekStartsOn ?? getWeekStartsOn(locale.value));
const multiple = computed(() => getVueBooleanCasting(props.multiple));

const modelValue = useControllableState(
  () => props.modelValue,
  value => {
    emit('update:modelValue', value);
  },
  props.defaultValue,
  true
);

const defaultDate = getDefaultDate({
  defaultPlaceholder: props.placeholder,
  defaultValue: modelValue.value as DateValue | DateValue[] | undefined,
  locale: props.locale
});

const placeholder = useControllableState(
  () => props.placeholder,
  value => {
    emit('update:placeholder', value);
  },
  props.defaultPlaceholder ?? defaultDate.copy()
);

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

const { isInvalid, isDateSelected, hasSelectedDate, isSelectedDateDisabled } = useCalendarState({
  date: modelValue,
  isDateDisabled,
  isDateUnavailable
});

const monthOptions = computed(() =>
  getMonthOptions({
    placeholder: placeholder.value,
    disabled: props.disabled,
    minValue: props.minValue,
    maxValue: props.maxValue,
    formatter
  })
);

const onMonthChange = (month?: number) => {
  handleMonthChange(month, {
    placeholder: placeholder.value,
    disabled: props.disabled,
    minValue: props.minValue,
    maxValue: props.maxValue,
    onPlaceholderChange
  });
};

const onYearChange = (year?: number) => {
  handleYearChange(year, {
    placeholder: placeholder.value,
    minValue: props.minValue,
    maxValue: props.maxValue,
    onPlaceholderChange
  });
};

const yearOptions = computed(() =>
  getYearOptions({
    placeholder: placeholder.value,
    minValue: props.minValue,
    maxValue: props.maxValue
  })
);

watch(modelValue, value => {
  if (Array.isArray(value) && value.length) {
    const lastValue = value.at(-1);
    if (lastValue && !isEqualDay(placeholder.value, lastValue)) {
      placeholder.value = lastValue.copy();
    }
    return;
  }

  if (!Array.isArray(value) && value && !isEqualDay(placeholder.value, value)) {
    placeholder.value = value.copy();
  }
});

function onPlaceholderChange(value: DateValue) {
  placeholder.value = value.copy();
}

function onDateChange(value: DateValue) {
  if (props.readonly) {
    return;
  }

  if (!multiple.value) {
    if (!modelValue.value) {
      modelValue.value = value.copy() as CalendarModelValue<M>;
      return;
    }

    if (!props.preventDeselect && isSameDay(modelValue.value as DateValue, value)) {
      placeholder.value = value.copy();
      modelValue.value = undefined;
      return;
    }

    modelValue.value = value.copy() as CalendarModelValue<M>;
    return;
  }

  if (!modelValue.value) {
    modelValue.value = [value.copy()] as CalendarModelValue<M>;
    return;
  }

  if (Array.isArray(modelValue.value)) {
    const index = modelValue.value.findIndex(date => isSameDay(date, value));

    if (index === -1) {
      modelValue.value = [...modelValue.value, value.copy()] as CalendarModelValue<M>;
      return;
    }

    if (!props.preventDeselect) {
      const nextValue = modelValue.value.filter(date => !isSameDay(date, value)).map(date => date.copy());

      if (!nextValue.length) {
        placeholder.value = value.copy();
        modelValue.value = undefined;
        return;
      }

      modelValue.value = nextValue as CalendarModelValue<M>;
    }
  }
}

provideCalendarRootContext({
  locale,
  dir,
  weekStartsOn,
  weekdayFormat: computed(() => props.weekdayFormat),
  modelValue,
  multiple,
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
  formatter,
  onDateChange,
  onPlaceholderChange,
  isDateDisabled,
  isDateSelected,
  isDateUnavailable,
  isOutsideVisibleView,
  prevPage,
  nextPage,
  isPrevButtonDisabled,
  isNextButtonDisabled,
  ...transformPropsToContext(props, [
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
      :disabled="disabled"
      :formatter="formatter"
      :heading-value="headingValue"
      :fixed-weeks="fixedWeeks"
      :grid="grid"
      :locale="locale"
      :max-value="maxValue"
      :min-value="minValue"
      :model-value="modelValue"
      :on-placeholder-change="onPlaceholderChange"
      :placeholder="placeholder"
      :week-days="weekdays"
      :week-starts-on="weekStartsOn"
      :year-options="yearOptions"
      :on-year-change="onYearChange"
      :month-options="monthOptions"
      :on-month-change="onMonthChange"
    />
    <VisuallyHidden as="span" feature="fully-hidden">
      <span aria-level="2" role="heading">{{ fullCalendarLabel }}</span>
    </VisuallyHidden>
  </Primitive>
</template>
