<script setup lang="ts">
import { computed, useAttrs } from 'vue';
import type { CSSProperties } from 'vue';
import { useForwardElement, useOmitProps } from '../../composables';
import { Primitive } from '../primitive';
import { useNonce } from '../config-provider/context';
import { useScrollAreaRootContext, useScrollAreaUi } from './context';
import type { ScrollAreaViewportProps } from './types';

defineOptions({
  name: 'ScrollAreaViewport',
  inheritAttrs: false
});

const props = withDefaults(defineProps<ScrollAreaViewportProps>(), {
  as: 'div'
});

const attrs = useAttrs();
const nonce = useNonce(() => props.nonce);

const { scrollbarXEnabled, scrollbarYEnabled, onViewportChange, onContentChange } =
  useScrollAreaRootContext('ScrollAreaViewport');

const cls = useScrollAreaUi('viewport');

const forwardedProps = useOmitProps(props, ['nonce'], attrs);
const viewportProps = computed(() => ({
  ...forwardedProps.value,
  tabindex: forwardedProps.value.tabindex ?? 0
}));

const [, setViewportElement] = useForwardElement<HTMLElement>(onViewportChange);
const [, setContentElement] = useForwardElement<HTMLElement>(onContentChange);

const style = computed<CSSProperties>(() => ({
  overflowX: scrollbarXEnabled.value ? 'scroll' : 'hidden',
  overflowY: scrollbarYEnabled.value ? 'scroll' : 'hidden'
}));

const contentStyle = computed<CSSProperties>(() => ({
  minWidth: scrollbarXEnabled.value ? 'fit-content' : undefined
}));

</script>

<template>
  <div :ref="setViewportElement" data-soybean-scroll-area-viewport="" v-bind="viewportProps" :class="cls" :style="style">
    <Primitive :ref="setContentElement" :as="as" :as-child="asChild" :style="contentStyle">
      <slot />
    </Primitive>
  </div>
  <Primitive as="style" :nonce="nonce">
    [data-soybean-scroll-area-viewport] {
    scrollbar-width: none;
    -ms-overflow-style: none;
    -webkit-overflow-scrolling: touch;
    }

    [data-soybean-scroll-area-viewport]::-webkit-scrollbar {
    display: none;
    }
  </Primitive>
</template>
