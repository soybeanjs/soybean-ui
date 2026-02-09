<script setup lang="ts">
import { computed, onMounted, onUnmounted, onWatcherCleanup, shallowRef, useAttrs, watch, watchEffect } from 'vue';
import { onKeyStroke, useRafFn } from '@vueuse/core';
import {
  getActiveElement,
  getDisclosureState,
  handleAndDispatchCustomEvent,
  isClient,
  isDeltaInDirection
} from '../../shared';
import { useControllableState, usePresence } from '../../composables';
import type { Point, SwipeEvent } from '../../types';
import { Primitive } from '../primitive';
import ToastAnnounce from './toast-announce.vue';
import { provideToastRootContext, useCollectionItem, useToastProviderContext, useToastUi } from './context';
import {
  TOAST_DATA_SWIPE,
  TOAST_SWIPE_CANCEL,
  TOAST_SWIPE_END,
  TOAST_SWIPE_MOVE,
  TOAST_SWIPE_START,
  VIEWPORT_PAUSE,
  VIEWPORT_RESUME,
  getAnnounceTextContent,
  toastCssVars,
  toastSwipe
} from './shared';
import type { ToastRootEmits, ToastRootProps } from './types';

defineOptions({
  name: 'ToastRoot',
  inheritAttrs: false
});

const props = withDefaults(defineProps<ToastRootProps>(), {
  as: 'li',
  liveType: 'foreground',
  open: undefined,
  defaultOpen: true
});

const emit = defineEmits<ToastRootEmits>();

const attrs = useAttrs();

const cls = useToastUi('root');

const {
  swipeDirection,
  swipeThreshold,
  disableSwipe,
  viewportElement,
  isFocusedToastEscapeKeyDownRef,
  isClosePausedRef,
  duration: providerDuration,
  onToastAdd,
  onToastRemove
} = useToastProviderContext('ToastRoot');
const { itemElement, setItemElement, itemProps } = useCollectionItem();

const open = useControllableState(
  () => props.open,
  value => {
    emit('update:open', value ?? false);
  },
  props.defaultOpen
);

const isPresent = props.forceMount ? shallowRef(true) : usePresence(itemElement, open);

const style = computed(() => (disableSwipe.value ? '' : 'user-select: none; touch-action: none'));

const duration = computed(() => (typeof props.duration === 'number' ? props.duration : providerDuration.value || 5000));
const dataState = computed(() => getDisclosureState(open.value));

const pointerStartRef = shallowRef<Point | null>(null);
const swipeDeltaRef = shallowRef<Point | null>(null);

const closeTimerStartTimeRef = shallowRef(0);
const closeTimerRemainingTimeRef = shallowRef(duration.value);
const closeTimerRef = shallowRef(0);
const remainingTime = shallowRef(duration.value);

const remainingRaf = useRafFn(
  () => {
    const elapsedTime = new Date().getTime() - closeTimerStartTimeRef.value;
    remainingTime.value = Math.max(closeTimerRemainingTimeRef.value - elapsedTime, 0);
  },
  { fpsLimit: 60 }
);

const announceTextContent = computed(() => (itemElement.value ? getAnnounceTextContent(itemElement.value) : null));

const onClose = (event?: PointerEvent) => {
  const isNonPointerEvent = event?.pointerType === '';

  // focus viewport if focus is within toast to read the remaining toast
  // count to SR users and ensure focus isn't lost
  const isFocusInToast = itemElement.value?.contains(getActiveElement());
  if (isFocusInToast && isNonPointerEvent) {
    viewportElement.value?.focus();
  }

  if (isNonPointerEvent) {
    // when manually close the toast, we reset isClosePausedRef
    isClosePausedRef.value = false;
  }

  open.value = false;
};

const startTimer = (_duration: number) => {
  if (!_duration || _duration === Number.POSITIVE_INFINITY) return;
  // startTimer is used inside a watch with immediate set to true.
  // This results in code execution during SSR.
  // Ensure this code only runs in a browser environment
  if (!isClient) return;
  window.clearTimeout(closeTimerRef.value);
  closeTimerStartTimeRef.value = new Date().getTime();
  closeTimerRef.value = window.setTimeout(onClose, _duration);
};

const onSwipeStart = (event: SwipeEvent) => {
  emit('swipeStart', event);
  if (event.defaultPrevented) return;

  event.currentTarget.setAttribute(TOAST_DATA_SWIPE, toastSwipe.start);
};

const onSwipeMove = (event: SwipeEvent) => {
  emit('swipeMove', event);
  if (event.defaultPrevented) return;

  const { x, y } = event.detail.delta;
  const target = event.currentTarget as HTMLElement;
  target.setAttribute(TOAST_DATA_SWIPE, toastSwipe.move);
  target.style.setProperty(toastCssVars.swipeMoveX, `${x}px`);
  target.style.setProperty(toastCssVars.swipeMoveY, `${y}px`);
};

const onSwipeCancel = (event: SwipeEvent) => {
  emit('swipeCancel', event);
  if (event.defaultPrevented) return;

  const target = event.currentTarget as HTMLElement;
  target.setAttribute(TOAST_DATA_SWIPE, toastSwipe.cancel);
  Object.values(toastCssVars).forEach(cssVar => {
    target.style.removeProperty(cssVar);
  });
};

const onSwipeEnd = (event: SwipeEvent) => {
  emit('swipeEnd', event);
  if (event.defaultPrevented) return;

  const { x, y } = event.detail.delta;
  const target = event.currentTarget as HTMLElement;
  target.setAttribute(TOAST_DATA_SWIPE, toastSwipe.end);
  target.style.removeProperty(toastCssVars.swipeMoveX);
  target.style.removeProperty(toastCssVars.swipeMoveY);
  target.style.setProperty(toastCssVars.swipeEndX, `${x}px`);
  target.style.setProperty(toastCssVars.swipeEndY, `${y}px`);

  open.value = false;
};

const onPointerDown = (event: PointerEvent) => {
  if (disableSwipe.value) return;

  const { clientX: x, clientY: y } = event;
  pointerStartRef.value = { x, y };
};

const onPointerMove = (event: PointerEvent) => {
  if (disableSwipe.value || !pointerStartRef.value) return;

  const { clientX, clientY } = event;
  const { x: startX, y: startY } = pointerStartRef.value;

  const x = clientX - startX;
  const y = clientY - startY;

  const isHorizontalSwipe = ['left', 'right'].includes(swipeDirection.value!);
  const clamp = ['left', 'up'].includes(swipeDirection.value!) ? Math.min : Math.max;
  const clampedX = isHorizontalSwipe ? clamp(0, x) : 0;
  const clampedY = !isHorizontalSwipe ? clamp(0, y) : 0;
  const moveStartBuffer = event.pointerType === 'touch' ? 10 : 2;
  const delta: Point = { x: clampedX, y: clampedY };
  const eventDetail = { originalEvent: event, delta };

  if (swipeDeltaRef.value) {
    swipeDeltaRef.value = delta;
    handleAndDispatchCustomEvent(TOAST_SWIPE_MOVE, onSwipeMove, eventDetail);

    return;
  }

  if (isDeltaInDirection(delta, swipeDirection.value!, moveStartBuffer)) {
    swipeDeltaRef.value = delta;
    handleAndDispatchCustomEvent(TOAST_SWIPE_START, onSwipeStart, eventDetail);
    (event.target as HTMLElement).setPointerCapture(event.pointerId);
    return;
  }

  if (Math.abs(x) > moveStartBuffer || Math.abs(y) > moveStartBuffer) {
    // User is swiping in wrong direction so we disable swipe gesture
    // for the current pointer down interaction
    pointerStartRef.value = null;
  }
};

const onPointerUp = (event: PointerEvent) => {
  if (disableSwipe.value) return;

  const delta = swipeDeltaRef.value;
  const target = event.target as HTMLElement;
  if (target.hasPointerCapture(event.pointerId)) {
    target.releasePointerCapture(event.pointerId);
  }
  swipeDeltaRef.value = null;
  pointerStartRef.value = null;

  if (!delta) return;
  const toast = event.currentTarget;
  const eventDetail = { originalEvent: event, delta };
  if (isDeltaInDirection(delta, swipeDirection.value!, swipeThreshold.value)) {
    handleAndDispatchCustomEvent(TOAST_SWIPE_END, onSwipeEnd, eventDetail);
  } else {
    handleAndDispatchCustomEvent(TOAST_SWIPE_CANCEL, onSwipeCancel, eventDetail);
  }
  // Prevent click event from triggering on items within the toast when
  // pointer up is part of a swipe gesture
  toast?.addEventListener('click', e => e.preventDefault(), {
    once: true
  });
};

onKeyStroke('Escape', event => {
  emit('escapeKeyDown', event);
  if (!event.defaultPrevented) {
    isFocusedToastEscapeKeyDownRef.value = true;
    onClose();
  }
});

watchEffect(() => {
  const viewport = viewportElement.value;
  if (!viewport) return;

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

  onWatcherCleanup(() => {
    viewport.removeEventListener(VIEWPORT_PAUSE, handlePause);
    viewport.removeEventListener(VIEWPORT_RESUME, handleResume);
  });
});

// start timer when toast opens or duration changes.
// we include `open` in deps because closed !== unmounted when animating
// so it could reopen before being completely unmounted
watch(
  () => [props.open, duration.value],
  () => {
    // Reset the timer when the toast is rerendered with the new duration
    closeTimerRemainingTimeRef.value = duration.value;

    if (props.open && !isClosePausedRef.value) {
      startTimer(duration.value);
    }
  },
  { immediate: true }
);

provideToastRootContext({
  onClose
});

onMounted(() => {
  onToastAdd();
});
onUnmounted(() => {
  onToastRemove();
});
</script>

<template>
  <template v-if="isPresent">
    <ToastAnnounce
      v-if="announceTextContent"
      role="alert"
      :aria-live="liveType === 'foreground' ? 'assertive' : 'polite'"
      aria-atomic="true"
    >
      {{ announceTextContent }}
    </ToastAnnounce>

    <Teleport v-if="viewportElement" :to="viewportElement">
      <Primitive
        :ref="setItemElement"
        v-bind="{ ...attrs, ...itemProps }"
        :as="as"
        :as-child="asChild"
        :class="cls"
        aria-atomic="true"
        aria-live="off"
        :data-swipe-direction="swipeDirection"
        :data-state="dataState"
        role="alert"
        tabindex="0"
        :style="style"
        @pointerdown.left="onPointerDown"
        @pointermove="onPointerMove"
        @pointerup="onPointerUp"
      >
        <slot :remaining="remainingTime" :duration="duration" />
      </Primitive>
    </Teleport>
  </template>
</template>
