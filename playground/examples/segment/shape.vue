<script setup lang="ts">
import { shallowRef } from 'vue';
import { SCard, SSegment } from '@ui';
import type { SegmentOptionData } from '@ui';

const day = shallowRef('monday');

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
] satisfies SegmentOptionData[];
</script>

<template>
  <SCard title="Shape: rounded">
    <SSegment v-model="day" :items="weekends" shape="rounded" />
  </SCard>
</template>
