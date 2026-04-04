<script setup lang="ts">
import { SCircleProgress } from '@soybeanjs/ui';

const items = [
  { color: 'primary', value: 25 },
  { color: 'success', value: 60 },
  { color: 'warning', value: 85 },
  { color: 'destructive', value: null }
] as const;
</script>

<template>
  <div>
    <h3 class="playground-title">Circle</h3>
    <div class="flex flex-wrap gap-4">
      <SCircleProgress
        v-for="item in items"
        :key="item.color"
        :model-value="item.value"
        :color="item.color"
        size="xl"
      >
        <template #default="{ progressState, valuePercent }">
          <span class="text-center text-sm font-medium">
            {{ progressState === 'indeterminate' ? '...' : `${Math.round(valuePercent ?? 0)}%` }}
          </span>
        </template>
      </SCircleProgress>
    </div>
  </div>
</template>
