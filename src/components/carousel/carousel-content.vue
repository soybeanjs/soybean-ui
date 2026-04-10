<script setup lang="ts">
import { CarouselContent } from '@soybeanjs/headless';
import type { CarouselContentProps } from '@soybeanjs/headless';

defineOptions({
  name: 'SCarouselContent'
});

defineProps<CarouselContentProps>();
</script>

<template>
  <CarouselContent v-bind="$props">
    <slot />
  </CarouselContent>
</template>
