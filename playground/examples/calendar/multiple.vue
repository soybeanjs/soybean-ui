<script setup lang="ts">
import { CalendarDate } from '@internationalized/date';
import { shallowRef } from 'vue';

import { SCalendar } from '@soybeanjs/ui';

const value = shallowRef([new CalendarDate(2026, 4, 18), new CalendarDate(2026, 4, 21)]);
</script>

<template>
  <SCalendar v-model="value" multiple :default-placeholder="value[0]" />
</template>
