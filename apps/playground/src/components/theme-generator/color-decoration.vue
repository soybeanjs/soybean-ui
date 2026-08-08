<script setup lang="ts">
import { tailwindPalette } from '@soybeanjs/colord/palette';
import type { PaletteColorLevel, TailwindPaletteKey } from '@soybeanjs/colord/palette';
import type { PrimaryColorKey } from '@soybeanjs/theme';

interface Props {
  palette: PrimaryColorKey;
}

defineProps<Props>();

const levels: PaletteColorLevel[] = [100, 900, 300, 800, 600];
</script>

<template>
  <div class="flex">
    <div
      v-for="level in levels"
      :key="level"
      class="size-5 -ml-2 rounded-full"
      :style="{
        backgroundColor: tailwindPalette[palette as TailwindPaletteKey][level].hsl
      }"
    ></div>
  </div>
</template>
