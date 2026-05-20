<script setup lang="ts">
import { ref } from 'vue';
import { SDatePicker } from '@soybeanjs/ui';
import { CalendarDate } from '@internationalized/date';

const selectedDate = ref<any>();
</script>

<template>
  <SDatePicker v-model="selectedDate" locale="zh-CN" :default-placeholder="new CalendarDate(2024, 1, 1)" />
  <p v-if="selectedDate" class="mt-2 text-sm text-muted-foreground">Selected: {{ selectedDate.toString() }}</p>
</template>
