<script setup lang="ts">
import { computed, reactive, useId, watch } from 'vue';
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
// trigger machine; the provider-level `isOpenDelayed` gates `openDelay` so sibling tooltips
// opened within the skip-delay window open instantly.
const shellTriggerProps: PopperV2TriggerProps = reactive({
  trigger: 'hover',
  get openDelay() {
    return provider.isOpenDelayed.value ? delayDuration.value : 0;
  },
  closeDelay: 0,
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

// Coordinate sibling tooltips through the provider: opening one instantly closes the others
// and suppresses the open delay for the next one within the skip-delay window.
const rootId = useId();
watch(popperContext.open, isOpen => {
  if (isOpen) {
    provider.rootOpened(rootId, () => popperContext.onOpenChange(false, 'imperative'));
  } else {
    provider.rootClosed(rootId);
  }
});
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
