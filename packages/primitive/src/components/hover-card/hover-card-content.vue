<script setup lang="ts">
import { Presence } from '../presence';
import { useForwardExpose, useForwardPropsEmits } from '../../composables';
import type { HoverCardContentImplEmits, HoverCardContentImplProps } from './hover-card-content-impl.vue';

import { injectHoverCardRootContext } from './hover-card-root.vue';
import { excludeTouch } from './utils';
import HoverCardContentImpl from './hover-card-content-impl.vue';

export type HoverCardContentEmits = HoverCardContentImplEmits;

export interface HoverCardContentProps extends HoverCardContentImplProps {
  /** Used to force mounting when more control is needed. Useful when controlling animation with Vue animation libraries. */
  forceMount?: boolean;
}

const props = defineProps<HoverCardContentProps>();
const emits = defineEmits<HoverCardContentEmits>();
const forwarded = useForwardPropsEmits(props, emits);
const { forwardRef } = useForwardExpose();

const rootContext = injectHoverCardRootContext();
</script>

<template>
  <Presence :present="forceMount || rootContext.open.value">
    <HoverCardContentImpl v-bind="forwarded" :ref="forwardRef" @pointerenter="excludeTouch(rootContext.onOpen)($event)">
      <slot />
    </HoverCardContentImpl>
  </Presence>
</template>
