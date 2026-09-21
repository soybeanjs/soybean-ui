<script setup lang="ts">
import { createDate } from '@vean/aria/date';
import { SCalendarRange } from '@vean/ui';

const value = {
  start: createDate(2026, 4, 18),
  end: createDate(2026, 4, 22)
};

const isDateDisabled = (date: Date) => date.getDate() === 20;
</script>

<template>
  <SCalendarRange :model-value="value" :default-placeholder="value.start" :is-date-disabled="isDateDisabled" />
</template>
