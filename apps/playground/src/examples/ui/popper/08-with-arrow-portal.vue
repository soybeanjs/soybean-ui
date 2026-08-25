<script setup lang="ts">
import { SPopper } from '@soybeanjs/ui';
</script>

<template>
  <div
    class="flex h-40 flex-col justify-between overflow-hidden rounded-lg border border-dashed border-border bg-muted/20 p-4"
  >
    <p class="text-xs text-muted-foreground">
      The trigger is fixed near the viewport edge while its popup escapes this overflow container.
    </p>

    <div class="flex justify-end">
      <SPopper
        placement="bottom-end"
        :portal-props="{ to: 'body' }"
        :positioner-props="{ collisionPadding: 16, prioritizePosition: true, sideOffset: 10 }"
        :popup-props="{ role: 'dialog' }"
      >
        <template #trigger>
          <button type="button" class="fixed bottom-6 end-6 z-40" aria-haspopup="dialog">Open near boundary</button>
        </template>

        <div class="max-w-64 space-y-1.5">
          <p class="font-medium">Portal + arrow + collision</p>
          <p class="text-muted-foreground">
            The popup teleports to body, escapes clipping, and flips away from the lower boundary.
          </p>
        </div>
      </SPopper>
    </div>
  </div>
</template>
