<script setup lang="ts">
import { SAnchor } from '@soybeanjs/ui';
import type { ThemeColor } from '@soybeanjs/ui';
import { anchorItems } from './shared';

const colors: ThemeColor[] = ['primary', 'destructive', 'success', 'warning', 'info', 'carbon', 'secondary', 'accent'];
</script>

<template>
  <div>
    <h3 class="playground-title">Color</h3>
    <div class="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      <div v-for="color in colors" :key="color" class="rounded-lg border border-border bg-card p-4">
        <p class="mb-3 text-sm font-medium capitalize">{{ color }}</p>
        <SAnchor :items="anchorItems" :color="color" model-value="#overview" :sticky="false" />
      </div>
    </div>
  </div>
</template>
