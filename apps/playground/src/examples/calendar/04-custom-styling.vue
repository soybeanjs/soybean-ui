<script setup lang="ts">
import { SCalendar } from '@soybeanjs/ui';
import { CalendarDate } from '@internationalized/date';
</script>

<template>
  <SCalendar
    :default-placeholder="new CalendarDate(2026, 4, 18)"
    :ui="{
      root: 'rounded-lg border border-border p-4 shadow-sm',
      cellTrigger: 'data-[today]:border data-[today]:border-primary data-[selected]:rounded-full'
    }"
  />
</template>
