<script setup lang="ts">
import { computed } from 'vue';
import { useOmitProps } from '../../composables';
import { Button } from '../button';
import { useCarouselRootContext, useCarouselUi } from './context';
import type { CarouselNextProps } from './types';

defineOptions({
  name: 'CarouselNext'
});

const props = withDefaults(defineProps<CarouselNextProps>(), {
  as: 'button',
  type: 'button'
});

const forwardedProps = useOmitProps(props, ['disabled']);

const cls = useCarouselUi('next');

const { canScrollNext, contentId, dir, orientation, scrollNext } = useCarouselRootContext('CarouselNext');

const disabled = computed(() => props.disabled || !canScrollNext.value);
const ariaLabel = computed(() => props['aria-label'] ?? 'Next slide');
</script>

<template>
  <Button
    v-bind="forwardedProps"
    :class="cls"
    :disabled="disabled"
    :aria-controls="contentId || undefined"
    :aria-label="ariaLabel"
    data-soybean-carousel-next
    @click="scrollNext"
  >
    <slot :dir="dir" :orientation="orientation" :disabled="disabled" />
  </Button>
</template>
