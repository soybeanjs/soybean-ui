<script setup lang="ts">
import { computed } from 'vue';
import { useForwardListeners, useOmitProps } from '../../composables';
import TooltipRoot from './tooltip-root.vue';
import TooltipTrigger from './tooltip-trigger.vue';
import TooltipPortal from '../portal/portal.vue';
import TooltipPositioner from './tooltip-positioner.vue';
import TooltipPopup from './tooltip-popup.vue';
import TooltipArrow from '../popper/popper-arrow.vue';
import type { TooltipCompactEmits, TooltipCompactProps, TooltipCompactSlots } from './types';

defineOptions({
  name: 'TooltipCompact'
});

const props = withDefaults(defineProps<TooltipCompactProps>(), {
  open: undefined,
  defaultOpen: false,
  avoidCollisions: true,
  showArrow: true
});

const emit = defineEmits<TooltipCompactEmits>();

defineSlots<TooltipCompactSlots>();

const forwardedProps = useOmitProps(props, [
  'content',
  'placement',
  'showArrow',
  'triggerProps',
  'portalProps',
  'positionerProps',
  'popupProps',
  'arrowProps'
]);

const listeners = useForwardListeners(emit);

const triggerProps = computed(() => {
  return {
    ...props.triggerProps,
    asChild: props.triggerProps?.asChild ?? true
  };
});

const positionerProps = computed(() => {
  return {
    ...props.positionerProps,
    placement: props.placement ?? props.positionerProps?.placement
  };
});
</script>

<template>
  <TooltipRoot v-bind="forwardedProps" @update:open="emit('update:open', $event)">
    <TooltipTrigger v-bind="triggerProps">
      <slot name="trigger" />
    </TooltipTrigger>
    <TooltipPortal v-bind="portalProps">
      <TooltipPositioner v-bind="positionerProps" v-on="listeners">
        <TooltipPopup v-bind="popupProps">
          <slot>{{ content }}</slot>
          <TooltipArrow v-if="showArrow" v-bind="arrowProps" />
        </TooltipPopup>
      </TooltipPositioner>
    </TooltipPortal>
  </TooltipRoot>
</template>
