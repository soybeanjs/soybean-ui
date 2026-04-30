<script setup lang="ts">
import { SDateRangePicker } from '@soybeanjs/ui';
</script>

<template>
  <div>
    <h3 class="playground-title">Size</h3>
    <div class="flex flex-col gap-4">
      <SDateRangePicker class="w-90 lt-md:w-auto" size="xs" />
      <SDateRangePicker class="w-90 lt-md:w-auto" size="sm" />
      <SDateRangePicker class="w-90 lt-md:w-auto" size="md" />
      <SDateRangePicker class="w-90 lt-md:w-auto" size="lg" />
      <SDateRangePicker class="w-90 lt-md:w-auto" size="xl" />
      <SDateRangePicker class="w-90 lt-md:w-auto" size="2xl" />
    </div>
  </div>
</template>
