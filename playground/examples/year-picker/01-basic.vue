<script setup lang="ts">
import { shallowRef } from 'vue';
import { CalendarDate } from '@internationalized/date';
import { SYearPicker } from '@soybeanjs/ui';

const value = shallowRef(new CalendarDate(2026, 1, 1));
</script>

<template>
  <SYearPicker v-model="value" class="w-60 lt-md:w-auto" aria-label="Fiscal year" />
</template>
