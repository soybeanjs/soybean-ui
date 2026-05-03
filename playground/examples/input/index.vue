<script setup lang="ts">
import { SCard } from '@soybeanjs/ui';
import DemoInputBasic from './basic.vue';
import DemoInputDisabled from './disabled.vue';
import DemoInputSlot from './slot.vue';
import DemoInputClearable from './clearable.vue';
</script>

<template>
  <SCard title="Input" split :ui="{ content: 'flex-c gap-4' }">
    <DemoInputBasic />
    <DemoInputDisabled />
    <DemoInputSlot />
    <DemoInputClearable />
  </SCard>
</template>
