<script setup lang="ts">
import { SButton } from '@soybeanjs/ui';
</script>

<template>
  <div class="space-y-4">
    <div>
      <h3>颜色主题</h3>
      <div class="flex gap-2 flex-wrap">
        <SButton color="primary">Primary</SButton>
        <SButton color="secondary">Secondary</SButton>
        <SButton color="destructive">Destructive</SButton>
        <SButton color="success">Success</SButton>
        <SButton color="warning">Warning</SButton>
        <SButton color="info">Info</SButton>
        <SButton color="accent">Accent</SButton>
      </div>
    </div>
  </div>
</template>
