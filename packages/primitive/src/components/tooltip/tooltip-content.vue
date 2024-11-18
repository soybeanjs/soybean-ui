<script setup lang="ts">
import { Presence } from '../presence';
import { useForwardExpose, useForwardPropsEmits } from '../../composables';
import type { TooltipContentImplEmits, TooltipContentImplProps } from './tooltip-content-impl.vue';

import TooltipContentImpl from './tooltip-content-impl.vue';
import TooltipContentHoverable from './tooltip-content-hoverable.vue';
import { injectTooltipRootContext } from './tooltip-root.vue';

export type TooltipContentEmits = TooltipContentImplEmits;

export interface TooltipContentProps extends TooltipContentImplProps {
  /** Used to force mounting when more control is needed. Useful when controlling animation with Vue animation libraries. */
  forceMount?: boolean;
}

const props = withDefaults(defineProps<TooltipContentProps>(), {
  side: 'top'
});
const emit = defineEmits<TooltipContentEmits>();

const rootContext = injectTooltipRootContext();
const forwarded = useForwardPropsEmits(props, emit);
const { forwardRef } = useForwardExpose();
</script>

<template>
  <Presence :present="forceMount || rootContext.open.value">
    <component
      :is="rootContext.disableHoverableContent.value ? TooltipContentImpl : TooltipContentHoverable"
      :ref="forwardRef"
      v-bind="forwarded"
    >
      <slot />
    </component>
  </Presence>
</template>
