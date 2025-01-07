<script setup lang="ts">
import { SToggle } from 'soy-ui';
import type { ThemeSize, ToggleVariant } from 'soy-ui';

defineOptions({
  name: 'UiToggle'
});

const variants: ToggleVariant[] = ['ghost', 'outline'];
const sizes: ThemeSize[] = ['xs', 'sm', 'md', 'lg', 'xl', 'xxl'];
</script>

<template>
  <div class="py-12px text-18px">Variant</div>
  <div class="flex gap-12px">
    <SToggle v-for="variant in variants" :key="variant" :variant="variant">{{ variant }}</SToggle>
  </div>
  <div class="py-12px text-18px">Size</div>
  <div class="flex gap-12px">
    <SToggle v-for="size in sizes" :key="size" variant="outline" :size="size">
      {{ size }}
    </SToggle>
  </div>
  <div class="py-12px text-18px">Disabled</div>
  <div class="flex flex-wrap gap-12px">
    <SToggle size="md" variant="ghost" disabled>disabled</SToggle>
    <SToggle size="md" variant="outline" disabled>disabled</SToggle>
  </div>
</template>
