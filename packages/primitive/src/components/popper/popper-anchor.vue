<script setup lang="ts">
import { watchPostEffect } from 'vue';
import { useForwardExpose } from '../../composables';
import { Primitive } from '../primitive';
import { injectPopperRootContext } from './context';
import type { PopperAnchorPropsWithPrimitive } from './types';

defineOptions({
  name: 'PopperAnchor',
  inheritAttrs: false
});

const props = defineProps<PopperAnchorPropsWithPrimitive>();

const { forwardRef, currentElement } = useForwardExpose();

const rootContext = injectPopperRootContext();

watchPostEffect(() => {
  rootContext.onAnchorChange(props.reference ?? currentElement.value);
});
</script>

<template>
  <Primitive :ref="forwardRef" :class="props.class" :as="as" :as-child="asChild">
    <slot />
  </Primitive>
</template>
