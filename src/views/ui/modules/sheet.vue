<script setup lang="ts">
import { SButton, SSheet } from '@soybean-ui/vue';
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
</template>

<style scoped></style>
