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
    <h3 class="playground-title">Custom styling</h3>
    <SRangeCalendar
      v-model="value"
      :default-placeholder="value.start"
      :ui="{
        root: 'rounded-xl border border-primary/30 p-4',
        cellTrigger: 'data-[selection-start]:bg-primary data-[selection-end]:bg-primary data-[highlighted]:bg-primary/15'
      }"
    />
  </div>
</template>
