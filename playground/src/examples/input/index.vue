<script setup lang="ts">
import { SCard } from '@ui';
import DemoInputBase from './base.vue';
import DemoInputDisabled from './disabled.vue';
import DemoInputSlot from './slot.vue';
import DemoInputClearable from './clearable.vue';
import DemoInputFile from './file.vue';
</script>

<template>
  <SCard title="Input" :ui="{ content: 'flex-c gap-3' }">
    <DemoInputBase />
    <DemoInputDisabled />
    <DemoInputSlot />
    <DemoInputClearable />
    <DemoInputFile />
  </SCard>
</template>
