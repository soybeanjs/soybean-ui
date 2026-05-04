<script setup lang="ts">
import { CalendarDate } from '@internationalized/date';
import { SMonthRangePicker } from '@soybeanjs/ui';

const value = {
  start: new CalendarDate(2026, 7, 1),
  end: new CalendarDate(2026, 9, 1)
};
</script>

<template>
  <SMonthRangePicker class="w-90 lt-md:w-auto" :model-value="value" disabled aria-label="Disabled billing quarter" />
</template>
