<script setup lang="ts">
import { SCard, SCarousel, SCarouselContent, SCarouselItem, SCarouselNext, SCarouselPrevious } from '@soybeanjs/ui';

const slides = ['Vertical 1', 'Vertical 2', 'Vertical 3'];
</script>

<template>
  <div>
    <h3 class="playground-title">Vertical</h3>
    <SCarousel
      aria-label="Vertical carousel"
      orientation="vertical"
      class="mx-auto h-80 w-full max-w-xs"
      :opts="{ loop: true }"
    >
      <SCarouselContent class="h-full">
        <SCarouselItem v-for="slide in slides" :key="slide">
          <div class="p-1 h-full">
            <SCard :ui="{ content: 'h-full min-h-24 flex items-center justify-center p-6' }" class="h-full">
              <span class="text-xl font-semibold">{{ slide }}</span>
            </SCard>
          </div>
        </SCarouselItem>
      </SCarouselContent>
      <SCarouselPrevious />
      <SCarouselNext />
    </SCarousel>
  </div>
</template>
