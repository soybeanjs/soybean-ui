<script setup lang="ts">
import { computed } from 'vue';
import { CarouselRoot, provideCarouselUi } from '@soybeanjs/headless';
import { useForwardListeners, useOmitProps } from '@soybeanjs/headless/composables';
import { mergeSlotVariants } from '@/theme';
import { carouselVariants } from './variants';
import type { CarouselEmits, CarouselProps } from './types';

defineOptions({
  name: 'SCarousel'
});

const props = withDefaults(defineProps<CarouselProps>(), {
  orientation: 'horizontal'
});

const emit = defineEmits<CarouselEmits>();

const forwardedProps = useOmitProps(props, ['class', 'ui']);
const listeners = useForwardListeners(emit);

const ui = computed(() => {
  const variants = carouselVariants({
    orientation: props.orientation
  });

  return mergeSlotVariants(variants, props.ui, { root: props.class });
});

provideCarouselUi(ui);
</script>

<template>
  <CarouselRoot v-bind="forwardedProps" v-on="listeners">
    <slot />
  </CarouselRoot>
</template>
