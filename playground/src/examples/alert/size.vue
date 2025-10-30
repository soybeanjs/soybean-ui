<script setup lang="ts">
import { SAlert, SCard } from '@ui';
import type { ThemeColor, ThemeSize } from '@ui';

const sizes: ThemeSize[] = ['xs', 'sm', 'md', 'lg', 'xl', '2xl'];
const colors: ThemeColor[] = ['primary', 'destructive', 'success', 'warning', 'info', 'carbon', 'secondary', 'accent'];
</script>

<template>
  <SCard title="Size" split :ui="{ content: 'flex-c gap-3' }">
    <SAlert
      v-for="(size, index) in sizes"
      :key="size"
      :color="colors[index]"
      :size="size"
      variant="soft"
      :title="size"
      icon="lucide:terminal"
      closable
    />
  </SCard>
</template>
