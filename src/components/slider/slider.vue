<script setup lang="ts">
import { computed } from 'vue';
import { SliderRange, SliderRoot, SliderThumb, SliderTrack, provideSliderUi } from '@soybeanjs/headless';
import { useForwardListeners, useOmitProps } from '@soybeanjs/headless/composables';
import { mergeSlotVariants } from '@/theme';
import { sliderVariants } from './variants';
import type { SliderEmits, SliderProps } from './types';

defineOptions({
  name: 'SSlider'
});

const props = defineProps<SliderProps>();

const emit = defineEmits<SliderEmits>();

const listeners = useForwardListeners(emit);

const forwardedProps = useOmitProps(props, ['class', 'color', 'size', 'ui', 'trackProps', 'rangeProps', 'thumbProps']);

const ui = computed(() => {
  const variants = sliderVariants({
    color: props.color,
    size: props.size
  });

  return mergeSlotVariants(variants, props.ui, { root: props.class });
});

provideSliderUi(ui);
</script>

<template>
  <SliderRoot v-slot="slotProps" data-slot="slider" v-bind="forwardedProps" v-on="listeners">
    <SliderTrack data-slot="slider-track" v-bind="trackProps">
      <SliderRange data-slot="slider-range" v-bind="rangeProps" />
    </SliderTrack>
    <SliderThumb
      v-for="(value, index) in slotProps.modelValue"
      :key="`${index}-${value}`"
      data-slot="slider-thumb"
      v-bind="thumbProps"
      :index="index"
    >
      <slot :index="index" :model-value="slotProps.modelValue" :value="value" />
    </SliderThumb>
  </SliderRoot>
</template>
