<script setup lang="ts">
import { CalendarDate } from '@internationalized/date';

import { SMonthPicker } from '@soybeanjs/ui';

const value = new CalendarDate(2026, 4, 1);
</script>

<template>
  <div class="flex-c gap-3">
    <h3 class="playground-title">Disabled</h3>
    <SMonthPicker class="w-60 lt-md:w-auto" :model-value="value" disabled aria-label="Disabled billing month" />
  </div>
</template>
