<script setup lang="ts">
import { computed } from 'vue';
import { Primitive } from '../primitive';
import { useSliderRootContext, useSliderUi } from './context';
import type { SliderRangeProps } from './types';

defineOptions({
  name: 'SliderRange'
});

const props = withDefaults(defineProps<SliderRangeProps>(), {
  as: 'div'
});

const cls = useSliderUi('range');

const { currentModelValue, disabled, orientation, startEdge, endEdge, getPercentage } = useSliderRootContext('SliderRange');

const percentages = computed(() => currentModelValue.value.map(value => getPercentage(value)));

const offsetStart = computed(() => (currentModelValue.value.length > 1 ? Math.min(...percentages.value) : 0));
const offsetEnd = computed(() => 100 - Math.max(...percentages.value, 0));

const style = computed(() => ({
  [startEdge.value]: `${offsetStart.value}%`,
  [endEdge.value]: `${offsetEnd.value}%`
}));
</script>

<template>
  <Primitive
    v-bind="props"
    :class="cls"
    :data-disabled="disabled ? '' : undefined"
    :data-orientation="orientation"
    :style="style"
  >
    <slot />
  </Primitive>
</template>
