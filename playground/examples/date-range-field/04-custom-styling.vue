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
  <SDateRangeField
    v-model="value"
    size="lg"
    separator="→"
    aria-label="Styled date range"
    :ui="{
      root: 'border-2 border-primary/30',
      input: 'text-primary',
      separator: 'text-primary'
    }"
  />
</template>
