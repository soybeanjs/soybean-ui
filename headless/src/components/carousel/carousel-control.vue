<script setup lang="ts">
import { useCarouselUi } from './context';
import type { CarouselControlProps } from './types';

defineOptions({
  name: 'CarouselControl'
});

defineProps<CarouselControlProps>();

const cls = useCarouselUi('control');
</script>

<template>
  <div :class="cls" data-soybean-carousel-control>
    <slot />
  </div>
</template>
