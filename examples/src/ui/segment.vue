<script setup lang="ts">
import { ref } from 'vue';
import { SCard, SSegment } from 'soy-ui';
import type { SegmentOption } from 'soy-ui';

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
  <SCard title="Segment" split>
    <SSegment v-model="day" :items="weekends" />
  </SCard>
</template>
