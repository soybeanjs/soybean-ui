<script setup lang="ts">
import { usePopperV2RootContext } from '../popper-v2/context';
import { PopperV2Trigger } from '../popper-v2';
import { useHoverCardRootContext } from './context';
import type { HoverCardTriggerProps } from './types';

defineOptions({
  name: 'HoverCardTrigger'
});

const props = withDefaults(defineProps<HoverCardTriggerProps>(), {
  as: 'button'
});

const { openDelay, closeDelay, hasSelectionRef, isPointerDownOnPopupRef } = useHoverCardRootContext('HoverCardTrigger');
const popperContext = usePopperV2RootContext('HoverCardTrigger');

// Text selection / active pointer press inside the popup vetoes delayed hover closes; the guard
// runs when the shell close timer fires, so late selections are honored too.
popperContext.registerHoverCloseGuard(() => hasSelectionRef.value || isPointerDownOnPopupRef.value);
</script>

<template>
  <PopperV2Trigger
    v-bind="props"
    trigger="hover"
    :open-delay="openDelay"
    :close-delay="closeDelay"
    :skip-delay-duration="0"
    aria-mode="none"
    data-soybean-hover-card-trigger
  >
    <slot />
  </PopperV2Trigger>
</template>
