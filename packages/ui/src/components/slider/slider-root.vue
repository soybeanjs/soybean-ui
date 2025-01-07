<script setup lang="ts">
import { computed } from 'vue';
import { SliderRoot, useForwardPropsEmits } from '@soybean-ui/primitives';
import { cn, sliderVariants } from '@soybean-ui/variants';
import type { SliderRootEmits, SliderRootProps } from './types';

defineOptions({
  name: 'SSliderRoot'
});

const { class: cls, ...delegatedProps } = defineProps<SliderRootProps>();

const emit = defineEmits<SliderRootEmits>();

const forwarded = useForwardPropsEmits(delegatedProps, emit);

const { root } = sliderVariants();

const mergedCls = computed(() => cn(root(), cls));
</script>

<template>
  <SliderRoot v-bind="forwarded" :class="mergedCls">
    <slot />
  </SliderRoot>
</template>
