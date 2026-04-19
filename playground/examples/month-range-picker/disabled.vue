<script setup lang="ts">
import { CalendarDate } from '@internationalized/date';

import { SMonthRangePicker } from '@soybeanjs/ui';

const value = {
  start: new CalendarDate(2026, 7, 1),
  end: new CalendarDate(2026, 9, 1)
};
</script>

<template>
  <div class="flex-c gap-3">
    <h3 class="playground-title">Disabled</h3>
    <SMonthRangePicker class="w-90 lt-md:w-auto" :model-value="value" disabled aria-label="Disabled billing quarter" />
  </div>
</template>
