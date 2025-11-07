<script setup lang="ts">
import { SCard, SCheckbox } from '@ui';
import type { ThemeColor } from '@ui';

const colors: ThemeColor[] = ['primary', 'destructive', 'success', 'warning', 'info', 'carbon', 'secondary', 'accent'];
</script>

<template>
  <SCard title="Color" :ui="{ content: 'flex gap-3' }">
    <SCheckbox v-for="color in colors" :key="color" :default-value="true" :color="color" :label="color" />
  </SCard>
</template>
