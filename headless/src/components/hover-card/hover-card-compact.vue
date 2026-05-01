<script setup lang="ts">
import { computed } from 'vue';
import { useForwardListeners, useOmitProps } from '../../composables';
import HoverCardRoot from './hover-card-root.vue';
import HoverCardTrigger from './hover-card-trigger.vue';
import HoverCardPortal from '../portal/portal.vue';
import HoverCardPositioner from './hover-card-positioner.vue';
import HoverCardPopup from './hover-card-popup.vue';
import HoverCardArrow from '../popper/popper-arrow.vue';
import type { HoverCardCompactProps, HoverCardCompactEmits, HoverCardCompactSlots } from './types';

defineOptions({
  name: 'HoverCardCompact'
});

const props = withDefaults(defineProps<HoverCardCompactProps>(), {
  open: undefined,
  defaultOpen: false,
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

const positionerProps = computed(() => {
  return {
    ...props.positionerProps,
    placement: props.placement ?? props.positionerProps?.placement
  };
});
</script>

<template>
  <HoverCardRoot v-bind="forwardedProps" @update:open="emit('update:open', $event)">
    <HoverCardTrigger v-bind="triggerProps">
      <slot name="trigger" />
    </HoverCardTrigger>
    <HoverCardPortal v-bind="portalProps">
      <HoverCardPositioner v-bind="positionerProps" v-on="listeners">
        <HoverCardPopup v-bind="popupProps">
          <slot />
          <HoverCardArrow v-if="showArrow" v-bind="arrowProps" />
        </HoverCardPopup>
      </HoverCardPositioner>
    </HoverCardPortal>
  </HoverCardRoot>
</template>
