<script setup lang="ts">
import { computed, useAttrs } from 'vue';
import { useOmitProps } from '../../composables';
import { Button } from '../button';
import Icon from '../_icon/icon.vue';
import { useCarouselRootContext, useCarouselUi } from './context';
import type { CarouselPreviousProps } from './types';

defineOptions({
  name: 'CarouselPrevious'
});

const props = defineProps<CarouselPreviousProps>();

const attrs = useAttrs();

const forwardedProps = useOmitProps(props, ['disabled']);

const cls = useCarouselUi('previous');

const { canScrollPrev, contentId, scrollPrev } = useCarouselRootContext('CarouselPrevious');

const disabled = computed(() => props.disabled || !canScrollPrev.value);
const ariaLabel = computed(() => (attrs['aria-label'] as string) ?? 'Previous slide');
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
    <slot>
      <Icon icon="lucide:arrow-left" :aria-hidden="true" />
      <span class="soybean-headless-sr-only">Previous slide</span>
    </slot>
  </Button>
</template>
