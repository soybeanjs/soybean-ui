<script setup lang="ts">
import { shallowRef } from 'vue';
import { SSegment } from '@soybeanjs/ui';
import type { SegmentOptionData } from '@soybeanjs/ui';

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
  <div>
    <h3 class="playground-title">Base</h3>
    <SSegment v-model="day" :items="weekends" />
  </div>
</template>
