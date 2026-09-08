<script setup lang="ts">
import { SButton } from '@soybeanjs/ui';
import type { ThemeColor } from '@soybeanjs/ui';

const colors: ThemeColor[] = ['primary', 'destructive', 'success', 'warning', 'info', 'carbon', 'secondary', 'accent'];
</script>

<template>
  <div class="flex flex-wrap gap-3">
    <SButton v-for="color in colors" :key="color" :color="color">{{ color }}</SButton>
  </div>
</template>
