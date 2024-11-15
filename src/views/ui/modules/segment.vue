<script setup lang="ts">
import { ref } from 'vue';
import { SSegment } from 'soybean-ui';
import type { SegmentOption } from 'soybean-ui';

const day = ref('monday');

const weekends = [
  {
    value: 'monday',
    label: 'Monday'
  },
  {
    value: 'tuesday',
    label: 'Tuesday'
  },
  {
    value: 'wednesday',
    label: 'Wednesday'
  },
  {
    value: 'thursday',
    label: 'Thursday'
  },
  {
    value: 'friday',
    label: 'Friday'
  },
  {
    value: 'saturday',
    label: 'Saturday'
  },
  {
    value: 'sunday',
    label: 'Sunday'
  }
] satisfies SegmentOption[];

defineOptions({
  name: 'UiSegment'
});
</script>

<template>
  <SSegment v-model="day" :items="weekends" />
</template>

<style scoped></style>
