<script setup lang="ts">
import { shallowRef } from 'vue';
import { CalendarDate } from '@internationalized/date';
import { SCalendar } from '@soybeanjs/ui';

const value = shallowRef(new CalendarDate(2026, 4, 18));
</script>

<template>
  <SCalendar v-model="value" :default-placeholder="value" />
</template>
