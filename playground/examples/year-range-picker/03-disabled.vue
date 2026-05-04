<script setup lang="ts">
import { CalendarDate } from '@internationalized/date';
import { SYearRangePicker } from '@soybeanjs/ui';

const value = {
  start: new CalendarDate(2021, 1, 1),
  end: new CalendarDate(2023, 1, 1)
};
</script>

<template>
  <SYearRangePicker class="w-90 lt-md:w-auto" :model-value="value" disabled aria-label="Disabled project year range" />
</template>
