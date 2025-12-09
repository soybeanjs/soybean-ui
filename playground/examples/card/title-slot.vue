<script setup lang="ts">
import { SCard, SIcon } from '@soybeanjs/ui';
</script>

<template>
  <div>
    <h3 class="playground-title">Title Slot</h3>
    <SCard title="Title">
      <template #title-leading>
        <SIcon icon="lucide:rocket" />
      </template>
      <template #title-trailing>
        <span>Trailing</span>
      </template>
      <div class="text-gray-500 dark:text-neutral-400">Card content</div>
    </SCard>
  </div>
</template>
