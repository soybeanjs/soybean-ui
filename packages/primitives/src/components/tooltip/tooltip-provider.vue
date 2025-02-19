<script setup lang="ts">
import { ref, toRefs } from 'vue';
import { useTimeoutFn } from '@vueuse/shared';
import { useForwardExpose } from '../../composables';
import { provideTooltipProviderContext } from './context';
import type { TooltipProviderProps } from './types';

defineOptions({
  name: 'TooltipProvider',
  inheritAttrs: false
});

const props = withDefaults(defineProps<TooltipProviderProps>(), {
  delayDuration: 700,
  skipDelayDuration: 300,
  disableHoverableContent: false,
  ignoreNonKeyboardFocus: false
});
const {
  delayDuration,
  skipDelayDuration,
  disableHoverableContent,
  disableClosingTrigger,
  ignoreNonKeyboardFocus,
  disabled
} = toRefs(props);
useForwardExpose();

const isOpenDelayed = ref(true);
// Reset the inTransit state if idle/scrolled.
const isPointerInTransitRef = ref(false);

const { start: startTimer, stop: clearTimer } = useTimeoutFn(
  () => {
    isOpenDelayed.value = true;
  },
  skipDelayDuration,
  { immediate: false }
);

provideTooltipProviderContext({
  isOpenDelayed,
  delayDuration,
  onOpen() {
    clearTimer();
    isOpenDelayed.value = false;
  },
  onClose() {
    startTimer();
  },
  isPointerInTransitRef,
  disableHoverableContent,
  disableClosingTrigger,
  disabled,
  ignoreNonKeyboardFocus
});
</script>

<template>
  <slot />
</template>
