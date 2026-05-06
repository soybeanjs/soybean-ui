<script setup lang="ts">
import { computed, useAttrs } from 'vue';
import { useOmitProps } from '../../composables';
import Button from '../button/button.vue';
import Icon from '../_icon/icon.vue';
import { useCarouselRootContext, useCarouselUi } from './context';
import type { CarouselNextProps } from './types';

defineOptions({
  name: 'CarouselNext'
});

const props = defineProps<CarouselNextProps>();

const attrs = useAttrs();

const forwardedProps = useOmitProps(props, ['disabled']);

const cls = useCarouselUi('next');

const { canScrollNext, contentId, scrollNext } = useCarouselRootContext('CarouselNext');

const disabled = computed(() => props.disabled || !canScrollNext.value);
const ariaLabel = computed(() => (attrs['aria-label'] as string) ?? 'Next slide');

const onNext = () => {
  scrollNext();
};
</script>

<template>
  <Button
    v-bind="forwardedProps"
    :class="cls"
    :disabled="disabled"
    :aria-controls="contentId || undefined"
    :aria-label="ariaLabel"
    data-soybean-carousel-next
    @click="onNext"
  >
    <slot>
      <Icon icon="lucide:arrow-right" :aria-hidden="true" />
      <span class="soybean-headless-sr-only">Next slide</span>
    </slot>
  </Button>
</template>
