<script setup lang="ts">
import { SCard, SSwitch } from '@ui';
import type { ThemeColor, ThemeSize } from '@ui';

const sizes: ThemeSize[] = ['xs', 'sm', 'md', 'lg', 'xl', '2xl'];

const colors: ThemeColor[] = ['primary', 'destructive', 'success', 'warning', 'info', 'carbon', 'secondary', 'accent'];
</script>

<template>
  <SCard title="Size" :ui="{ content: 'flex gap-3' }">
    <SSwitch v-for="(size, index) in sizes" :key="size" :default-value="true" :size="size" :color="colors[index]" />
  </SCard>
</template>
