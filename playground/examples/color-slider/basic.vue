<script setup lang="ts">
import { computed, ref } from 'vue';
import type { ColorValue } from '@soybeanjs/headless/shared';
import { formatColor } from '@soybeanjs/headless/shared';
import { SColorSlider, SColorSwatch } from '@soybeanjs/ui';

const color = ref<ColorValue>('rgba(236, 72, 153, 0.85)');

const colorText = computed(() => formatColor(color.value, 'hex'));
</script>

<template>
  <div>
    <h3 class="playground-title">Basic</h3>
    <div class="flex flex-col gap-3 w-60 lt-md:w-auto">
      <div class="flex items-center gap-3">
        <SColorSwatch :color="color" />
        <span class="text-sm text-muted-foreground">{{ colorText }}</span>
      </div>
      <SColorSlider v-model="color" channel="hue" color-space="hsl" format="hex" />
      <SColorSlider v-model="color" channel="alpha" color-space="hsl" format="hex" />
    </div>
  </div>
</template>
