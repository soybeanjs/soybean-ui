<script setup lang="ts">
import { SBadge } from '@soybean-ui/vue';
import type { BadgeVariant, ThemeColor } from '@soybean-ui/vue';

defineOptions({
  name: 'UiBadge'
});

const colors: ThemeColor[] = ['primary', 'destructive', 'success', 'warning', 'info', 'secondary', 'accent'];
const variants: BadgeVariant[] = ['solid', 'plain', 'outline'];
</script>

<template>
  <div class="py-12px text-18px">Color</div>
  <div class="flex flex-wrap gap-12px">
    <SBadge v-for="color in colors" :key="color" :color="color">{{ color }}</SBadge>
  </div>
  <div class="py-12px text-18px">Variant</div>
  <div class="flex-c-stretch gap-12px">
    <div v-for="color in colors" :key="color" class="flex flex-wrap gap-12px">
      <SBadge v-for="variant in variants" :key="variant" :color="color" :variant="variant">{{ variant }}</SBadge>
    </div>
  </div>
</template>
