<script setup lang="ts">
import { SCard } from '@soybeanjs/ui';
</script>

<template>
  <SCard title="Title" split>
    <div class="text-gray-500 dark:text-neutral-400">this is card content</div>
    <template #footer>
      <div>footer slot</div>
    </template>
  </SCard>
</template>
