<script setup lang="ts">
import { SPopperV2 } from '@soybeanjs/ui';
</script>

<template>
  <SPopperV2 :positioner-props="{ sideOffset: 8 }" :popup-props="{ role: 'dialog' }">
    <template #trigger>
      <button type="button" aria-haspopup="dialog">Open enhanced popper</button>
    </template>

    <template #default="{ close }">
      <div class="space-y-3">
        <div>
          <p class="font-medium">Click trigger</p>
          <p class="mt-1 text-muted-foreground">Click outside or press Escape to close and restore focus.</p>
        </div>
        <button
          type="button"
          class="rounded-md border border-border px-2.5 py-1 text-xs hover:bg-accent"
          @click="close"
        >
          Close
        </button>
      </div>
    </template>
  </SPopperV2>
</template>
