<script setup lang="ts">
import { SCard } from '@soybeanjs/ui';
</script>

<template>
  <SCard title="Title" description="Card description">
    <template #extra>
      <div>extra slot</div>
    </template>
    <div class="text-gray-500 dark:text-neutral-400">Card content</div>
    <template #footer>
      <div>Footer slot</div>
    </template>
  </SCard>
</template>
