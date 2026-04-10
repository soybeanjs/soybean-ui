<script setup lang="ts">
import { SBottomSheet, SButton } from '@soybeanjs/ui';
</script>

<template>
  <div>
    <h3 class="playground-title">Handle only drag</h3>
    <SBottomSheet
      handle-only
      title="Activity"
      description="Scrollable content keeps working, while the sheet only drags from the handle."
    >
      <template #trigger>
        <SButton variant="outline">Open handle-only sheet</SButton>
      </template>
      <div class="max-h-48 flex-c gap-3 overflow-y-auto pr-1 text-sm text-muted-foreground">
        <p v-for="index in 12" :key="index">Recent activity item {{ index }}</p>
      </div>
    </SBottomSheet>
  </div>
</template>
