<script setup lang="ts">
import { shallowRef } from 'vue';
import { CalendarDate } from '@internationalized/date';
import { SMonthRangePicker } from '@soybeanjs/ui';

const value = shallowRef({
  start: new CalendarDate(2026, 4, 1),
  end: new CalendarDate(2026, 6, 1)
});
</script>

<template>
  <SMonthRangePicker v-model="value" class="w-90 lt-md:w-auto" aria-label="Billing quarter" />
</template>
