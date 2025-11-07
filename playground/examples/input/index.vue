<script setup lang="ts">
import { SCard } from '@ui';
import DemoInputBase from './base.vue';
import DemoInputDisabled from './disabled.vue';
import DemoInputSlot from './slot.vue';
import DemoInputClearable from './clearable.vue';
</script>

<template>
  <SCard title="Input" :ui="{ content: 'flex-c gap-3' }">
    <DemoInputBase />
    <DemoInputDisabled />
    <DemoInputSlot />
    <DemoInputClearable />
  </SCard>
</template>
