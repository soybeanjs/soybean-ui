<script setup lang="ts">
import { SDateField } from '@soybeanjs/ui';
import { CalendarDate } from '@internationalized/date';

const value = new CalendarDate(2026, 4, 19);
</script>

<template>
  <SDateField :model-value="value" disabled aria-label="Disabled date" class="w-fit" />
</template>
