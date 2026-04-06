<script setup lang="ts">
import { computed } from 'vue';
import {
  ColorSliderRoot,
  ColorSliderThumb,
  ColorSliderTrack,
  provideColorSliderUi
} from '@soybeanjs/headless/color-slider';
import { useForwardListeners, useOmitProps } from '@soybeanjs/headless/composables';
import { mergeSlotVariants } from '@/theme';
import { sliderVariants } from '../slider/variants';
import type { ColorSliderEmits, ColorSliderProps } from './types';

defineOptions({
  name: 'SColorSlider'
});

const props = withDefaults(defineProps<ColorSliderProps>(), {
  color: 'accent',
  size: 'md'
});

const emit = defineEmits<ColorSliderEmits>();

const listeners = useForwardListeners(emit);

const forwardedProps = useOmitProps(props, ['class', 'size', 'ui', 'trackProps', 'thumbProps', 'onChange']);

const ui = computed(() => {
  const variants = sliderVariants({ color: props.color, size: props.size });

  return mergeSlotVariants(variants, props.ui, { root: props.class });
});

provideColorSliderUi(ui);
</script>

<template>
  <ColorSliderRoot v-bind="forwardedProps" v-on="listeners">
    <ColorSliderTrack v-bind="trackProps" />
    <ColorSliderThumb v-bind="thumbProps" />
  </ColorSliderRoot>
</template>
