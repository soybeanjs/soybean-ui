<script setup lang="ts">
import { CalendarDate } from '@internationalized/date';
import { shallowRef } from 'vue';
import { SRangeCalendar } from '@soybeanjs/ui';

const value = shallowRef({
  start: new CalendarDate(2026, 4, 28),
  end: new CalendarDate(2026, 5, 3)
});
</script>

<template>
  <SRangeCalendar v-model="value" :default-placeholder="value.start" :number-of-months="2" />
</template>
