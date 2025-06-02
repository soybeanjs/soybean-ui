import { nextTick, onWatcherCleanup, shallowRef, watchEffect } from 'vue';
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

  const cleanupGraceArea = () => {
    pointerGraceArea.value = undefined;
    onPointerInTransitChange?.(false);
  };

  // Element reference change listener
  watchEffect(() => {
    if (!isClient || disabled?.value === true) {
      return;
    }

    const trigger = triggerElement.value;
    const content = contentElement.value;

    if (!trigger || !content) {
      return;
    }

    let graceTimeoutTimer: number | undefined;
    const cleanupGraceTimeout = () => {
      if (graceTimeoutTimer) {
        clearTimeout(graceTimeoutTimer);
        graceTimeoutTimer = undefined;
      }
    };

    // Conditional function creation, only create when needed
    function createGraceAreaSafely(event: PointerEvent, hoverTarget: HTMLElement) {
      try {
        const { currentTarget, clientX: x, clientY: y } = event;
        if (!(currentTarget instanceof HTMLElement)) return;

        const exitPoint: Point = { x, y };
        const graceArea = createGraceAreaGeometry(exitPoint, currentTarget, hoverTarget);

        pointerGraceArea.value = graceArea;
        onPointerInTransitChange?.(true);

        cleanupGraceTimeout();
        graceTimeoutTimer = window.setTimeout(() => {
          cleanupGraceArea();
          cleanupGraceTimeout();
          onPointerExit();
        }, maxGraceTime);
      } catch {
        cleanupGraceArea();
        cleanupGraceTimeout();
      }
    }

    // Setup event listeners with consistent pattern
    const handleTriggerLeave = (event: PointerEvent) => createGraceAreaSafely(event, content);
    const handleContentLeave = (event: PointerEvent) => createGraceAreaSafely(event, trigger);

    const eventOptions: AddEventListenerOptions = { passive: true };

    trigger.addEventListener('pointerleave', handleTriggerLeave, eventOptions);
    content.addEventListener('pointerleave', handleContentLeave, eventOptions);

    onWatcherCleanup(() => {
      trigger.removeEventListener('pointerleave', handleTriggerLeave);
      content.removeEventListener('pointerleave', handleContentLeave);
      cleanupGraceArea();
    });
  });

  // Grace area tracking listener
  watchEffect(() => {
    if (!isClient || disabled?.value === true || !pointerGraceArea.value) {
      return;
    }

    const trigger = triggerElement.value;
    const document = trigger?.ownerDocument;

    if (!document) return;

    const debounce = createDebounce();

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
        cleanupGraceArea();
        return;
      }

      try {
        const pointerPosition: Point = { x, y };
        const isPointerOutsideGraceArea = !isPointInPolygon(pointerPosition, pointerGraceArea.value);
        const isAnotherGraceAreaTrigger = Boolean(target.closest(`[${GRACE_AREA_TRIGGER_ATTR}]`));

        if (isPointerOutsideGraceArea || isAnotherGraceAreaTrigger) {
          cleanupGraceArea();
          nextTick(() => {
            onPointerExit();
          });
        }
      } catch {
        cleanupGraceArea();
      }
    }

    const handleTrackPointerGrace = debounce.debounce(trackPointerGrace);
    const eventOptions: AddEventListenerOptions = { passive: true };

    document.addEventListener('pointermove', handleTrackPointerGrace, eventOptions);

    onWatcherCleanup(() => {
      document.removeEventListener('pointermove', handleTrackPointerGrace);
      debounce?.cancel();
    });
  });
}

function createGraceAreaGeometry(exitPoint: Point, currentTarget: HTMLElement, hoverTarget: HTMLElement): Polygon {
  const exitSide = getExitSideFromRect(exitPoint, currentTarget.getBoundingClientRect());
  const paddedExitPoints = getPaddedExitPoints(exitPoint, exitSide);
  const hoverTargetPoints = getPointsFromRect(hoverTarget.getBoundingClientRect());
  return getHull([...paddedExitPoints, ...hoverTargetPoints]);
}
