<script lang="ts">
import { toRefs } from 'vue';
import type { PrimitiveProps } from '../primitive';
import { Primitive } from '../primitive';
import { useForwardExpose } from '../../composables';
import { useNonce } from '../../_shared/use-nonce';
</script>

<script setup lang="ts">
export interface ViewportProps extends PrimitiveProps {
  /**
   * Will add `nonce` attribute to the style tag which can be used by Content Security Policy. <br> If omitted, inherits
   * globally from `ConfigProvider`.
   */
  nonce?: string;
}

const props = defineProps<ViewportProps>();
const { forwardRef } = useForwardExpose();

const { nonce: propNonce } = toRefs(props);
const nonce = useNonce(propNonce);
</script>

<template>
  <Primitive
    v-bind="{ ...$attrs, ...props }"
    :ref="forwardRef"
    data-soybean-viewport
    role="presentation"
    :style="{
      // we use position: 'relative' here on the `viewport` so that when we call
      // `selectedItem.offsetTop` in calculations, the offset is relative to the viewport
      // (independent of the scrollUpButton).
      position: 'relative',
      flex: 1,
      overflow: 'auto'
    }"
  >
    <slot />
  </Primitive>
  <Primitive as="style" :nonce="nonce">
    /* Hide scrollbars cross-browser and enable momentum scroll for touch devices */ [data-soybean-viewport] {
    scrollbar-width:none; -ms-overflow-style: none; -webkit-overflow-scrolling: touch; }
    [data-soybean-viewport]::-webkit-scrollbar { display: none; }
  </Primitive>
</template>
