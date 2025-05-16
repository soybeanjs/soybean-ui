<script setup lang="ts">
import { computed } from 'vue';
import { SliderThumb } from '@soybean-ui/primitives';
import { cn, sliderVariants } from '@soybean-ui/variants';
import type { SliderThumbProps } from '../types';

defineOptions({
  name: 'SSliderThumb'
});

const { class: cls, color, size } = defineProps<SliderThumbProps>();

const mergedCls = computed(() => {
  const { thumb } = sliderVariants({ color, size });

  return cn(thumb(), cls);
});
</script>

<template>
  <SliderThumb :class="mergedCls" />
</template>
