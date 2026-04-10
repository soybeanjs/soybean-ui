<script setup lang="ts">
import { SCard } from '@soybeanjs/ui';
import DemoSplitterBasic from './basic.vue';
import DemoSplitterCollapsible from './collapsible.vue';
import DemoSplitterCustomHandle from './custom-handle.vue';
import DemoSplitterDisabled from './disabled.vue';
import DemoSplitterVertical from './vertical.vue';
</script>

<template>
  <SCard title="Splitter" split :ui="{ content: 'flex-c gap-4' }">
    <DemoSplitterBasic />
    <DemoSplitterVertical />
    <DemoSplitterCollapsible />
    <DemoSplitterDisabled />
    <DemoSplitterCustomHandle />
  </SCard>
</template>
