<script setup lang="ts">
import { CarouselItem } from '@soybeanjs/headless/carousel';
import type { CarouselItemProps } from '@soybeanjs/headless/carousel';

defineOptions({
  name: 'SCarouselItem'
});

defineProps<CarouselItemProps>();
</script>

<template>
  <CarouselItem v-bind="$props">
    <slot />
  </CarouselItem>
</template>
