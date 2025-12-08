<script setup lang="ts">
import { SCard, SSeparator } from '@soybeanjs/ui';
</script>

<template>
  <SCard title="Align" :ui="{ content: 'flex-c gap-6' }">
    <SSeparator align="start" label="Start" />
    <SSeparator align="center" label="Center" />
    <SSeparator align="end" label="End" />
  </SCard>
</template>
