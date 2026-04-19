<script setup lang="ts">
import { CalendarDateTime } from '@internationalized/date';
import { shallowRef } from 'vue';
import { SDateRangeField } from '@soybeanjs/ui';

const value = shallowRef({
  start: new CalendarDateTime(2026, 4, 19, 9, 0),
  end: new CalendarDateTime(2026, 4, 19, 17, 30)
});
</script>

<template>
  <div class="flex-c gap-2">
    <h3 class="playground-title">With Time</h3>
    <SDateRangeField v-model="value" class="w-100 lt-md:w-auto" granularity="minute" aria-label="Date range with time" />
    <div class="text-xs text-muted-foreground">
      Selected: {{ value.start?.toString() }} to {{ value.end?.toString() }}
    </div>
  </div>
</template>
