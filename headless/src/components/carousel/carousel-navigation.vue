<script setup lang="ts">
import { useCarouselUi } from './context';
import type { CarouselNavigationProps } from './types';

defineOptions({
  name: 'CarouselNavigation'
});

defineProps<CarouselNavigationProps>();

const cls = useCarouselUi('navigation');
</script>

<template>
  <div :class="cls" data-soybean-carousel-navigation>
    <slot />
  </div>
</template>
