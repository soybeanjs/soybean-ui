<script setup lang="ts">
import { ref } from 'vue';
import { CalendarDate } from '@internationalized/date';

import { SDatePicker } from '@soybeanjs/ui';

const selectedDate = ref<any>();
</script>

<template>
  <div>
    <h3 class="playground-title">Custom Styling</h3>
    <SDatePicker
      v-model="selectedDate"
      class="w-60 lt-md:w-auto"
      :default-placeholder="new CalendarDate(2024, 1, 1)"
      :ui="{
        trigger: 'border-primary/50 bg-primary/5 hover:bg-primary/10',
        popup: 'border-primary/30'
      }"
    />
  </div>
</template>
