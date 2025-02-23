<script setup lang="ts">
import { computed } from 'vue';
import { carouselVariants, cn } from '@soybean-ui/variants';
import { useCarousel } from './context';
import type { CarouselContentProps } from './types';

defineOptions({
  name: 'SCarouselContent',
  inheritAttrs: false
});

const { class: cls, wrapperClass } = defineProps<CarouselContentProps>();

const { carouselRef, orientation } = useCarousel();

const mergedCls = computed(() => {
  const { content, contentWrapper } = carouselVariants({ orientation });

  return {
    cls: cn(content(), cls),
    wrapper: cn(contentWrapper(), wrapperClass)
  };
});
</script>

<template>
  <div ref="carouselRef" :class="mergedCls.wrapper">
    <div v-bind="$attrs" :class="mergedCls.cls">
      <slot />
    </div>
  </div>
</template>
