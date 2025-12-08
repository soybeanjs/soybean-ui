<script setup lang="ts">
import { SAlert, SCard } from '@soybeanjs/ui';
import type { AlertVariant, ThemeColor } from '@soybeanjs/ui';

const variants: AlertVariant[] = ['solid', 'pure', 'outline', 'soft', 'ghost'];
const colors: ThemeColor[] = ['primary', 'destructive', 'success', 'warning', 'info', 'carbon', 'secondary', 'accent'];
</script>

<template>
  <SCard title="Variant" split :ui="{ content: 'flex-c gap-3' }">
    <SAlert
      v-for="(variant, index) in variants"
      :key="variant"
      :color="colors[index]"
      :variant="variant"
      :title="variant"
      icon="lucide:terminal"
      closable
    />
  </SCard>
</template>
