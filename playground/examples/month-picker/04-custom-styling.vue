<script setup lang="ts">
import { CalendarDate } from '@internationalized/date';
import { shallowRef } from 'vue';

import { SMonthPicker } from '@soybeanjs/ui';

const value = shallowRef(new CalendarDate(2026, 10, 1));
</script>

<template>
  <SMonthPicker
    v-model="value"
    class="w-60 lt-md:w-auto"
    aria-label="Styled billing month"
    :ui="{
      trigger: 'border-primary/40 bg-primary/4',
      popup: 'border-primary/30',
      cellTrigger: 'data-[selected]:bg-primary/90'
    }"
  />
</template>
