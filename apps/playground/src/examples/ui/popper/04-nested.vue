<script setup lang="ts">
import {
  PopperV2Arrow,
  PopperV2Popup,
  PopperV2Portal,
  PopperV2Positioner,
  PopperV2Sub,
  PopperV2SubTrigger
} from '@soybeanjs/headless/popper-v2';
import { SPopperV2 } from '@soybeanjs/ui';

function getNestedPopupSide(dir: string): 'left' | 'right' {
  return dir === 'rtl' ? 'left' : 'right';
}
</script>

<template>
  <SPopperV2 :positioner-props="{ sideOffset: 8 }" :popup-props="{ role: 'dialog' }">
    <template #trigger>
      <button type="button" aria-haspopup="dialog">Open parent</button>
    </template>

    <template #default="{ dir }">
      <div class="space-y-3">
        <div>
          <p class="font-medium">Parent popup</p>
          <p class="mt-1 text-muted-foreground">Escape closes the deepest open layer first.</p>
        </div>

        <PopperV2Sub>
          <PopperV2SubTrigger aria-haspopup="dialog">
            More options
            <span class="rtl:rotate-180" aria-hidden="true">→</span>
          </PopperV2SubTrigger>

          <PopperV2Portal>
            <PopperV2Positioner :side="getNestedPopupSide(dir)" align="start" :side-offset="8">
              <PopperV2Popup role="dialog">
                <p class="font-medium">Nested popup</p>
                <p class="mt-1 text-muted-foreground">Closing the parent also closes this child.</p>
                <PopperV2Arrow />
              </PopperV2Popup>
            </PopperV2Positioner>
          </PopperV2Portal>
        </PopperV2Sub>
      </div>
    </template>
  </SPopperV2>
</template>
