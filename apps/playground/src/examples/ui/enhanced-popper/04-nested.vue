<script setup lang="ts">
import { EpArrow, EpPopup, EpPortal, EpPositioner, EpSub, EpSubTrigger, getNestedPopupSide } from './headless';
import { SEp } from './ui';
</script>

<template>
  <SEp :positioner-props="{ sideOffset: 8 }" :popup-props="{ role: 'dialog' }">
    <template #trigger>
      <button type="button" aria-haspopup="dialog">Open parent</button>
    </template>

    <template #default="{ dir }">
      <div class="space-y-3">
        <div>
          <p class="font-medium">Parent popup</p>
          <p class="mt-1 text-muted-foreground">Escape closes the deepest open layer first.</p>
        </div>

        <EpSub>
          <EpSubTrigger aria-haspopup="dialog">
            More options
            <span class="rtl:rotate-180" aria-hidden="true">→</span>
          </EpSubTrigger>

          <EpPortal>
            <EpPositioner :side="getNestedPopupSide(dir)" align="start" :side-offset="8">
              <EpPopup role="dialog">
                <p class="font-medium">Nested popup</p>
                <p class="mt-1 text-muted-foreground">Closing the parent also closes this child.</p>
                <EpArrow />
              </EpPopup>
            </EpPositioner>
          </EpPortal>
        </EpSub>
      </div>
    </template>
  </SEp>
</template>
