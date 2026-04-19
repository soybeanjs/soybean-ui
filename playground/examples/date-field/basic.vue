<script setup lang="ts">
import { CalendarDate } from '@internationalized/date';
import { shallowRef } from 'vue';
import { SDateField } from '@soybeanjs/ui';

const value = shallowRef(new CalendarDate(2026, 4, 19));
</script>

<template>
  <div class="flex-c gap-3">
    <h3 class="playground-title">Basic</h3>
    <div class="w-72 lt-md:w-auto">
      <SDateField v-model="value" class="w-60 lt-md:w-auto" aria-label="Event date" />
    </div>
    <p class="text-sm text-muted-foreground">Value: {{ value?.toString() ?? '-' }}</p>
  </div>
</template>
