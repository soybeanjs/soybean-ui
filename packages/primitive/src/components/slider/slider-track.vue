<script setup lang="ts">
import { Primitive } from '../primitive';
import { useForwardExpose } from '../../composables';
import type { SliderTrackPropsWithPrimitive } from './types';
import { injectSliderRootContext } from './context';

defineOptions({
  name: 'SliderTrack'
});

withDefaults(defineProps<SliderTrackPropsWithPrimitive>(), {
  as: 'span'
});

const rootContext = injectSliderRootContext();
useForwardExpose();
</script>

<template>
  <Primitive
    :as
    :as-child
    :data-disabled="rootContext.disabled.value ? '' : undefined"
    :data-orientation="rootContext.orientation.value"
  >
    <slot />
  </Primitive>
</template>
