<script setup lang="ts">
import { SCard, SDivider } from '@ui';
</script>

<template>
  <SCard title="Align" :ui="{ content: 'flex-c gap-6' }">
    <SDivider align="start" label="Start" />
    <SDivider align="center" label="Center" />
    <SDivider align="end" label="End" />
  </SCard>
</template>
