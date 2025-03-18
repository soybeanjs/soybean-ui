<script setup lang="ts">
import { SBadge } from 'soy-ui';
import type { BadgeVariant, ThemeColor } from 'soy-ui';

defineOptions({
  name: 'UiBadge'
});

const colors: ThemeColor[] = ['primary', 'destructive', 'success', 'warning', 'info', 'carbon', 'secondary', 'accent'];
const variants: BadgeVariant[] = ['solid', 'pure', 'outline'];
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
