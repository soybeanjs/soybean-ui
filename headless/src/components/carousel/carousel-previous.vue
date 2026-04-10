<script setup lang="ts">
import { computed } from 'vue';
import { useOmitProps } from '../../composables';
import { Button } from '../button';
import { useCarouselRootContext, useCarouselUi } from './context';
import type { CarouselPreviousProps } from './types';

defineOptions({
  name: 'CarouselPrevious'
});

const props = withDefaults(defineProps<CarouselPreviousProps>(), {
  as: 'button',
  type: 'button'
});

const forwardedProps = useOmitProps(props, ['disabled']);

const cls = useCarouselUi('previous');

const { canScrollPrev, contentId, dir, orientation, scrollPrev } = useCarouselRootContext('CarouselPrevious');

const disabled = computed(() => props.disabled || !canScrollPrev.value);
const ariaLabel = computed(() => props['aria-label'] ?? 'Previous slide');
</script>

<template>
  <Button
    v-bind="forwardedProps"
    :class="cls"
    :disabled="disabled"
    :aria-controls="contentId || undefined"
    :aria-label="ariaLabel"
    data-soybean-carousel-previous
    @click="scrollPrev"
  >
    <slot :dir="dir" :orientation="orientation" :disabled="disabled" />
  </Button>
</template>
