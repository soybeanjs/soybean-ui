<script setup lang="ts">
import { CarouselItem } from '@soybeanjs/headless';
import type { CarouselItemProps } from '@soybeanjs/headless';

defineOptions({
  name: 'SCarouselItem'
});

defineProps<CarouselItemProps>();
</script>

<template>
  <CarouselItem v-bind="$props">
    <slot />
  </CarouselItem>
</template>
