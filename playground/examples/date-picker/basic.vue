<script setup lang="ts">
import { ref } from 'vue';
import { CalendarDate } from '@internationalized/date';

import { SDatePicker } from '@soybeanjs/ui';

const selectedDate = ref<any>();
</script>

<template>
  <div>
    <h3 class="playground-title">Basic</h3>
    <SDatePicker v-model="selectedDate" class="w-60 lt-md:w-auto" :default-placeholder="new CalendarDate(2024, 1, 1)" />
    <p v-if="selectedDate" class="mt-2 text-sm text-muted-foreground">Selected: {{ selectedDate.toString() }}</p>
  </div>
</template>
