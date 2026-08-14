<script setup lang="ts">
import { shallowRef } from 'vue';
import { SCalendarRange } from '@soybeanjs/ui';
import { CalendarDate } from '@internationalized/date';

const value = shallowRef({
  start: new CalendarDate(2026, 4, 28),
  end: new CalendarDate(2026, 5, 3)
});
</script>

<template>
  <SCalendarRange v-model="value" :default-placeholder="value.start" :number-of-months="2" />
</template>
