<script setup lang="ts">
import { SToggle } from 'soybean-ui';
import type { ToggleSize, ToggleVariant } from 'soybean-ui';

defineOptions({
  name: 'UiToggle'
});

const variants: ToggleVariant[] = ['ghost', 'outline'];
const sizes: ToggleSize[] = ['xs', 'sm', 'md', 'lg', 'xl', 'xxl'];
</script>

<template>
  <div class="py-12px text-18px">Size</div>
  <div class="flex gap-12px">
    <SToggle v-for="size in sizes" :key="size" :size="size">
      {{ size }}
    </SToggle>
  </div>
  <div class="py-12px text-18px">Variant</div>
  <div class="flex gap-12px">
    <div v-for="size in sizes" :key="size" class="flex flex-wrap gap-12px">
      <SToggle v-for="variant in variants" :key="variant" :size="size" :variant="variant">{{ variant }}</SToggle>
    </div>
  </div>
  <div class="py-12px text-18px">Disabled</div>
  <div class="flex flex-wrap gap-12px">
    <SToggle size="md" variant="ghost" disabled>disabled</SToggle>
    <SToggle size="md" variant="outline" disabled>disabled</SToggle>
  </div>
</template>

<style scoped></style>
