<script setup lang="ts">
import { computed, reactive } from 'vue';
import { usePopperV2RootContext } from '../popper-v2/context';
import { useForwardElement } from '../../composables';
import { PopperV2Anchor } from '../popper-v2';
import type { PopperV2TriggerProps } from '../popper-v2/types';
import { usePopperV2Trigger } from '../popper-v2/use-popper-v2-trigger';
import { useTooltipRootContext } from './context';
import type { TooltipTriggerProps } from './types';

defineOptions({
  name: 'TooltipTrigger'
});

withDefaults(defineProps<TooltipTriggerProps>(), {
  as: 'button'
});

const { delayDuration, disableClosingTrigger, ignoreNonKeyboardFocus, disabled, popupId, provider } =
  useTooltipRootContext('TooltipTrigger');
const popperContext = usePopperV2RootContext('TooltipTrigger');

const [, setTriggerElement] = useForwardElement(popperContext.onTriggerElementChange);

// All hover timing (open delay, skip-delay window, focus gating) runs on the shared PopperV2
// trigger machine. Sibling skip-delay coordination comes from the delay group provided by
// `TooltipProvider`; without one the per-root machine keeps working standalone.
const shellTriggerProps: PopperV2TriggerProps = reactive({
  trigger: 'hover',
  get openDelay() {
    return delayDuration.value;
  },
  closeDelay: 0,
  focusOpenDelay: 0,
  get skipDelayDuration() {
    return provider.skipDelayDuration.value;
  },
  openOnFocus: true,
  get focusVisibleOnly() {
    return ignoreNonKeyboardFocus.value;
  },
  get disabled() {
    return disabled.value;
  }
});

const { onBlur, onFocus, onPointerCancel, onPointerDown, onPointerEnter, onPointerLeave, onPointerMove, onPointerUp } =
  usePopperV2Trigger(shellTriggerProps, popperContext, { onVirtualPointChange: () => {} });

const dataState = computed(() => {
  if (!popperContext.open.value) return 'closed' as const;
  return popperContext.wasOpenDelayed.value ? ('delayed-open' as const) : ('instant-open' as const);
});

// Pointer down on an open trigger closes the tooltip unless `disableClosingTrigger` is set;
// the dismiss layer alone won't, because it prevents dismissal for trigger targets.
function onTriggerPointerDown(event: PointerEvent) {
  onPointerDown(event);

  if (popperContext.open.value && !disableClosingTrigger.value) {
    popperContext.onOpenChange(false, 'imperative');
  }
}
</script>

<template>
  <PopperV2Anchor
    :ref="setTriggerElement"
    :as="as"
    :as-child="asChild"
    :reference="reference"
    data-soybean-tooltip-trigger
    data-grace-area-trigger
    :aria-describedby="popperContext.open.value ? popupId : undefined"
    :data-state="dataState"
    :data-disabled="disabled ? '' : undefined"
    @blur="onBlur"
    @focus="onFocus"
    @pointercancel="onPointerCancel"
    @pointerdown="onTriggerPointerDown"
    @pointerenter="onPointerEnter"
    @pointerleave="onPointerLeave"
    @pointermove="onPointerMove"
    @pointerup="onPointerUp"
  >
    <slot />
  </PopperV2Anchor>
</template>
