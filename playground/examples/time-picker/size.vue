<script setup lang="ts">
import { Time } from '@internationalized/date';

import { STimePicker } from '@soybeanjs/ui';

const value = new Time(9, 30, 0);
const sizes = ['xs', 'sm', 'md', 'lg'] as const;
</script>

<template>
  <div class="flex-c gap-3">
    <h3 class="playground-title">Size</h3>
    <div class="flex flex-wrap gap-3">
      <STimePicker v-for="size in sizes" :key="size" class="w-60 lt-md:w-auto" :default-value="value" :size="size" aria-label="Meeting time" />
    </div>
  </div>
</template>
