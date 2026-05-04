<script setup lang="ts">
import { shallowRef } from 'vue';
import { CalendarDate } from '@internationalized/date';
import { SMonthRangePicker } from '@soybeanjs/ui';

const value = shallowRef({
  start: new CalendarDate(2026, 10, 1),
  end: new CalendarDate(2026, 12, 1)
});
</script>

<template>
  <SMonthRangePicker
    v-model="value"
    class="w-90 lt-md:w-auto"
    aria-label="Styled billing quarter"
    :ui="{
      trigger: 'border-primary/40 bg-primary/4',
      popup: 'border-primary/30',
      cellTrigger: 'data-[range-start]:bg-primary/90 data-[range-end]:bg-primary/90'
    }"
  />
</template>
