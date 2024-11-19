<script setup lang="ts">
import { isEqualDay } from '@internationalized/date';
import CalendarRoot from '../calendar/calendar-root.vue';
import type { DateValue } from '../../date';
import { injectDatePickerRootContext } from './date-picker-root.vue';

defineOptions({
  name: 'DatePickerCalendar'
});

const rootContext = injectDatePickerRootContext();
</script>

<template>
  <CalendarRoot
    v-slot="{ weekDays, grid, date, weekStartsOn, locale, fixedWeeks }"
    v-bind="{
      isDateDisabled: rootContext.isDateDisabled,
      isDateUnavailable: rootContext.isDateUnavailable,
      minValue: rootContext.minValue.value,
      maxValue: rootContext.maxValue.value,
      locale: rootContext.locale.value,
      disabled: rootContext.disabled.value,
      pagedNavigation: rootContext.pagedNavigation.value,
      weekStartsOn: rootContext.weekStartsOn.value,
      weekdayFormat: rootContext.weekdayFormat.value,
      fixedWeeks: rootContext.fixedWeeks.value,
      numberOfMonths: rootContext.numberOfMonths.value,
      readonly: rootContext.readonly.value,
      preventDeselect: rootContext.preventDeselect.value,
      dir: rootContext.dir.value
    }"
    :model-value="rootContext.modelValue.value"
    :placeholder="rootContext.placeholder.value"
    initial-focus
    :multiple="false"
    @update:model-value="
      (date: DateValue | undefined) => {
        if (date && rootContext.modelValue.value && isEqualDay(date, rootContext.modelValue.value)) return;
        rootContext.onDateChange(date);
      }
    "
    @update:placeholder="
      (date: DateValue) => {
        if (isEqualDay(date, rootContext.placeholder.value)) return;
        rootContext.onPlaceholderChange(date);
      }
    "
  >
    <slot
      :date="date"
      :grid="grid"
      :week-days="weekDays"
      :week-starts-on="weekStartsOn"
      :locale="locale"
      :fixed-weeks="fixedWeeks"
    />
  </CalendarRoot>
</template>
