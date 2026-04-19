<script setup lang="ts">
import { CalendarDate } from '@internationalized/date';

import { SYearPicker } from '@soybeanjs/ui';

const value = new CalendarDate(2026, 1, 1);
const sizes = ['xs', 'sm', 'md', 'lg'] as const;
</script>

<template>
  <div class="flex-c gap-3">
    <h3 class="playground-title">Size</h3>
    <div class="flex flex-wrap gap-3">
      <SYearPicker v-for="size in sizes" :key="size" class="w-60 lt-md:w-auto" :default-value="value" :size="size" aria-label="Fiscal year" />
    </div>
  </div>
</template>
