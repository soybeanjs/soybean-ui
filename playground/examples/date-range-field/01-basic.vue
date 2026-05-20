<script setup lang="ts">
import { shallowRef } from 'vue';
import { SDateRangeField } from '@soybeanjs/ui';
import { CalendarDate } from '@internationalized/date';

const value = shallowRef({
  start: new CalendarDate(2026, 4, 19),
  end: new CalendarDate(2026, 4, 26)
});
</script>

<template>
  <SDateRangeField v-model="value" aria-label="Date range" />
  <div class="text-xs text-muted-foreground">
    Selected: {{ value.start?.toString() }} to {{ value.end?.toString() }}
  </div>
</template>
