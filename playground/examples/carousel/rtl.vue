<script setup lang="ts">
import { SCard, SCarousel, SCarouselContent, SCarouselItem, SCarouselNext, SCarouselPrevious } from '@soybeanjs/ui';

const slides = ['الشريحة ١', 'الشريحة ٢', 'الشريحة ٣'];
</script>

<template>
  <div>
    <h3 class="playground-title">RTL</h3>
    <SCarousel aria-label="RTL carousel" dir="rtl" class="mx-auto w-full max-w-xs">
      <SCarouselContent>
        <SCarouselItem v-for="slide in slides" :key="slide">
          <div class="p-1">
            <SCard :ui="{ content: 'aspect-square flex items-center justify-center p-6' }">
              <span class="text-3xl font-semibold">{{ slide }}</span>
            </SCard>
          </div>
        </SCarouselItem>
      </SCarouselContent>
      <SCarouselPrevious />
      <SCarouselNext />
    </SCarousel>
  </div>
</template>
