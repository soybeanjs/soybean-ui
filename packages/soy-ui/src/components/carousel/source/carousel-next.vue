<script setup lang="ts">
import { computed } from 'vue';
import { useOmitForwardProps } from '@soybean-ui/primitives';
import { carouselVariants, cn } from '@soybean-ui/variants';
import { ChevronRight } from 'lucide-vue-next';
import SButton from '../../button/source/button.vue';
import { useCarousel } from '../context';
import type { CarouselNextProps } from '../types';

defineOptions({
  name: 'SCarouselNext'
});

const props = withDefaults(defineProps<CarouselNextProps>(), {
  variant: 'pure',
  shape: 'circle'
});

const forwardedProps = useOmitForwardProps(props, ['class', 'disabled']);

const { orientation, canScrollNext, scrollNext } = useCarousel();

const mergedCls = computed(() => {
  const { next } = carouselVariants({ size: props.size, orientation });

  return cn(next(), props.class);
});
</script>

<template>
  <SButton v-bind="forwardedProps" :class="mergedCls" :disabled="!canScrollNext || disabled" @click="scrollNext">
    <slot>
      <ChevronRight />
    </slot>
  </SButton>
</template>
