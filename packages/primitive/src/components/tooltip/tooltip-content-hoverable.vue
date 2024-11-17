<script setup lang="ts">
import { useForwardExpose, useForwardProps, useGraceArea } from '../../_shared';
import TooltipContentImpl, { type TooltipContentImplProps } from './tooltip-content-impl.vue';
import { injectTooltipRootContext } from './tooltip-root.vue';
import { injectTooltipProviderContext } from './tooltip-provider.vue';

const props = defineProps<TooltipContentImplProps>();
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
