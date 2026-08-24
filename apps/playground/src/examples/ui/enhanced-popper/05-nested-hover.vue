<script setup lang="ts">
import { EpPopup, EpPortal, EpPositioner, EpSub, EpSubTrigger, getNestedPopupSide } from './headless';
import { SEp } from './ui';
</script>

<template>
  <SEp
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

        <EpSub>
          <EpSubTrigger trigger="hover" :open-delay="100" :close-delay="120" aria-haspopup="dialog">
            Hover nested
            <span class="rtl:rotate-180" aria-hidden="true">→</span>
          </EpSubTrigger>

          <EpPortal>
            <EpPositioner :side="getNestedPopupSide(dir)" align="start" :side-offset="8">
              <EpPopup role="dialog">
                <p class="font-medium">Nested hover popup</p>
                <p class="mt-1 text-muted-foreground">The child grace area keeps both layers open in transit.</p>
              </EpPopup>
            </EpPositioner>
          </EpPortal>
        </EpSub>
      </div>
    </template>
  </SEp>
</template>
