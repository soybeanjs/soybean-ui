<script setup lang="ts">
import { SCard } from '@soybeanjs/ui';
import DemoProgressBasic from './basic.vue';
import DemoProgressSize from './size.vue';
import DemoProgressColor from './color.vue';
import DemoProgressState from './state.vue';
import DemoProgressSlot from './slot.vue';
import DemoProgressCircle from './circle.vue';
import DemoProgressLoadingBar from './loading-bar.vue';
</script>

<template>
  <SCard title="Progress" split :ui="{ content: 'flex-c gap-4' }">
    <DemoProgressBasic />
    <DemoProgressSize />
    <DemoProgressColor />
    <DemoProgressState />
    <DemoProgressSlot />
    <DemoProgressCircle />
    <DemoProgressLoadingBar />
  </SCard>
</template>
