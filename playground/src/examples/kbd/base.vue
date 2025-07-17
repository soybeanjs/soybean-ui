<script setup lang="ts">
import { SCard, SKbd } from '@ui';
</script>

<template>
  <SCard title="Base" :ui="{ content: 'flex gap-2' }">
    <SKbd value="command" />
    <SKbd value="K" />
    <SKbd :value="['ctrl', 'alt']" />
    <SKbd :value="['ctrl', 'alt', 'delete']" />
    <SKbd :value="['ctrl', 'shift', 'A']" />
  </SCard>
</template>
