<script setup lang="ts">
import { shallowRef } from 'vue';
import { SBacktop } from '@soybeanjs/ui';

const scrollTarget = shallowRef<HTMLDivElement | null>(null);
</script>

<template>
  <div>
    <h3 class="playground-title">Basic</h3>
    <div ref="scrollTarget" class="relative h-64 overflow-auto rounded-md border bg-muted/20 p-4">
      <p class="text-sm text-muted-foreground">Scroll inside the container to reveal the Backtop button.</p>
      <div class="h-80" />
      <SBacktop :target="scrollTarget || undefined" :visibility-height="120" class="absolute bottom-4 end-4" />
    </div>
  </div>
</template>
