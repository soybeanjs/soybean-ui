<script setup lang="ts">
import { useForwardExpose } from '../../composables';
import { Primitive } from '../primitive';
import { PopperAnchor } from '../popper';
import { injectHoverCardRootContext } from './context';
import { excludeTouch } from './shared';
import type { HoverCardTriggerPropsWithPrimitive } from './types';

defineOptions({
  name: 'HoverCardTrigger'
});

const props = withDefaults(defineProps<HoverCardTriggerPropsWithPrimitive>(), {
  as: 'a'
});

const { forwardRef, currentElement } = useForwardExpose();
const rootContext = injectHoverCardRootContext();
rootContext.triggerElement = currentElement;

function handleLeave() {
  setTimeout(() => {
    if (!rootContext.isPointerInTransitRef.value && !rootContext.open.value) {
      rootContext.onClose();
    }
  }, 0);
}
</script>

<template>
  <PopperAnchor as-child :reference="reference">
    <Primitive
      :ref="forwardRef"
      :class="props.class"
      :as="as"
      :as-child="asChild"
      :data-state="rootContext.open.value ? 'open' : 'closed'"
      data-grace-area-trigger
      @pointerenter="excludeTouch(rootContext.onOpen)($event)"
      @pointerleave="excludeTouch(handleLeave)($event)"
      @focus="rootContext.onOpen()"
      @blur="rootContext.onClose()"
    >
      <slot />
    </Primitive>
  </PopperAnchor>
</template>
