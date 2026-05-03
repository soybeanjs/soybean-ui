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
  <div :class="cls" data-soybean-carousel-container>
    <slot />
  </div>
</template>
