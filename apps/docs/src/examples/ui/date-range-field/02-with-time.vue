<script setup lang="ts">
import { shallowRef } from 'vue';
import { createDate, createTime } from '@vean/aria/date';
import { SDateRangeField } from '@vean/ui';

const value = shallowRef({
  start: { date: createDate(2026, 4, 19), time: createTime(9, 0) },
  end: { date: createDate(2026, 4, 19), time: createTime(17, 30) }
});
</script>

<template>
  <SDateRangeField v-model="value" granularity="minute" aria-label="Date range with time" />
  <div class="text-xs text-muted-foreground">
    Selected: {{ value.start?.toString() }} to {{ value.end?.toString() }}
  </div>
</template>
