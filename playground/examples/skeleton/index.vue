<script setup lang="ts">
import { SCard } from '@soybeanjs/ui';
import DemoSkeletonBasic from './basic.vue';
import DemoSkeletonSize from './size.vue';
import DemoSkeletonShape from './shape.vue';
import DemoSkeletonAnimated from './animated.vue';
import DemoSkeletonCustomSize from './custom-size.vue';
</script>

<template>
  <SCard title="Skeleton" split :ui="{ content: 'flex-c gap-4' }">
    <DemoSkeletonBasic />
    <DemoSkeletonSize />
    <DemoSkeletonShape />
    <DemoSkeletonAnimated />
    <DemoSkeletonCustomSize />
  </SCard>
</template>
