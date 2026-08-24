<script setup lang="ts">
import { computed } from 'vue';
import { useForwardListeners, useOmitProps } from '../../composables';
import PopperV2Arrow from './popper-v2-arrow.vue';
import PopperV2Popup from './popper-v2-popup.vue';
import PopperV2Portal from './popper-v2-portal.vue';
import PopperV2Positioner from './popper-v2-positioner.vue';
import PopperV2Root from './popper-v2-root.vue';
import PopperV2Trigger from './popper-v2-trigger.vue';
import type {
  PopperV2CompactEmits,
  PopperV2CompactProps,
  PopperV2CompactSlots,
  PopperV2OpenChangeReason
} from './types';

defineOptions({
  name: 'PopperV2Compact',
  inheritAttrs: false
});

const props = withDefaults(defineProps<PopperV2CompactProps>(), {
  open: undefined,
  defaultOpen: false,
  modal: undefined,
  trigger: 'click',
  openOnFocus: undefined,
  showArrow: true
});

const emit = defineEmits<PopperV2CompactEmits>();

defineSlots<PopperV2CompactSlots>();

const forwardedRootProps = useOmitProps(props, [
  'trigger',
  'openDelay',
  'closeDelay',
  'skipDelayDuration',
  'pressOpenDelay',
  'openOnFocus',
  'placement',
  'showArrow',
  'triggerProps',
  'portalProps',
  'positionerProps',
  'popupProps',
  'arrowProps'
]);

const listeners = useForwardListeners(emit);

const triggerProps = computed(() => ({
  ...props.triggerProps,
  trigger: props.triggerProps?.trigger ?? props.trigger,
  openDelay: props.triggerProps?.openDelay ?? props.openDelay,
  closeDelay: props.triggerProps?.closeDelay ?? props.closeDelay,
  skipDelayDuration: props.triggerProps?.skipDelayDuration ?? props.skipDelayDuration,
  pressOpenDelay: props.triggerProps?.pressOpenDelay ?? props.pressOpenDelay,
  openOnFocus: props.triggerProps?.openOnFocus ?? props.openOnFocus,
  asChild: props.triggerProps?.asChild ?? true
}));

const positionerProps = computed(() => ({
  ...props.positionerProps,
  placement: props.placement ?? props.positionerProps?.placement
}));

function onOpenChange(value: boolean, reason: PopperV2OpenChangeReason) {
  emit('update:open', value, reason);
}
</script>

<template>
  <PopperV2Root v-slot="slotProps" v-bind="forwardedRootProps" @update:open="onOpenChange">
    <PopperV2Trigger v-bind="triggerProps">
      <slot name="trigger" />
    </PopperV2Trigger>

    <PopperV2Portal v-bind="portalProps">
      <PopperV2Positioner v-bind="positionerProps" v-on="listeners">
        <PopperV2Popup v-bind="popupProps">
          <slot v-bind="slotProps" />
          <PopperV2Arrow v-if="showArrow" v-bind="arrowProps" />
        </PopperV2Popup>
      </PopperV2Positioner>
    </PopperV2Portal>
  </PopperV2Root>
</template>
