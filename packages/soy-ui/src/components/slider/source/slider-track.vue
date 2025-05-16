<script setup lang="ts">
import { computed } from 'vue';
import { SliderTrack } from '@soybean-ui/primitives';
import { cn, sliderVariants } from '@soybean-ui/variants';
import type { SliderTrackProps } from '../types';

defineOptions({
  name: 'SSliderTrack'
});

const { class: cls, color, size } = defineProps<SliderTrackProps>();

const mergedCls = computed(() => {
  const { track } = sliderVariants({ color, size });

  return cn(track(), cls);
});
</script>

<template>
  <SliderTrack :class="mergedCls">
    <slot />
  </SliderTrack>
</template>
