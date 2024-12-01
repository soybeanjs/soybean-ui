<script setup lang="ts">
import { onMounted, ref, toRefs } from 'vue';
import { useForwardExpose, useNonce } from '../../composables';
import { Primitive } from '../primitive';
import { injectScrollAreaRootContext } from './context';
import type { ScrollAreaViewportPropsWithPrimitive } from './types';

defineOptions({
  name: 'ScrollAreaViewport',
  inheritAttrs: false
});

const props = defineProps<ScrollAreaViewportPropsWithPrimitive>();

const { nonce: propNonce } = toRefs(props);
const nonce = useNonce(propNonce);

const rootContext = injectScrollAreaRootContext();

const viewportElement = ref<HTMLElement>();

defineExpose({ viewportElement });

const { forwardRef, currentElement: contentElement } = useForwardExpose();

onMounted(() => {
  rootContext.onViewportChange(viewportElement.value!);
  rootContext.onContentChange(contentElement.value!);
});
</script>

<template>
  <div
    ref="viewportElement"
    data-soybean-scroll-area-viewport=""
    :class="props.class"
    :style="{
      /**
       * We don't support `visible` because the intention is to have at least one scrollbar
       * if this component is used and `visible` will behave like `auto` in that case
       * https://developer.mozilla.org/en-US/docs/Web/CSS/overflowed#description
       *
       * We don't handle `auto` because the intention is for the native implementation
       * to be hidden if using this component. We just want to ensure the node is scrollable
       * so could have used either `scroll` or `auto` here. We picked `scroll` to prevent
       * the browser from having to work out whether to render native scrollbars or not,
       * we tell it to with the intention of hiding them in CSS.
       */
      overflowX: rootContext.scrollbarXEnabled.value ? 'scroll' : 'hidden',
      overflowY: rootContext.scrollbarYEnabled.value ? 'scroll' : 'hidden'
    }"
    v-bind="$attrs"
    :tabindex="0"
  >
    <Primitive
      :ref="forwardRef"
      :as="as"
      :as-child="asChild"
      :style="{
        /**
         * When horizontal scrollbar is visible: this element should be at least
         * as wide as its children for size calculations to work correctly.
         *
         * When horizontal scrollbar is NOT visible: this element's width should
         * be constrained by the parent container to enable `text-overflow: ellipsis`
         */
        minWidth: rootContext.scrollbarXEnabled.value ? 'fit-content' : undefined
      }"
    >
      <slot />
    </Primitive>
  </div>
  <Primitive as="style" :nonce="nonce">
    /* Hide scrollbars cross-browser and enable momentum scroll for touch devices */ [data-soybean-scroll-area-viewport]
    { scrollbar-width:none; -ms-overflow-style:none; -webkit-overflow-scrolling:touch; }
    [data-soybean-scroll-area-viewport]::-webkit-scrollbar { display:none; }
  </Primitive>
</template>
