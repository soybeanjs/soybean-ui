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

const { class: className, reference } = defineProps<PopperAnchorPropsWithPrimitive>();

const { forwardRef, currentElement } = useForwardExpose();

const rootContext = injectPopperRootContext();

watchPostEffect(() => {
  rootContext.onAnchorChange(reference ?? currentElement.value);
});
</script>

<template>
  <Primitive :ref="forwardRef" :class="className" :as :as-child>
    <slot />
  </Primitive>
</template>
