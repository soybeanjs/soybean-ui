<script setup lang="ts">
import { SBottomSheet, SButton } from '@soybeanjs/ui';
</script>

<template>
  <div>
    <h3 class="playground-title">Basic</h3>
    <SBottomSheet title="Share post" description="Invite teammates or copy the link to continue.">
      <template #trigger>
        <SButton variant="outline">Open BottomSheet</SButton>
      </template>
      <div class="flex-c gap-3">
        <p class="text-sm text-muted-foreground">
          This bottom sheet is optimized for mobile overlays and supports drag-to-close.
        </p>
        <div class="grid grid-cols-2 gap-3">
          <SButton variant="outline">Copy link</SButton>
          <SButton>Share now</SButton>
        </div>
      </div>
    </SBottomSheet>
  </div>
</template>
