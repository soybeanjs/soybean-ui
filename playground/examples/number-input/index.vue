<script setup lang="ts">
import { SCard } from '@ui';
import DemoNumberInputBase from './base.vue';
import DemoNumberInputCenter from './center.vue';
import DemoNumberInputSlot from './slot.vue';
import DemoNumberInputClearable from './clearable.vue';
</script>

<template>
  <SCard title="Number Input" :ui="{ content: 'flex-c gap-3' }">
    <DemoNumberInputBase />
    <DemoNumberInputCenter />
    <DemoNumberInputSlot />
    <DemoNumberInputClearable />
  </SCard>
</template>
