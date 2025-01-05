<script setup lang="ts">
import { SButton, SScrollArea, SSheet } from '@soybean-ui/vue';
import type { SheetSide } from '@soybean-ui/vue';

defineOptions({
  name: 'UiSheet'
});

const sides: SheetSide[] = ['left', 'right', 'top', 'bottom'];
</script>

<template>
  <div class="py-12px text-18px">Side</div>
  <div class="flex gap-3">
    <SSheet v-for="side in sides" :key="side" title="Sheet Title" :side>
      <template #trigger>
        <SButton variant="outline">{{ side }}</SButton>
      </template>
      <div>Sheet Content</div>
      <template #footer>
        <SButton>Confirm</SButton>
      </template>
    </SSheet>
  </div>
  <div class="py-12px text-18px">Content Scrollable</div>
  <SSheet title="Sheet Title">
    <template #trigger>
      <SButton variant="outline">Scrollable</SButton>
    </template>
    <SScrollArea>
      <div v-for="i in 100" :key="i">Sheet Content</div>
    </SScrollArea>
    <template #footer>
      <SButton>Confirm</SButton>
    </template>
  </SSheet>
</template>
