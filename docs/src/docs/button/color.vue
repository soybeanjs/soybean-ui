<script setup lang="ts">
import { SButton } from '@soybeanjs/ui';
import type { ThemeColor } from '@soybeanjs/ui';

const colors: ThemeColor[] = ['primary', 'secondary', 'destructive', 'success', 'warning', 'info', 'accent'];
</script>

<template>
  <div class="space-y-4">
    <div>
      <h3>颜色主题</h3>
      <div class="flex gap-2 flex-wrap">
        <SButton v-for="color in colors" :key="color" :color="color">{{ color }}</SButton>
      </div>
    </div>
  </div>
</template>
