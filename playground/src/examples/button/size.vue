<script setup lang="ts">
import { SButton, SCard } from '@ui';
import type { ThemeSize } from '@theme';

const sizes: ThemeSize[] = ['xs', 'sm', 'md', 'lg', 'xl', '2xl'];
</script>

<template>
  <SCard title="Size" split>
    <div class="flex flex-wrap gap-3">
      <SButton v-for="size in sizes" :key="size" color="success" variant="pure" :size="size">{{ size }}</SButton>
    </div>
  </SCard>
</template>
