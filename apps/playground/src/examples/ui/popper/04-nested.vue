<script setup lang="ts">
import {
  PopperArrow,
  PopperPopup,
  PopperPortal,
  PopperPositioner,
  PopperSub,
  PopperSubTrigger
} from '@soybeanjs/headless/popper';
import { SPopper } from '@soybeanjs/ui';

function getNestedPopupSide(dir: string): 'left' | 'right' {
  return dir === 'rtl' ? 'left' : 'right';
}
</script>

<template>
  <SPopper :positioner-props="{ sideOffset: 8 }" :popup-props="{ role: 'dialog' }">
    <template #trigger>
      <button type="button" aria-haspopup="dialog">Open parent</button>
    </template>

    <template #default="{ dir }">
      <div class="space-y-3">
        <div>
          <p class="font-medium">Parent popup</p>
          <p class="mt-1 text-muted-foreground">Escape closes the deepest open layer first.</p>
        </div>

        <PopperSub>
          <PopperSubTrigger aria-haspopup="dialog">
            More options
            <span class="rtl:rotate-180" aria-hidden="true">→</span>
          </PopperSubTrigger>

          <PopperPortal>
            <PopperPositioner :side="getNestedPopupSide(dir)" align="start" :side-offset="8">
              <PopperPopup role="dialog">
                <p class="font-medium">Nested popup</p>
                <p class="mt-1 text-muted-foreground">Closing the parent also closes this child.</p>
                <PopperArrow />
              </PopperPopup>
            </PopperPositioner>
          </PopperPortal>
        </PopperSub>
      </div>
    </template>
  </SPopper>
</template>
