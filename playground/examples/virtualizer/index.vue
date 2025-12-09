<script setup lang="ts">
import { SCard } from '@soybeanjs/ui';
import DemoVirtualizerBase from './base.vue';
import DemoVirtualizerHorizontal from './horizontal.vue';
import DemoVirtualizerDynamic from './dynamic.vue';
</script>

<template>
  <SCard title="Virtualizer" split :ui="{ content: 'flex-c gap-4' }">
    <DemoVirtualizerBase />
    <DemoVirtualizerHorizontal />
    <DemoVirtualizerDynamic />
  </SCard>
</template>
