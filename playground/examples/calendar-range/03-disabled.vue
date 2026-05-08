<script setup lang="ts">
import { CalendarDate } from '@internationalized/date';
import type { DateValue } from '@internationalized/date';
import { SCalendarRange } from '@soybeanjs/ui';

const value = {
  start: new CalendarDate(2026, 4, 18),
  end: new CalendarDate(2026, 4, 22)
};

const isDateDisabled = (date: DateValue) => date.day === 20;
</script>

<template>
  <SCalendarRange :model-value="value" :default-placeholder="value.start" :is-date-disabled="isDateDisabled" />
</template>
