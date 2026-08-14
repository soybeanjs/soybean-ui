<script setup lang="ts">
import { shallowRef } from 'vue';
import { SDateField } from '@soybeanjs/ui';
import { CalendarDate } from '@internationalized/date';

const value = shallowRef(new CalendarDate(2026, 4, 19));
</script>

<template>
  <SDateField v-model="value" aria-label="Event date" class="w-fit" />
  <p class="text-sm text-muted-foreground">Value: {{ value?.toString() ?? '-' }}</p>
</template>
