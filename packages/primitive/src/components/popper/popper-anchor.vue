<script setup lang="ts">
import type { ReferenceElement } from '@floating-ui/vue';
import { watchPostEffect } from 'vue';
import type { PrimitiveProps } from '../primitive';
import { Primitive } from '../primitive';
import { useForwardExpose } from '../../composables';

import { injectPopperRootContext } from './popper-root.vue';

export interface PopperAnchorProps extends PrimitiveProps {
  /**
   * The reference (or anchor) element that is being referred to for positioning.
   *
   * If not provided will use the current component as anchor.
   */
  reference?: ReferenceElement;
}

const props = defineProps<PopperAnchorProps>();

const { forwardRef, currentElement } = useForwardExpose();

const rootContext = injectPopperRootContext();

watchPostEffect(() => {
  rootContext.onAnchorChange(props.reference ?? currentElement.value);
});
</script>

<template>
  <Primitive :ref="forwardRef" :as :as-child>
    <slot />
  </Primitive>
</template>
