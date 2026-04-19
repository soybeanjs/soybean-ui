<script setup lang="ts">
import { CalendarDateTime } from '@internationalized/date';
import { shallowRef } from 'vue';
import { SDateField } from '@soybeanjs/ui';

const value = shallowRef(new CalendarDateTime(2026, 4, 19, 14, 30, 0));
</script>

<template>
  <div class="flex-c gap-3">
    <h3 class="playground-title">With time</h3>
    <div class="w-90 lt-md:w-auto">
      <SDateField v-model="value" class="w-90 lt-md:w-auto" granularity="second" aria-label="Meeting time" />
    </div>
    <p class="text-sm text-muted-foreground">Value: {{ value?.toString() ?? '-' }}</p>
  </div>
</template>
