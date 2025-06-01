import { nextTick, onBeforeUnmount, shallowRef, watchEffect } from 'vue';
import type { ShallowRef } from 'vue';
import { GRACE_AREA_TRIGGER_ATTR } from '../constants';
import type { Point, Polygon } from '../types';
import {
  createDebounce,
  getExitSideFromRect,
  getHull,
  getPaddedExitPoints,
  getPointsFromRect,
  isClient,
  isPointInPolygon
} from '../shared';

export interface UseGraceAreaOptions {
  triggerElement: ShallowRef<HTMLElement | undefined>;
  contentElement: ShallowRef<HTMLElement | undefined>;
  onPointerInTransitChange?: (v: boolean) => void;
  onPointerExit: () => void;
  disabled?: ShallowRef<boolean | undefined>;
  /** Debounce delay time (milliseconds), default 16ms (approximately 60fps) */
  debounceMs?: number;
  /** Maximum grace area detection time (milliseconds), default 1000ms */
  maxGraceTime?: number;
}

export function useGraceArea(options: UseGraceAreaOptions) {
  const {
    triggerElement,
    contentElement,
    onPointerInTransitChange,
    onPointerExit,
    disabled,
    maxGraceTime = 1000
  } = options;

  const pointerGraceArea = shallowRef<Polygon>();
  let graceTimeoutTimer: number | undefined;

  // Lazy creation of debouncer, only create when needed
  let debounce: ReturnType<typeof createDebounce> | undefined;

  function handleRemoveGraceArea() {
    try {
      pointerGraceArea.value = undefined;
      onPointerInTransitChange?.(false);

      if (graceTimeoutTimer) {
        clearTimeout(graceTimeoutTimer);
        graceTimeoutTimer = undefined;
      }
    } catch {}
  }

  // Element reference change listener
  watchEffect(cleanup => {
    const isEnabled = disabled?.value !== true;
    if (!isClient || !isEnabled) {
      return;
    }

    const trigger = triggerElement.value;
    const content = contentElement.value;

    if (!trigger || !content) {
      return;
    }

    // Conditional function creation, only create when needed
    function createGraceAreaSafely(event: PointerEvent, hoverTarget: HTMLElement) {
      try {
        const { currentTarget, clientX: x, clientY: y } = event;
        if (!(currentTarget instanceof HTMLElement)) return;

        const exitPoint: Point = { x, y };
        const graceArea = createGraceAreaGeometry(exitPoint, currentTarget, hoverTarget);

        pointerGraceArea.value = graceArea;
        onPointerInTransitChange?.(true);

        if (graceTimeoutTimer) {
          clearTimeout(graceTimeoutTimer);
        }
        graceTimeoutTimer = window.setTimeout(() => {
          handleRemoveGraceArea();
          onPointerExit();
        }, maxGraceTime);
      } catch {
        handleRemoveGraceArea();
      }
    }

    // Use arrow functions to avoid function declaration hoisting, reduce memory usage
    const handleTriggerLeave = (event: PointerEvent) => createGraceAreaSafely(event, content);
    const handleContentLeave = (event: PointerEvent) => createGraceAreaSafely(event, trigger);

    const eventOptions: AddEventListenerOptions = { passive: true };

    trigger.addEventListener('pointerleave', handleTriggerLeave, eventOptions);
    content.addEventListener('pointerleave', handleContentLeave, eventOptions);

    cleanup(() => {
      trigger.removeEventListener('pointerleave', handleTriggerLeave);
      content.removeEventListener('pointerleave', handleContentLeave);
    });
  });

  // Grace area tracking listener
  watchEffect(cleanup => {
    const isEnabled = disabled?.value !== true;
    if (!isClient || !isEnabled || !pointerGraceArea.value) {
      return;
    }

    const trigger = triggerElement.value;
    const document = trigger?.ownerDocument;

    if (!document) return;

    // Lazy creation of debouncer, only create when actually needed
    if (!debounce) {
      debounce = createDebounce();
    }

    // Conditional creation of tracking function
    function trackPointerGrace(event: PointerEvent) {
      if (!pointerGraceArea.value) return;

      const target = event.target;
      if (!(target instanceof HTMLElement)) return;

      const { clientX: x, clientY: y } = event;
      const currentTrigger = triggerElement.value;
      const currentContent = contentElement.value;

      const hasEnteredTarget =
        (currentTrigger?.contains(target) ?? false) || (currentContent?.contains(target) ?? false);

      if (hasEnteredTarget) {
        handleRemoveGraceArea();
        return;
      }

      try {
        const pointerPosition: Point = { x, y };
        const isPointerOutsideGraceArea = !isPointInPolygon(pointerPosition, pointerGraceArea.value);
        const isAnotherGraceAreaTrigger = Boolean(target.closest(`[${GRACE_AREA_TRIGGER_ATTR}]`));

        if (isPointerOutsideGraceArea || isAnotherGraceAreaTrigger) {
          handleRemoveGraceArea();
          nextTick(() => {
            onPointerExit();
          });
        }
      } catch {
        handleRemoveGraceArea();
      }
    }

    const handleTrackPointerGrace = debounce.debounce(trackPointerGrace);
    const eventOptions: AddEventListenerOptions = { passive: true };
    document.addEventListener('pointermove', handleTrackPointerGrace, eventOptions);

    cleanup(() => {
      document.removeEventListener('pointermove', handleTrackPointerGrace);
      debounce?.cancel();
    });
  });

  onBeforeUnmount(() => {
    handleRemoveGraceArea();
    debounce?.cancel();

    if (graceTimeoutTimer) {
      clearTimeout(graceTimeoutTimer);
    }
  });
}

function createGraceAreaGeometry(exitPoint: Point, currentTarget: HTMLElement, hoverTarget: HTMLElement): Polygon {
  const exitSide = getExitSideFromRect(exitPoint, currentTarget.getBoundingClientRect());
  const paddedExitPoints = getPaddedExitPoints(exitPoint, exitSide);
  const hoverTargetPoints = getPointsFromRect(hoverTarget.getBoundingClientRect());
  return getHull([...paddedExitPoints, ...hoverTargetPoints]);
}
