import { ref } from 'vue';
import type { Ref } from 'vue';
import { useEventListener } from '@vueuse/core';
import { isClient } from '../../shared';
import type { SwipeDirection } from '../../types';
import { NO_DRAG_ATTR, SWIPE_GESTURE } from './shared';

interface SwipeSample {
  time: number;
  x: number;
  y: number;
}

interface SwipeOrigin {
  x: number;
  y: number;
  target: EventTarget | null;
}

export interface UseSwipeDismissOptions {
  /** Whether the gesture is currently allowed. */
  enabled: Ref<boolean>;
  /** The element the gesture starts from. */
  elementRef: Ref<HTMLElement | null | undefined>;
  /** Directions that commit a dismiss. */
  directions: Ref<SwipeDirection[]>;
  /** CSS custom properties that receive the live movement. */
  movementCssVars?: { x?: string; y?: string };
  /** Called once a dismiss gesture commits. */
  onDismiss: () => void;
  /** Called when a gesture starts (`true`) and ends (`false`). */
  onSwipingChange?: (swiping: boolean) => void;
  /** Called with the live progress along the permitted direction, in the `[0, 1]` range. */
  onProgress?: (progress: number) => void;
}

const HORIZONTAL: SwipeDirection[] = ['left', 'right'];

function isHorizontal(direction: SwipeDirection) {
  return HORIZONTAL.includes(direction);
}

/**
 * Swipe gesture primitive behind `DrawerSwipeArea` and the drawer surface.
 *
 * It owns the four behaviours that a plain pointer handler cannot express:
 * axis locking (a diagonal gesture must not half-open a drawer), direction
 * damping (moving the wrong way meets resistance instead of doing nothing),
 * sampled velocity (release intent is measured over a sliding window so it does
 * not depend on frame rate), and scroll yielding (a gesture that starts inside
 * a scrollable container keeps scrolling instead of being swallowed).
 */
export function useSwipeDismiss(options: UseSwipeDismissOptions) {
  const { enabled, elementRef, directions, movementCssVars, onDismiss, onSwipingChange, onProgress } = options;

  const isSwiping = ref(false);

  let origin: SwipeOrigin | null = null;
  let axis: 'x' | 'y' | null = null;
  let samples: SwipeSample[] = [];
  let pointerId: number | null = null;
  let yielded = false;

  function clearCssVars() {
    const target = elementRef.value;

    if (!target || !movementCssVars) return;

    if (movementCssVars.x) target.style.removeProperty(movementCssVars.x);
    if (movementCssVars.y) target.style.removeProperty(movementCssVars.y);
  }

  function endGesture() {
    origin = null;
    axis = null;
    samples = [];
    pointerId = null;
    yielded = false;

    if (isSwiping.value) {
      isSwiping.value = false;
      onSwipingChange?.(false);
    }

    onProgress?.(0);
    clearCssVars();
  }

  /** Signed travel along the permitted direction; negative means moving against it. */
  function signedTravel(deltaX: number, deltaY: number) {
    let best = Number.NEGATIVE_INFINITY;

    for (const direction of directions.value) {
      const value =
        direction === 'right' ? deltaX : direction === 'left' ? -deltaX : direction === 'down' ? deltaY : -deltaY;

      if (value > best) best = value;
    }

    return Number.isFinite(best) ? best : 0;
  }

  function sampleVelocity(point: SwipeSample) {
    samples = samples.filter(sample => point.time - sample.time <= SWIPE_GESTURE.VELOCITY_WINDOW);
    samples.push(point);

    if (samples.length < 2) return 0;

    const first = samples[0]!;
    const last = samples[samples.length - 1]!;
    const elapsed = last.time - first.time;

    if (elapsed <= 0) return 0;

    const distance = signedTravel(last.x - first.x, last.y - first.y);

    return distance / elapsed;
  }

  /** Whether an ancestor can still scroll along the locked axis in the gesture direction. */
  function isScrollableAncestor(axisLock: 'x' | 'y', travel: number) {
    const stop = elementRef.value;
    let node = origin?.target as HTMLElement | null | undefined;

    while (node && node !== stop) {
      if (node instanceof HTMLElement) {
        const style = window.getComputedStyle(node);
        const overflow = axisLock === 'x' ? style.overflowX : style.overflowY;
        const scrollable = overflow === 'auto' || overflow === 'scroll';

        if (scrollable) {
          const size = axisLock === 'x' ? node.scrollWidth - node.clientWidth : node.scrollHeight - node.clientHeight;
          const position = axisLock === 'x' ? node.scrollLeft : node.scrollTop;
          const room = travel < 0 ? position : size - position;

          if (size > 0 && room > 0) return true;
        }
      }

      node = node.parentElement;
    }

    return false;
  }

  function elementSize(axisLock: 'x' | 'y') {
    const target = elementRef.value;
    const rect = target?.getBoundingClientRect();

    if (axisLock === 'x') return rect?.width || window.innerWidth;

    return rect?.height || window.innerHeight;
  }

  function onPointerDown(event: PointerEvent) {
    if (!enabled.value || event.button !== 0) return;

    if (!isClient || pointerId !== null) return;

    const target = event.target as HTMLElement | null;

    if (target?.closest(`[${NO_DRAG_ATTR}]`)) return;

    origin = { x: event.clientX, y: event.clientY, target: event.target };
    axis = null;
    samples = [{ time: event.timeStamp, x: event.clientX, y: event.clientY }];
    pointerId = event.pointerId;
    yielded = false;
  }

  function onPointerMove(event: PointerEvent) {
    if (!origin || pointerId !== event.pointerId || yielded) return;

    const deltaX = event.clientX - origin.x;
    const deltaY = event.clientY - origin.y;

    if (axis === null) {
      const absX = Math.abs(deltaX);
      const absY = Math.abs(deltaY);

      if (absX < SWIPE_GESTURE.AXIS_LOCK_THRESHOLD && absY < SWIPE_GESTURE.AXIS_LOCK_THRESHOLD) return;

      const allowsHorizontal = directions.value.some(isHorizontal);
      const allowsVertical = directions.value.some(direction => !isHorizontal(direction));

      axis = absX > absY ? (allowsHorizontal ? 'x' : null) : allowsVertical ? 'y' : null;

      if (axis === null) {
        // The dominant axis is not permitted, so this gesture is never ours.
        endGesture();
        return;
      }

      const travel = signedTravel(deltaX, deltaY);

      if (isScrollableAncestor(axis, travel)) {
        yielded = true;
        endGesture();
        return;
      }

      if (!isSwiping.value) {
        isSwiping.value = true;
        onSwipingChange?.(true);
      }
    }

    const raw = signedTravel(deltaX, deltaY);
    const travel = raw >= 0 ? raw : raw * SWIPE_GESTURE.RESISTANCE;
    const progress = Math.min(1, Math.max(0, travel / elementSize(axis)));

    if (movementCssVars) {
      const target = elementRef.value;

      if (target) {
        if (movementCssVars.x) target.style.setProperty(movementCssVars.x, `${deltaX}px`);
        if (movementCssVars.y) target.style.setProperty(movementCssVars.y, `${deltaY}px`);
      }
    }

    samples = samples.slice(-16);
    onProgress?.(progress);
    sampleVelocity({ time: event.timeStamp, x: event.clientX, y: event.clientY });
  }
  function onPointerUp(event: PointerEvent) {
    if (!origin || pointerId !== event.pointerId || yielded) {
      endGesture();
      return;
    }

    const deltaX = event.clientX - origin.x;
    const deltaY = event.clientY - origin.y;
    const raw = signedTravel(deltaX, deltaY);
    const travel = raw >= 0 ? raw : raw * SWIPE_GESTURE.RESISTANCE;
    const velocity = sampleVelocity({ time: event.timeStamp, x: event.clientX, y: event.clientY });
    const committed = travel >= SWIPE_GESTURE.DISMISS_DISTANCE || velocity >= SWIPE_GESTURE.VELOCITY_THRESHOLD;

    endGesture();

    if (committed) onDismiss();
  }

  useEventListener(elementRef, 'pointerdown', onPointerDown);

  if (isClient) {
    // Moves and releases are tracked on the window so a gesture that leaves the
    // element still resolves instead of staying stuck in the swiping state.
    useEventListener(window, 'pointermove', onPointerMove);
    useEventListener(window, 'pointerup', onPointerUp);
    useEventListener(window, 'pointercancel', endGesture);
  }

  return {
    isSwiping,
    cancel: endGesture
  };
}
