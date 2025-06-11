<script setup lang="ts">
import { computed } from 'vue';
import { useForwardExpose } from '../../composables';
import { Primitive } from '../primitive';
import { injectSliderOrientationContext, injectSliderRootContext } from './context';
import { convertValueToPercentage } from './shared';
import type { SliderRangePropsWithPrimitive } from './types';

defineOptions({
  name: 'SliderRange'
});

const props = withDefaults(defineProps<SliderRangePropsWithPrimitive>(), {
  as: 'span'
});

const rootContext = injectSliderRootContext();
const orientation = injectSliderOrientationContext();

useForwardExpose();
const percentages = computed(() =>
  rootContext.currentModelValue.value.map(value =>
    convertValueToPercentage(value, rootContext.min.value, rootContext.max.value)
  )
);

const offsetStart = computed(() =>
  rootContext.currentModelValue.value.length > 1 ? Math.min(...percentages.value!) : 0
);
const offsetEnd = computed(() => 100 - Math.max(...percentages.value, 0));
</script>

<template>
  <Primitive
    :class="props.class"
    :as="as"
    :as-child="asChild"
    :data-disabled="rootContext.disabled.value ? '' : undefined"
    :data-orientation="rootContext.orientation.value"
    :style="{
      [orientation!.startEdge.value]: `${offsetStart}%`,
      [orientation!.endEdge.value]: `${offsetEnd}%`
    }"
  >
    <slot />
  </Primitive>
</template>
