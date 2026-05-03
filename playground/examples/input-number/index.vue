<script setup lang="ts">
import { SCard } from '@soybeanjs/ui';
import DemoInputNumberBasic from './basic.vue';
import DemoInputNumberCenter from './center.vue';
import DemoInputNumberSlot from './slot.vue';
import DemoInputNumberClearable from './clearable.vue';
</script>

<template>
  <SCard title="Number Input" split :ui="{ content: 'flex-c gap-4' }">
    <DemoInputNumberBasic />
    <DemoInputNumberCenter />
    <DemoInputNumberSlot />
    <DemoInputNumberClearable />
  </SCard>
</template>
