<script setup lang="ts">
import { SCard } from '@ui';
import DemoDividerOrientation from './orientation.vue';
import DemoDividerAlign from './align.vue';
import DemoDividerBorder from './border.vue';
</script>

<template>
  <SCard title="Divider" :ui="{ content: 'flex-c gap-3' }">
    <DemoDividerOrientation />
    <DemoDividerAlign />
    <DemoDividerBorder />
  </SCard>
</template>
