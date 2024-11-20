<script setup lang="ts">
import { computed } from 'vue';
import { Primitive } from '../primitive';
import { useForwardExpose } from '../../composables';
import type { AspectRatioPropsWithPrimitive } from './types';

defineOptions({
  name: 'AspectRatio',
  inheritAttrs: false
});

const { class: className, ratio = 1 } = defineProps<AspectRatioPropsWithPrimitive>();

const { forwardRef } = useForwardExpose();

const aspect = computed(() => (1 / ratio) * 100);
</script>

<template>
  <div :style="`position: relative; width: 100%; padding-bottom: ${aspect}%`" data-soybean-aspect-ratio-wrapper>
    <Primitive
      v-bind="$attrs"
      :ref="forwardRef"
      :class="className"
      :as
      :as-child
      style="position: absolute; inset: 0px"
    >
      <slot :aspect />
    </Primitive>
  </div>
</template>
