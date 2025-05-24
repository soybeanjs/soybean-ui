<script setup lang="ts">
import { AspectRatio } from '../../../src';
import SectionWrapper from '../components/section-wrapper.vue';
</script>

<template>
  <SectionWrapper title="Aspect Ratio">
    <div class="w-100 lt-sm:w-full">
      <AspectRatio :ratio="16 / 9" class="bg-muted">
        <img
          src="https://images.unsplash.com/photo-1588345921523-c2dcdb7f1dcd?w=800&dpr=2&q=80"
          class="h-full w-full rounded-md object-cover"
        />
      </AspectRatio>
    </div>
  </SectionWrapper>
</template>
