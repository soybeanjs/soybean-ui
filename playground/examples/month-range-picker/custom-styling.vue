<script setup lang="ts">
import { CalendarDate } from '@internationalized/date';
import { shallowRef } from 'vue';

import { SMonthRangePicker } from '@soybeanjs/ui';

const value = shallowRef({
  start: new CalendarDate(2026, 10, 1),
  end: new CalendarDate(2026, 12, 1)
});
</script>

<template>
  <div class="flex-c gap-3">
    <h3 class="playground-title">Custom styling</h3>
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
  </div>
</template>
