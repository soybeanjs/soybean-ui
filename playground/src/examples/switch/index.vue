<script setup lang="ts">
import { SCard } from '@ui';
import DemoSwitchDefault from './default.vue';
import DemoSwitchSize from './size.vue';
import DemoSwitchShape from './shape.vue';
import DemoSwitchSlot from './slot.vue';
</script>

<template>
  <SCard title="Switch" :ui="{ content: 'flex-c gap-3' }">
    <DemoSwitchDefault />
    <DemoSwitchSize />
    <DemoSwitchShape />
    <DemoSwitchSlot />
  </SCard>
</template>
