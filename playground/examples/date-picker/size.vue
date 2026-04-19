<script setup lang="ts">
import { ref } from 'vue';
import { CalendarDate } from '@internationalized/date';

import { SDatePicker } from '@soybeanjs/ui';

const selectedDate1 = ref<any>();
const selectedDate2 = ref<any>();
const selectedDate3 = ref<any>();
</script>

<template>
  <div class="flex-c gap-3">
    <h3 class="playground-title">Size</h3>
    <SDatePicker v-model="selectedDate1" class="w-60 lt-md:w-auto" :default-placeholder="new CalendarDate(2024, 1, 1)" size="sm" />
    <SDatePicker v-model="selectedDate2" class="w-60 lt-md:w-auto" :default-placeholder="new CalendarDate(2024, 1, 1)" size="md" />
    <SDatePicker v-model="selectedDate3" class="w-60 lt-md:w-auto" :default-placeholder="new CalendarDate(2024, 1, 1)" size="lg" />
  </div>
</template>
