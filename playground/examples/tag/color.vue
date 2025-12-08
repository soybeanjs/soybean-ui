<script setup lang="ts">
import { SCard, STag } from '@soybeanjs/ui';
import type { ThemeColor } from '@soybeanjs/ui';

const colors: ThemeColor[] = ['primary', 'destructive', 'success', 'warning', 'info', 'carbon', 'secondary', 'accent'];
</script>

<template>
  <SCard title="Color" split :ui="{ content: 'flex gap-3' }">
    <STag v-for="color in colors" :key="color" :color="color">
      {{ color }}
    </STag>
  </SCard>
</template>
