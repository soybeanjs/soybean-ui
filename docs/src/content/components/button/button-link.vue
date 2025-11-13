<script setup lang="ts">
import { SButtonLink } from '@soybeanjs/ui';
</script>

<template>
  <div class="space-y-4">
    <div>
      <h3>链接按钮</h3>
      <div class="flex gap-2 flex-wrap">
        <SButtonLink to="/home">内部链接</SButtonLink>
        <SButtonLink href="https://soybeanjs.cn" rel="noopener noreferrer" target="_blank">外部链接</SButtonLink>
        <SButtonLink to="/home" variant="outline">Outline</SButtonLink>
        <SButtonLink to="/home" variant="ghost">Ghost</SButtonLink>
      </div>
    </div>
  </div>
</template>
