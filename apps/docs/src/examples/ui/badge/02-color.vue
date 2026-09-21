<script setup lang="ts">
import { SBadge, SButton } from '@vean/ui';
import type { ThemeColor } from '@vean/ui';

const colors: ThemeColor[] = ['primary', 'destructive', 'success', 'warning', 'info', 'carbon', 'secondary', 'accent'];
</script>

<template>
  <div class="flex flex-wrap gap-3">
    <SBadge v-for="color in colors" :key="color" :color="color">
      <SButton variant="pure">{{ color }}</SButton>
    </SBadge>
  </div>
</template>
