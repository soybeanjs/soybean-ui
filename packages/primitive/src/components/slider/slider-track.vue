<script setup lang="ts">
import type { PrimitiveProps } from '../primitive';
import { Primitive } from '../primitive';
import { useForwardExpose } from '../../composables';

import { injectSliderRootContext } from './slider-root.vue';

export interface SliderTrackProps extends PrimitiveProps {}

withDefaults(defineProps<SliderTrackProps>(), { as: 'span' });

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
