<script setup lang="ts">
import { computed, reactive } from 'vue';
import { usePopperV2RootContext } from '../popper-v2/context';
import { useForwardElement } from '../../composables';
import { PopperV2Anchor } from '../popper-v2';
import type { PopperV2TriggerProps } from '../popper-v2/types';
import { usePopperV2Trigger } from '../popper-v2/use-popper-v2-trigger';
import { useHoverCardRootContext } from './context';
import type { HoverCardTriggerProps } from './types';

defineOptions({
  name: 'HoverCardTrigger'
});

withDefaults(defineProps<HoverCardTriggerProps>(), {
  as: 'button'
});

const { openDelay, closeDelay, hasSelectionRef, isPointerDownOnPopupRef } = useHoverCardRootContext('HoverCardTrigger');
const popperContext = usePopperV2RootContext('HoverCardTrigger');

const [, setTriggerElement] = useForwardElement(popperContext.onTriggerElementChange);

// Hover timing (open/close delay, touch handling, grace transit) runs on the shared PopperV2
// trigger machine; `skipDelayDuration: 0` keeps every open delayed (HoverCard has no skip window).
const shellTriggerProps: PopperV2TriggerProps = reactive({
  trigger: 'hover',
  get openDelay() {
    return openDelay.value;
  },
  get closeDelay() {
    return closeDelay.value;
  },
  skipDelayDuration: 0
});

const { onBlur, onFocus, onPointerCancel, onPointerDown, onPointerEnter, onPointerLeave, onPointerMove, onPointerUp } =
  usePopperV2Trigger(shellTriggerProps, popperContext, { onVirtualPointChange: () => {} });

const dataState = computed(() => popperContext.dataState.value);

// Text selection / active pointer press inside the popup vetoes delayed hover closes; the
// guard runs when the shell close timer fires, so late selections are honored too.
popperContext.registerHoverCloseGuard(() => hasSelectionRef.value || isPointerDownOnPopupRef.value);
</script>

<template>
  <PopperV2Anchor
    :ref="setTriggerElement"
    :as="as"
    :as-child="asChild"
    :reference="reference"
    data-soybean-hover-card-trigger
    data-grace-area-trigger
    :data-state="dataState"
    @blur="onBlur"
    @focus="onFocus"
    @pointercancel="onPointerCancel"
    @pointerdown="onPointerDown"
    @pointerenter="onPointerEnter"
    @pointerleave="onPointerLeave"
    @pointermove="onPointerMove"
    @pointerup="onPointerUp"
  >
    <slot />
  </PopperV2Anchor>
</template>
