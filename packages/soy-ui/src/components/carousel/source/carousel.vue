<script setup lang="ts">
import type { CarouselEmits, CarouselProps } from '../types';
import SCarouselRoot from './carousel-root.vue';
import SCarouselContent from './carousel-content.vue';
import SCarouselItem from './carousel-item.vue';
import SCarouselNext from './carousel-next.vue';
import SCarouselPrevious from './carousel-previous.vue';

defineOptions({
  name: 'SCarousel'
});

const { class: cls, size, ui, counts, nextProps, previousProps, ...delegatedProps } = defineProps<CarouselProps>();

const emit = defineEmits<CarouselEmits>();
</script>

<template>
  <SCarouselRoot v-bind="delegatedProps" :class="cls || ui?.root" :size="size" @init-api="emit('initApi', $event)">
    <SCarouselContent :size="size" :ui="ui">
      <SCarouselItem v-for="i in counts" :key="i" :class="ui?.item" :size="size">
        <slot :index="i" />
      </SCarouselItem>
    </SCarouselContent>
    <SCarouselNext v-bind="nextProps" :class="ui?.next" :size="size" />
    <SCarouselPrevious v-bind="previousProps" :class="ui?.previous" :size="size" />
  </SCarouselRoot>
</template>
