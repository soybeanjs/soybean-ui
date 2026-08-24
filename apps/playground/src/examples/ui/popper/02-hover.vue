<script setup lang="ts">
import { SPopperV2 } from '@soybeanjs/ui';
</script>

<template>
  <SPopperV2
    trigger="hover"
    :open-delay="250"
    :close-delay="180"
    :positioner-props="{ sideOffset: 10 }"
    :popup-props="{ role: 'dialog' }"
  >
    <template #trigger>
      <button type="button" aria-haspopup="dialog">Hover or focus me</button>
    </template>

    <div class="space-y-1.5">
      <p class="font-medium">Hover grace area</p>
      <p class="text-muted-foreground">Move the pointer into this popup without closing it.</p>
    </div>
  </SPopperV2>
</template>
