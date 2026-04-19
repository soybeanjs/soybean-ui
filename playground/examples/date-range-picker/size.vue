<script setup lang="ts">
import { SDateRangePicker } from '@soybeanjs/ui';
</script>

<template>
  <div>
    <h3 class="playground-title">Size</h3>
    <div class="flex flex-col gap-4">
      <SDateRangePicker size="xs" />
      <SDateRangePicker size="sm" />
      <SDateRangePicker size="md" />
      <SDateRangePicker size="lg" />
      <SDateRangePicker size="xl" />
      <SDateRangePicker size="2xl" />
    </div>
  </div>
</template>
