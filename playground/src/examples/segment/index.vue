<script setup lang="ts">
import { ref } from 'vue';
import { SCard, SSegment } from '@ui';
import type { SegmentOptionData } from '@ui';

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
] satisfies SegmentOptionData[];
</script>

<template>
  <SCard title="Segment" split>
    <SSegment v-model="day" :items="weekends" />
  </SCard>
  <SCard title="Vertical" split>
    <div class="w-80 lt-sm:w-auto">
      <SSegment v-model="day" :items="weekends" orientation="vertical" />
    </div>
  </SCard>
</template>
