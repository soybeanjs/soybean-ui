<script setup lang="ts">
import { SButtonIcon } from '@soybeanjs/ui';
</script>

<template>
  <div class="space-y-4">
    <h3>图标按钮</h3>
    <div class="flex flex-wrap gap-3">
      <SButtonIcon icon="lucide:skip-back" />
      <SButtonIcon icon="lucide:skip-forward" />
      <SButtonIcon icon="lucide:pause" />
    </div>
  </div>
</template>
