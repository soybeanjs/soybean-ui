<script setup lang="ts">
import { SClipboard, SIcon } from '@soybeanjs/ui';
import type { ThemeSize } from '@soybeanjs/ui';

const sizes: ThemeSize[] = ['xs', 'sm', 'md', 'lg', 'xl', '2xl'];
</script>

<template>
  <h3 class="playground-title">Size</h3>
  <div class="flex flex-wrap items-center gap-3">
    <SClipboard v-for="size in sizes" :key="size" :value="`copy-${size}`" :size="size" color="accent" variant="outline">
      <template #leading="{ copied }">
        <SIcon :icon="copied ? 'lucide:check' : 'lucide:copy'" />
      </template>
      <template #default="{ copied }">
        {{ copied ? `${size} copied` : size }}
      </template>
    </SClipboard>
  </div>
</template>
