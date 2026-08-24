<script setup lang="ts">
import {
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
  <SPopperV2
    trigger="hover"
    :open-delay="180"
    :close-delay="120"
    :positioner-props="{ sideOffset: 8 }"
    :popup-props="{ role: 'dialog' }"
  >
    <template #trigger>
      <button type="button" aria-haspopup="dialog">Hover parent</button>
    </template>

    <template #default="{ dir }">
      <div class="space-y-3">
        <div>
          <p class="font-medium">Hover parent</p>
          <p class="mt-1 text-muted-foreground">Move through the child trigger toward its popup.</p>
        </div>

        <PopperV2Sub>
          <PopperV2SubTrigger trigger="hover" :open-delay="100" :close-delay="120" aria-haspopup="dialog">
            Hover nested
            <span class="rtl:rotate-180" aria-hidden="true">→</span>
          </PopperV2SubTrigger>

          <PopperV2Portal>
            <PopperV2Positioner :side="getNestedPopupSide(dir)" align="start" :side-offset="8">
              <PopperV2Popup role="dialog">
                <p class="font-medium">Nested hover popup</p>
                <p class="mt-1 text-muted-foreground">The child grace area keeps both layers open in transit.</p>
              </PopperV2Popup>
            </PopperV2Positioner>
          </PopperV2Portal>
        </PopperV2Sub>
      </div>
    </template>
  </SPopperV2>
</template>
