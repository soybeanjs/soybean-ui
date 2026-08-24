<script setup lang="ts">
import { computed } from 'vue';
import { useForwardListeners, useOmitProps } from '../../composables';
import PopperV2Arrow from '../popper-v2/popper-v2-arrow.vue';
import PopperV2Portal from '../popper-v2/popper-v2-portal.vue';
import type { PopperV2OpenChangeReason } from '../popper-v2/types';
import HoverCardPopup from './hover-card-popup.vue';
import HoverCardPositioner from './hover-card-positioner.vue';
import HoverCardRoot from './hover-card-root.vue';
import HoverCardTrigger from './hover-card-trigger.vue';
import type { HoverCardCompactProps, HoverCardCompactEmits, HoverCardCompactSlots } from './types';

defineOptions({
  name: 'HoverCardCompact'
});

const props = withDefaults(defineProps<HoverCardCompactProps>(), {
  open: undefined,
  showArrow: true
});

const emit = defineEmits<HoverCardCompactEmits>();

defineSlots<HoverCardCompactSlots>();

const forwardedProps = useOmitProps(props, [
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
  <HoverCardRoot
    v-bind="forwardedProps"
    @update:open="(value: boolean, reason?: PopperV2OpenChangeReason) => emit('update:open', value, reason)"
  >
    <HoverCardTrigger v-bind="triggerProps">
      <slot name="trigger" />
    </HoverCardTrigger>
    <PopperV2Portal v-bind="portalProps">
      <HoverCardPositioner v-bind="positionerProps" v-on="listeners">
        <HoverCardPopup v-bind="popupProps">
          <slot />
          <PopperV2Arrow v-if="showArrow" v-bind="arrowProps" />
        </HoverCardPopup>
      </HoverCardPositioner>
    </PopperV2Portal>
  </HoverCardRoot>
</template>
