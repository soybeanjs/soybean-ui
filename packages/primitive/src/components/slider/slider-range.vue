<script lang="ts">
import { computed } from 'vue';
import type { PrimitiveProps } from '../primitive';
import { Primitive } from '../primitive';
import { useForwardExpose } from '../../composables';
</script>

<script setup lang="ts">
import { injectSliderRootContext } from './slider-root.vue';
import { convertValueToPercentage, injectSliderOrientationContext } from './utils';

export interface SliderRangeProps extends PrimitiveProps {}

withDefaults(defineProps<SliderRangeProps>(), { as: 'span' });
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
