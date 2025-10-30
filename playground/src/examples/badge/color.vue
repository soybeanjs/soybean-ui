<script setup lang="ts">
import { SBadge, SButton, SCard } from '@ui';
import type { ThemeColor } from '@ui';

const colors: ThemeColor[] = ['primary', 'destructive', 'success', 'warning', 'info', 'carbon', 'secondary', 'accent'];
</script>

<template>
  <SCard title="Color" split :ui="{ content: 'flex gap-3' }">
    <SBadge v-for="color in colors" :key="color" :color="color">
      <SButton variant="pure">{{ color }}</SButton>
    </SBadge>
  </SCard>
</template>
