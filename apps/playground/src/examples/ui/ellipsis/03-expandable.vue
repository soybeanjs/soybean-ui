<script setup lang="ts">
import { SEllipsis } from '@soybeanjs/ui';
</script>

<template>
  <div class="w-72 flex flex-col gap-4">
    <SEllipsis :lines="2" expandable>
      Clicking this expandable text toggles between the clamped two-line preview and the full content. When expanded,
      the line clamp is removed so the entire paragraph is visible.
    </SEllipsis>
  </div>
</template>
