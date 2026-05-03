<script setup lang="ts">
import { CalendarDate } from '@internationalized/date';
import { SDateField } from '@soybeanjs/ui';

const value = new CalendarDate(2026, 4, 19);
</script>

<template>
  <SDateField :model-value="value" disabled aria-label="Disabled date" />
</template>
