<script setup lang="ts">
import { useAttrs } from 'vue';
import { useOmitProps } from '../../composables';
import { Primitive } from '../primitive';
import { useScrollAreaScrollbarContext, useScrollAreaUi } from './context';
import type { ScrollAreaThumbProps } from './types';

defineOptions({
  name: 'ScrollAreaThumb',
  inheritAttrs: false
});

const props = withDefaults(defineProps<ScrollAreaThumbProps>(), {
  as: 'div'
});

const attrs = useAttrs();
const forwardedProps = useOmitProps(props, [], attrs);

const cls = useScrollAreaUi('thumb');
const { dataState, hasOverflow, onThumbPointerDown, onThumbPointerUp, orientation, thumbStyle } =
  useScrollAreaScrollbarContext('ScrollAreaThumb');
</script>

<template>
  <Primitive
    v-bind="forwardedProps"
    :as="as"
    :as-child="asChild"
    :class="cls"
    :data-orientation="orientation"
    :data-state="dataState"
    data-soybean-scroll-area-thumb=""
    :aria-hidden="true"
    :hidden="hasOverflow ? undefined : ''"
    :style="thumbStyle"
    @pointerdown="onThumbPointerDown"
    @pointerup="onThumbPointerUp"
  >
    <slot />
  </Primitive>
</template>
