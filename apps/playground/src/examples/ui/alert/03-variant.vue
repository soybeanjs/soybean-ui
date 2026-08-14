<script setup lang="ts">
import { SAlert } from '@soybeanjs/ui';
import type { AlertVariant, ThemeColor } from '@soybeanjs/ui';

const variants: AlertVariant[] = ['solid', 'pure', 'outline', 'soft', 'ghost'];
const colors: ThemeColor[] = ['primary', 'destructive', 'success', 'warning', 'info', 'carbon', 'secondary', 'accent'];
</script>

<template>
  <div class="flex flex-wrap gap-3">
    <SAlert
      v-for="(variant, index) in variants"
      :key="variant"
      :color="colors[index]"
      :variant="variant"
      :title="variant"
      icon="lucide:terminal"
      closable
    />
  </div>
</template>
