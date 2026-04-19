<script setup lang="ts">
import type { DateValue } from '@internationalized/date';

import { CalendarDate } from '@internationalized/date';
import { SRangeCalendar } from '@soybeanjs/ui';

const value = {
  start: new CalendarDate(2026, 4, 18),
  end: new CalendarDate(2026, 4, 22)
};

const isDateDisabled = (date: DateValue) => date.day === 20;
</script>

<template>
  <div class="flex-c gap-3">
    <h3 class="playground-title">Disabled days</h3>
    <SRangeCalendar :model-value="value" :default-placeholder="value.start" :is-date-disabled="isDateDisabled" />
  </div>
</template>
