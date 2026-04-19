<script setup lang="ts">
import { CalendarDate } from '@internationalized/date';
import { shallowRef } from 'vue';
import { SRangeCalendar } from '@soybeanjs/ui';

const value = shallowRef({
  start: new CalendarDate(2026, 4, 18),
  end: new CalendarDate(2026, 4, 22)
});
</script>

<template>
  <div class="flex-c gap-3">
    <h3 class="playground-title">Basic</h3>
    <SRangeCalendar v-model="value" :default-placeholder="value.start" />
    <p class="text-sm text-muted-foreground">Range: {{ value.start?.toString() ?? '-' }} ~ {{ value.end?.toString() ?? '-' }}</p>
  </div>
</template>
