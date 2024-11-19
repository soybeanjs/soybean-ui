<script setup lang="ts">
import { computed } from 'vue';
import { Primitive } from '../primitive';
import { useForwardExpose } from '../../composables';
import { injectSliderOrientationContext, injectSliderRootContext } from './context';
import { convertValueToPercentage } from './shared';
import type { SliderRangePropsWithPrimitive } from './types';

defineOptions({
  name: 'SliderRange'
});

withDefaults(defineProps<SliderRangePropsWithPrimitive>(), {
  as: 'span'
});

const rootContext = injectSliderRootContext();
const orientation = injectSliderOrientationContext();

useForwardExpose();
const percentages = computed(() =>
  rootContext.modelValue?.value?.map(value =>
    convertValueToPercentage(value, rootContext.min.value, rootContext.max.value)
  )
);

const offsetStart = computed(() => (rootContext.modelValue!.value!.length > 1 ? Math.min(...percentages.value!) : 0));
const offsetEnd = computed(() => 100 - Math.max(...percentages.value!));
</script>

<template>
  <Primitive
    :data-disabled="rootContext.disabled.value ? '' : undefined"
    :data-orientation="rootContext.orientation.value"
    :as
    :as-child
    :style="{
      [orientation!.startEdge]: `${offsetStart}%`,
      [orientation!.endEdge]: `${offsetEnd}%`
    }"
  >
    <slot />
  </Primitive>
</template>
