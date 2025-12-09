<script setup lang="ts">
import { SBadge, SButton } from '@soybeanjs/ui';
import type { ThemeColor } from '@soybeanjs/ui';

const colors: ThemeColor[] = ['primary', 'destructive', 'success', 'warning', 'info', 'carbon', 'secondary', 'accent'];
</script>

<template>
  <div>
    <h3 class="playground-title">Content</h3>
    <div class="flex flex-wrap gap-6">
      <SBadge v-for="color in colors" :key="color" :color="color" content="99+">
        <SButton variant="pure">{{ color }}</SButton>
      </SBadge>
    </div>
  </div>
</template>
