<script setup lang="ts">
import { tailwindPaletteHsl } from '@soybeanjs/colord/palette';
import type { PaletteColorLevel } from '@soybeanjs/colord/palette';

const levels: PaletteColorLevel[] = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950];
</script>

<template>
  <div class="flex-c gap-2">
    <div class="flex-y-center gap-2">
      <div class="w-20 text-lg font-medium">Color</div>
      <div v-for="level in levels" :key="level" class="w-10 text-center font-medium">
        {{ level }}
      </div>
    </div>
    <div v-for="(palette, name) in tailwindPaletteHsl" :key="name" class="flex-y-center gap-2">
      <div class="w-20">{{ name }}</div>
      <div
        v-for="level in levels"
        :key="level"
        :style="{ backgroundColor: palette[level] }"
        class="size-10 rounded-md border border-border"
      ></div>
    </div>
  </div>
</template>
