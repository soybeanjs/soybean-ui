<script setup lang="ts">
import { computed } from 'vue';
import { SliderThumb } from '@soybean-ui/primitive';
import { cn, sliderVariants } from '@soybean-ui/variants';
import type { SliderThumbProps } from './types';

defineOptions({
  name: 'SSliderThumb'
});

const { class: cls, color } = defineProps<SliderThumbProps>();

const mergedCls = computed(() => {
  const { thumb } = sliderVariants({ color });

  return cn(thumb(), cls);
});
</script>

<template>
  <SliderThumb :class="mergedCls" />
</template>
