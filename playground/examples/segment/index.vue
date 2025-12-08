<script setup lang="ts">
import { SCard } from '@soybeanjs/ui';
import DemoSegmentOrientation from './orientation.vue';
import DemoSegmentShape from './shape.vue';
import DemoSegmentIcon from './icon.vue';
</script>

<template>
  <SCard title="Segment" :ui="{ content: 'flex-c gap-3' }">
    <DemoSegmentOrientation />
    <DemoSegmentShape />
    <DemoSegmentIcon />
  </SCard>
</template>
