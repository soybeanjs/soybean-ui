<script setup lang="ts">
import { computed } from 'vue';
import { carouselVariants, cn } from '@soybean-ui/variants';
import { useCarousel } from '../context';
import type { CarouselItemProps } from '../types';

defineOptions({
  name: 'SCarouselItem'
});

const { class: cls, size } = defineProps<CarouselItemProps>();

const { orientation } = useCarousel();

const mergedCls = computed(() => {
  const { item } = carouselVariants({ size, orientation });

  return cn(item(), cls);
});
</script>

<template>
  <div :class="mergedCls" role="group" aria-roledescription="slide">
    <slot />
  </div>
</template>
