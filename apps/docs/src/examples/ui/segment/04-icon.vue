<script setup lang="ts">
import { shallowRef } from 'vue';
import { SIcon, SSegment } from '@soybeanjs/ui';
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
  <div class="flex justify-center w-full">
    <SSegment v-model="themeSchema" class="max-w-2xl" :items="themeSchemas" shape="rounded">
      <template #item="{ icon }">
        <SIcon :icon="icon" />
      </template>
    </SSegment>
  </div>
</template>
