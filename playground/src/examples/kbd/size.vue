<script setup lang="ts">
import { SCard, SKbd } from '@ui';
import type { ThemeSize } from '@ui';

const sizes: ThemeSize[] = ['xs', 'sm', 'md', 'lg', 'xl', '2xl'];
</script>

<template>
  <SCard title="Size" :ui="{ content: 'flex gap-2' }">
    <SKbd v-for="size in sizes" :key="size" :size="size" value="command" />
  </SCard>
</template>
