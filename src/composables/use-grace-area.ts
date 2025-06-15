import { onWatcherCleanup, ref, watchEffect } from 'vue';
import type { ShallowRef } from 'vue';
import { refAutoReset } from '@vueuse/core';
import {
  getExitSideFromRect,
  getHull,
  getPaddedExitPoints,
  getPointsFromRect,
  isClient,
  isPointInPolygon
} from '../shared';
import { GRACE_AREA_TRIGGER_ATTR } from '../constants';
import type { Point, Polygon } from '../types';

export interface UseGraceAreaOptions {
  triggerElement: ShallowRef<HTMLElement | undefined>;
  contentElement: ShallowRef<HTMLElement | undefined>;
  onPointerInTransitChange?: (v: boolean) => void;
  onPointerExit: () => void;
  disabled?: ShallowRef<boolean | undefined>;
}

export function useGraceArea(options: UseGraceAreaOptions) {
  const { triggerElement, contentElement, onPointerInTransitChange, onPointerExit, disabled } = options;

  // Reset the inTransit state if idle/scrolled.
  const isPointerInTransit = refAutoReset(false, 300);
  const pointerGraceArea = ref<Polygon>();

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

    // Conditional function creation, only create when needed
    function createGraceAreaSafely(event: PointerEvent, hoverTarget: HTMLElement) {
      const { currentTarget, clientX: x, clientY: y } = event;
      if (!(currentTarget instanceof HTMLElement)) return;

      const exitPoint: Point = { x, y };
      const graceArea = createGraceAreaGeometry(exitPoint, currentTarget, hoverTarget);

      pointerGraceArea.value = graceArea;
      isPointerInTransit.value = true;
    }

    // Setup event listeners with consistent pattern
    const handleTriggerLeave = (event: PointerEvent) => createGraceAreaSafely(event, content);
    const handleContentLeave = (event: PointerEvent) => createGraceAreaSafely(event, trigger);

    trigger.addEventListener('pointerleave', handleTriggerLeave);
    content.addEventListener('pointerleave', handleContentLeave);

    onWatcherCleanup(() => {
      trigger.removeEventListener('pointerleave', handleTriggerLeave);
      content.removeEventListener('pointerleave', handleContentLeave);
    });
  });

  // Grace area tracking listener
  watchEffect(() => {
    if (!isClient || disabled?.value === true || !pointerGraceArea.value) {
      return;
    }

    // Conditional creation of tracking function
    const trackPointerGrace = (event: PointerEvent) => {
      if (!pointerGraceArea.value) return;

      const target = event.target;
      if (!(target instanceof HTMLElement)) return;

      const { clientX: x, clientY: y } = event;
      const hasEnteredTarget = triggerElement.value?.contains(target) || contentElement.value?.contains(target);

      if (hasEnteredTarget) {
        cleanupGraceArea();
        return;
      }

      const pointerPosition: Point = { x, y };
      const isPointerOutsideGraceArea = !isPointInPolygon(pointerPosition, pointerGraceArea.value);
      const isAnotherGraceAreaTrigger = Boolean(target.closest(`[${GRACE_AREA_TRIGGER_ATTR}]`));

      if (isPointerOutsideGraceArea || isAnotherGraceAreaTrigger) {
        cleanupGraceArea();
        onPointerExit();
      }
    };

    triggerElement.value?.ownerDocument.addEventListener('pointermove', trackPointerGrace);

    onWatcherCleanup(() => {
      triggerElement.value?.ownerDocument.removeEventListener('pointermove', trackPointerGrace);
    });
  });

  watchEffect(() => {
    const updated = isPointerInTransit.value;
    onPointerInTransitChange?.(updated);
  });
}

function createGraceAreaGeometry(exitPoint: Point, currentTarget: HTMLElement, hoverTarget: HTMLElement): Polygon {
  const exitSide = getExitSideFromRect(exitPoint, currentTarget.getBoundingClientRect());
  const paddedExitPoints = getPaddedExitPoints(exitPoint, exitSide);
  const hoverTargetPoints = getPointsFromRect(hoverTarget.getBoundingClientRect());
  return getHull([...paddedExitPoints, ...hoverTargetPoints]);
}
