<script setup lang="ts">
import { computed } from 'vue';
import { SliderRange } from '@soybean-ui/primitives';
import { cn, sliderVariants } from '@soybean-ui/variants';
import type { SliderRangeProps } from '../types';

defineOptions({
  name: 'SSliderRange'
});

const { class: cls, color } = defineProps<SliderRangeProps>();

const mergedCls = computed(() => {
  const { range } = sliderVariants({ color });

  return cn(range(), cls);
});
</script>

<template>
  <SliderRange :class="mergedCls" />
</template>
