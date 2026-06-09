<script setup lang="ts">
import { useCarouselUi } from './context';
import type { CarouselContainerProps } from './types';

defineOptions({
  name: 'CarouselContainer'
});

defineProps<CarouselContainerProps>();

const cls = useCarouselUi('container');
</script>

<template>
  <div data-soybean-carousel-container :class="cls">
    <slot />
  </div>
</template>
