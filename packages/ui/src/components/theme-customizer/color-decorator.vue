<script setup lang="ts">
import type { PaletteColorLevel } from '@soybeanjs/colord/palette';

type DecorateColors = Partial<Record<PaletteColorLevel, string | { hsl: string }>>;

interface Props {
  colors: DecorateColors;
  levels?: PaletteColorLevel[];
}

withDefaults(defineProps<Props>(), {
  levels: () => [100, 900, 300, 800, 600]
});

const isHslObject = (value?: string | { hsl: string }): value is { hsl: string } => {
  return typeof value === 'object' && 'hsl' in value;
};

const getColorValue = (value?: string | { hsl: string }) => {
  if (isHslObject(value)) {
    return value.hsl;
  }

  return value ?? 'transparent';
};
</script>

<template>
  <div class="flex">
    <div
      v-for="level in levels"
      :key="level"
      class="size-4 -ml-1 rounded-full"
      :style="{
        backgroundColor: getColorValue(colors[level])
      }"
    ></div>
  </div>
</template>
