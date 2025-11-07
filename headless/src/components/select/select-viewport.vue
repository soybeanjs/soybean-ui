<script setup lang="ts">
import { computed, useAttrs } from 'vue';
import { useForwardElement, useNonce } from '../../composables';
import { Primitive } from '../primitive';
import { useSelectContentContext, useSelectItemAlignedPositionContext, useSelectThemeContext } from './context';
import { CONTENT_MARGIN } from './shared';
import type { SelectViewportProps } from './types';

defineOptions({
  name: 'SelectViewport',
  inheritAttrs: false
});

const props = defineProps<SelectViewportProps>();

const attrs = useAttrs();

const { onViewportElementChange } = useSelectContentContext('SelectViewport');
const [_, setViewportElement] = useForwardElement(onViewportElementChange);
const alignedPositionContext = useSelectItemAlignedPositionContext();

const nonce = useNonce(() => props.nonce);

const themeContext = useSelectThemeContext();

const cls = computed(() => themeContext?.ui?.value?.viewport);

/**
 * we use position: 'relative' here on the `viewport` so that when we call `selectedItem.offsetTop` in calculations
 *
 * the offset is relative to the viewport (independent of the scrollUpButton).
 */
const style = 'position:relative;flex:1;overflow:hidden auto;';

// Hide scrollbars cross-browser and enable momentum scroll for touch devices
const css = `
[data-soybean-select-viewport] {
  scrollbar-width: none;
  -ms-overflow-style: none;
  -webkit-overflow-scrolling: touch;
}
[data-soybean-select-viewport]::-webkit-scrollbar {
  display: none;
}`;

let prevScrollTop = 0;

function onScroll(event: Event) {
  const viewport = event.currentTarget as HTMLElement;

  const { contentWrapperElement, shouldExpandOnScroll } = alignedPositionContext ?? {};
  if (!contentWrapperElement?.value || !shouldExpandOnScroll?.value) {
    prevScrollTop = viewport.scrollTop;

    return;
  }

  const scrolledBy = Math.abs(prevScrollTop - viewport.scrollTop);
  if (scrolledBy <= 0) return;

  const availableHeight = window.innerHeight - CONTENT_MARGIN * 2;
  const cssMinHeight = Number.parseFloat(contentWrapperElement.value.style.minHeight);
  const cssHeight = Number.parseFloat(contentWrapperElement.value.style.height);
  const prevHeight = Math.max(cssMinHeight, cssHeight);

  if (prevHeight < availableHeight) {
    const nextHeight = prevHeight + scrolledBy;
    const clampedNextHeight = Math.min(availableHeight, nextHeight);
    const heightDiff = nextHeight - clampedNextHeight;

    contentWrapperElement.value.style.height = `${clampedNextHeight}px`;
    if (contentWrapperElement.value.style.bottom === '0px') {
      viewport.scrollTop = heightDiff > 0 ? heightDiff : 0;
      // ensure the content stays pinned to the bottom
      contentWrapperElement.value.style.justifyContent = 'flex-end';
    }
  }

  prevScrollTop = viewport.scrollTop;
}
</script>

<template>
  <div
    v-bind="attrs"
    :ref="setViewportElement"
    :class="cls"
    data-soybean-select-viewport
    role="presentation"
    :style="style"
    @scroll="onScroll"
  >
    <slot />
  </div>
  <Primitive as="style" :nonce="nonce">{{ css }}</Primitive>
</template>
