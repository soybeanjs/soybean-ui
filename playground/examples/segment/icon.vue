<script setup lang="ts">
import { shallowRef } from 'vue';
import { SCard, SIcon, SSegment } from '@soybeanjs/ui';
import type { SegmentOptionData } from '@soybeanjs/ui';

interface ThemeSchema extends SegmentOptionData<string> {
  value: string;
  label: string;
  icon: string;
}

const themeSchema = shallowRef<string>('auto');

const themeSchemas: ThemeSchema[] = [
  {
    value: 'light',
    label: 'Light',
    icon: 'lucide:sun'
  },
  {
    value: 'auto',
    label: 'Auto',
    icon: 'ic:round-hdr-auto'
  },
  {
    value: 'dark',
    label: 'Dark',
    icon: 'lucide:moon'
  }
];
</script>

<template>
  <SCard title="Icon">
    <SSegment v-model="themeSchema" :items="themeSchemas" shape="rounded">
      <template #item="{ icon }">
        <SIcon :icon="icon" />
      </template>
    </SSegment>
  </SCard>
</template>
