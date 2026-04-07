<script setup lang="ts">
import { computed } from 'vue';
import {
  ScrollAreaCorner,
  ScrollAreaRoot,
  ScrollAreaScrollbar,
  ScrollAreaThumb,
  ScrollAreaViewport,
  provideScrollAreaUi
} from '@soybeanjs/headless';
import { useOmitProps } from '@soybeanjs/headless/composables';
import { mergeSlotVariants } from '@/theme';
import { scrollAreaVariants } from './variants';
import type { ScrollAreaProps } from './types';

defineOptions({
  name: 'SScrollArea'
});

const props = defineProps<ScrollAreaProps>();

const forwardedProps = useOmitProps(props, [
  'class',
  'ui',
  'viewportProps',
  'verticalScrollbarProps',
  'horizontalScrollbarProps',
  'thumbProps',
  'cornerProps'
]);

const ui = computed(() => {
  const variants = scrollAreaVariants();

  return mergeSlotVariants(variants, props.ui, { root: props.class });
});

provideScrollAreaUi(ui);
</script>

<template>
  <ScrollAreaRoot v-bind="forwardedProps">
    <ScrollAreaViewport v-bind="viewportProps">
      <slot />
    </ScrollAreaViewport>
    <ScrollAreaScrollbar orientation="vertical" v-bind="verticalScrollbarProps">
      <ScrollAreaThumb v-bind="thumbProps" />
    </ScrollAreaScrollbar>
    <ScrollAreaScrollbar orientation="horizontal" v-bind="horizontalScrollbarProps">
      <ScrollAreaThumb v-bind="thumbProps" />
    </ScrollAreaScrollbar>
    <ScrollAreaCorner v-bind="cornerProps" />
  </ScrollAreaRoot>
</template>
