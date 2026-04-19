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
    <h3 class="playground-title">Custom Styling</h3>
    <SDateRangeField
      v-model="value"
      size="lg"
      class="max-w-100"
      separator="→"
      aria-label="Styled date range"
      :ui="{
        root: 'border-2 border-primary/30',
        input: 'text-primary',
        separator: 'text-primary'
      }"
    />
  </div>
</template>
