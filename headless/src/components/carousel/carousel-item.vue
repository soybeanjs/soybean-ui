<script setup lang="ts">
import { useOmitProps } from '../../composables';
import { useCarouselRootContext, useCarouselUi } from './context';
import type { CarouselItemProps } from './types';

defineOptions({
  name: 'CarouselItem'
});

const props = defineProps<CarouselItemProps>();

const cls = useCarouselUi('item');
const { orientation } = useCarouselRootContext('CarouselItem');
const forwardedProps = useOmitProps(props, []);
</script>

<template>
  <div
    v-bind="forwardedProps"
    :class="cls"
    :data-orientation="orientation"
    data-soybean-carousel-item
    role="group"
    aria-roledescription="slide"
  >
    <slot />
  </div>
</template>
