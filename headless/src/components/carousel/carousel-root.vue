<script setup lang="ts">
import emblaCarouselVue from 'embla-carousel-vue';
import { computed, shallowRef, watch, watchEffect } from 'vue';
import { useOmitProps } from '../../composables';
import { useDirection } from '../config-provider/context';
import { provideCarouselRootContext, useCarouselUi } from './context';
import type { CarouselApi, CarouselOptions, CarouselPlugins, CarouselRootEmits, CarouselRootProps } from './types';

defineOptions({
  name: 'CarouselRoot'
});

const props = withDefaults(defineProps<CarouselRootProps>(), {
  orientation: 'horizontal'
});

const emit = defineEmits<CarouselRootEmits>();

const forwardedProps = useOmitProps(props, ['opts', 'plugins', 'orientation', 'dir']);

const cls = useCarouselUi('root');
const dir = useDirection(() => props.dir);
const orientation = computed(() => props.orientation);
const ariaLabel = computed(() => (props['aria-labelledby'] ? undefined : (props['aria-label'] ?? 'Carousel')));
const resolvedTabindex = computed(() => props.tabindex ?? 0);
const emblaOptions = shallowRef<CarouselOptions>({});
const emblaPlugins = shallowRef<CarouselPlugins>([]);

watchEffect(() => {
  emblaOptions.value = {
    ...props.opts,
    axis: props.orientation === 'horizontal' ? 'x' : 'y',
    direction: dir.value
  };
});

watchEffect(() => {
  emblaPlugins.value = props.plugins ?? [];
});

const [carouselRef, carouselApi] = emblaCarouselVue(emblaOptions, emblaPlugins);

const contentId = shallowRef('');
const canScrollNext = shallowRef(false);
const canScrollPrev = shallowRef(false);
const selectedIndex = shallowRef(0);
const scrollSnaps = shallowRef<number[]>([]);

function updateScrollState(api?: CarouselApi) {
  canScrollNext.value = api?.canScrollNext() ?? false;
  canScrollPrev.value = api?.canScrollPrev() ?? false;
  selectedIndex.value = api?.selectedScrollSnap() ?? 0;
  scrollSnaps.value = api?.scrollSnapList() ?? [];
}

function scrollNext() {
  carouselApi.value?.scrollNext();
}

function scrollPrev() {
  carouselApi.value?.scrollPrev();
}

function scrollTo(index: number, jump?: boolean) {
  carouselApi.value?.scrollTo(index, jump);
}

function setContentId(id: string) {
  contentId.value = id;
}

function onKeydown(event: KeyboardEvent) {
  if (event.target !== event.currentTarget) {
    return;
  }

  const previousKey = props.orientation === 'vertical' ? 'ArrowUp' : dir.value === 'rtl' ? 'ArrowRight' : 'ArrowLeft';
  const nextKey = props.orientation === 'vertical' ? 'ArrowDown' : dir.value === 'rtl' ? 'ArrowLeft' : 'ArrowRight';

  if (event.key === previousKey) {
    event.preventDefault();
    scrollPrev();
    return;
  }

  if (event.key === nextKey) {
    event.preventDefault();
    scrollNext();
  }
}

watch(
  carouselApi,
  (api, _, onCleanup) => {
    updateScrollState(api);

    if (!api) {
      return;
    }

    const onSelect = (emblaApi: CarouselApi) => {
      updateScrollState(emblaApi);
    };
    const onReInit = (emblaApi: CarouselApi) => {
      updateScrollState(emblaApi);
    };

    api.on('select', onSelect);
    api.on('reInit', onReInit);

    emit('initApi', api);

    onCleanup(() => {
      api.off('select', onSelect);
      api.off('reInit', onReInit);
    });
  },
  { immediate: true }
);

provideCarouselRootContext({
  dir,
  orientation,
  carouselRef,
  carouselApi,
  contentId,
  canScrollNext,
  canScrollPrev,
  selectedIndex,
  scrollSnaps,
  scrollNext,
  scrollPrev,
  scrollTo,
  setContentId
});

defineExpose({
  dir,
  orientation,
  carouselApi,
  carouselRef,
  canScrollNext,
  canScrollPrev,
  selectedIndex,
  scrollSnaps,
  scrollNext,
  scrollPrev,
  scrollTo
});
</script>

<template>
  <div
    v-bind="forwardedProps"
    :class="cls"
    :dir="dir"
    :data-orientation="orientation"
    :aria-label="ariaLabel"
    :tabindex="resolvedTabindex"
    data-soybean-carousel-root
    role="region"
    aria-roledescription="carousel"
    @keydown="onKeydown"
  >
    <slot
      :carousel-api="carouselApi"
      :can-scroll-next="canScrollNext"
      :can-scroll-prev="canScrollPrev"
      :selected-index="selectedIndex"
      :scroll-snaps="scrollSnaps"
      :scroll-next="scrollNext"
      :scroll-prev="scrollPrev"
      :scroll-to="scrollTo"
      :orientation="orientation"
      :dir="dir"
    />
  </div>
</template>
