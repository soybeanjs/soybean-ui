<script setup lang="ts">
import { SSwitch } from 'soybean-ui';
import type { ThemeColor, ThemeSize } from 'soybean-ui';

defineOptions({
  name: 'UiSwitch'
});
const colors: ThemeColor[] = ['primary', 'destructive', 'success', 'warning', 'info', 'secondary', 'accent'];
const sizes: ThemeSize[] = ['xs', 'sm', 'md', 'lg', 'xl', 'xxl'];
</script>

<template>
  <div class="py-12px text-18px">Default Checked</div>
  <SSwitch default-value />
  <div class="py-12px text-18px">Color</div>
  <div class="flex gap-12px">
    <SSwitch v-for="color in colors" :key="color" default-value :color="color" />
  </div>
  <div class="py-12px text-18px">Size</div>
  <div class="flex gap-12px">
    <SSwitch v-for="size in sizes" :key="size" :size="size" />
  </div>
  <div class="py-12px text-18px">Disabled</div>
  <SSwitch disabled default-value color="success" />
</template>

<style scoped></style>
