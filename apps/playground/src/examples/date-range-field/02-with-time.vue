<script setup lang="ts">
import { shallowRef } from 'vue';
import { SDateRangeField } from '@soybeanjs/ui';
import { CalendarDateTime } from '@internationalized/date';

const value = shallowRef({
  start: new CalendarDateTime(2026, 4, 19, 9, 0),
  end: new CalendarDateTime(2026, 4, 19, 17, 30)
});
</script>

<template>
  <SDateRangeField v-model="value" granularity="minute" aria-label="Date range with time" />
  <div class="text-xs text-muted-foreground">
    Selected: {{ value.start?.toString() }} to {{ value.end?.toString() }}
  </div>
</template>
