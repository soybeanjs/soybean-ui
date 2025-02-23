<script setup lang="ts">
import SCarouselRoot from './carousel-root.vue';
import SCarouselContent from './carousel-content.vue';
import SCarouselItem from './carousel-item.vue';
import SCarouselNext from './carousel-next.vue';
import SCarouselPrevious from './carousel-previous.vue';
import type { CarouselEmits, CarouselProps } from './types';

defineOptions({
  name: 'SCarousel'
});

const { class: cls, ui, counts, nextProps, previousProps, ...delegatedProps } = defineProps<CarouselProps>();

const emit = defineEmits<CarouselEmits>();
</script>

<template>
  <SCarouselRoot v-bind="delegatedProps" :class="cls || ui?.root" @init-api="emit('initApi', $event)">
    <SCarouselContent :class="ui?.content" :wrapper-class="ui?.contentWrapper">
      <SCarouselItem v-for="i in counts" :key="i" :class="ui?.item">
        <slot :index="i" />
      </SCarouselItem>
    </SCarouselContent>
    <SCarouselNext v-bind="nextProps" :class="ui?.next" />
    <SCarouselPrevious v-bind="previousProps" :class="ui?.previous" />
  </SCarouselRoot>
</template>
