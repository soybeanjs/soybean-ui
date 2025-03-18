<script setup lang="ts">
import { SSeparator } from 'soy-ui';
import type { SeparatorBorder, ThemeAlign } from 'soy-ui';

defineOptions({
  name: 'UiSeparator'
});

const aligns: ThemeAlign[] = ['start', 'center', 'end'];

const borders: SeparatorBorder[] = ['solid', 'dashed', 'dotted'];
</script>

<template>
  <div class="py-12px text-18px">Horizontal</div>
  <SSeparator class="mb-6">Horizontal</SSeparator>
  <div class="py-12px text-18px">Vertical</div>
  <div class="h-5 flex-center space-x-4">
    <div>Soybean</div>
    <SSeparator orientation="vertical" />
    <div>UI</div>
    <SSeparator orientation="vertical" />
    <div>Vue</div>
  </div>
  <div class="py-12px text-18px">Align</div>
  <SSeparator v-for="align in aligns" :key="align" :align="align" class="mb-6">{{ align }}</SSeparator>
  <div class="py-12px text-18px">Custom Align</div>
  <SSeparator class="mb-6" label-class="left-1/3">Custom Align</SSeparator>
  <div class="py-12px text-18px">Border</div>
  <SSeparator v-for="border in borders" :key="border" :border="border" class="mb-6">{{ border }}</SSeparator>
  <div class="py-12px text-18px">Border Width</div>
  <SSeparator border="solid" class="mb-6 border-2px">2 px</SSeparator>
</template>
