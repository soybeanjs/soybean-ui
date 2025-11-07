<script setup lang="ts">
import { SButton, SCard } from '@ui';
import type { ThemeColor } from '@/theme';

const colors: ThemeColor[] = ['primary', 'destructive', 'success', 'warning', 'info', 'carbon', 'secondary', 'accent'];
</script>

<template>
  <SCard title="Color" split>
    <div class="flex flex-wrap gap-3">
      <SButton v-for="color in colors" :key="color" :color="color">{{ color }}</SButton>
    </div>
  </SCard>
</template>
