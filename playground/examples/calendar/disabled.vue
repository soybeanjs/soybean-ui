<script setup lang="ts">
import type { DateValue } from '@internationalized/date';

import { CalendarDate } from '@internationalized/date';

import { SCalendar } from '@soybeanjs/ui';

const today = new CalendarDate(2026, 4, 18);
const isDateDisabled = (date: DateValue) => date.day % 2 === 0;
</script>

<template>
  <div>
    <h3 class="playground-title">Disabled Dates</h3>
    <SCalendar :default-placeholder="today" :is-date-disabled="isDateDisabled" />
  </div>
</template>
