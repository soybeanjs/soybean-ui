<script setup lang="ts">
import { computed } from 'vue';
import { CalendarDateTime } from '@internationalized/date';
import { shallowRef } from 'vue';
import { SDateField } from '@soybeanjs/ui';

const value = shallowRef(new CalendarDateTime(2026, 4, 19, 14, 30, 0));

const formattedValue = computed(() => {
  if (!value.value) return '-';

  return value.value.toString().replace('T', ' ');
});
</script>

<template>
  <SDateField v-model="value" granularity="second" aria-label="Meeting time" />
  <p class="text-sm text-muted-foreground">Value: {{ formattedValue }}</p>
</template>
