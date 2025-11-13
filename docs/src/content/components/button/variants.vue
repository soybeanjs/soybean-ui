<script setup lang="ts">
import { SButton } from '@soybeanjs/ui';
</script>

<template>
  <div class="space-y-4">
    <div>
      <h3>样式变体</h3>
      <div class="flex gap-2 flex-wrap">
        <SButton variant="solid">Solid</SButton>
        <SButton variant="outline">Outline</SButton>
        <SButton variant="dashed">Dashed</SButton>
        <SButton variant="soft">Soft</SButton>
        <SButton variant="ghost">Ghost</SButton>
        <SButton variant="link">Link</SButton>
      </div>
    </div>
  </div>
</template>
