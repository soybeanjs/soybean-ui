<script setup lang="ts">
import { shallowRef } from 'vue';
import { createDate } from '@vean/aria/date';
import { SCalendarRange } from '@vean/ui';

const value = shallowRef({
  start: createDate(2026, 4, 28),
  end: createDate(2026, 5, 3)
});
</script>

<template>
  <SCalendarRange v-model="value" :default-placeholder="value.start" :number-of-months="2" />
</template>
