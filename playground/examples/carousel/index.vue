<script setup lang="ts">
import { SCard } from '@soybeanjs/ui';
import DemoCarouselBasic from './basic.vue';
import DemoCarouselCustomStyling from './custom-styling.vue';
import DemoCarouselRtl from './rtl.vue';
import DemoCarouselVertical from './vertical.vue';
</script>

<template>
  <SCard title="Carousel" split :ui="{ content: 'flex-c gap-4' }">
    <DemoCarouselBasic />
    <DemoCarouselVertical />
    <DemoCarouselRtl />
    <DemoCarouselCustomStyling />
  </SCard>
</template>
