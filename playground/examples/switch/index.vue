<script setup lang="ts">
import { SCard } from '@soybeanjs/ui';
import DemoSwitchBase from './base.vue';
import DemoSwitchSize from './size.vue';
import DemoSwitchShape from './shape.vue';
import DemoSwitchSlot from './slot.vue';
</script>

<template>
  <SCard title="Switch" split :ui="{ content: 'flex-c gap-4' }">
    <DemoSwitchBase />
    <DemoSwitchSize />
    <DemoSwitchShape />
    <DemoSwitchSlot />
  </SCard>
</template>
