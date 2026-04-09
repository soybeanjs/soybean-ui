<script setup lang="ts">
import { CarouselPrevious } from '@soybeanjs/headless';
import type { CarouselPreviousProps, DataOrientation, Direction } from '@soybeanjs/headless';
import Icon from '../icon/icon.vue';

defineOptions({
  name: 'SCarouselPrevious'
});

defineProps<CarouselPreviousProps>();

function getPreviousIcon(orientation: DataOrientation, dir: Direction) {
  if (orientation === 'vertical') {
    return 'lucide:arrow-up';
  }

  return dir === 'rtl' ? 'lucide:arrow-right' : 'lucide:arrow-left';
}
</script>

<template>
  <CarouselPrevious v-slot="{ dir, disabled, orientation }" v-bind="$props">
    <slot :dir="dir" :disabled="disabled" :orientation="orientation">
      <Icon :icon="getPreviousIcon(orientation, dir)" :aria-hidden="true" />
      <span class="sr-only">Previous slide</span>
    </slot>
  </CarouselPrevious>
</template>
