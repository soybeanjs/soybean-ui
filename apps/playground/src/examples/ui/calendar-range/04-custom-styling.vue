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
  <SCalendarRange
    v-model="value"
    :default-placeholder="value.start"
    :ui="{
      root: 'rounded-xl border border-primary/30 p-4',
      cellTrigger: 'data-[selection-start]:bg-primary data-[selection-end]:bg-primary data-[highlighted]:bg-primary/15'
    }"
  />
</template>
