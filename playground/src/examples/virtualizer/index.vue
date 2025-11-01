<script setup lang="ts">
import { SCard } from '@ui';
import DemoVirtualizerBase from './base.vue';
import DemoVirtualizerHorizontal from './horizontal.vue';
import DemoVirtualizerDynamic from './dynamic.vue';
</script>

<template>
  <SCard title="Virtualizer" :ui="{ content: 'flex-c gap-3' }">
    <DemoVirtualizerBase />
    <DemoVirtualizerHorizontal />
    <DemoVirtualizerDynamic />
  </SCard>
</template>
