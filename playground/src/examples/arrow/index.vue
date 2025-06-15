<script setup lang="ts">
import { SCard } from '@ui';
import { Arrow } from '@headless';
</script>

<template>
  <SCard title="Arrow" :ui="{ content: 'flex-center gap-4 h-20 bg-gray-100 dark:bg-gray-900' }">
    <Arrow class="text-2xl fill-popover stroke-border" />
    <Arrow class="text-2xl fill-popover-foreground" />
  </SCard>
</template>
