<script setup lang="ts">
import { CalendarDate } from '@internationalized/date';
import { shallowRef } from 'vue';

import { SMonthRangePicker } from '@soybeanjs/ui';

const value = shallowRef({
  start: new CalendarDate(2026, 4, 1),
  end: new CalendarDate(2026, 6, 1)
});
</script>

<template>
  <div class="flex-c gap-3">
    <h3 class="playground-title">Basic</h3>
    <SMonthRangePicker v-model="value" class="w-90 lt-md:w-auto" aria-label="Billing quarter" />
  </div>
</template>
