<script setup lang="ts">
import { SCard } from '@soybeanjs/ui';
import DemoSwitchBasic from './basic.vue';
import DemoSwitchSize from './size.vue';
import DemoSwitchShape from './shape.vue';
import DemoSwitchSlot from './slot.vue';
</script>

<template>
  <SCard title="Switch" split :ui="{ content: 'flex-c gap-4' }">
    <DemoSwitchBasic />
    <DemoSwitchSize />
    <DemoSwitchShape />
    <DemoSwitchSlot />
  </SCard>
</template>
