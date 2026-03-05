<script setup lang="ts">
import { SCard, SCardCollapsibleTrigger } from '@soybeanjs/ui';
</script>

<template>
  <div>
    <h3 class="playground-title">Collapsible</h3>
    <SCard title="Title">
      <template #extra>
        <SCardCollapsibleTrigger />
      </template>
      <div class="text-gray-500 dark:text-neutral-400">Card content</div>
    </SCard>
  </div>
</template>
