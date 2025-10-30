<script setup lang="ts">
import { SCard, STag } from '@ui';
import type { ThemeSize } from '@ui';

const sizes: ThemeSize[] = ['xs', 'sm', 'md', 'lg', 'xl', '2xl'];
</script>

<template>
  <SCard title="Size" split :ui="{ content: 'flex gap-3' }">
    <STag v-for="size in sizes" :key="size" :size="size" variant="ghost">
      {{ size }}
    </STag>
  </SCard>
</template>
