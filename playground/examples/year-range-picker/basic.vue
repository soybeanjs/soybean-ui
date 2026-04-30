<script setup lang="ts">
import { CalendarDate } from '@internationalized/date';
import { shallowRef } from 'vue';

import { SYearRangePicker } from '@soybeanjs/ui';

const value = shallowRef({
  start: new CalendarDate(2024, 1, 1),
  end: new CalendarDate(2026, 1, 1)
});
</script>

<template>
  <div class="flex-c gap-3">
    <h3 class="playground-title">Basic</h3>
    <SYearRangePicker v-model="value" class="w-90 lt-md:w-auto" aria-label="Project year range" />
  </div>
</template>
