<script setup lang="ts">
import { SClipboard } from '@soybeanjs/ui';
import type { ThemeSize } from '@soybeanjs/ui';

const sizes: ThemeSize[] = ['xs', 'sm', 'md', 'lg', 'xl', '2xl'];
</script>

<template>
  <SClipboard
    v-for="size in sizes"
    :key="size"
    :value="`copy-${size}`"
    :size="size"
    color="accent"
    variant="outline"
    :copy-text="size"
    :copied-text="`${size} copied`"
  />
</template>
