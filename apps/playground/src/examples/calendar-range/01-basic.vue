<script setup lang="ts">
import { shallowRef } from 'vue';
import { SCalendarRange } from '@soybeanjs/ui';
import { CalendarDate } from '@internationalized/date';

const value = shallowRef({
  start: new CalendarDate(2026, 4, 18),
  end: new CalendarDate(2026, 4, 22)
});
</script>

<template>
  <SCalendarRange v-model="value" :default-placeholder="value.start" />
  <p class="text-sm text-muted-foreground">
    Range: {{ value.start?.toString() ?? '-' }} ~ {{ value.end?.toString() ?? '-' }}
  </p>
</template>
