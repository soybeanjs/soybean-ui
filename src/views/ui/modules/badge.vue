<script setup lang="ts">
import { SBadge } from 'soybean-ui';
import type { BadgeColor, BadgeVariant } from 'soybean-ui';

defineOptions({
  name: 'UiBadge'
});

const colors: BadgeColor[] = ['primary', 'destructive', 'success', 'warning', 'info', 'secondary', 'accent'];
const variants: BadgeVariant[] = ['solid', 'plain', 'outline'];
</script>

<template>
  <div class="py-12px text-18px">Color</div>
  <div class="flex flex-wrap gap-12px">
    <SBadge v-for="color in colors" :key="color" :color="color">{{ color }}</SBadge>
  </div>
  <div class="py-12px text-18px">Variant</div>
  <div class="flex-col-stretch gap-12px">
    <div v-for="color in colors" :key="color" class="flex flex-wrap gap-12px">
      <SBadge v-for="variant in variants" :key="variant" :color="color" :variant="variant">{{ variant }}</SBadge>
    </div>
  </div>
  <div class="py-12px text-18px">Closable</div>
  <div class="flex flex-wrap gap-12px">
    <SBadge variant="solid" color="primary" closable>closable</SBadge>
    <SBadge variant="plain" color="primary" closable>closable</SBadge>
    <SBadge variant="outline" color="primary" closable>closable</SBadge>
    <SBadge variant="solid" color="destructive" closable>closable</SBadge>
    <SBadge variant="plain" color="destructive" closable>closable</SBadge>
    <SBadge variant="outline" color="destructive" closable>closable</SBadge>
  </div>
</template>
