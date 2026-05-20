<script setup lang="ts">
import { ref } from 'vue';
import { SDatePicker } from '@soybeanjs/ui';
import { CalendarDate } from '@internationalized/date';

const selectedDate = ref<any>();
</script>

<template>
  <SDatePicker
    v-model="selectedDate"
    :default-placeholder="new CalendarDate(2024, 1, 1)"
    :ui="{
      trigger: 'border-primary/50 bg-primary/5 hover:bg-primary/10',
      popup: 'border-primary/30'
    }"
  />
</template>
