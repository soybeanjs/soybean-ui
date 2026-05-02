<script setup lang="ts">
import { CarouselContent } from '@soybeanjs/headless/carousel';
import type { CarouselContentProps } from '@soybeanjs/headless/carousel';

defineOptions({
  name: 'SCarouselContent'
});

defineProps<CarouselContentProps>();
</script>

<template>
  <CarouselContent v-bind="$props">
    <slot />
  </CarouselContent>
</template>
