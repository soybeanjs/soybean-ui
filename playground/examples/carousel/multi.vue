<script setup lang="ts">
import { SCard, SCarousel } from '@soybeanjs/ui';

const slides = ['A', 'B', 'C', 'D'];
</script>

<template>
  <div>
    <h3 class="playground-title">Multi Item</h3>
    <SCarousel
      :slides="slides"
      aria-label="Multi item carousel"
      :options="{ loop: true }"
      class="mx-auto w-full max-w-lg"
      :ui="{
        item: 'basis-1/2 md:basis-1/3 p-1'
      }"
    >
      <template #item="{ slide }">
        <SCard :ui="{ content: 'aspect-video flex items-center justify-center' }">
          <span class="text-2xl font-semibold">{{ slide }}</span>
        </SCard>
      </template>
    </SCarousel>
  </div>
</template>
