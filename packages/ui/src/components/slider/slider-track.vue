<script setup lang="ts">
import { computed } from 'vue';
import { SliderTrack } from '@soybean-ui/primitive';
import { cn, sliderVariants } from '@soybean-ui/variants';
import type { SliderTrackProps } from './types';

defineOptions({
  name: 'SSliderTrack'
});

const { class: cls, color } = defineProps<SliderTrackProps>();

const mergedCls = computed(() => {
  const { track } = sliderVariants({ color });

  return cn(track(), cls);
});
</script>

<template>
  <SliderTrack :class="mergedCls">
    <slot />
  </SliderTrack>
</template>
