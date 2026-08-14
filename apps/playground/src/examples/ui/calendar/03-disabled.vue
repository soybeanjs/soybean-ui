<script setup lang="ts">
import { SCalendar } from '@soybeanjs/ui';
import { CalendarDate } from '@internationalized/date';
import type { DateValue } from '@internationalized/date';

const today = new CalendarDate(2026, 4, 18);
const isDateDisabled = (date: DateValue) => date.day % 2 === 0;
</script>

<template>
  <SCalendar :default-placeholder="today" :is-date-disabled="isDateDisabled" />
</template>
