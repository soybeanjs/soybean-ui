<script setup lang="ts">
import { SCard, SCarousel, SCarouselContent, SCarouselItem, SCarouselNext, SCarouselPrevious } from '@soybeanjs/ui';

const slides = ['A', 'B', 'C', 'D'];
</script>

<template>
  <div>
    <h3 class="playground-title">Custom Styling</h3>
    <SCarousel
      aria-label="Custom styled carousel"
      class="mx-auto w-full max-w-lg"
      :ui="{
        item: 'basis-1/2 md:basis-1/3',
        previous: 'bg-primary text-primary-foreground border-primary',
        next: 'bg-primary text-primary-foreground border-primary'
      }"
    >
      <SCarouselContent>
        <SCarouselItem v-for="slide in slides" :key="slide">
          <div class="p-1">
            <SCard :ui="{ content: 'aspect-video flex items-center justify-center p-4' }">
              <span class="text-2xl font-semibold">{{ slide }}</span>
            </SCard>
          </div>
        </SCarouselItem>
      </SCarouselContent>
      <SCarouselPrevious />
      <SCarouselNext />
    </SCarousel>
  </div>
</template>
