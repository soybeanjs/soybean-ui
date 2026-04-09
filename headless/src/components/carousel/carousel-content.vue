<script setup lang="ts">
import { computed, useId, watch } from 'vue';
import { useOmitProps } from '../../composables';
import { useCarouselRootContext, useCarouselUi } from './context';
import type { CarouselContentProps } from './types';

defineOptions({
  name: 'CarouselContent'
});

const props = defineProps<CarouselContentProps>();

const forwardedProps = useOmitProps(props, ['id']);

const ui = useCarouselUi();

const { carouselRef, contentId, orientation, setContentId } = useCarouselRootContext('CarouselContent');

const defaultId = `soybean-carousel-content-${useId()}`;
const contentCls = computed(() => ui.value.content);
const containerCls = computed(() => ui.value.container);
const resolvedContentId = computed(() => {
  if (props.id) {
    return props.id;
  }

  return contentId.value || defaultId;
});

watch(
  resolvedContentId,
  id => {
    setContentId(id);
  },
  { immediate: true }
);
</script>

<template>
  <div
    v-bind="forwardedProps"
    :id="resolvedContentId"
    ref="carouselRef"
    :class="contentCls"
    :data-orientation="orientation"
    data-soybean-carousel-content
  >
    <div :class="containerCls" :data-orientation="orientation" data-soybean-carousel-container>
      <slot />
    </div>
  </div>
</template>
