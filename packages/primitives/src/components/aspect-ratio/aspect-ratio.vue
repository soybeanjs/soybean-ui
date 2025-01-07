<script setup lang="ts">
import { computed } from 'vue';
import { useForwardExpose } from '../../composables';
import { Primitive } from '../primitive';
import type { AspectRatioPropsWithPrimitive } from './types';

defineOptions({
  name: 'AspectRatio',
  inheritAttrs: false
});

const props = withDefaults(defineProps<AspectRatioPropsWithPrimitive>(), {
  ratio: 1
});

const { forwardRef } = useForwardExpose();

const aspect = computed(() => (1 / props.ratio) * 100);
</script>

<template>
  <div data-soybean-aspect-ratio-wrapper :style="`position: relative; width: 100%; padding-bottom: ${aspect}%`">
    <Primitive
      v-bind="$attrs"
      :ref="forwardRef"
      :class="props.class"
      :as="as"
      :as-child="asChild"
      style="position: absolute; inset: 0px"
    >
      <slot :aspect="aspect" />
    </Primitive>
  </div>
</template>
