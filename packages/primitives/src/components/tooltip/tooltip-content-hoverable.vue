<script setup lang="ts">
import { useForwardExpose, useForwardProps, useGraceArea } from '../../composables';
import { injectTooltipProviderContext, injectTooltipRootContext } from './context';
import TooltipContentImpl from './tooltip-content-impl.vue';
import type { TooltipContentPropsWithPrimitive } from './types';

defineOptions({
  name: 'TooltipContentHoverable'
});

const props = defineProps<TooltipContentPropsWithPrimitive>();
const forwardedProps = useForwardProps(props);
const { forwardRef, currentElement } = useForwardExpose();

const { trigger, onClose } = injectTooltipRootContext();
const providerContext = injectTooltipProviderContext();
const { isPointerInTransit, onPointerExit } = useGraceArea(trigger, currentElement);
providerContext.isPointerInTransitRef = isPointerInTransit;

onPointerExit(() => {
  onClose();
});
</script>

<template>
  <TooltipContentImpl :ref="forwardRef" v-bind="forwardedProps">
    <slot />
  </TooltipContentImpl>
</template>
