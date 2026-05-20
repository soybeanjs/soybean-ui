<script setup lang="ts">
import { ref } from 'vue';
import { SDatePicker } from '@soybeanjs/ui';
import { CalendarDate } from '@internationalized/date';

const selectedDate = ref<any>();
</script>

<template>
  <SDatePicker v-model="selectedDate" :default-placeholder="new CalendarDate(2024, 1, 1)" disabled />
</template>
