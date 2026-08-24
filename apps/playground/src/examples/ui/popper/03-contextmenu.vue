<script setup lang="ts">
import { SPopperV2 } from '@soybeanjs/ui';
</script>

<template>
  <SPopperV2
    trigger="contextmenu"
    :trigger-props="{
      as: 'div',
      asChild: false,
      tabindex: 0,
      'aria-haspopup': 'dialog',
      class:
        'flex min-h-40 w-full cursor-context-menu flex-col items-center justify-center border-dashed bg-muted/30 text-center'
    }"
    :positioner-props="{ sideOffset: 4 }"
    :popup-props="{ role: 'dialog' }"
  >
    <template #trigger>
      <span class="font-medium">Right-click anywhere in this area</span>
      <span class="mt-1 text-xs text-muted-foreground">Touch and hold for 700ms on a touch device.</span>
    </template>

    <div class="space-y-1.5">
      <p class="font-medium">Virtual point reference</p>
      <p class="text-muted-foreground">The popup is positioned at the pointer coordinates.</p>
    </div>
  </SPopperV2>
</template>
