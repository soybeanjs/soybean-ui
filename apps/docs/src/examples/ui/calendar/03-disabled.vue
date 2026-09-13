<script setup lang="ts">
import { createDate } from '@soybeanjs/headless/date';
import { SCalendar } from '@soybeanjs/ui';

const today = createDate(2026, 4, 18);
const isDateDisabled = (date: Date) => date.getDate() % 2 === 0;
</script>

<template>
  <SCalendar :default-placeholder="today" :is-date-disabled="isDateDisabled" />
</template>
