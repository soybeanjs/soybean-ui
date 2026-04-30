<script setup lang="ts">
import { CalendarDate } from '@internationalized/date';

import { SYearRangePicker } from '@soybeanjs/ui';

const value = {
  start: new CalendarDate(2022, 1, 1),
  end: new CalendarDate(2025, 1, 1)
};
const sizes = ['xs', 'sm', 'md', 'lg'] as const;
</script>

<template>
  <div class="flex-c gap-3">
    <h3 class="playground-title">Size</h3>
    <div class="flex flex-wrap gap-3">
      <SYearRangePicker v-for="size in sizes" :key="size" class="w-90 lt-md:w-auto" :default-value="value" :size="size" aria-label="Project year range" />
    </div>
  </div>
</template>
