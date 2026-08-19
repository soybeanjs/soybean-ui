<script setup lang="ts">
import { SEllipsis } from '@soybeanjs/ui';
</script>

<template>
  <div class="w-72 flex flex-col gap-4">
    <SEllipsis :lines="2" tooltip-content="Custom tooltip text">
      Content is clamped to two lines. Hovering shows a custom tooltip message instead of the raw text.
    </SEllipsis>
    <SEllipsis :lines="3">
      This paragraph is clamped to three lines. The tooltip only appears when the content actually overflows — short
      content never shows a popup.
    </SEllipsis>
  </div>
</template>
