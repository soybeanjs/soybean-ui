<script setup lang="ts">
import { SArrow, SCard } from '@ui';
</script>

<template>
  <SCard title="Arrow" :ui="{ content: 'flex gap-4' }">
    <SArrow class="text-2xl fill-popover stroke-border" />
    <SArrow class="text-2xl fill-popover-foreground" />
  </SCard>
</template>
