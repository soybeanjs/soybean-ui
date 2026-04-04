<script setup lang="ts">
import { SProgress } from '@soybeanjs/ui';
</script>

<template>
  <div>
    <h3 class="playground-title">Slot</h3>
    <SProgress :model-value="66" size="xl">
      <template #default="{ valuePercent }">
        <div class="flex h-full items-center justify-end px-2 text-xs font-medium text-primary-foreground">
          {{ Math.round(valuePercent ?? 0) }}%
        </div>
      </template>
    </SProgress>
  </div>
</template>
