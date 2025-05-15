<script setup lang="ts">
import { computed } from 'vue';
import type { Ref, UnwrapRef } from 'vue';
import { carouselVariants, cn } from '@soybean-ui/variants';
import { provideCarouselContext } from '../context';
import type { CarouselContext, CarouselRootEmits, CarouselRootProps, UnwrapRefCarouselApi } from '../types';

defineOptions({
  name: 'SCarouselRoot'
});

const props = withDefaults(defineProps<CarouselRootProps>(), {
  orientation: 'horizontal'
});

const emit = defineEmits<CarouselRootEmits>();

type Slots = {
  default: (props: UnwrapRef<CarouselContext>) => any;
};

defineSlots<Slots>();

const { canScrollNext, canScrollPrev, carouselApi, carouselRef, orientation, scrollNext, scrollPrev } =
  provideCarouselContext(props, emit);

const mergedCls = computed(() => {
  const { root } = carouselVariants({ size: props.size, orientation: props.orientation });

  return cn(root(), props.class);
});

function onKeyDown(event: KeyboardEvent) {
  const prevKey = props.orientation === 'vertical' ? 'ArrowUp' : 'ArrowLeft';
  const nextKey = props.orientation === 'vertical' ? 'ArrowDown' : 'ArrowRight';

  if (event.key === prevKey) {
    event.preventDefault();
    scrollPrev();

    return;
  }

  if (event.key === nextKey) {
    event.preventDefault();
    scrollNext();
  }
}

defineExpose({
  canScrollNext,
  canScrollPrev,
  carouselApi: carouselApi as Ref<UnwrapRefCarouselApi>,
  carouselRef,
  orientation,
  scrollNext,
  scrollPrev
} as CarouselContext);
</script>

<template>
  <div :class="mergedCls" role="region" aria-roledescription="carousel" tabindex="0" @keydown="onKeyDown">
    <slot
      :can-scroll-next="canScrollNext"
      :can-scroll-prev="canScrollPrev"
      :carousel-api="carouselApi"
      :carousel-ref="carouselRef"
      :orientation="orientation"
      :scroll-next="scrollNext"
      :scroll-prev="scrollPrev"
    />
  </div>
</template>
