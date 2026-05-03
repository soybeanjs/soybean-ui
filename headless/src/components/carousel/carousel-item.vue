<script setup lang="ts">
import { useCarouselUi } from './context';
import type { CarouselItemProps } from './types';

defineOptions({
  name: 'CarouselItem'
});

defineProps<CarouselItemProps>();

const cls = useCarouselUi('item');
</script>

<template>
  <div :class="cls" data-soybean-carousel-item role="group" aria-roledescription="slide">
    <slot />
  </div>
</template>
