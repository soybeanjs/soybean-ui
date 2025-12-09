<script setup lang="ts">
import { SCard } from '@soybeanjs/ui';
</script>

<template>
  <div>
    <h3 class="playground-title">Split</h3>
    <SCard title="Title" split>
      <div class="text-gray-500 dark:text-neutral-400">this is card content</div>
      <template #footer>
        <div>footer slot</div>
      </template>
    </SCard>
  </div>
</template>
