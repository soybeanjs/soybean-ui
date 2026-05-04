<script setup lang="ts">
import { ref } from 'vue';
import { CalendarDate } from '@internationalized/date';
import { SDatePicker } from '@soybeanjs/ui';
import { themeSizeOptions } from '../../constants/theme';

const selectedDate = ref<any>();
</script>

<template>
  <div class="flex flex-wrap gap-3">
    <SDatePicker
      v-for="item in themeSizeOptions"
      :key="item.value"
      v-model="selectedDate"
      :size="item.value"
      :default-placeholder="new CalendarDate(2024, 1, 1)"
    />
  </div>
</template>
