<script setup lang="ts">
import { computed, shallowRef } from 'vue';
import { SDateField } from '@soybeanjs/ui';
import { CalendarDateTime } from '@internationalized/date';

const value = shallowRef(new CalendarDateTime(2026, 4, 19, 14, 30, 0));

const formattedValue = computed(() => {
  if (!value.value) return '-';

  return value.value.toString().replace('T', ' ');
});
</script>

<template>
  <SDateField v-model="value" granularity="second" aria-label="Meeting time" class="w-fit" />
  <p class="text-sm text-muted-foreground">Value: {{ formattedValue }}</p>
</template>
