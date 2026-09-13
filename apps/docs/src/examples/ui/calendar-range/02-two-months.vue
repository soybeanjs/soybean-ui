<script setup lang="ts">
import { shallowRef } from 'vue';
import { createDate } from '@soybeanjs/headless/date';
import { SCalendarRange } from '@soybeanjs/ui';

const value = shallowRef({
  start: createDate(2026, 4, 28),
  end: createDate(2026, 5, 3)
});
</script>

<template>
  <SCalendarRange v-model="value" :default-placeholder="value.start" :number-of-months="2" />
</template>
