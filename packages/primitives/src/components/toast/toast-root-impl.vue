<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref, watch, watchEffect } from 'vue';
import { onKeyStroke, useRafFn } from '@vueuse/core';
import { isClient } from '@vueuse/shared';
import { useCollection, useForwardExpose } from '../../composables';
import type { SwipeEvent } from '../../types';
import { Primitive } from '../primitive';
import { injectToastProviderContext, provideToastRootContext } from './context';
import {
  TOAST_SWIPE_CANCEL,
  TOAST_SWIPE_END,
  TOAST_SWIPE_MOVE,
  TOAST_SWIPE_START,
  VIEWPORT_PAUSE,
  VIEWPORT_RESUME,
  getAnnounceTextContent,
  handleAndDispatchCustomEvent,
  isDeltaInDirection
} from './shared';
import ToastAnnounce from './toast-announce.vue';
import type { ToastRootImplEmits, ToastRootImplPropsWithPrimitive } from './types';

defineOptions({
  name: 'ToastRootImpl',
  inheritAttrs: false
});

const props = withDefaults(defineProps<ToastRootImplPropsWithPrimitive>(), {
  open: false,
  as: 'li'
});

const emit = defineEmits<ToastRootImplEmits>();

const { forwardRef, currentElement } = useForwardExpose();
const { CollectionItem } = useCollection();

const providerContext = injectToastProviderContext();
const pointerStartRef = ref<{ x: number; y: number } | null>(null);
const swipeDeltaRef = ref<{ x: number; y: number } | null>(null);
const duration = computed(() => (typeof props.duration === 'number' ? props.duration : providerContext.duration.value));

const closeTimerStartTimeRef = ref(0);
const closeTimerRemainingTimeRef = ref(duration.value);
const closeTimerRef = ref(0);
const remainingTime = ref(duration.value);

const remainingRaf = useRafFn(
  () => {
    const elapsedTime = new Date().getTime() - closeTimerStartTimeRef.value;
    remainingTime.value = Math.max(closeTimerRemainingTimeRef.value - elapsedTime, 0);
  },
  { fpsLimit: 60 }
);

function startTimer(_duration: number) {
  if (!_duration || _duration === Number.POSITIVE_INFINITY) return;
  // startTimer is used inside a watch with immediate set to true.
  // This results in code execution during SSR.
  // Ensure this code only runs in a browser environment
  if (!isClient) return;
  window.clearTimeout(closeTimerRef.value);
  closeTimerStartTimeRef.value = new Date().getTime();
  closeTimerRef.value = window.setTimeout(handleClose, _duration);
}

function handleClose() {
  // focus viewport if focus is within toast to read the remaining toast
  // count to SR users and ensure focus isn't lost
  const isFocusInToast = currentElement.value?.contains(document.activeElement);
  if (isFocusInToast) providerContext.viewport.value?.focus();

  // when manually close the toast, we reset isClosePausedRef
  providerContext.isClosePausedRef.value = false;
  emit('close');
}

const announceTextContent = computed(() =>
  currentElement.value ? getAnnounceTextContent(currentElement.value) : null
);

if (props.type && !['foreground', 'background'].includes(props.type)) {
  const error = 'Invalid prop `type` supplied to `Toast`. Expected `foreground | background`.';
  throw new Error(error);
}

watchEffect(_cleanupFn => {
  const viewport = providerContext.viewport.value;
  if (viewport) {
    const handleResume = () => {
      startTimer(closeTimerRemainingTimeRef.value);
      remainingRaf.resume();
      emit('resume');
    };
    const handlePause = () => {
      const elapsedTime = new Date().getTime() - closeTimerStartTimeRef.value;
      closeTimerRemainingTimeRef.value -= elapsedTime;
      window.clearTimeout(closeTimerRef.value);
      remainingRaf.pause();
      emit('pause');
    };
    viewport.addEventListener(VIEWPORT_PAUSE, handlePause);
    viewport.addEventListener(VIEWPORT_RESUME, handleResume);
    return () => {
      viewport.removeEventListener(VIEWPORT_PAUSE, handlePause);
      viewport.removeEventListener(VIEWPORT_RESUME, handleResume);
    };
  }
});

// start timer when toast opens or duration changes.
// we include `open` in deps because closed !== unmounted when animating
// so it could reopen before being completely unmounted
watch(
  () => [props.open, duration.value],
  () => {
    // Reset the timer when the toast is rerendered with the new duration
    closeTimerRemainingTimeRef.value = duration.value;

    if (props.open && !providerContext.isClosePausedRef.value) startTimer(duration.value);
  },
  { immediate: true }
);

onKeyStroke('Escape', event => {
  emit('escapeKeyDown', event);
  if (!event.defaultPrevented) {
    providerContext.isFocusedToastEscapeKeyDownRef.value = true;
    handleClose();
  }
});

onMounted(() => {
  providerContext.onToastAdd();
});
onUnmounted(() => {
  providerContext.onToastRemove();
});

provideToastRootContext({ onClose: handleClose });
</script>

<template>
  <ToastAnnounce
    v-if="announceTextContent"
    role="alert"
    :aria-live="type === 'foreground' ? 'assertive' : 'polite'"
    aria-atomic="true"
  >
    {{ announceTextContent }}
  </ToastAnnounce>

  <Teleport v-if="providerContext.viewport.value" :to="providerContext.viewport.value">
    <CollectionItem>
      <Primitive
        :ref="forwardRef"
        v-bind="$attrs"
        :class="props.class"
        :as="as"
        :as-child="asChild"
        aria-atomic="true"
        aria-live="off"
        :data-swipe-direction="providerContext.swipeDirection.value"
        :data-state="open ? 'open' : 'closed'"
        role="alert"
        tabindex="0"
        :style="{ userSelect: 'none', touchAction: 'none' }"
        @pointerdown.left="
          (event: PointerEvent) => {
            pointerStartRef = { x: event.clientX, y: event.clientY };
          }
        "
        @pointermove="
          (event: PointerEvent) => {
            if (!pointerStartRef) return;
            const x = event.clientX - pointerStartRef.x;
            const y = event.clientY - pointerStartRef.y;
            const hasSwipeMoveStarted = Boolean(swipeDeltaRef);
            const isHorizontalSwipe = ['left', 'right'].includes(providerContext.swipeDirection.value);
            const clamp = ['left', 'up'].includes(providerContext.swipeDirection.value) ? Math.min : Math.max;
            const clampedX = isHorizontalSwipe ? clamp(0, x) : 0;
            const clampedY = !isHorizontalSwipe ? clamp(0, y) : 0;
            const moveStartBuffer = event.pointerType === 'touch' ? 10 : 2;
            const delta = { x: clampedX, y: clampedY };
            const eventDetail = { originalEvent: event, delta };
            if (hasSwipeMoveStarted) {
              swipeDeltaRef = delta;
              handleAndDispatchCustomEvent(TOAST_SWIPE_MOVE, (ev: SwipeEvent) => emit('swipeMove', ev), eventDetail);
            } else if (isDeltaInDirection(delta, providerContext.swipeDirection.value, moveStartBuffer)) {
              swipeDeltaRef = delta;
              handleAndDispatchCustomEvent(TOAST_SWIPE_START, (ev: SwipeEvent) => emit('swipeStart', ev), eventDetail);
              (event.target as HTMLElement).setPointerCapture(event.pointerId);
            } else if (Math.abs(x) > moveStartBuffer || Math.abs(y) > moveStartBuffer) {
              // User is swiping in wrong direction so we disable swipe gesture
              // for the current pointer down interaction
              pointerStartRef = null;
            }
          }
        "
        @pointerup="
          (event: PointerEvent) => {
            const delta = swipeDeltaRef;
            const target = event.target as HTMLElement;
            if (target.hasPointerCapture(event.pointerId)) {
              target.releasePointerCapture(event.pointerId);
            }
            swipeDeltaRef = null;
            pointerStartRef = null;
            if (delta) {
              const toast = event.currentTarget;
              const eventDetail = { originalEvent: event, delta };
              if (
                isDeltaInDirection(delta, providerContext.swipeDirection.value, providerContext.swipeThreshold.value)
              ) {
                handleAndDispatchCustomEvent(TOAST_SWIPE_END, (ev: SwipeEvent) => emit('swipeEnd', ev), eventDetail);
              } else {
                handleAndDispatchCustomEvent(
                  TOAST_SWIPE_CANCEL,
                  (ev: SwipeEvent) => emit('swipeCancel', ev),
                  eventDetail
                );
              }
              // Prevent click event from triggering on items within the toast when
              // pointer up is part of a swipe gesture
              toast?.addEventListener('click', event => event.preventDefault(), {
                once: true
              });
            }
          }
        "
      >
        <slot :remaining="remainingTime" :duration="duration" />
      </Primitive>
    </CollectionItem>
  </Teleport>
</template>
