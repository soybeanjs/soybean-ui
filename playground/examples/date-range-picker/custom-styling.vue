<script setup lang="ts">
import { SDateRangePicker } from '@soybeanjs/ui';
</script>

<template>
  <div>
    <h3 class="playground-title">Custom Styling</h3>
    <SDateRangePicker
      class="w-90 lt-md:w-auto"
      :ui="{
        trigger: 'border-primary hover:bg-primary/10',
        popup: 'border-primary/20'
      }"
    />
  </div>
</template>
