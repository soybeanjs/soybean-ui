<script setup lang="ts">
import { CalendarDate } from '@internationalized/date';
import { SYearPicker } from '@soybeanjs/ui';

const value = new CalendarDate(2026, 1, 1);
</script>

<template>
  <SYearPicker class="w-60 lt-md:w-auto" :model-value="value" disabled aria-label="Disabled fiscal year" />
</template>
