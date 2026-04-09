<script setup lang="ts">
import { SButton, SHoverCard } from '@soybeanjs/ui';
</script>

<template>
  <div>
    <h3 class="playground-title">Delay</h3>
    <div class="flex items-center gap-3">
      <SHoverCard :open-delay="200" :close-delay="500">
        <template #trigger>
          <SButton variant="outline">Hover me</SButton>
        </template>
        <div class="space-y-1.5">
          <p class="font-medium">Custom delays</p>
          <p class="text-sm text-muted-foreground">Opens after 200ms and stays open for 500ms after pointer leave.</p>
        </div>
      </SHoverCard>
    </div>
  </div>
</template>
