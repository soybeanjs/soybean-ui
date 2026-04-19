<script setup lang="ts">
import { CalendarDate } from '@internationalized/date';
import { shallowRef } from 'vue';
import { SDateRangeField } from '@soybeanjs/ui';

const value = shallowRef({
  start: new CalendarDate(2026, 4, 19),
  end: new CalendarDate(2026, 4, 26)
});
</script>

<template>
  <div class="flex-c gap-2">
    <h3 class="playground-title">Basic</h3>
    <SDateRangeField v-model="value" class="w-90 lt-md:w-auto" aria-label="Date range" />
    <div class="text-xs text-muted-foreground">
      Selected: {{ value.start?.toString() }} to {{ value.end?.toString() }}
    </div>
  </div>
</template>
