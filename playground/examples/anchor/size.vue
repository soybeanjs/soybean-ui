<script setup lang="ts">
import { SAnchor } from '@soybeanjs/ui';
import { anchorItems, anchorSizes } from './shared';
</script>

<template>
  <div>
    <h3 class="playground-title">Size</h3>
    <div class="grid gap-4 md:grid-cols-2">
      <div v-for="size in anchorSizes" :key="size" class="rounded-lg border border-border bg-card p-4">
        <p class="mb-3 text-sm font-medium capitalize">{{ size }}</p>
        <SAnchor :items="anchorItems" :size="size" :sticky="false" />
      </div>
    </div>
  </div>
</template>
