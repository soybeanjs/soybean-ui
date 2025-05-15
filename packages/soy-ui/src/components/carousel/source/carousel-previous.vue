<script setup lang="ts">
import { computed } from 'vue';
import { useOmitForwardProps } from '@soybean-ui/primitives';
import { carouselVariants, cn } from '@soybean-ui/variants';
import { ChevronLeft } from 'lucide-vue-next';
import SButton from '../../button/source/button.vue';
import { useCarousel } from '../context';
import type { CarouselPreviousProps } from '../types';

defineOptions({
  name: 'SCarouselPrevious'
});

const props = withDefaults(defineProps<CarouselPreviousProps>(), {
  variant: 'pure',
  shape: 'circle'
});

const forwardedProps = useOmitForwardProps(props, ['class', 'disabled']);

const { orientation, canScrollPrev, scrollPrev } = useCarousel();

const mergedCls = computed(() => {
  const { previous } = carouselVariants({ size: props.size, orientation });

  return cn(previous(), props.class);
});
</script>

<template>
  <SButton v-bind="forwardedProps" :class="mergedCls" :disabled="!canScrollPrev || disabled" @click="scrollPrev">
    <slot>
      <ChevronLeft />
    </slot>
  </SButton>
</template>
