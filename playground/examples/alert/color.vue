<script setup lang="ts">
import { SAlert, SCard } from '@soybeanjs/ui';
import type { ThemeColor } from '@soybeanjs/ui';

const colors: ThemeColor[] = ['primary', 'destructive', 'success', 'warning', 'info', 'carbon', 'secondary', 'accent'];
</script>

<template>
  <SCard title="Color" split :ui="{ content: 'flex-c gap-3' }">
    <SAlert v-for="color in colors" :key="color" :color="color" :title="color" icon="lucide:terminal" />
  </SCard>
</template>
