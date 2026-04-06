<script setup lang="ts">
import { SCard } from '@soybeanjs/ui';
import DemoToggleGroupBasic from './basic.vue';
import DemoToggleGroupMultiple from './multiple.vue';
import DemoToggleGroupOutline from './outline.vue';
import DemoToggleGroupVariant from './variant.vue';
import DemoToggleGroupVertical from './vertical.vue';
</script>

<template>
  <SCard title="ToggleGroup" split :ui="{ content: 'flex-c gap-4' }">
    <DemoToggleGroupBasic />
    <DemoToggleGroupMultiple />
    <DemoToggleGroupOutline />
    <DemoToggleGroupVariant />
    <DemoToggleGroupVertical />
  </SCard>
</template>
