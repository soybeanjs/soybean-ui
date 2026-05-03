<script setup lang="ts">
import { SCard } from '@soybeanjs/ui';
import DemoCarouselBasic from './basic.vue';
import DemoCarouselFloat from './float.vue';
import DemoCarouselVertical from './vertical.vue';
import DemoCarouselMulti from './multi.vue';
import DemoCarouselSnap from './snap.vue';
import DemoCarouselProgress from './progress.vue';
import DemoCarouselDot from './dot.vue';
</script>

<template>
  <SCard title="Carousel" split :ui="{ content: 'flex-c gap-8' }">
    <DemoCarouselBasic />
    <DemoCarouselVertical />
    <DemoCarouselFloat />
    <DemoCarouselMulti />
    <DemoCarouselSnap />
    <DemoCarouselProgress />
    <DemoCarouselDot />
  </SCard>
</template>
