<script setup lang="ts">
import { Time } from '@internationalized/date';
import { STimeRangePicker } from '@soybeanjs/ui';

const value = {
  start: new Time(8, 0, 0),
  end: new Time(18, 0, 0)
};
const sizes = ['xs', 'sm', 'md', 'lg'] as const;
</script>

<template>
  <div class="flex flex-wrap gap-3">
    <STimeRangePicker
      v-for="size in sizes"
      :key="size"
      class="w-90 lt-md:w-auto"
      :default-value="value"
      :size="size"
      aria-label="Working hours"
    />
  </div>
</template>
