<script setup lang="ts">
import { computed } from 'vue';
import { useForwardListeners, useOmitProps } from '../../composables';
import PopperV2Arrow from '../popper-v2/popper-v2-arrow.vue';
import PopperV2Portal from '../popper-v2/popper-v2-portal.vue';
import type { PopperV2OpenChangeReason } from '../popper-v2/types';
import TooltipPopup from './tooltip-popup.vue';
import TooltipPositioner from './tooltip-positioner.vue';
import TooltipRoot from './tooltip-root.vue';
import TooltipTrigger from './tooltip-trigger.vue';
import type { TooltipCompactProps, TooltipCompactEmits, TooltipCompactSlots } from './types';

defineOptions({
  name: 'TooltipCompact'
});

const props = withDefaults(defineProps<TooltipCompactProps>(), {
  open: undefined,
  defaultOpen: false,
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
  <TooltipRoot
    v-bind="forwardedProps"
    @update:open="(value: boolean, reason?: PopperV2OpenChangeReason) => emit('update:open', value, reason)"
  >
    <TooltipTrigger v-bind="triggerProps">
      <slot name="trigger" />
    </TooltipTrigger>
    <PopperV2Portal v-bind="portalProps">
      <TooltipPositioner v-bind="positionerProps" v-on="listeners">
        <TooltipPopup v-bind="popupProps">
          <slot>{{ content }}</slot>
          <PopperV2Arrow v-if="showArrow" v-bind="arrowProps" />
        </TooltipPopup>
      </TooltipPositioner>
    </PopperV2Portal>
  </TooltipRoot>
</template>
