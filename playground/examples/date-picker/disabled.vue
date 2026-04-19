<script setup lang="ts">
import { ref } from 'vue';
import { CalendarDate } from '@internationalized/date';

import { SDatePicker } from '@soybeanjs/ui';

const selectedDate = ref<any>();
</script>

<template>
  <div>
    <h3 class="playground-title">Disabled</h3>
    <SDatePicker v-model="selectedDate" :default-placeholder="new CalendarDate(2024, 1, 1)" disabled />
  </div>
</template>
