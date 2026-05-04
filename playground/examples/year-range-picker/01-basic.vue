<script setup lang="ts">
import { shallowRef } from 'vue';
import { CalendarDate } from '@internationalized/date';
import { SYearRangePicker } from '@soybeanjs/ui';

const value = shallowRef({
  start: new CalendarDate(2024, 1, 1),
  end: new CalendarDate(2026, 1, 1)
});
</script>

<template>
  <SYearRangePicker v-model="value" class="w-90 lt-md:w-auto" aria-label="Project year range" />
</template>
