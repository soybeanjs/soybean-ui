<script setup lang="ts">
import { SDateRangePicker } from '@soybeanjs/ui';
</script>

<template>
  <SDateRangePicker
    :ui="{
      trigger: 'border-primary hover:bg-primary/10',
      popup: 'border-primary/20'
    }"
  />
</template>
