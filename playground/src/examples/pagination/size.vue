<script setup lang="ts">
import { SCard, SPagination } from '@ui';
import type { ThemeSize } from '@ui';

const sizes: ThemeSize[] = ['xs', 'sm', 'md', 'lg', 'xl', '2xl'];
</script>

<template>
  <SCard title="Size" :ui="{ content: 'flex-c gap-3' }">
    <SPagination
      v-for="size in sizes"
      :key="size"
      show-edges
      :sibling-count="1"
      :items-per-page="10"
      :total="200"
      :size="size"
    />
  </SCard>
</template>
