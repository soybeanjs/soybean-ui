<script setup lang="ts">
import { SButton } from '@soybeanjs/ui';
</script>

<template>
  <div class="space-y-4">
    <div>
      <h3>尺寸变体</h3>
      <div class="flex items-center gap-2 flex-wrap">
        <SButton size="xs">XS</SButton>
        <SButton size="sm">SM</SButton>
        <SButton size="md">MD</SButton>
        <SButton size="lg">LG</SButton>
        <SButton size="xl">XL</SButton>
        <SButton size="2xl">2XL</SButton>
      </div>
    </div>
  </div>
</template>
