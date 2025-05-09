<script setup lang="ts">
import { toRefs } from 'vue';
import { useForwardExpose, useNonce } from '../../composables';
import { Primitive } from '../primitive';
import { injectComboboxRootContext } from './context';
import type { ComboboxViewportPropsWithPrimitive } from './types';

defineOptions({
  name: 'ComboboxViewport',
  inheritAttrs: false
});

const props = defineProps<ComboboxViewportPropsWithPrimitive>();
const { forwardRef } = useForwardExpose();

const { nonce: propNonce } = toRefs(props);
const nonce = useNonce(propNonce);

const rootContext = injectComboboxRootContext();
</script>

<template>
  <Primitive
    v-bind="{ ...$attrs, ...props }"
    :ref="forwardRef"
    data-soybean-combobox-viewport
    role="presentation"
    :style="{
      // we use position: 'relative' here on the `viewport` so that when we call
      // `selectedItem.offsetTop` in calculations, the offset is relative to the viewport
      // (independent of the scrollUpButton).
      position: 'relative',
      flex: rootContext.isVirtual.value ? undefined : 1,
      overflow: 'auto'
    }"
  >
    <slot />
  </Primitive>
  <Primitive as="style" :nonce="nonce">
    /* Hide scrollbars cross-browser and enable momentum scroll for touch devices */ [data-soybean-combobox-viewport] {
    scrollbar-width:none; -ms-overflow-style: none; -webkit-overflow-scrolling: touch; }
    [data-soybean-combobox-viewport]::-webkit-scrollbar { display: none; }
  </Primitive>
</template>
