<script setup lang="ts">
import { ref } from 'vue';
import { SCard, SSegment } from 'soy-ui';
import type { SegmentOptionData, ThemeSize } from 'soy-ui';

defineOptions({
  name: 'DemoSegment'
});

const sizes: ThemeSize[] = ['xs', 'sm', 'md', 'lg', 'xl', '2xl'];

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
  <div class="flex-c gap-4">
    <SCard title="Segment" split>
      <SSegment v-model="day" :items="weekends" />
    </SCard>
    <SCard title="Vertical" split>
      <div class="w-320px lt-sm:w-auto">
        <SSegment v-model="day" :items="weekends" orientation="vertical" />
      </div>
    </SCard>
    <SCard title="Size" split>
      <div class="flex-c gap-3">
        <SSegment v-for="size in sizes" :key="size" v-model="day" :items="weekends" :size="size" />
      </div>
      <div class="mt-4 flex gap-3">
        <SSegment
          v-for="size in sizes"
          :key="size"
          v-model="day"
          :items="weekends"
          :size="size"
          orientation="vertical"
        />
      </div>
    </SCard>
    <SCard title="Custom Style" split>
      <SSegment
        v-model="day"
        :items="weekends"
        :ui="{
          list: 'border-border border-b bg-transparent rounded-none',
          indicator: 'absolute bottom-0 h-2px w-full rounded-1 bg-primary'
        }"
      />
    </SCard>
    <SCard title="Custom Style Vertical" split>
      <SSegment
        v-model="day"
        :items="weekends"
        orientation="vertical"
        :ui="{
          list: 'border-border border-l bg-transparent rounded-none',
          indicator: 'absolute left-0 h-full w-2px rounded-1 bg-primary'
        }"
      />
    </SCard>
  </div>
</template>
