<script setup lang="ts">
import { ref } from 'vue';
import { CalendarDate } from '@internationalized/date';
import { SDatePicker } from '@soybeanjs/ui';

const selectedDate1 = ref<any>();
const selectedDate2 = ref<any>();
const selectedDate3 = ref<any>();
</script>

<template>
  <SDatePicker v-model="selectedDate1" :default-placeholder="new CalendarDate(2024, 1, 1)" size="sm" />
  <SDatePicker v-model="selectedDate2" :default-placeholder="new CalendarDate(2024, 1, 1)" size="md" />
  <SDatePicker v-model="selectedDate3" :default-placeholder="new CalendarDate(2024, 1, 1)" size="lg" />
</template>
