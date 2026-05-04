<script setup lang="ts">
import { SCard, SCardCollapsibleTrigger } from '@soybeanjs/ui';
</script>

<template>
  <SCard title="Title">
    <template #extra>
      <SCardCollapsibleTrigger />
    </template>
    <div class="text-gray-500 dark:text-neutral-400">Card content</div>
  </SCard>
</template>
