<script setup lang="ts">
import { computed } from 'vue';
import { useForwardListeners, useOmitProps } from '../../composables';
import PopoverRoot from './popover-root.vue';
import PopoverTrigger from './popover-trigger.vue';
import PopoverPortal from '../portal/portal.vue';
import PopoverPositioner from './popover-positioner.vue';
import PopoverPopup from './popover-popup.vue';
import PopoverArrow from '../popper/popper-arrow.vue';
import PopoverClose from './popover-close.vue';
import type { PopoverCompactProps, PopoverCompactEmits, PopoverCompactSlots } from './types';

defineOptions({
  name: 'PopoverCompact'
});

const props = withDefaults(defineProps<PopoverCompactProps>(), {
  open: undefined,
  defaultOpen: false,
  showArrow: true
});

const emit = defineEmits<PopoverCompactEmits>();

const slots = defineSlots<PopoverCompactSlots>();

const forwardedRootProps = useOmitProps(props, [
  'placement',
  'showArrow',
  'triggerProps',
  'portalProps',
  'positionerProps',
  'popupProps',
  'arrowProps',
  'closeProps'
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
  <PopoverRoot v-bind="forwardedRootProps" @update:open="emit('update:open', $event)">
    <PopoverTrigger v-bind="triggerProps" as-child>
      <slot name="trigger" />
    </PopoverTrigger>
    <PopoverPortal v-bind="portalProps">
      <PopoverPositioner v-bind="positionerProps" v-on="listeners">
        <PopoverPopup v-bind="popupProps">
          <slot />
          <PopoverArrow v-if="showArrow" v-bind="arrowProps" />
        </PopoverPopup>
        <PopoverClose v-if="slots.close" v-bind="closeProps" as-child>
          <slot name="close" />
        </PopoverClose>
      </PopoverPositioner>
    </PopoverPortal>
  </PopoverRoot>
</template>
