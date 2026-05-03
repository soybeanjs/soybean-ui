<script setup lang="ts">
import { CalendarDate } from '@internationalized/date';
import { shallowRef } from 'vue';
import { SDateField } from '@soybeanjs/ui';

const value = shallowRef(new CalendarDate(2026, 4, 19));
</script>

<template>
  <SDateField v-model="value" aria-label="Event date" />
  <p class="text-sm text-muted-foreground">Value: {{ value?.toString() ?? '-' }}</p>
</template>
