<script setup lang="ts">
import { SCard } from '@soybeanjs/ui';
import DemoSegmentBase from './base.vue';
import DemoSegmentVertical from './vertical.vue';
import DemoSegmentShape from './shape.vue';
import DemoSegmentIcon from './icon.vue';
</script>

<template>
  <SCard title="Segment" split :ui="{ content: 'flex-c gap-4' }">
    <DemoSegmentBase />
    <DemoSegmentVertical />
    <DemoSegmentShape />
    <DemoSegmentIcon />
  </SCard>
</template>
