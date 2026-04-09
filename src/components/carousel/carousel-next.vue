<script setup lang="ts">
import { CarouselNext } from '@soybeanjs/headless';
import type { CarouselNextProps, DataOrientation, Direction } from '@soybeanjs/headless';
import Icon from '../icon/icon.vue';

defineOptions({
  name: 'SCarouselNext'
});

defineProps<CarouselNextProps>();

function getNextIcon(orientation: DataOrientation, dir: Direction) {
  if (orientation === 'vertical') {
    return 'lucide:arrow-down';
  }

  return dir === 'rtl' ? 'lucide:arrow-left' : 'lucide:arrow-right';
}
</script>

<template>
  <CarouselNext v-slot="{ dir, disabled, orientation }" v-bind="$props">
    <slot :dir="dir" :disabled="disabled" :orientation="orientation">
      <Icon :icon="getNextIcon(orientation, dir)" :aria-hidden="true" />
      <span class="sr-only">Next slide</span>
    </slot>
  </CarouselNext>
</template>
