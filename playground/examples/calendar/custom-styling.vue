<script setup lang="ts">
import { CalendarDate } from '@internationalized/date';

import { SCalendar } from '@soybeanjs/ui';
</script>

<template>
  <div>
    <h3 class="playground-title">Custom Styling</h3>
    <SCalendar
      :default-placeholder="new CalendarDate(2026, 4, 18)"
      :ui="{
        root: 'rounded-lg border border-border p-4 shadow-sm',
        header: 'mb-2',
        cellTrigger: 'data-[today]:border data-[today]:border-primary data-[selected]:rounded-full'
      }"
    />
  </div>
</template>
