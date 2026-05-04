<script setup lang="ts">
import { shallowRef } from 'vue';
import { CalendarDate } from '@internationalized/date';
import { SMonthPicker } from '@soybeanjs/ui';

const value = shallowRef(new CalendarDate(2026, 4, 1));
</script>

<template>
  <SMonthPicker v-model="value" class="w-60 lt-md:w-auto" aria-label="Billing month" />
</template>
