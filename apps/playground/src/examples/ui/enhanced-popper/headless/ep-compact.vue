<script setup lang="ts">
import { computed } from 'vue';
import { useForwardListeners, useOmitProps } from '@soybeanjs/headless/composables';
import EpArrow from './ep-arrow.vue';
import EpPopup from './ep-popup.vue';
import EpPortal from './ep-portal.vue';
import EpPositioner from './ep-positioner.vue';
import EpRoot from './ep-root.vue';
import EpTrigger from './ep-trigger.vue';
import type { EpCompactEmits, EpCompactProps, EpCompactSlots, EpOpenChangeReason } from './types';

defineOptions({
  name: 'EpCompact',
  inheritAttrs: false
});

const props = withDefaults(defineProps<EpCompactProps>(), {
  open: undefined,
  defaultOpen: false,
  modal: undefined,
  trigger: 'click',
  openOnFocus: undefined,
  showArrow: true
});

const emit = defineEmits<EpCompactEmits>();

defineSlots<EpCompactSlots>();

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

function onOpenChange(value: boolean, reason: EpOpenChangeReason) {
  emit('update:open', value, reason);
}
</script>

<template>
  <EpRoot v-slot="slotProps" v-bind="forwardedRootProps" @update:open="onOpenChange">
    <EpTrigger v-bind="triggerProps">
      <slot name="trigger" />
    </EpTrigger>

    <EpPortal v-bind="portalProps">
      <EpPositioner v-bind="positionerProps" v-on="listeners">
        <EpPopup v-bind="popupProps">
          <slot v-bind="slotProps" />
          <EpArrow v-if="showArrow" v-bind="arrowProps" />
        </EpPopup>
      </EpPositioner>
    </EpPortal>
  </EpRoot>
</template>
